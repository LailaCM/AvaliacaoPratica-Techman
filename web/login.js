(() => {
    const API_LOGIN = 'http://localhost:3000/login';
    const MAX_DIGITS = 6;
    let digits = [];

    const pwdDisplay = document.getElementById('pwdDisplay');
    const keys = document.querySelectorAll('.key[data-value]');
    const btnClear = document.getElementById('btnClear');
    const btnEnter = document.getElementById('btnEnter');
    const errorMsg = document.getElementById('errorMsg');

    if (!pwdDisplay || !btnEnter || !btnClear || !errorMsg) return;

    const renderDisplay = () => {
        pwdDisplay.textContent = digits.map(() => '●').join('').padEnd(MAX_DIGITS, '-');
        btnEnter.disabled = digits.length !== MAX_DIGITS;
    };

    const showError = (text) => {
        errorMsg.textContent = text;
        errorMsg.hidden = false;
    };

    const hideError = () => {
        errorMsg.hidden = true;
    };

    const clearInput = () => {
        digits = [];
        renderDisplay();
        hideError();
    };

    keys.forEach(k => {
        k.addEventListener('click', () => {
            if (digits.length >= MAX_DIGITS) return;
            const v = k.getAttribute('data-value');
            if (!v) return;
            digits.push(v);
            renderDisplay();
            hideError();
        });
    });

    btnClear.addEventListener('click', clearInput);

    btnEnter.addEventListener('click', async () => {
        if (digits.length !== MAX_DIGITS) return;
        const senha = digits.join('');
        btnEnter.disabled = true;

        try {
            const resp = await fetch(API_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senha })
            });

            const data = await resp.json().catch(() => ({}));

            if (resp.ok) {
                location.href = `home.html?usuarioId=${encodeURIComponent(data.usuarioId)}&perfilId=${encodeURIComponent(data.perfilId)}`;
            }
            else {
                showError(data.error || 'ERRO: validação falhou.');
                clearInput();
            }
        } catch (err) {
            showError('ERRO: não foi possível validar a senha (problema de conexão).');
        } finally {
            btnEnter.disabled = false;
        }
    });

    renderDisplay();
})();

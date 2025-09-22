(() => {
  const apiBase = (window.API_BASE || '/api');
  const qs = new URLSearchParams(location.search);
  const usuarioId = qs.get('usuarioId');
  const perfilId = qs.get('perfilId');

  if (!usuarioId) {
    location.href = 'login.html';
    return;
  }

  const infoUser = document.getElementById('infoUser');
  const listaEquip = document.getElementById('listaEquip');
  const btnCriarEquip = document.getElementById('btnCriarEquip');
  const msgEquip = document.getElementById('msgEquip');

  infoUser.textContent = `Usuário: ${usuarioId} | Perfil: ${perfilId}`;

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  async function loadEquipamentos() {
    listaEquip.innerHTML = 'Carregando...';
    try {
      const res = await fetch(`${apiBase}/equipamentos`);
      const arr = await res.json();
      if (!Array.isArray(arr)) throw new Error('Resposta inválida');
      renderLista(arr);
    } catch (err) {
      listaEquip.innerHTML = 'Erro ao carregar equipamentos';
      console.error(err);
    }
  }

  function renderLista(items) {
    listaEquip.innerHTML = '';
    if (!items.length) {
      listaEquip.innerHTML = '<i>Nenhum equipamento cadastrado.</i>';
      return;
    }

    items.forEach(eq => {
      const el = document.createElement('div');
      el.className = 'equip';
      el.innerHTML = `
        <h3>${escapeHtml(eq.nome)} ${eq.ativo ? '' : '(Inativo)'}</h3>
        <p>${escapeHtml(eq.descricao || '')}</p>
        <div>
          <input type="text" placeholder="Comente..." id="c_${eq.id}" />
          <button data-eid="${eq.id}" class="btnComentar">Comentar</button>
        </div>
        <div id="comments_${eq.id}" class="comentarios">Carregando comentários...</div>
      `;
      listaEquip.appendChild(el);

      const btn = el.querySelector('.btnComentar');
      const inp = el.querySelector('input');
      btn.addEventListener('click', async () => {
        const texto = inp.value.trim();
        if (!texto) return alert('Escreva um comentário');
        btn.disabled = true;
        try {
          const resp = await fetch(`${apiBase}/comentarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ equipamentoId: eq.id, comentario: texto, usuarioId: Number(usuarioId) })
          });
          if (resp.status === 201) {
            inp.value = '';
            loadComentarios(eq.id);
          } else {
            const b = await resp.json().catch(() => ({}));
            alert(b.error || 'Erro ao enviar comentário');
          }
        } catch (err) {
          alert('Erro de conexão');
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });

      loadComentarios(eq.id);
    });
  }

  async function loadComentarios(equipId) {
    const container = document.getElementById(`comments_${equipId}`);
    if (!container) return;
    container.textContent = 'Carregando comentários...';
    try {
      const res = await fetch(`${apiBase}/comentarios/equipamento/${equipId}`);
      const arr = await res.json();
      if (!Array.isArray(arr) || arr.length === 0) {
        container.innerHTML = '<i>Sem comentários</i>';
        return;
      }
      container.innerHTML = arr
        .map(c => `<div class="comentario">${escapeHtml(c.comentario)} <small style="color:#888">(${new Date(c.dataTs).toLocaleString()})</small></div>`)
        .join('');
    } catch (err) {
      container.innerHTML = 'Erro ao carregar comentários';
      console.error(err);
    }
  }

  btnCriarEquip.addEventListener('click', async () => {
    const nome = document.getElementById('eqNome').value.trim();
    const imagem = document.getElementById('eqImagem').value.trim();
    const descricao = document.getElementById('eqDesc').value.trim();
    const ativo = document.getElementById('eqAtivo').checked;
    msgEquip.textContent = '';
    if (!nome) return msgEquip.textContent = 'Nome é obrigatório';

    btnCriarEquip.disabled = true;
    try {
      const res = await fetch(`${apiBase}/equipamentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, imagem, descricao, ativo })
      });
      if (res.status === 201) {
        document.getElementById('eqNome').value = '';
        document.getElementById('eqImagem').value = '';
        document.getElementById('eqDesc').value = '';
        document.getElementById('eqAtivo').checked = true;
        loadEquipamentos();
      } else {
        const b = await res.json().catch(() => ({}));
        msgEquip.textContent = b.error || 'Erro ao criar';
      }
    } catch (err) {
      msgEquip.textContent = 'Erro de conexão';
      console.error(err);
    } finally {
      btnCriarEquip.disabled = false;
    }
  });

  loadEquipamentos();
})();

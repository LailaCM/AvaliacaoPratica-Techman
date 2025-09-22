const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/comentarios/equipamento/:equipId', async (req, res) => {
  const { equipId } = req.params;
  try {
    const comentarios = await prisma.comentario.findMany({
      where: { equipamento: Number(equipId) },
      orderBy: { data: 'desc' } 
    });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar comentários do equipamento' });
  }
});

router.get('/', async (req, res) => {
  const rotas = {
    equipamentos: '/equipamentos',
    usuarios: '/usuarios',
    perfis: '/perfis',
    comentarios: '/comentarios',
    login: '/login'
  };
  res.json(rotas);
});

router.post('/login', async (req, res) => { 
  const { senha } = req.body;

  if (!senha) {
    return res.status(400).json({ error: 'Senha é obrigatória.' });
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: { senha }  // busca só pela senha
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    return res.json({
      usuarioId: usuario.id,
      perfilId: usuario.perfilId
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});


const Equipamento = require('./controllers/equipamento');
router.get('/equipamentos', Equipamento.getAll);
router.get('/equipamentos/:id', Equipamento.getById);
router.post('/equipamentos', Equipamento.post);
router.put('/equipamentos/:id', Equipamento.updateById);
router.delete('/equipamentos/:id', Equipamento.deleteById);

const Usuario = require('./controllers/usuario');
router.get('/usuarios', Usuario.getAll);
router.get('/usuarios/:id', Usuario.getById);
router.post('/usuarios', Usuario.post);
router.put('/usuarios/:id', Usuario.updateById);
router.delete('/usuarios/:id', Usuario.deleteById);

const Perfil = require('./controllers/perfil');
router.get('/perfis', Perfil.getAll);
router.get('/perfis/:id', Perfil.getById);
router.post('/perfis', Perfil.post);
router.put('/perfis/:id', Perfil.updateById);
router.delete('/perfis/:id', Perfil.deleteById);

const Comentario = require('./controllers/comentario');
router.get('/comentarios', Comentario.getAll);
router.get('/comentarios/:id', Comentario.getById);
router.post('/comentarios', Comentario.post);
router.put('/comentarios/:id', Comentario.updateById);
router.delete('/comentarios/:id', Comentario.deleteById);

module.exports = router;

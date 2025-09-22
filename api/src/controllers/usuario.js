const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async getAll(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await prisma.usuario.findUnique({
                where: { id: Number(id) }
            });
            if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }
    },

    async post(req, res) {
        try {
            const data = req.body;
            const novoUsuario = await prisma.usuario.create({ data });
            res.status(201).json(novoUsuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const usuario = await prisma.usuario.update({
                where: { id: Number(id) },
                data
            });
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário.' });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            await prisma.usuario.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Usuário deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    }
};
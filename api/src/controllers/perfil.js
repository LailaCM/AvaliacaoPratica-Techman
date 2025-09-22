const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async getAll(req, res) {
        try {
            const perfis = await prisma.perfil.findMany();
            res.json(perfis);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar perfis.' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const perfil = await prisma.perfil.findUnique({
                where: { id: Number(id) }
            });
            if (!perfil) return res.status(404).json({ error: 'Perfil não encontrado.' });
            res.json(perfil);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar perfil.' });
        }
    },

    async post(req, res) {
        try {
            const data = req.body;
            const novoPerfil = await prisma.perfil.create({ data });
            res.status(201).json(novoPerfil);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar perfil.' });
        }
    },

    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const perfil = await prisma.perfil.update({
                where: { id: Number(id) },
                data
            });
            res.json(perfil);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar perfil.' });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            await prisma.perfil.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Perfil deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar perfil.' });
        }
    }
};
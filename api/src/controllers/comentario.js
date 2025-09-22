const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async getAll(req, res) {
        try {
            const comentarios = await prisma.comentario.findMany();
            res.json(comentarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar comentários.' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const comentario = await prisma.comentario.findUnique({
                where: { id: Number(id) }
            });
            if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado.' });
            res.json(comentario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar comentário.' });
        }
    },

    async post(req, res) {
        try {
            const data = req.body;
            const novoComentario = await prisma.comentario.create({ data });
            res.status(201).json(novoComentario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar comentário.' });
        }
    },

    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const comentario = await prisma.comentario.update({
                where: { id: Number(id) },
                data
            });
            res.json(comentario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar comentário.' });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            await prisma.comentario.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Comentário deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar comentário.' });
        }
    }
};
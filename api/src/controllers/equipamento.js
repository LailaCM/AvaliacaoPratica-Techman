const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async getAll(req, res) {
        try {
            const equipamentos = await prisma.equipamento.findMany();
            res.json(equipamentos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar equipamentos.' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const equipamento = await prisma.equipamento.findUnique({
                where: { id: Number(id) }
            });
            if (!equipamento) return res.status(404).json({ error: 'Equipamento não encontrado.' });
            res.json(equipamento);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar equipamento.' });
        }
    },

    async post(req, res) {
        try {
            const data = req.body;
            const novoEquipamento = await prisma.equipamento.create({ data });
            res.status(201).json(novoEquipamento);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar equipamento.' });
        }
    },

    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const equipamento = await prisma.equipamento.update({
                where: { id: Number(id) },
                data
            });
            res.json(equipamento);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar equipamento.' });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            await prisma.equipamento.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Equipamento deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar equipamento.' });
        }
    }
};
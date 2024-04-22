import type { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'
import { DateTime } from 'luxon'
import { createProdutoValidator, updateProdutoValidator } from '#validators/produto'

export default class ProdutosController {
    async store({ request, response }: HttpContext): Promise<void> {
        const data = request.all()
        await createProdutoValidator.validate(data)
        await request.validateUsing(createProdutoValidator)
        try {
            const produto = await Produto.create(request.only([
                'nome',
                'lote',
                'cd_barra',
                'preco',
                'dt_fabricacao',
                'dt_validade'
            ]))
            return response.status(201).json(produto)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

    async show({ request, response }: HttpContext): Promise<void> {
        try {
            const page = request.input('page', 1) || 1
            const limit = request.input('limit', 10) || 10
            const clientes = await Produto.query()
                .select('nome', 'preco', 'dt_fabricacao', 'dt_validade')
                .orderBy('nome', 'asc')
                .paginate(page, limit)
            const result = clientes.baseUrl('/clientes')
            return response.json(result)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

    async index({ params, response }: HttpContext): Promise<void> {
        try {
            const produto = await Produto.firstOrFail(params.id)
            return response.json(produto);
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

    async update({ params, request, response }: HttpContext): Promise<void> {
        const data = request.all()
        await updateProdutoValidator.validate(data)
        await request.validateUsing(updateProdutoValidator)
        try {
            const produto = await Produto.findOrFail(params.id);
            produto.merge(request.only([
                'nome',
                'lote',
                'cd_barra',
                'preco',
                'dt_fabricacao',
                'dt_validade'
            ])).save();
            return response.json(produto);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
    async delete({ params, response }: HttpContext): Promise<void> {
        try {
            const produto = await Produto.findOrFail(params.id)
            produto.deleted_at = DateTime.now();
            await produto.save();
            return response.json({ message: 'Produto ' + params.id + ' excluido' })
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

}
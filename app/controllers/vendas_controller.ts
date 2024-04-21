import type { HttpContext } from '@adonisjs/core/http'
import Venda from '#models/venda'
import Produto from '#models/produto'
import { DateTime } from 'luxon'

export default class VendasController {
    async store({ request, response }: HttpContext): Promise<void> {
        const { quantidade, produto_id, cliente_id } = request.only(['quantidade', 'produto_id', 'cliente_id'])
        try {
            const produto = await Produto.findOrFail(produto_id);
            const preco_total = quantidade * produto.preco;
            const venda = await Venda.create({
                quantidade,
                preco_unitario: produto.preco,
                preco_total,
                produto_id,
                cliente_id,
                dt_venda: DateTime.now() 
            })
            return response.status(201).json(venda)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}
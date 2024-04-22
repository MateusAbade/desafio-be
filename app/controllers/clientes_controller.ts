import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '#models/cliente'
import Telefone from '#models/telefone'
import {createClienteValidator, updateClienteValidator} from '#validators/cliente'

export default class ClientesController {

  async store({ request, response }: HttpContext): Promise<void> {
    const data = request.all()
    await createClienteValidator.validate(data)
    await request.validateUsing(createClienteValidator)
    try {
      const cliente = (await Cliente.create(request.only(['cpf', 'nome'])))
      await cliente.related('telefones').createMany(request.input('telefones'));
      await cliente.related('endereco').create(request.input('endereco'));
      await cliente.load('telefones');
      await cliente.load('endereco');
      return response.status(201).json(cliente)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async index({ request, response }: HttpContext): Promise<void> {
    try {
      const page = request.input('page', 1) || 1
      const limit = request.input('limit', 10) || 10
      const clientes = await Cliente.query().orderBy('id', 'desc').paginate(page, limit)
      const result = clientes.baseUrl('/clientes')
      return response.json(result)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async show({ params, request, response }: HttpContext): Promise<void> {
    try {
      const cliente = await Cliente.firstOrFail(params.id)
      const { mes, ano } = request.qs();
      let vendas: any;
      if (mes && ano) {
        const vendasQuery = cliente.related('vendas').query().orderBy('dt_venda', 'desc');
        vendas = await vendasQuery.whereRaw(`MONTH(dt_venda) = ${mes} AND YEAR(dt_venda) = ${ano}`);
      } else
        vendas = [];

      await cliente.load('telefones');
      await cliente.load('endereco');

      return response.json({ cliente, vendas });
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = request.all()
    await updateClienteValidator.validate(data)
    await request.validateUsing(updateClienteValidator)
    try {
      const cliente = await Cliente.findOrFail(params.id);
      cliente.merge(request.only(['nome', 'cpf']));
      if (request.input('endereco')) {
        await cliente.related('endereco').updateOrCreate({}, request.input('endereco'));
      }
      if (request.input('telefones')) {
        const telefonesData = request.input('telefones');
        for (const telefoneData of telefonesData) {
          const telefoneId = telefoneData.id;
          const telefone = await Telefone.findOrFail(telefoneId);
          telefone.merge(telefoneData);
          await telefone.save();
        }
      }
      await cliente.load('telefones');
      await cliente.load('endereco');
      await cliente.save();
      return response.json(cliente);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
  async delete({ params, response }: HttpContext): Promise<void> {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      await cliente.delete()
      return response.json({ message: 'Cliente ' + params.id + '  excluido' })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

}
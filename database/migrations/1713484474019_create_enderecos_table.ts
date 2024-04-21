import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('logradouro')
      table.string('numero')
      table.string('bairro')
      table.string('cidade')
      table.string('uf')
      table.string('cep')
      table.string('complemento')
      table.integer('cliente_id').unsigned().references('clientes.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
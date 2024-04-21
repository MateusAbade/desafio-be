import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantidade')
      table.decimal('preco_unitario')
      table.decimal('preco_total')
      table.timestamp('dt_venda')
      table.integer('cliente_id').unsigned().references('clientes.id').onDelete('CASCADE')
      table.integer('produto_id').unsigned().references('produtos.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
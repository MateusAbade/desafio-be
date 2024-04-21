import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome')
      table.integer('lote')
      table.string('cd_barra')
      table.decimal('preco')
      table.timestamp('dt_fabricacao')
      table.timestamp('dt_validade')
      table.timestamp('deleted_at').nullable();
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
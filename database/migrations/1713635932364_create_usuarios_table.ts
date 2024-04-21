import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("nome")
      table.string('email')
      table.string('senha')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
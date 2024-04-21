import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Cliente from '#models/cliente'


export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare telefone: string

  @column()
  declare cliente_id: number

  @hasOne(() => Cliente, {
    localKey: 'cliente_id',
    foreignKey: 'id',
  })
  declare cliente: HasOne<typeof Cliente>
}
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Cliente from '#models/cliente'
import Produto from '#models/produto'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare dt_venda: DateTime

  @column()
  declare quantidade: number

  @column()
  declare preco_unitario: number

  @column()
  declare preco_total: number

  @column()
  declare cliente_id: number

  @column()
  declare produto_id: number

  @hasOne(() => Cliente, {
    localKey: 'cliente_id',
    foreignKey: 'id',
  })
  declare cliente: HasOne<typeof Cliente>

  @hasOne(() => Produto, {
    localKey: 'produto_id',
    foreignKey: 'id',
  })
  declare produto: HasOne<typeof Produto>
}
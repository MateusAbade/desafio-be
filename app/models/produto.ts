import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeDelete, afterDelete  } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Venda from '#models/venda'


export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare lote: number

  @column()
  declare cd_barra: string

  @column()
  declare preco: number

  @column.dateTime()
  declare dt_fabricacao: DateTime

  @column.dateTime()
  declare dt_validade: DateTime

  @column.dateTime()
  declare deleted_at: DateTime | undefined

  @hasMany(() => Venda, {
    localKey: 'id',
    foreignKey: 'produto_id',
  })
  declare vendas: HasMany<typeof Venda>

  @beforeDelete()
  public static async setDeletedAt (produto: Produto) {
    produto.deleted_at = DateTime.now()
  }

  @afterDelete()
  public static async updateDeletedAt (produto: Produto) {
    await produto.merge({ deleted_at: undefined  }).save()
  }
}
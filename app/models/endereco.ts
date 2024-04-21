import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Cliente from '#models/cliente'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare logradouro: string

  @column()
  declare numero: string

  @column()
  declare bairro: string

  @column()
  declare cidade: string

  @column()
  declare uf: string

  @column()
  declare cep: string

  @column()
  declare complemento: string

  @column()
  declare cliente_id: number

  @hasOne(() => Cliente, {
    localKey: 'cliente_id',
    foreignKey: 'id',
  })
  declare cliente: HasOne<typeof Cliente>

}
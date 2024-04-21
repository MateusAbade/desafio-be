import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Telefone from '#models/telefone'
import Endereco from '#models/endereco'
import Venda from '#models/venda'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare nome: string
  
  @column()
  declare cpf: string

  @hasMany(() => Telefone, {
    localKey: 'id',
    foreignKey: 'cliente_id',
  })
  declare telefones: HasMany<typeof Telefone>

  @hasMany(() => Endereco, {
    localKey: 'id',
    foreignKey: 'cliente_id',
  })
  declare endereco: HasMany<typeof Endereco>

  @hasMany(() => Venda, {
    localKey: 'id',
    foreignKey: 'cliente_id',
  })
  declare vendas: HasMany<typeof Venda>
}
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Assets from './asset.js'


export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare empName: string

  @column()
  declare empRole: string

  @column()
  declare empSalary: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Assets)
  declare assets: HasMany<typeof Assets>

}

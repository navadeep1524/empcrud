import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// import Employee from './employee.js'

export default class Asset extends BaseModel {
  public static table = 'assets'
  @column({ isPrimary: true })
  declare id: number

@column({ columnName: 'asset_type' })
declare assetType: string

@column({ columnName: 'purchased_amount' })
declare purchasedAmount: number

// @column({ columnName: 'employee_id' })
// declare employeeId: number


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

//   @belongsTo(() => Employee)
//   declare employee: BelongsTo<typeof Employee>
}
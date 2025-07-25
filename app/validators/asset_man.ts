import vine from '@vinejs/vine'

export const createAssetValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
    assetType: vine.string().trim().minLength(2).maxLength(100),
    purchasedAmount: vine.number().positive().min(1000),
    
  })
)
export const updateAssetValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
    assetType: vine.string().trim().minLength(2).maxLength(100),
    purchasedAmount: vine.number().positive().min(100),

  })
)
// export const patchAssetValidator = vine.compile(
//   vine.object({
//     assetType: vine.string().trim().minLength(2).maxLength(100).optional(),
//     purchasedAmount: vine.number().positive().min(100).optional(),

//   })
// )
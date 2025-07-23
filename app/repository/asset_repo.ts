import Asset from '#models/asset'

export default class AssetRepository {
  
  public async createAsset(data: {id:number; assetType: string; purchasedAmount: number }) {
    return await Asset.create(data)
  }

  
  public async getAssets() {
    return await Asset.all()
  }

  
  public async getAssetById(id: number) {
    return await Asset.find(id)
  }

  
  public async deleteAsset(id: number) {
    const asset = await Asset.findOrFail(id)
    await asset.delete()
    return asset
  }

  
  public async updateAsset(data: {
    id: number
    assetType: string
    purchasedAmount: number
   
  }) {
    const asset = await Asset.findOrFail(data.id)

    asset.assetType = data.assetType
    asset.purchasedAmount = data.purchasedAmount
   

    await asset.save()
    return asset
  }


  public async patchAsset(id: number, data: {
    assetType?: string
    purchasedAmount?: number
    
  }) {
    const asset = await Asset.findOrFail(id)

    if (data.assetType !== undefined) asset.assetType = data.assetType
    if (data.purchasedAmount !== undefined) asset.purchasedAmount = data.purchasedAmount
   

    await asset.save()
    return asset
  }
}
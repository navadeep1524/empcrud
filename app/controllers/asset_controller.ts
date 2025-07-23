import type { HttpContext } from '@adonisjs/core/http'
import { createAssetValidator } from '#validators/asset_man'
import { updateAssetValidator } from '#validators/asset_man'
// import { patchAssetValidator } from '#validators/asset_man'
import AssetRepository from '../repository/asset_repo.js'

export default class AssetsController {
  private repo = new AssetRepository()

  async createAsset({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createAssetValidator)
      const asset = await this.repo.createAsset(payload)

      return response.created({
        status: true,
        message: 'Asset created successfully',
        data: asset,
      })
    } catch (error) {
      console.error(error) 
      return response.status(500).json({
        status: false,
        message: 'Create failed',
        error: error.message,
      })
    }
  }

  async getAsset({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const asset = await this.repo.getAssetById(id)

      if (!asset) {
        return response.notFound({ status: false, message: 'Asset not found' })
      }

      return response.ok({ status: true, message: 'Asset fetched', data: asset })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to fetch asset',
        error: error.message,
      })
    }
  }

  async getAssets({ response }: HttpContext) {
    try {
      const assets = await this.repo.getAssets()
      return response.ok({ status: true, message: 'Assets fetched', data: assets })
    } catch (error) {
      return response.status(500).json({ status: false, message: 'Failed', error: error.message })
    }
  }

  async updateAsset({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateAssetValidator)
      const asset = await this.repo.updateAsset(payload)

      return response.ok({ status: true, message: 'Asset updated', data: asset })
    } catch (error) {
      return response.status(500).json({ status: false, message: 'Update failed', error: error.message })
    }
  }

  async deleteAsset({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const asset = await this.repo.deleteAsset(id)

      return response.ok({ status: true, message: 'Asset deleted', data: asset })
    } catch (error) {
      return response.status(500).json({ status: false, message: 'Delete failed', error: error.message })
    }
  }
}
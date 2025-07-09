import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiKeyAuthMiddleware {
    async handle({ request, response }: HttpContext, next: NextFn) {
    const clientKey = request.header('Emp')
    const validKey = "emp@1234"
    if (!clientKey || clientKey !== validKey) {
      return response.unauthorized({ error: 'Invalid or missing API key' })
    }
    return next();
  }
}
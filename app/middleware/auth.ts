
import { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
declare module '@adonisjs/core/http' {
  interface HttpContext {
    authUser?: any 
  }
}
export default async function authJwt(ctx: HttpContext, next: () => Promise<void>) {
  const authHeader = ctx.request.header('Authorization')
  if (!authHeader) {
    return ctx.response.unauthorized({ message: 'Missing token' })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    ctx.authUser = decoded
    await next()
  } catch (err) {
    return ctx.response.unauthorized({ message: 'Invalid token' })
  }
}
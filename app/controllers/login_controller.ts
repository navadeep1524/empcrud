import type { HttpContext } from '@adonisjs/core/http'
import jwt, { Secret } from 'jsonwebtoken'
import User from '../models/login.js'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.query().where('email', email).first()

    if (!user || user.password !== password) {
      return response.unauthorized({ message: 'Invalid email or password' })
    }

    const secret: Secret = process.env.JWT_SECRET || 'fallback_secret'

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret
    )

    return response.ok({
      token,
      message: 'Login successful',
    })
  }
}
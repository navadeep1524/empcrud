import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  origin: true, // ✅ allow all origins for development
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: ['Authorization'],
  credentials: true,
  maxAge: 90,
})

export default corsConfig

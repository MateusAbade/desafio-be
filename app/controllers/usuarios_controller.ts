import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'


export default class UsuariosController {
    public async signup({ request, response }: HttpContext) {
        try {
            const usuario = await Usuario.create(request.only(['nome', 'email', 'senha']))
            return response.json({
        email: usuario.email,
        nome: usuario.nome
      })
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    public async login({ request, response }: HttpContext) {
        const { email, senha } = request.only(['email', 'senha'])
        try {
            const user = await Usuario.findBy('email', email)
            if (!user || !(await hash.verify(user.senha, senha))) {
                throw new Error('Credenciais inválidas')
            }
            const token = await Usuario.accessTokens.create(user)
            return response.json({
                type: 'bearer',
                value: token.value!.release(),
            })
        } catch (error) {
            return response.status(401).json({ message: 'Credenciais inválidas' })
        }
    }
}
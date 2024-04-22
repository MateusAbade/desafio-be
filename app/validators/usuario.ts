import vine from '@vinejs/vine'

export const createUsuarioValidator = vine.compile(
    vine.object({
        nome: vine.string().minLength(1),
        email: vine.string().email(),
        senha: vine.string().alphaNumeric().minLength(8)
    })
)

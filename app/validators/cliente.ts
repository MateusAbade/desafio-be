import vine from '@vinejs/vine'

export const createClienteValidator = vine.compile(
    vine.object({
        nome: vine.string().trim().minLength(3),
        cpf: vine.string().trim().fixedLength(11).regex(/^\d+$/),
        telefones: vine.array(
            vine.object({
                telefone: vine.string().trim().minLength(10).maxLength(11).regex(/^\d+$/)
            })
        ),
        endereco: vine.object({
            logradouro: vine.string().trim(),
            numero: vine.string().trim(),
            bairro: vine.string().trim(),
            cidade: vine.string().trim(),
            uf: vine.string().trim(),
            cep: vine.string().trim().regex(/^\d{5}-\d{3}$/),
            complemento: vine.string().optional()
        })
    })
)

export const updateClienteValidator = vine.compile(
    vine.object({
        nome: vine.string().trim().minLength(3),
        cpf: vine.string().trim().fixedLength(11).regex(/^\d+$/),
        telefones: vine.array(
            vine.object({
                telefone: vine.string().trim().minLength(10).maxLength(11).regex(/^\d+$/),
                id: vine.number(),
                cliente_id: vine.number()
            })
        ),
        endereco: vine.object({
            logradouro: vine.string().trim(),
            numero: vine.string().trim(),
            bairro: vine.string().trim(),
            cidade: vine.string().trim(),
            uf: vine.string().trim(),
            cep: vine.string().trim().regex(/^\d{5}-\d{3}$/),
            complemento: vine.string().optional()
        })
    })
)


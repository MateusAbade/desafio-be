import vine from '@vinejs/vine'

export const createVendaValidator = vine.compile(
    vine.object({
        quantidade: vine.number(),
        cliente_id: vine.number(),
        produto_id: vine.number()
    })
)

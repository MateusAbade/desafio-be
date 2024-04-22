import vine from '@vinejs/vine'

export const createProdutoValidator = vine.compile(
    vine.object({
        nome: vine.string().trim().minLength(3),
        lote: vine.number(),
        cd_barra: vine.number(),
        preco: vine.number(),
        dt_fabricacao: vine.date(),
        dt_validade: vine.date(),
    })
)

export const updateProdutoValidator = vine.compile(
    vine.object({
        nome: vine.string().trim().minLength(3),
        lote: vine.number(),
        cd_barra: vine.number(),
        preco: vine.number(),
        dt_fabricacao: vine.date(),
        dt_validade: vine.date(),
    })
)


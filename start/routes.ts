/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Rotas de cliente
router.post('/store', '#controllers/clientes_controller.store').prefix('/cliente')
  .use(middleware.auth({
    guards: ['api']
  }))
router.get('/index', '#controllers/clientes_controller.index').prefix('/cliente')
  .use(middleware.auth({
    guards: ['api']
  }))
router.get('/show/:id', '#controllers/clientes_controller.show').prefix('/cliente')
  .use(middleware.auth({
    guards: ['api']
  }))
router.put('/update/:id', '#controllers/clientes_controller.update').prefix('/cliente')
  .use(middleware.auth({
    guards: ['api']
  }))
router.delete('/delete/:id', '#controllers/clientes_controller.delete').prefix('/cliente')
  .use(middleware.auth({
    guards: ['api']
  }))

// Rotas de produtos
router.post('/store', '#controllers/produtos_controller.store').prefix('/produto')
  .use(middleware.auth({
    guards: ['api']
  }))
router.get('/index', '#controllers/produtos_controller.index').prefix('/produto')
  .use(middleware.auth({
    guards: ['api']
  }))
router.get('/show/:id', '#controllers/produtos_controller.show').prefix('/produto')
  .use(middleware.auth({
    guards: ['api']
  }))
router.put('/update/:id', '#controllers/produtos_controller.update').prefix('/produto')
  .use(middleware.auth({
    guards: ['api']
  }))
router.delete('/delete/:id', '#controllers/produtos_controller.delete').prefix('/produto')
  .use(middleware.auth({
    guards: ['api']
  }))

// Rotas de venda
router.post('/store', '#controllers/vendas_controller.store').prefix('/venda')
  .use(middleware.auth({
    guards: ['api']
  }))

// Rotas de usuario
router.post('/signup', '#controllers/usuarios_controller.signup').prefix('/usuario')
router.post('/login', '#controllers/usuarios_controller.login').prefix('/usuario')
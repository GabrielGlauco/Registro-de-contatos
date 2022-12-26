const express = require('express')
const router = express.Router()
const homeController = require('./src/controllers/homeController')
const contaController  = require('./src/controllers/contaController')
const contatosController = require('./src/controllers/contatosController')

const { requiredLogin } = require('./src/midlewares/midlewares')


// Rota Home

router.get('/', homeController.index)

// Rotas relacionadas ao sistema registro e login de contas

router.get('/conta', contaController.conta)

router.post('/conta/login', contaController.login )

router.post('/conta/register', contaController.register )

router.get('/conta/logout', contaController.logout)

router.get('/conta/logado', contaController.logado)

// Rotas relacionadas ao sistema de contatos

router.get('/conta/contatos/criar', requiredLogin, contatosController.index)

router.post('/conta/contatos/register', requiredLogin, contatosController.register)

router.get('/conta/contatos', requiredLogin, contatosController.contatos)

router.get('/conta/contatos/editar/:id', requiredLogin, contatosController.editar)

router.post('/conta/contatos/editado', requiredLogin, contatosController.editado)

router.get('/conta/contatos/deletar/:id', requiredLogin, contatosController.deletar)


module.exports = router;


import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/Login'
import contatos from './modules/Contatos'

const login = new Login('.form-login') 
const cadastro = new Login('.form-cadastro') 
const criarContato = new contatos('.form-criarctt')
const editarContato = new contatos('.form-editarctt')
//import './assets/css/style.css';
login.init()
cadastro.init()

criarContato.init()
editarContato.init()
/*
login.checkEmail()
login.checkPassword()
cadastro.checkEmail()
cadastro.checkPassword()
*/
/*
verficações front end

Ao submit no formulario

1. verificar se algum dos campos estão vazios
2. verificar se são diferentes de string
3. verificar se o email tem formato de email
4. verificar se a senha e maior ou igual a 5 e menor ou igual a 50
*/
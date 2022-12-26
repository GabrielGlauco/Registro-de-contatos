require('dotenv').config()
console.log(process.env)
const express = require('express');
const app = express();
const router = require('./router.js');
const path = require('path');
const mongoose = require('mongoose');
//const connectString = 'mongodb+srv://gabrielglauco:dodozika5@registrodecontatos.lkkxrro.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(process.env.CONNECTSTRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
.then(() => {
    app.emit('pronto')
    console.log('Banco Integrado!')
}).catch(e => console.log(e)) 

const session = require('express-session'); // configurar sessões
const MongoStore = require('connect-mongo'); // enviar dados coletados pela sessão para o mongo
const flash = require('connect-flash');
const csrf = require('csurf') // proteger contra ataques de falsificação de envio de formulario
const helmet = require('helmet') // midleware que desenpenha varios papeis na seguraça da aplicação
const {checkErro, csrfMidleware, midlewareGlobal } = require('./src/midlewares/midlewares')




// Req.body pode tratar os dados enviados no corpo da requisição
app.use(express.urlencoded({extended: true}))
app.use(express.json()) //permite o parse de json na aplicação

// Configurando a pasta de arquivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
    secret: 'saijdisjDSIADDS',
    name: 'sessionid', // nome generico de cokkie para evitar a identificação
    store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

// definindo a template engine e configurando o local da pasta views
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//app.use(helmet())
app.use(csrf())

// configurando midlewares globais
app.use(checkErro)
app.use(csrfMidleware)
app.use(midlewareGlobal)
app.use(router)

app.on('pronto', () => {
    app.listen(8000, () => {
        console.log('Servidor Rodando na porta: //localhost8000')
    })
})

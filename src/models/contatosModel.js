const mongoose = require('mongoose')
const validator = require('validator')

const contatosShecma = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    telefone: {type: String, required: true},
    email: {type: String, required: false, default: ''}
})

const contatosModel = mongoose.model('contatos', contatosShecma)


class Contato{
    constructor(body){
        this.body = body
        this.errors = []
        this.contato = null
    }

    async register(){
        this.validar()
        if(this.errors.length > 0) return;

        console.log('passou register')

        this.contato = await contatosModel.create(this.body)
    }

     async atualizar(obj){
        const id = obj.id
        if(typeof id !== 'string') return;
        this.body = obj
        this.validar()
        if (this.errors.length > 0) return;
            
        
       this.contato = await contatosModel.findByIdAndUpdate(id, this.body, {new: true})
    
    }

    static async read(){
       const contatos = await contatosModel.find()
       return contatos
    }

    static async buscaId(id){
        if(typeof id !== 'string') return;
        const contato = await contatosModel.findById(id)
        return contato

    }
    static async deletar(id){
        if(typeof id !== 'string') return;
        await contatosModel.findByIdAndDelete(id)
        console.log('deletado')
       
    }

    validar(){
        this.cleanUp()

        // validar se o nome e sobrenome tem apenas letras
        // validar se o email e mesmo um email
        if(!this.body.nome) this.errors.push('Nome invalido')
      

        if(this.body.email){
             validator.isEmail(this.body.email) || this.errors.push('Email invalido')
            
        } 
        // validar se o numero e um numero de telefone valido
        if(!this.body.telefone || this.body.telefone.length !== 8) {
            this.errors.push('Numero de telefone invalido')
        }
        
        console.log('passou')
        

    }

    cleanUp(){
        // checar se os dados enviados são de fato strings, e se não forem, se tornarão uma string vazia
        for(const key in this.body){
           // console.log(typeof this.body[key])
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
            console.log(this.body, 'oi sou body 1')
           /*obs: Se a notação de ponto 'this.body.key' fosse usada ela não iria referenciar o atributo key
           do for, e sim iria supor que existe uma propriedade no objeto literalmente chamada 'key', fazendo
           o codigo não funcionar, portanto quando precisar pegar propriedades dinamicas de um objeto 
           use obj[key] em vez de obj.key
           */
        }
        // Tirando o token que veio incorporado ao form ja que ele não deve ser armanezado na base de dados
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
        console.log(this.body, 'oi sou body 2')

    }

}

module.exports = Contato
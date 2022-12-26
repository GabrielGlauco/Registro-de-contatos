const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('usuarios', userSchema)

class usuario{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

  async register(){
        this.validar()
        if(this.errors.length > 0) return;

       await this.userExists()
        if(this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync()
        this.body.password = bcrypt.hashSync(this.body.password, salt)

     
            
        this.user =  await userModel.create(this.body) 
        /* criando o documento e ao mesmo tempo passando a referencia
         dele para uma propriedade que poder ser usada fora da classe*/
    
  
     
    }

   async userExists(){
       const user = await userModel.findOne({email: this.body.email})

       if(user) this.errors.push('Esse usuario ja existe')
    }

   async logar(){
        this.validar()

        this.user =  await userModel.findOne({email: this.body.email})

        if(!this.user){
            this.errors.push('Usuario invalido')
            return;
        }

        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.user = null;
            this.errors.push('Senha invalida')
        }

    }

    validar(){
        this.cleanUp()
        // checar formato do email
        if(validator.isEmail(this.body.email) === false){
            this.errors.push('Seu email esta incorreto')
        } 
        console.log(this.body)
        // checar se senha e menor que 5 e maior que 50
        if(this.body.password.length < 5 || this.body.password.length > 50){
            this.errors.push('A senha deve ter entre 5 a 50 caracteres')
        }
        console.log(this.body)
    }

    cleanUp(){
        // checar se os dados enviados são de fato strings, e se não forem, se tornarão uma string vazia
        for(const key in this.body){
            console.log(typeof this.body[key])
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
            console.log(this.body)
           /*obs: Se a notação de ponto 'this.body.key' fosse usada ela não iria referenciar o atributo key
           do for, e sim iria supor que existe uma propriedade no objeto literalmente chamada 'key', fazendo
           o codigo não funcionar, portanto quando precisar pegar propriedades dinamicas de um objeto 
           use obj[key] em vez de obj.key
           */
        }
        // Tirando o token que veio incorporado ao form ja que ele não deve ser armanezado na base de dados
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
        console.log(this.body)

    }


}

module.exports = usuario
import validator from "validator"

export default class Contatos {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }
    init(){
        this.events()
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        const nome =  this.form.querySelector('input[name ="nome"]')
        const sobrenome = this.form.querySelector('input[name ="sobrenome"]')
        const email  = this.form.querySelector('input[name ="email"]')
        const telefone = this.form.querySelector('input[name ="telefone"]')

        let error = false
        const el = e.target

        if(email.value !== '' && !validator.isEmail(email.value)){
           alert('Email invalido')
            error = true 
        }

        if (!nome || !/[a-zA-Z\u00C0-\u00FF \s]+$/g.test(nome.value)) {
            alert('Nome invalido')
            error = true
        }
        if(sobrenome.value !== '' && !/^[a-zA-Z\u00C0-\u00FF \s]+$/g.test(sobrenome.value)){
            alert('Sobrenome invalido')
            error = true
        }
        if (!telefone || telefone.value.length !== 8 || /\D/g.test(telefone.value)) {
            alert('Telefone invalido')
            error = true
        }

        if(error === false) el.submit()
    }
}




/*
1. Validações padrão do email
2. telefone precisa ter 8 digitos e obrigatorio
3. nome não pode ter qualquer caracteres que não seja letra e obrigatorio
4. sobrenome não pode ter qualquer caracteres que não seja letra
*/
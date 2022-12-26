import validator from 'validator';



export default class login{
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
                console.log(e)
                this.validate(e)
            })
           
        
        
    }
    validate(e){
        console.log(e)
        const email = this.form.querySelector('input[name = "email"]')
        const password = this.form.querySelector('input[name = "password"]')
        let error = false
        const el = e.target

        if(!email || typeof email.value !== 'string' || !validator.isEmail(email.value)){
            window.alert('Email invalido')
            error = true
            
        }
        
       if(password.value.length < 5 || password.value.length > 50){
            error = true
            window.alert('Senha invalida')
          
        }
     
        if(error === false) el.submit();
     
       
    }


   
}

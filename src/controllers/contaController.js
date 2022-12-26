const usuario = require('../models/contaModel')

exports.conta = (req, res) => {
    res.render('conta')
}

exports.login = async function (req, res){
  try{  

    const user = new usuario(req.body)
    await user.logar()
      
      if(user.errors.length > 0){
        console.log(user.errors)
        req.flash('errors', user.errors)
        req.session.save(function() { 
//Salvar a sessão na base de dados, serve para guardar informações da maquina que esta navegando no seu site
         res.redirect('back')
         return;
        })
        return;
      }
        req.flash('success', 'Você entrou no sistema')
        req.session.user = user.user // salvando as informações do usuario que logou
        req.session.save(() => {
        res.redirect('/conta/logado')
        return;
        }) 
       
    } catch(e){
        console.log(e)
        res.render('404')
        return;
     }
      
}

exports.logado = (req, res) => {
  res.render('logado')
}

exports.register = async function(req,res){
 try{
  const user = new usuario(req.body)
  await user.register()
  
  if(user.errors.length > 0){
    console.log(user.errors)
    req.flash('errors', user.errors)
    req.session.save(function() { 
  //Salvar a sessão na base de dados, serve para guardar informações da maquina que esta navegando no seu site
     return res.redirect('back')
    })
    return;
  }
    req.flash('success', 'Usuario criado com sucesso')
    req.session.save(function() { // salvando as informações da maquina do usuario que se registrou no bd
      return res.redirect('back')
    })
  
} catch(e){
    console.log(e)
    res.render('404')
 }
  
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

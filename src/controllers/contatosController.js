const { async } = require('regenerator-runtime')
const contatos = require('../models/contatosModel')

module.exports.index = async function(req,res) {
    res.render('criarcontatos')
}

exports.register = async function(req, res){
    try {
       
       
        const contato = new contatos(req.body)
        await contato.register()
        if(contato.errors.length > 0){
            console.log(contato.errors)
            req.flash('errors', contato.errors)
            req.session.save(() => {
             res.redirect('back')
             return;
           
        })
        return;
    }
     
    req.flash('success', 'Contato registrado com sucesso')
    console.log('tou aqui no back')
    req.session.save(() => {
    res.redirect('back')
    return;
})
        
} catch (error) {
     console.warn(error)
     res.render('404')
     return;

}
    
}

exports.contatos = async function(req,res){
    
   const Listacontatos = await contatos.read()
   res.render('contatos', {Listacontatos})
   return;
}


exports.editar = async function(req, res){
    if(!req.params.id) return res.render('404')
    
    
    const contato = await contatos.buscaId(req.params.id)
    
   if(!contato) return res.render('404')

    req.session.save(() => {
    res.render('editarcontato', {contato})
    return;
    })
}

exports.editado = async function(req,res){
    try{
     const ctt = await contatos.buscaId(req.body.id)
    if(req.body.id === ctt._id.toString()){
        const ctt2 = new contatos()
        await ctt2.atualizar(req.body)
        console.log(ctt2.body, "oi sou ctt2 body")
        req.flash('success', 'Contato editado com sucesso!')
        req.session.save(() => {
            res.redirect('/conta/contatos')
            return;
        })
        return;
    }
    } catch(e){
        console.warn(e)
    }
    
    
}
exports.deletar = async function(req, res){
    if(!req.params.id) return res.render('404')
    const contato = await contatos.buscaId(req.params.id)

    if(!contato) return res.render('404')

    await contatos.deletar(req.params.id)
    req.session.save(() => {
        res.redirect('/conta/contatos')
        return;
    })
}

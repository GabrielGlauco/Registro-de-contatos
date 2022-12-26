exports.checkErro = (err, req, res, next) => {
    if(err){
        res.render('404')
    }
    next()
}

exports.csrfMidleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.midlewareGlobal = (req, res, next) => {
     res.locals.errors = req.flash('errors')
     res.locals.success = req.flash('success')
     res.locals.user = req.session.user
    next()
}

exports.requiredLogin = (req, res, netx) => {
    if(!req.session.user) {
        req.flash('errors', 'E NECESSARIO ESTAR LOGADO PARA PROSSEGUIR COM A AÇÃO')
        req.session.save(() => res.redirect('back'))
        return;
    }
    netx()
}
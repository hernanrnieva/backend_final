import userModel from '../../models/user/user.js'

const userController = {
    register: (req, res) => {
        res.render('layouts/register')
    },
    registerFail: (req, res) => {
        res.render('layouts/register-fail')
    },
    login: (req, res) => {
        res.render('layouts/login')
    },
    loginFail: (req, res) => {
        res.render('layouts/login-fail')
    },
    logout: (req, res) => {
        const user = req.session.passport.user
        req.session.destroy((e) => {
            if(e) 
                res.json(e)
            else
                res.render('layouts/goodbye', {username: user.name})
        })
    },
    getJwt: (req, res) => {
        const access_token = userModel.getJwt(req.session.passport.user)

        res.json({access_token: access_token})
    }
}

export default userController
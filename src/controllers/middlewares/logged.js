/* Used for checking session is active */
export default (req, res, next) => {
    if(!req.session.passport)
        return res.redirect('/login')

    next()
}
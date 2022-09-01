/* Used for checking session is active in cases it shouldn't be */
export default (req, res, next) => {
    if(req.session.passport)
        return res.redirect('/products')

    next()
}
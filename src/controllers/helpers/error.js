/* Helper */
export const sendError = (message, res, status) => {
    return res.render('layouts/error', {
        errorMessage: message,
        errorStatus: status
    })
}
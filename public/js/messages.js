const socket = io()

function renderMessage(messages) {
    const html = messages.map(m => {
        return(`<div><p style="color: pink">
            [${m.date}] as ${m.type}
            <b style="color: white">${m.email}</b>: 
            <i style="color: turquoise">${m.text}</i>
        </p></div>`)
    }).join(' ')
    try{
        document.getElementById('messages').innerHTML = html
    }catch(e){}
}

socket.on('message', (messages) => {
    renderMessage(messages)
})

function createMessage() {
    const message = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value
    }
    
    socket.emit('message', message)
    return false
}
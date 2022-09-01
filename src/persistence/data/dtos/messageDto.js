export default class MessageDto {

    constructor(message) {
        this.email = message.email
        this.date = message.date
        this.text = message.text
        this.type = message.type
    }
}
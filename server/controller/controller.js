const { User, Contact} = require('../models/models.js')
const {validationResult} = require("express-validator")
const nodemailer = require('nodemailer')

class Controller {
    async registration(req, res) {
        try {
            const error = validationResult(req)

            if (!error.isEmpty()) {
                return res.status(400).json({message: 'Некорректный email'})
            }

            const {email, password} = req.body
            const emailName = /@([^.]+)./.exec(email)[1]

            if (emailName !== 'gmail' && emailName !== 'yandex' && emailName !== 'mail') {
                return res.status(501).json({message: 'Email Book не поддерживает данную почту'})
            }

            const used = await User.findOne({where: {userEmail: email}})
            if (used) {
                return res.status(400).json({message: 'Email уже зарегистрирован'})
            }
            
            User.create({userEmail: email, userPassword: password})
            
            res.status(201).json({message: 'Email зарегистрирован'})
        } catch (err) {
            console.log(err)
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {userEmail: email}})
            if (!user) {
                return res.status(400).json({message: 'Email не зарегистрирован'})
            }
            
            if (password !== user.userPassword) {
                return res.status(400).json({message: 'Неверный пароль'})
            }
            res.json({user})
        } catch (err) {
            console.log(err)
        }
    }

    async createContact(req, res) {
        try {
            const error = validationResult(req)

            if (!error.isEmpty()) {
                return res.status(400).json({message: 'Некорректный email'})
            }

            const {userId, contactName, contactEmail} = req.body

            const used = await Contact.findOne({where: {contactEmail: contactEmail, userUserId: userId}})
            if (used) {
                return res.status(400).json({message: 'Контакт уже существует'})
            }

            await Contact.create({userUserId: userId, contactName: contactName, contactEmail: contactEmail})
            const newContact = await Contact.findOne({where: {contactEmail: contactEmail, userUserId: userId, contactName: contactName}})
            res.status(201).json(newContact)
        } catch (err) {
            console.log(err)
        }
    }

    async getContacts(req, res) {
        try{
            const { userId } = req.query

            const contacts = await Contact.findAll({where: {userUserId: userId}})

            res.status(200).json(contacts)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteContact(req, res) {
        try {
            const contactId = req.params.id

            await Contact.destroy({where: {contactId: contactId}})

            res.status(200).json({message: 'Контакт удалён'})
        } catch (err) {
            console.log(err)
        }
    }

    async sendEmail(req, res) {
        try {
            const { emailInfo } = req.body

            const emailName = /@([^.]+)./.exec(emailInfo.userEmail)[1]

            if (emailName === 'gmail' && emailInfo.text) {
                let mailTransporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: emailInfo.userEmail,
                        pass: emailInfo.userPass
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })

                let details = {
                    from: emailInfo.userEmail,
                    to: emailInfo.contactTo,
                    subject: emailInfo.subject,
                    text: emailInfo.text
                }
    
                let info = mailTransporter.sendMail(details, (err) => {
                    if (err) {
                        return res.status(400).json({message: 'Что-то пошло не так. Проверьте корректность введенных данных.'})
                    } else {
                        return res.status(200).json({message: 'Email отправлен'})
                    }
                })
            } else if (emailName === 'yandex' && emailInfo.text) {
                let mailTransporter = nodemailer.createTransport({
                    host: 'smtp.yandex.ru',
                    port: 465,
                    secure: true,
                    auth: {
                        user: emailInfo.userEmail,
                        pass: emailInfo.userPass
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })

                let details = {
                    from: emailInfo.userEmail,
                    to: emailInfo.contactTo,
                    subject: emailInfo.subject,
                    text: emailInfo.text
                }
    
                let info = mailTransporter.sendMail(details, (err) => {
                    if (err) {
                        return res.status(400).json({message: 'Что-то пошло не так. Проверьте корректность введенных данных.'})
                    } else {
                        return res.status(200).json({message: 'Email отправлен'})
                    }
                })
            } else if (emailName === 'mail' && emailInfo.text) {
                let mailTransporter = nodemailer.createTransport({
                    host: 'smtp.mail.ru',
                    port: 465,
                    secure: true,
                    auth: {
                        user: emailInfo.userEmail,
                        pass: emailInfo.userPass
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })

                let details = {
                    from: emailInfo.userEmail,
                    to: emailInfo.contactTo,
                    subject: emailInfo.subject,
                    text: emailInfo.text
                }
    
                let info = mailTransporter.sendMail(details, (err) => {
                    if (err) {
                        return res.status(400).json({message: 'Что-то пошло не так. Проверьте корректность введенных данных.'})
                    } else {
                        return res.status(200).json({message: 'Email отправлен'})
                    }
                })
            } else if (!emailInfo.text) {
                return res.status(400).json({message: 'Невозможно отправить пустой email'})
            } else {
                res.status(400).json({message: 'Что-то пошло не так'})
            }

        } catch (err) {
            console.log(err)
        }
    }

}


module.exports = new Controller()
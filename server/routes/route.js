
const { Router } = require("express")
const {check} = require("express-validator")
const controller = require("../controller/controller.js")

const router = new Router()

router.post('/registration', [check('email', 'Некорректный email').isEmail()], controller.registration)
router.post('/login', controller.login)
router.post('/newcontact', [check('contactEmail', 'Некорректный email').isEmail()], controller.createContact)
router.get('/allcontacts', controller.getContacts)
router.post('/sendemail', controller.sendEmail)
router.delete('/user/:id', controller.deleteContact)


module.exports = router
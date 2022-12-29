const {Router} = require('express')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const route = Router()

route.post('/api/service/register',userController.registerUser)
route.post('/api/service/login',userController.signing)
route.post('/api/auth/access', userController.access);
route.get('/api/service/user',auth,userController.info);

module.exports = route;
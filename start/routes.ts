/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import authJwt from '#middleware/auth'
import auth from '@adonisjs/auth/services/main'
// import {middleware} from './kernel.js'
router.post('/login', '#controllers/login_controller.login')
router.group(()=>{
router.post('/', '#controllers/employees_controller.createEmployee')
router.get('/search', '#controllers/employees_controller.getEmployeesByFields')
router.get('/:id', "#controllers/employees_controller.getEmployeeById")
router.get('/',"#controllers/employees_controller.getEmployee")
router.put('/',"#controllers/employees_controller.putEmployee")
router.patch('/:id',"#controllers/employees_controller.patchEmployee")
router.delete('/:id',"#controllers/employees_controller.deleteEmployee")
}).prefix('/employee').use(authJwt)




router.group(()=>{
router.post('/', '#controllers/asset_controller.createAsset')
router.get('/:id', '#controllers/asset_controller.getAsset')
router.get('/', '#controllers/asset_controller.getAssets')
router.put('/', '#controllers/asset_controller.updateAsset')
router.patch('/:id', '#controllers/asset_controller.patchAsset')
router.delete('/:id', '#controllers/asset_controller.deleteAsset')
}).prefix('/asset').use(authJwt)
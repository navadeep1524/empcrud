/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import {middleware} from './kernel.js'
router.group(()=>{
router.post('/', '#controllers/employees_controller.createEmployee')
router.get('/search', '#controllers/employees_controller.getEmployeesByFields')
router.get('/:id', "#controllers/employees_controller.getEmployeeById")
router.get('/',"#controllers/employees_controller.getEmployee")
router.put('/',"#controllers/employees_controller.putEmployee")
router.patch('/:id',"#controllers/employees_controller.patchEmployee")
router.delete('/',"#controllers/employees_controller.deleteEmployee")
}).prefix('/employee').use(middleware.auth)




router.post('/assets', '#controllers/assets_controller.createAsset')
router.get('/assets/:id', '#controllers/assets_controller.getAsset')
router.get('/assets', '#controllers/assets_controller.getAssets')
router.put('/assets', '#controllers/assets_controller.updateAsset')
router.patch('/assets/:id', '#controllers/assets_controller.patchAsset')
router.delete('/assets/:id', '#controllers/assets_controller.deleteAsset')

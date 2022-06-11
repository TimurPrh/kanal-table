const Router = require('express')
const tableItemController = require('../controllers/tableItemController')

const router = new Router()

router.get('/table-items', tableItemController.getAll)
router.get('/items-count', tableItemController.getCount)
router.post('/table-item', tableItemController.create)
router.post('/table-items', tableItemController.createItems)
router.delete('/table-item/:id', tableItemController.destroy)

module.exports = router
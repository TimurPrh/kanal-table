const ApiError = require('../error/ApiError');
const { getItems, getItemsCount, createItem, removeItem } = require('../service/tableItem');

class tableItemController {
  async getAll(req, res, next) {
    let {limit, page, sort, filter} = req.query

    const sortObj = JSON.parse(sort)
    const filterObj = JSON.parse(filter)
    
    page = page || 1
    limit = limit || 3
    let offset = page * limit - limit

    // { direction: 'по возрастанию', column: 'без сортировки' }
    let orderBy
    let orderDirection
    switch (sortObj.column) {
      case 'Без сортировки':
        orderBy = 'id'
        orderDirection = 'ASC'
        break;
      case 'Название':
        orderBy = 'name'
        break;
      case 'Количество':
        orderBy = 'quantity'
        break;
      case 'Расстояние':
        orderBy = 'distance'
        break;
      default:
        break;
    }

    if (sortObj.column !== 'Без сортировки') {
      switch (sortObj.direction) {
        case 'по возрастанию':
          orderDirection = 'ASC'
          break;
        case 'по убыванию':
          orderDirection = 'DESC'
          break;
        default:
          orderDirection = 'ASC'
          break;
      }
    } 

    // { condition: 'равно', column: 'Дата', text: '' }
    let filterBy
    let filterCondition
    let filterText = filterObj.text
    switch (filterObj.column) {
      case 'Без фильтра':
        filterBy = ''
        break;
      case 'Дата':
        filterBy = 'date'
        break;
      case 'Название':
        filterBy = 'name'
        break;
      case 'Количество':
        filterBy = 'quantity'
        break;
      case 'Расстояние':
        filterBy = 'distance'
        break;
      default:
        break;
    }

    switch (filterObj.condition) {
      case 'равно':
        filterCondition = '='
        break;
      case 'содержит':
        filterCondition = 'like'
        break;
      case 'больше':
        filterCondition = '>'
        break;
      case 'меньше':
        filterCondition = '<'
        break;
      default:
        break;
    }

    try {
      const result = await getItems(limit, offset, orderBy, orderDirection, filterBy, filterCondition, filterText)

      return res.json(result.res)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getCount(req, res, next) {
    let {filter} = req.query

    const filterObj = JSON.parse(filter)

    let filterBy
    let filterCondition
    let filterText = filterObj.text
    switch (filterObj.column) {
      case 'Без фильтра':
        filterBy = ''
        break;
      case 'Дата':
        filterBy = 'date'
        break;
      case 'Название':
        filterBy = 'name'
        break;
      case 'Количество':
        filterBy = 'quantity'
        break;
      case 'Расстояние':
        filterBy = 'distance'
        break;
      default:
        break;
    }

    switch (filterObj.condition) {
      case 'равно':
        filterCondition = '='
        break;
      case 'содержит':
        filterCondition = 'like'
        break;
      case 'больше':
        filterCondition = '>'
        break;
      case 'меньше':
        filterCondition = '<'
        break;
      default:
        break;
    }

    try {
      const result = await getItemsCount(filterBy, filterCondition, filterText)

      return res.json(result.res)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async create(req, res, next) {
    try {
      let {date, name, quantity, distance} = req.body

      const item = await createItem({date, name, quantity, distance})

      return res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async createItems(req, res, next) {
    try {
      let result = []
      req.body.forEach((item, i) => {
        addOneItem(async (itemResult) => {
          result.push(itemResult)

          if (i === req.body.length - 1) {
            return res.send(result)
          }
        }, item)
      })
      
      async function addOneItem (callback, item) {
        let {date, name, quantity, distance} = item

        const itemResult = await createItem({date, name, quantity, distance})

        callback(itemResult)
      }
      
      
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async destroy(req, res, next) {
    try {
      const {id} = req.params

      const result = await removeItem(id)

      return res.json(result)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new tableItemController()
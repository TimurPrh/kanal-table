const initialState = {
  status: '', 
  list: [], 
  count: 0, 
  limit: 10, 
  activePage: 1,
  sort: { direction: 'по возрастанию', column: 'Без сортировки' }, 
  filter: { condition: 'равно', column: 'Без фильтра', text: '' }
}

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING': 
      return {...state, status: 'loading'}
    case 'SET_ERROR':
      return {...state, status: 'error'}
    case 'SET_DONE':
        return {...state, status: 'done'}
    case 'RESET_STATUS':
      return {...state, status: ''}
    case 'ADD_LIST':
      const list = action.payload.list.map(item => {
        let newItem = {}
        Object.keys(item).forEach(key => {
          if (key === 'date') {
            let date = new Date(item[key])
            const offset = action.payload.timeOffset
            date = new Date(date.getTime() - (offset * 60 * 1000))
            newItem[key] = date.toISOString().split('T')[0]
          } else {
            newItem[key] = item[key]
          }
        })

        return newItem
      })
      return {...state, list }
    case 'SET_COUNT':
      return {...state, count: action.payload}
    case 'SET_ACTIVE_PAGE':
      return {...state, activePage: action.payload}
    case 'SET_SORT':
      return {...state, sort: action.payload}
    case 'SET_FILTER':
      return {...state, filter: action.payload}
    default: 
      return state
  }
}

const setLoadingAction = () => ({type: 'SET_LOADING'})
const setErrorAction = () => ({type: 'SET_ERROR'})
const setDoneAction = () => ({type: 'SET_DONE'})
const resetStatusAction = () => ({type: 'RESET_STATUS'})
const addListAction = (payload) => ({type: 'ADD_LIST', payload})
const addCountAction = (payload) => ({type: 'SET_COUNT', payload})
const setActivePageAction = (payload) => ({type: 'SET_ACTIVE_PAGE', payload})
const setSortAction = (payload) => ({type: 'SET_SORT', payload})
const setFilterAction = (payload) => ({type: 'SET_FILTER', payload})

export {
  tableReducer, 
  setLoadingAction, 
  setErrorAction, 
  setDoneAction, 
  resetStatusAction, 
  addListAction, 
  addCountAction,
  setActivePageAction,
  setSortAction,
  setFilterAction
}
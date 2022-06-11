import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList, fetchListItemsCount } from '../../http';
import { addCountAction, addListAction, setDoneAction, setErrorAction, setLoadingAction } from '../../store/tableReducer';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import './App.scss';

function App() {
  const { status, limit, activePage, sort, filter } = useSelector(state => state.tableReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingAction())
      try {
        const res = await fetchList(activePage, limit, sort, filter)
        const countRes = await fetchListItemsCount(filter)
        const count = parseInt(await countRes.rows[0].count)
        dispatch(addCountAction(count))
        dispatch(addListAction({list: res.rows}))
        dispatch(setDoneAction())
      } catch(e) {
        console.log(e)
        dispatch(setErrorAction())
      }
    }
    fetchData()
  }, [activePage, sort, filter])

  let tableContent = null
  if (status === 'done') {
    tableContent = <Table />
  } else if (status === 'loading') {
    tableContent = <Loading />
  } else if ((status === 'error')) {
    tableContent = <Error />
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='table-wrapper'>
          <Sort />
          <Filter />
          {tableContent}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default App;

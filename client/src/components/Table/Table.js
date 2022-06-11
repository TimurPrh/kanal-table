import { useSelector } from 'react-redux';
import './table.scss'

const Table = () => {
  const list = useSelector(state => state.tableReducer.list)

  return (
    <>
      {
        list.length > 0 && 
        <table className='table'>
          <tbody>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Количество</th>
              <th>Расстояние</th>
            </tr>
            {list.map(item => 
              <tr key={item.id} className='table__item'>
                <td>
                  {item.date}
                </td>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.quantity}
                </td>
                <td>
                  {item.distance}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </>
  )
}

export default Table;
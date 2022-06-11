import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../http";
import { setActivePageAction, addListAction, setDoneAction, setErrorAction, setLoadingAction } from "../../store/tableReducer";
import './pagination.scss'

const Pagination = () => {
  const [pages, setPages] = useState([])
  const [pagesCount, setPagesCount] = useState(0)

  const { limit, count, activePage } = useSelector(state => state.tableReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    setPagesCount(Math.ceil(count / limit))
  }, [count, limit])

  useEffect(() => {
    let arr = []
    for (let i = 1; i < pagesCount + 1; i++) {
      arr.push(i)
    }
    setPages(arr)
    
  }, [pagesCount])

  const handleClick = (e, page) => {
    if (activePage !== page) {
      dispatch(setActivePageAction(page))
    } else {
      e.target.blur()
    }
  }

  const calculateList = () => {
    let prevDots = false

    return pages.map(page => {
      let isDots = true

      let isNear
      if (activePage === 1 || activePage === pagesCount) {
        isNear = Math.abs(page - activePage) < 3
      } else {
        isNear = Math.abs(page - activePage) < 2
      }

      if (page === 1 || page === pagesCount || isNear) {
        isDots = false 
      } 
  
      let styleClass 
      if (isDots) {
        styleClass = "pagination__button pagination__button_dots"
      } else if (activePage === page) {
        styleClass = "pagination__button pagination__button_active"
      } else {
        styleClass = "pagination__button"
      }
  
      let buttonText
      if (!isDots) {
        buttonText = page
        prevDots = false
      } else if (prevDots) {
        return null
      } else {
        buttonText = '...'
        prevDots = true
      }
  
      return (
        <button
          type={isDots ? 'text' : 'number'}
          key={page}
          className={styleClass}
          onClick={(e) => handleClick(e, page)}
          disabled={isDots}>
          {buttonText}    
        </button>
      )
    })
  }

  return (
    <div className="pagination">
      { calculateList() }
    </div>
  );
};

export default Pagination;
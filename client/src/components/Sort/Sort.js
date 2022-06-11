import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortAction } from '../../store/tableReducer';
import './sort.scss'

const Sort = () => {
  const [directionOption, setDirectionOption] = useState('по возрастанию')
  const [directionOptionVisible, setDirectionOptionVisible] = useState(false)
  const [columnOption, setColumnOption] = useState('Без сортировки')
  const [columnOptionVisible, setColumnOptionVisible] = useState(false)

  const dispatch = useDispatch()

  function useOutsideAlerter(ref, type) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          switch (type) {
            case 'column':
              setColumnOptionVisible(false)
              break;
            case 'direction':
              setDirectionOptionVisible(false)
              break;
            default:
              break;
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const onOptionChange = (e, type) => {
    switch (type) {
      case 'column':
        setColumnOption(e.target.innerHTML)
        break;
      case 'direction':
        setDirectionOption(e.target.innerHTML)
        break;
      default:
        break;
    }

    setColumnOptionVisible(false)
    setDirectionOptionVisible(false)
  }

  const handleApply = () => {
    dispatch(setSortAction({ direction: directionOption, column: columnOption }))
  }

  const columnOptionRef = useRef(null);
  const directionOptionRef = useRef(null);
  useOutsideAlerter(columnOptionRef, 'column');
  useOutsideAlerter(directionOptionRef, 'direction');
  
  return (
    <div className='sort'>
      <div className='sort__left'>
        <div className='sort__phrase'>
          Сортировать:
        </div>
        <div className='sort__option' ref={directionOptionRef}>
          <button 
            onClick={() => setDirectionOptionVisible(prev => !prev)}
            className="sort__option-header">
            {directionOption}
          </button>
          <div 
            
            className={directionOptionVisible ? 
            "sort__option-menu sort__option-menu_visible"
            :
            "sort__option-menu"}>
            {
              ['по возрастанию', 'по убыванию'].map(text => 
                <button 
                  key={text}
                  onClick={(e) => onOptionChange(e, 'direction')}
                  className="sort__option-item"
                  >{text}</button>
              )
            }
          </div>
        </div>
        <div className='sort__option' ref={columnOptionRef}>
          <button 
            onClick={() => setColumnOptionVisible(prev => !prev)}
            className="sort__option-header">
            {columnOption}
          </button>
          <div 
            
            className={columnOptionVisible ? 
            "sort__option-menu sort__option-menu_visible"
            :
            "sort__option-menu"}>
            {
              ['Название', 'Количество', 'Расстояние', 'Без сортировки'].map(text => 
                <button 
                  key={text}
                  onClick={(e) => onOptionChange(e, 'column')}
                  className="sort__option-item"
                  >{text}</button>
              )
            }
          </div>
        </div>
      </div>
      <div className='sort__apply'>
        <button 
          onClick={handleApply}
          className="sort__apply-button"
          >Применить</button>
      </div>
    </div>
  );
};

export default Sort;
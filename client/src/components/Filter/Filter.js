import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterAction } from '../../store/tableReducer';
import './filter.scss'

const Filter = () => {
  const [columnOption, setColumnOption] = useState('Без фильтра')
  const [columnOptionVisible, setColumnOptionVisible] = useState(false)
  const [conditionOption, setConditionOption] = useState('равно')
  const [conditionOptionVisible, setConditionOptionVisible] = useState(false)
  const [filterPrompt, setFilterPrompt] = useState('')

  const dispatch = useDispatch()

  function useOutsideAlerter(ref, type) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          switch (type) {
            case 'column':
              setColumnOptionVisible(false)
              break;
            case 'condition':
              setConditionOptionVisible(false)
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
      case 'condition':
        setConditionOption(e.target.innerHTML)
        break;
      default:
        break;
    }

    setColumnOptionVisible(false)
    setConditionOptionVisible(false)
  }

  const handleApply = () => {
    dispatch(setFilterAction({ condition: conditionOption, column: columnOption, text: filterPrompt }))
  }

  const columnOptionRef = useRef(null);
  const conditionOptionRef = useRef(null);
  useOutsideAlerter(columnOptionRef, 'column');
  useOutsideAlerter(conditionOptionRef, 'condition');

  return (
    <div className='filter'>
      <div className='filter__left'>
        <div className='filter__item' ref={columnOptionRef}>
          <div className="filter__option-description">
            Колонка:
          </div>
          <div className='filter__option'>
            <button 
              onClick={() => setColumnOptionVisible(prev => !prev)}
              className="filter__option-header">
              {columnOption}
            </button>
            <div 
              className={columnOptionVisible ? 
              "filter__option-menu filter__option-menu_visible"
              :
              "filter__option-menu"}>
              {
                ['Дата', 'Название', 'Количество', 'Расстояние', 'Без фильтра'].map(text => 
                  <button 
                    key={text}
                    onClick={(e) => onOptionChange(e, 'column')}
                    className="filter__option-item"
                    >{text}</button>
                )
              }
            </div>
          </div>
        </div>
        <div className='filter__item' ref={conditionOptionRef}>
          <div className="filter__option-description">
            Условие:
          </div>
          <div className='filter__option'>
            <button 
              onClick={() => setConditionOptionVisible(prev => !prev)}
              className="filter__option-header">
              {conditionOption}
            </button>
            <div 
              className={conditionOptionVisible ? 
              "filter__option-menu filter__option-menu_visible"
              :
              "filter__option-menu"}>
              {
                ['равно', 'содержит', 'больше', 'меньше'].map(text => 
                  <button 
                    key={text}
                    onClick={(e) => onOptionChange(e, 'condition')}
                    className="filter__option-item"
                    >{text}</button>
                )
              }
            </div>
          </div>
        </div>
        <div className='filter__text-wrapper'>
          <input 
            className='filter__text'
            placeholder='Текст фильтра'
            value={filterPrompt}
            onChange={(e) => setFilterPrompt(e.target.value)}
          />
        </div>
      </div>
      <div className='filter__apply'>
        <button 
          onClick={handleApply}
          className="filter__apply-button"
          >Применить</button>
      </div>
    </div>
  );
};

export default Filter;
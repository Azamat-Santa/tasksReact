import React from 'react'
import { useState } from 'react'
import './App.css'
import { Checkbox } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function App() {
  const [todo, setTodo] = useState([])
  const [valueInput, setValueInput] = useState('')


  const addTodo = (e) => {
    e.preventDefault()

    const addedTodo = {
      id: Date.now(),
      valueInput,
      passed: false
    }
    if(addedTodo.valueInput===''){
      return null 
    }else{
      setTodo([...todo, addedTodo])
      setValueInput('')
    }
    
   
  
  }
  

  const removeTodo = (idTodo) => {
    setTodo(todo.filter(todoObj => todoObj.id !== idTodo))
  }
  const checkedTodo=(index)=>{
    const newTodo=[...todo]
    if(newTodo[index].passed===true){
      newTodo[index].passed=false
    }else if(newTodo[index].passed===false){
      newTodo[index].passed=true
    }
    setTodo(newTodo)
  }
  
  return (
    <div className='wrapperTodo'>
      <div className="todoContent">
        <form action="">
        <div className='inputLabel'>
          <input type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            id='input'
            className='vvodTodo'
          />
        <label htmlFor="input">Что нужно сделать?</label>
        <button onClick={addTodo} className='btn'>+</button>

        </div>
           
        </form>
        {
          todo ? todo.map((todoItem,index) => {
            return (
              <div key={todoItem.id}  className='todoArr' >
              <Checkbox onClick={()=>checkedTodo(index)}/>
                
                <div className={todo[index].passed===true?'todoValue todoValueChecked':'todoValue'}>{todoItem.valueInput}</div>
              
                <DeleteOutlineIcon style={{cursor:'pointer',}}  onClick={() => removeTodo(todoItem.id)} />
              </div>
            )

          }) : <> Пусто</>
        }
      </div>
     


    </div> 
  )
}

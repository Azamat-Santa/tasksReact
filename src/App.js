import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { Checkbox } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function App() {
  const [valueInput, setValueInput] = useState('')

  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }else {
      return [];
    }});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo))
 
  }, [todo])


  
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
    <div className='wrapper-todo'>
      <div className="todo-content">
        <form action="">
        <div className='input-label'>
          <input type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            id='input'
            className='todo__input'
          />
        <label htmlFor="input">Что нужно сделать?</label>
        <button onClick={addTodo} className='btn'>+</button>

        </div>
           
        </form>
        {
          todo ? todo.map((todoItem,index) => {
            return (
              <div key={todoItem.id}  className='todo__output' >
              <Checkbox onClick={()=>checkedTodo(index)}/>
                <div className={todo[index].passed===true?'todo__value todo__value_hecked':'todo__value'}>{todoItem.valueInput}</div>
                <DeleteOutlineIcon style={{cursor:'pointer',}}  onClick={() => removeTodo(todoItem.id)} />
              </div>
            )
          }) : <> Пусто</>
        }
      </div>
     


    </div> 
  )
}

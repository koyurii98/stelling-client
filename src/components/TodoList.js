import React, { useState, useCallback } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

const Todolist = [
  {id:0, content:"과제하기1", success:false},
  {id:1, content:"과제하기2", success:true}, 
  {id:2, content:"과제하기3", success:true},
  {id:3, content:"과제하기4", success:true}, 
  {id:4, content:"과제하기5", success:false}, 
  {id:5, content:"과제하기6", success:true}, 
  {id:6, content:"과제하기7", success:false}, 
  {id:7, content:"과제하기8", success:true}, 
  {id:8, content:"과제하기9", success:false}, 
]

const TodoList = () => {
  const [TodoListData, setTodoListData] = useState(Todolist);
  const [ edit, setEdit ] = useState(false);
  const clickEdit = useCallback(()=>{
    setEdit(!edit);
  },[edit]);

  const addTodo = useCallback(()=>{
    const init = {
      content:"",
      success:"",
    }
    setTodoListData(TodoListData.concat(init));
  },[]);


  return(
    <div>
      <div className="Home-Header">
      <p className="Home-TodoList-tit">Todo List</p>
        <div className="Home-Header-btn color-Btn" onClick={clickEdit}>
          { edit ? "목록저장":" 목록수정" }
        </div>
      </div>
      <div className="Home-TodoList box">
       
        <div className="Home-TodoList-list">
          { Todolist.map((data,i)=>{
              return <div className="Home-TodoList-Item" key={i}>
               
                {
                  edit ?
                  <>
                    <div className="Home-TodoList-Item-cnt" style={{display:"flex", justifyContent:"space-between", width:"95%"}}>
                      <input className="Home-TodoList-Item-Input" value={data.content}></input>
                      <CancelIcon className="Home-TodoList-Icon" style={{fontSize:"15px",color:"#afafaf"}}/>
                    </div>
                  </>:
                  <div className="Home-TodoList-Item-cnt">
                   <input type="checkbox" id="checkedTodo" checked={data.success}/>
                   <label className={ data.success ? "Home-TodoList-Item-ctn textline" : "Home-TodoList-Item-ctn" } htmlFor="checkedTodo">{data.content}</label>
                 </div>
                }
              </div>
            })
          }
          { Todolist.length < 10 &&
            <div className="Home-TodoList-Btn addbtn" onClick={addTodo}>
              Add TodoList +
            </div>
          }
        </div>
      </div>
    </div>

  
  )
}

export default TodoList;
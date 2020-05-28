import React, {useState,useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoServices';
import { AuthContext } from '../Context/AuthContext';
import Message from './Message';
// import { set } from 'mongoose';

const Todos = props=>{
    const [todo,setTodo] = useState({name : ""});
    const [todos,setTodos] = useState([]);
    const [message,setMessage] = useState("");
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        TodoService.getTodos().then(data =>{
            setTodos(data.todos);
        });
    },[todos]);

    const onSubmit = e =>{
        e.preventDefault();
        TodoService.postTodo(todo).then(data =>{
                const { message } = data;
                resetForm();
                if(message.msgError){
                    TodoService.getTodos().then(getData =>{
                        setTodos(getData.todos)
                        setMessage(Message);

                    })
                }
                else if(message.msgBody === "UnAuthorized"){
                    setMessage(message);
                    authContext.setUser({username : ", role :"});
                    authContext.setIsAuthenticated(false);
                }
                else{
                    setMessage(message);
                }
        });
    }

    const onChange = e =>{
        setTodo({name : e.target.value});
    }

    const resetForm = ()=>{
        setTodo({name : ""})
    }

    return(
        <div>
            <br></br>
            <form onSubmit={onSubmit}>
                <label htmlFor="todo">Enter your Post</label>
                <input type="text" 
                        name="todo"
                        value={todo.name}
                        onChange={onChange}
                        className="form-control"
                        placeholder="What is on your Mind?"/>

                <button className="btn btn-lg btn-primary btn-block"
                type="submit">Submit</button>
            </form>
            {message ? <Message message={message}/> : ""}
            <br></br>
            <ul className="list-group">
                {
                    todos.map(todo =>{
                        return <TodoItem key={todo._id} todo={todo}/>
                    })
                }
            </ul>
        </div>
    )
}

export default Todos;
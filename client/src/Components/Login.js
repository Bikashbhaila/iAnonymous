import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';

const Login = props=>{
    const [user,setUser] = useState({username:"", password : ""});
    const [message,setMessage] = useState();
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            }
            else setMessage(message);

        })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Sign in</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                    name="username" 
                    onChange={onChange} 
                    className="form-control" 
                    placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                        name="password" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Your Password"/>
                <button className="btn btn-lg btn-primary btn-block"
                    type="submit">Log in</button>    
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
    
}

export default Login;
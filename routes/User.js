const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');

signToken = userID => {
    return JWT.sign({
        iss : "NoobCoder",
        sub : userID
    }, "NoobCoder",{expiresIn : "1h"});
}

//Route to register a user
userRouter.post('/register', (req,res)=>{
    const { username,password,role} = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}})
        else{
            const newUser = new User({username,password,role});
            newUser.save(err=>{
                if (err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                res.status(201).json({message : {msgBody : "Account Successfully Created!!!", msgError: false}});

            });
        }
    });

});

//Route to login
userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id,username,role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated : true,user : {username,role}});
    }
});

//Route to logout
userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({ user: {username : "", role : ""},success : true});
});

//Route to create todo
userRouter.post('/todo',passport.authenticate('jwt',{session : false}),(req,res)=>{

    var today = new Date();
    var date = (today.getMonth()+1)+'-'+(today.getDate())+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getMinutes()+'.'+today.getSeconds();
    const post=date+": "+req.body.name;
    const todo = new Todo({name:post});
    todo.save(err=>{
        if(err)
        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else {
                req.user.todos.push(todo);
                req.user.save(err=>{
                   if(err)
                        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                    else
                        res.status(200).json({message : {msgBody : 'Successfully Posted to the Board', msgError : false}})    
                })
            }

    });

});

//Route to retreive Todos
userRouter.get('/todos',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('todos').exec((err,document)=>{
        if (err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else
        res.status(200).json({todos : document.todos, authenticated : true});

    });
});
// Get all Todos
userRouter.get('/allTodos',(req,res)=>{
    Todo.find().exec((err,document)=>{
        
        if (err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else
        res.status(200).json({todos : document, authenticated : true});

    });
});
//Route to log into admin panel
userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin') {
        res.status(200).json({message : {msgBody : "You are an admin", msgError: false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin, go away", msgError: true}})
});

//Still logged in even after user close out browser on front and back-end if authenticated
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});



module.exports = userRouter;
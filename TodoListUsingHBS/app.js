const express = require('express')
const app =  express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('views engine','hbs')

let todo = []

app.get('/',(req,res)=>{
    res.render('tasks',{
        title:"TODO List",
        todo
    })
})

app.post('/addtodo',(req,res)=>{
    todo.push({
        id:req.body.id || 0,
        name:req.body.name
    })
    res.redirect('/')
})

app.listen(4444,()=>{
    console.log("Server started at http://localhost:4444")
})
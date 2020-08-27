const express = require('express')
const app = express()

let todo =[]

app.use('/',express.static(__dirname+'/static'))

app.get('/addtodo',(req,res)=>{
    todo.push(req.query.task)
    res.send('success')
})

app.get('/todo',(req,res)=>{
    res.send(todo)
})

app.get('/up',(req,res)=>{
    console.dir(req.query.t)
    res.send('success')
})


app.listen(4444,()=>{
    console.log('Server started at http://localhost:4444')
})
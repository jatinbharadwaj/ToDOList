const express = require('express')
const app = express()

let todo =[]
let x

app.use('/',express.static(__dirname+'/static'))

app.get('/addtodo',(req,res)=>{
    todo.push(req.query.task)
    res.send('success')
})

app.get('/todo',(req,res)=>{
    res.send(todo)
})

app.get('/up',(req,res)=>{
    console.dir(req.query.i)
    x = parseInt(req.query.i)
    // console.log(x)
    let z 
    z = todo[x]
    todo[x] = todo[x-1]
    todo[x-1] = z 
    res.send('success')
})

app.get('/down',(req,res)=>{
    console.dir(req.query.i)
    x = parseInt(req.query.i)
    // console.log(x)
    let z 
    z = todo[x]
    todo[x] = todo[x+1]
    todo[x+1] = z 
    res.send('success')
})

app.get('/')

app.listen(4444,()=>{
    console.log('Server started at http://localhost:4444')
})
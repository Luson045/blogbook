const express=require('express');
const mongoose = require('mongoose');
const Blog=require('./models/blog')
require('dotenv').config();
PORT=process.env.PORT || 4000;
const app=express();
//connecting to database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
  .then(result=>{
    console.log("connected");
    app.listen(PORT);
  })
  .catch(err=>{
    app.listen(PORT);
    app.use((req,res)=>{
      res.render('error',{error:'MongoDB connection error',errorcode:err})
    })
    console.log(err,"not connected");
  })
//setting ejs engine
app.set('view engine','ejs')
//public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.render('index',{title:"Home"})
})
app.get('/about',(req,res)=>{
  res.render('about',{title:"About"})
})
app.get('/create',(req,res)=>{
  res.render('create',{title:"Create your blog"})
})

app.get('/blogs',(req,res)=>{
  Blog.find().sort({createdAt:-1})
    .then((results)=>{
      res.render('blogs',{title:"All blogs",blogs:results})
    })
    .catch((err)=>{
      console.log(err);
    })
})
app.post('/blogs',(req,res)=>{
  const blog= new Blog(req.body);
  blog.save()
    .then(result=>{
      console.log('saved');
      res.redirect('/blogs');
    })
    .catch((err)=>{
      console.log(err);
    })
})
app.get('/blogs/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findById(id)
    .then(result=>{
      res.render('view',{blog:result,title:'view'})
    })
    .catch(err=>{
      console.log(err);
    })
})

app.delete('/blogs/:id',(req,res)=>{
  const id =req.params.id;
  Blog.findByIdAndDelete(id)
  .then(result=>{
    res.json({redirect:'/blogs'});
  })
  .catch(err=>{
    console.log(err);
  })
})

app.use((req,res)=>{
  res.render('error',{error:'404',errorcode:"File not Found"})
})

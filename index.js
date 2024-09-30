const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const blogController = require('./controllers/blogController')
const app = express();

app.set('view engine','ejs')
// app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}))
app.get('/createblog',blogController.renderBlogForm)
app.post('/addblog',blogController.validateBlog,blogController.addBlog)
app.get('/',blogController.renderBlogs);
// app.get('/blog/:id',blogController.blogging)
app.listen(port, ()=> console.log(`Application started at: ${port}`))
   
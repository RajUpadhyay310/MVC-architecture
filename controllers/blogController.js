const Blog = require('../models/blogmodel')

exports.renderBlogForm = (req,res)=>{

    res.render('createBlog',{errors:[]})
}
exports.addBlog = (req,res)=> {
     const {title, description, imageUrl} = req.body;
     Blog.addBlog({title,description,imageUrl});
     console.log(Blog.getAllBlogs());
      res.redirect('/')
}
exports.renderBlogs = (req , res)=>{
   const blogs = Blog.getAllBlogs();
   if (blogs.length == 0) {
    res.status(404).end('404 not found')    
        return;
   }
   res.render('blogs',{blogs:Blog.getAllBlogs()});
}
//use validation
exports.validateBlog = (req, res, next) => {
   const { title, description, imageUrl } = req.body;

   let errors = [];

   if (!title || title.length < 3) {
       errors.push('Title field should contain at least 3 characters');
   }
   if (!description || description.length < 10) {
       errors.push('Description field should contain at least 10 characters');
   }
   //Validate URL using regex
   const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
   if (!imageUrl || !urlPattern.test(imageUrl)) {
       errors.push('Invalid URL format for image');
   }

   if (errors.length > 0) {
       // Show error on createBlog page
       res.render('createBlog', { errors: errors });
   } else {
       next();
   }
};

let blogs = [];//local db
exports.getAllBlogs = ()=> blogs;
exports.addBlog = (blog)=>
{
    blogs.push(blog)
}

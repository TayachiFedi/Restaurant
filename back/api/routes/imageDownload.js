
let express = require('express')
let routes = express.Router()
let auth = require('./auth')
let path = require('path')
let fs = require('fs')

// __dirname: C:\Users\Khaled\Desktop\fivepoints\03_niveau03\06_projetBlog\fivePointsBlog\controllers
let dir = path.join(process.cwd(), process.env.IMAGE_UPLOAD_DIR)

let mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
}

routes.get('/:image_name', (req, res, next) => {
 console.log(__dirname)
 res.sendFile(path.join(process.env.IMAGE_UPLOAD_DIR,req.params.image_name))
 return ;

}
)

module.exports = routes

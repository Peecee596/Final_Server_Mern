const mongoose=require('mongoose')
const config=require('../config/db.config')
// const mongoose=require('mongoose')
mongoose.Promise=global.Promise

const db={}
db.mongoose=mongoose
db.url=config.url
db.role=require('../models/roles.model')
db.user=require('../models/users.model')
db.ROLES=["user","admin","moderator"]
db.News=require('../models/news.model')(mongoose)

module.exports=db;
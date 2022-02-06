const express=require('express')
const app=express();

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const cors=require('cors')
var corsOption={origin:true}
app.use(cors(corsOption))


app.get("/",(req,res)=>{
    res.send(`Welcome to the express server-final`)
})
//db
const db=require('./models')
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log(`Connected to Db`)})
.catch(err=>{console.log(`Failed Not connected to DB`,err)})

const init=require('./models/initial-model')
init();

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`)
})

//routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/news.routes')(app)
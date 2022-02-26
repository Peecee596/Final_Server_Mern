module.exports=app=>{

    const Add=require('../Controllers/news/add.controller');
    const FindAll=require('../Controllers/news/findAll.controller');
    const FindOne=require('../Controllers/news/findOne.controller');
    const Delete=require('../Controllers/news/delete.controller');
    const Update=require('../Controllers/news/update.controller');

    var router=require('express').Router()

    //add
    router.post('/',Add.add)

    //findall
    router.get('/',FindAll.findAll)

    //findone
    router.get('/:id',FindOne.findOne)

    //update
    router.put('/:id',Update.update)

    //delete
    router.delete('/:id',Delete.delete)
    
    //call
    app.use('/api/news',router)
}
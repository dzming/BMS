var express = require('express');
var router = express.Router();

var {
    connect,
    insert,
    find,
    del,
    update,
    ObjectId
} = require("../libs/mongo.js");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/findUser', async (req, res, next) => {
    let {
        name
    } = req.body
    let data = await find(`goods`, name ? {
        name: name
    } : {})
    res.send(data);
});

router.post('/findUsers',async (req, res, next)=>{
    let {
        name
    } = req.body
    let data = await find(`user`, name ? {
        name: name
    } : {})
    res.send(data);
    
})

router.post('/findUserq', async (req, res, next) => {
    let {
        uname
    } = req.body
    let data = await find(`consumers`, uname ? {
        uname: uname
    } : {})
    res.send(data);
});

router.post('/findUserg', async (req, res, next) => {
    let {
        unames
    } = req.body
    let data = await find(`goodslist`, unames ? {
        unames: unames
    } : {})
    res.send(data);
});

router.post('/users',async (req, res, next)=>{
    let {
        inputEmail
    } = req.body
    let data = await find(`user`, inputEmail ? {
        inputEmail: inputEmail
    } : {})
    res.send(data);
    
})

router.post('/order', async (req, res, next) => {
    let {
        name,
        age,
        skill,
        description
    } = req.body
    let data = await insert("goods", [{
        name,
        age,
        skill,
        description
    }]);
    res.send(data);
});

router.post('/orders', async (req, res, next) => {
    let {
        inputEmail,
        inputPassword,
        level,
        lv
    } = req.body
    let data = await insert("user", [{
        inputEmail,
        inputPassword,
        level,
        lv
    }]);
    res.send(data);
});

router.post('/ordersy', async (req, res, next) => {
    let {
        uname,
        upwd
    } = req.body
    let data = await insert("consumers", [{
        uname,
        upwd
    }]);
    res.send(data);
});

router.post('/del', async (req, res, next) => {
    let {
        _id
    } = req.body
    let data = await del("goods", _id ? {
        _id: ObjectId(_id)
    } : {});
    res.send(data);
});

router.post('/dels', async (req, res, next) => {
    let {
        _id
    } = req.body
    let data = await del("user", _id ? {
        _id: ObjectId(_id)
    } : {});
    res.send(data);
});

router.post('/dely', async (req, res, next) => {
    let {
        _id
    } = req.body
    let data = await del("consumers", _id ? {
        _id: ObjectId(_id)
    } : {});
    res.send(data);
});

router.post('/update', async (req, res, next) => {
    let {
        _id,
        name,
        age,
        skill,
        description
    } = req.body
    let data = await update("goods", _id ? {_id: ObjectId(_id)} : {} , { $set: { 
        name,
        age,
        skill,
        description 
    }
});
    res.send(data);
});

router.post('/updates', async (req, res, next) => {
    let {
        _id,
        inputEmail,
        inputPassword
    } = req.body
    let data = await update("user", _id ? {_id: ObjectId(_id)} : {} , { $set: { 
        inputEmail,
        inputPassword
    }
});
    res.send(data);
});

router.post('/updatey', async (req, res, next) => {
    let {
        _id,
        uname,
        upwd,
    } = req.body
    let data = await update("consumers", _id ? {_id: ObjectId(_id)} : {} , { $set: { 
        uname,
        upwd
    }
});
    res.send(data);
});

router.post('/updatezt', async (req, res, next) => {
    let {
        _id,
        numbers,
        condition,
    } = req.body
    let data = await update("goodslist", _id ? {_id: ObjectId(_id)} : {} , { $set: { 
        numbers,
        condition
    }
});
    res.send(data);
});

module.exports = router;
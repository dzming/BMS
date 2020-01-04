var express = require('express');
var router = express.Router();
var {
  connect,
  insert,
  find,
  ObjectId
} = require("../libs/mongo.js");
var token = require("../libs/token.js");
const {verify} = require('../libs/token.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', async (req, res, next) => {
  // console.log(req.body);
  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await find(`user`, {
    inputEmail: inputEmail
  })
  console.log(data, data[0].inputPassword)
  if (data[0].inputPassword === inputPassword) {
    res.send({
      status: "success",
      token: token.create({
        inputEmail
      })
    });
  } else {
    res.send({
      status: "fail"
    });
  }
});

router.post('/autoLogin', async (req, res, next) => {
  console.log(req.body);
  let res1 = verify(req.body.token);

  if(res1){
    res.send(
      msg='success'
    );
  }else{
    res.send(
      msg='fail'
    );
  }

  res.send(req.body);
})


module.exports = router;
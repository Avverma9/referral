const express = require('express');
const router = express.Router();

const signup=require('../controllers/signup')
//--------------------------------------------
router.post("/signup",signup.createAuthor)
router.post("/login",signup.login)
router.post("/getData",signup.getData)
router.post("/share",signup.share)
//--------------------------------------------

router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports = router;

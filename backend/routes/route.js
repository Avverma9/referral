const express = require('express');
const router = express.Router();

const signup=require('../controllers/signup')
//--------------------------------------------
router.post("/signup",signup.createAuthor)
router.post("/login/user",signup.login)
router.post("/getData/user/data",signup.getData)
router.post("/share-refferal-link",signup.share)
//--------------------------------------------

router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports = router;

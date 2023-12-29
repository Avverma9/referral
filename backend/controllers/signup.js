const userModel = require("../models/userModel");

const createAuthor = async function (req, res) {
  try {
    let userData = req.body;
    let { email, refralCode } = userData;
    let { ref } = req.query;
    //-----------   Email have to unique  ------------------
    if (!email) {
      return res.status(400).send({ status: false, msg: "Name is required" });
    }
    userData.email = userData.email.toLowerCase();
    email = userData.email.toLowerCase();

    const emailid = await userModel.findOne({ email: email });
    if (emailid) {
      return res
        .status(400)
        .send({ status: false, msg: "Email is already exists" });
    }
    //----------- if by refral  refral is valid  ------------------
    if (refralCode) {
      const validrefral = await userModel.findOneAndUpdate(
        { refferalLink: refralCode },
        { $inc: { successRefferal: 1 }, $push: { userNameArray: email } }
      );
      if (!validrefral) {
        return res
          .status(400)
          .send({ status: false, msg: "refral code is not valid" });
      }
    }
    //---------   create a refral code  for user  ------------------- `https://example.com/signup?ref=${userId}`
    const uniqueCode = Math.floor(10000 + Math.random() * 90000);
    let refferalLink = uniqueCode.toString();
    userData.refferalLink = refferalLink;
    //------------------------------------------------

    const userCreated = await userModel.create(userData);
    return res.status(201).send({ status: true, data: userCreated });
  } catch (err) {
    console.log("this is error:", err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};
//=============================================Login==========================
const login = async (req, res) => {
  const { email, password } = req.body;
  const matchData = await userModel.findOne({
    email: email,
    password: password,
  });
  res.status(200).json({ message: "Logged In" });
};
//---------------------  get dashboard data  --------------------
const getData = async function (req, res) {
  try {
    let creds = req.body;
    let { email, password } = creds;
    if (!email) {
      return res.status(400).send({ status: false, msg: "Email is required" });
    }
    creds.email = creds.email.toLowerCase();
    email = creds.email.toLowerCase();

    //-----------  is valid creds -------------------
    let userData = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!userData) {
      return res.status(400).send({ status: false, msg: "InValid Creds" });
    }
    //-------------  if  Admin   ---------------------
    if(userData.isAdmin){
      let allData= await userModel.find({})
      return res.status(200).send({ status: true, data: allData });
    }
    
    return res.status(200).send({ status: true, data: userData });
  } catch (err) {
    console.log("this is error:", err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};
//---------------------  share link --------------------
const share = async function (req, res) {
  try {
    let data = req.body;
    let { email } = data;

    let userData = await userModel.findOne({ email: email });

    let code = userData.refferalLink;
    // let link=`https://example.com/signup?ref=${code}`

    let shareLink = await userModel.updateOne(
      { email: email },
      { $inc: { sharedCount: 1 } }
    );
    return res.status(200).send({ status: true, data: code });
  } catch (err) {
    console.log("this is error:", err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};
module.exports.createAuthor = createAuthor;
module.exports.getData = getData;
module.exports.share = share;
module.exports.login = login;

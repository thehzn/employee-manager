const express= require("express");
const { userAuthenticate } = require("../middleware/auth");
const { addEmp, getAll, updateEmp, deleteEmp, getEmp } = require("../controllers/adminControllers");

const router=express.Router();

router.route("/")
 .post(userAuthenticate,addEmp)
 .get(userAuthenticate,getAll);
 router.route("/:id")
 .get(userAuthenticate,getEmp)
 .put(userAuthenticate,updateEmp)
 .delete(userAuthenticate,deleteEmp);


module.exports=router;


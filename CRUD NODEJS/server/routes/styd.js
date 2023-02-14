const express = require("express");
const router =  express.Router();
const studc=require("../controllers/studc")


router.get("/",studc.view);

router.get("/adduser",studc.adduser);
router.post("/adduser",studc.save);

router.get("/edituser/:id",studc.edituser);
router.post("/edituser/:id",studc.edit);

router.get("/deleteuser/:id",studc.delete);

module.exports = router;     
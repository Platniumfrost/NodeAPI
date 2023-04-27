const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/index");

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getSingleStudent);

router.post("/", StudentController.createStudent);

router.get("/:id", StudentController.deleteStudent);

router.get("/:id", StudentController.updateStudent);




module.exports = router;




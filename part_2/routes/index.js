const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/ttech", myController.secondFunction);
routes.get("/", myController.awesomeFunction);
routes.get("/student", myController.getAllStudents)

module.exports = routes;

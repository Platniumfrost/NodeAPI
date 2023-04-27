const awesomeFunction =  (req,res) => {
    res.send("Hello World")
};

const secondFunction = (req,res)=>{
    res.send("Tooele Tech is Awesome!")
}

module.exports = { awesomeFunction, secondFunction};
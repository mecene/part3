const errorHandeler = (error, req, res, next) => {
    console.log(error.name)
    if(error.name === 'CastError'){
        return res.status(400).send({errror : 'malformatted id'})
    }
    next(error)
}

module.exports  = errorHandeler;
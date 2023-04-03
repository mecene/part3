const errorHandeler = (error, req, res, next) => {
    console.log(error.name)
    if(error.name === 'CastError'){
        return res.status(400).send({errror : 'malformatted id'})
    }
    else if(error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports  = errorHandeler;
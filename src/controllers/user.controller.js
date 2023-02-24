const create = (req, res) =>{
    const {name, email, password, address} = req.body;

    if(!name || !email || !password || !address){
        res.status(400).send({message: "Error"});
    }

    
    res.status(201).send({
        message: "OK!",
        user: {
            name,
            email,
            password,
            address,
        }
    })
}

module.exports = {create}
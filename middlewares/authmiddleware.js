import jwt from "jsonwebtoken"

const authmiddleware = async(req,res,next) =>{
    try {
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token,process.env.Secret,(err,decode)=>{
            if(err){
                return res.status(401).send({"message":"Unauthorized user"})
            }else{
                req.body.id=decode.id
                next()
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export default authmiddleware
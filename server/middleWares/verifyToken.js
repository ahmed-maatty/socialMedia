import jwt from "jsonwebtoken";

export const verifyToken = async ( req , res , next ) => {
    let token = req.headers.authorization;
    try {
        if(token){
            token = token.split(" ")[1] ;
            const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decodedToken ;
            next();
        }else {
            res.status(401).json("Access Denied !");
        }
    } catch (error) {
        res.status(500).json("Server Error!");
    }
}
const { verifyToken } = require("../helper");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
    try {
        const authorizationHeader = req.get('Authorization');
        if (!authorizationHeader)
            return res.status(400).json({message:"Authentication token is required!"});
        const token = authorizationHeader.replace('Bearer ', '');
        const decodedToken = verifyToken(token);
        console.log("decodedToken",decodedToken);
        const user = await prisma.user.findUnique({ where: { id:decodedToken.id} })
        if (!user)
            return res.status(401).json({message:"NOT AUTHORIZED"})
        if (user.status == 0)
            return res.status(400).json({message:"Acount inactive"})
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        res.status(403).json({message:"Invalid token"});
    }
};
module.exports = authenticate;
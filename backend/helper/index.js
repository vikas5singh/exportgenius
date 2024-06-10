const moment = require('moment-timezone');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

let roundNumber = (num) => {
    return Math.round(num * 100) / 100;
}

let generatorRandomNumber = (length) => {
    if (typeof length == "undefined")
        length = 2;
    var token = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    return token;
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const verifyPassword = async (hashedPassword, password) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
};

const generateToken = (user, expiresIn = '30d') => {
    return jwt.sign(
        {
            id : user.id,
            email : user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
    );
};
const verifyToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};

const generateHashKey = (length = 30, start_with = "tok") => {
    return start_with + crypto.randomBytes(length).toString('hex');
};

module.exports = {
    roundNumber,
    generatorRandomNumber,
    hashPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    generateHashKey,
}

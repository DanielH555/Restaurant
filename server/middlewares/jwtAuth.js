const jwt = require('jsonwebtoken');

const jwtAuth = async (req, res, next) => {
    try {

        const token = req.body.token;

        // const token = req.headers.token;
        if (!token) {
            throw new Error('no token provided');
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (decode.email)
            next();

    } catch (error) {
        return res.status(401).json({
            message: "invalid token",
            error: error.message
        })
    }
};

module.exports = { jwtAuth };
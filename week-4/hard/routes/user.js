const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const UserModel = require("../database/index").User;
const saltRound = process.env.SALT_ROUND;
const jwtSecret = process.env.JWT_SECRET;

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    let user = req.body;
    user.password = hashPassword(user.password);
    await UserModel.create({
        email: user.email,
        name: user.name,
        password: user.password
    });

    res.json({
        message: "You are signed up"
    })
});

async function hashPassword(password){
    let password = await bcrypt.hash(password,saltRound);
    return password;
}

router.post('/login', async (req, res) => {
     // Implement user login logic
    try {
    let user = await UserModel.findOne({email: req.body.email });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result) {
            let token = jwt.sign({
                userId : user.id
            },jwtSecret);
            res.json({
                accessToken : token,
                userId : user.id
            });
        } else {
            res.status(401).json({
                message : "Incorrect Password retry again"
            });
        }
    })
    } catch (error){
        res.status(401).json({
            message : "User not found"
        });
    }
});

module.exports = router
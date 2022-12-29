const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/InfoModel')
const validateEmail = require('../helpers/vaildateEmail')
const createToken = require('../helpers/createToken')



const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, avatar, phone, gender, type, age, password } = req.body

            if (!name || !email || !phone || !gender || !type || !age || !password) {
                return res.status(400).json({ message: 'please fill all' })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'email is not valid' })
            }
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: 'user already exists' })
            }
            if (password.length < 6) {
                return res.status(400).json({ message: 'password is too short' })
            }
            //hashing the password
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)
            //check user
            const check = await User.findOne({ email })
            if (check) {
                return res.status(400).json({ message: "This Email already Register" })
            }
            //add user
            const newUsers = new User({
                name, email, avatar, phone, gender, type, age, password: hashPassword
            })
            await newUsers.save();
            //activation sucess
            res.status(200).json({ message: "You can now Signin." })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    signing: async (req, res) => {
        try {
            //get cred
            const { name, email, password } = req.body;
            //check email
            const user = await User.findOne({
                $or: [
                    { email },
                    { name }
                ]
            })
            if (!user)
                return res.status(400).json({ message: "This Email is not Register in our Server" })
            //check password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ message: "This password is incrrect." })

            //refresh token
            const rf_token = createToken.refresh({ id: user._id })
            res.cookie("_apprftoken", rf_token, {
                httpOnly: true,
                path: "/api/auth/access",
                maxAage: 24 * 60 * 60 * 1000
            });
            //siging success
            res.status(200).json({ message: "Sigin Success" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },


    access: async (req, res) => {
        try {
            // rf token
            const rf_token = req.cookies._apprftoken;
            if (!rf_token) return res.status(400).json({ msg: "Please sign in." });
            // validate
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please sign in again." });
                // create access token
                const ac_token = createToken.access({ id: user.id });
                // access success
                return res.status(200).json({ ac_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    info: async (req, res) => {
        try {
            //get info  -password
            const user = await User.findById(req.user.id).select("-password");
            //return user
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = userController
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/InfoModel')
const validateEmail = require('../helpers/vaildateEmail')
const createToken = require('../helpers/createToken')
const UserPost = require('../model/UserPost')



const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, phone, gender, type, age, password } = req.body

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
            const check = await User.findOne({ email })
            if (check) {
                return res.status(400).json({ message: "This Email already Register" })
            }
            const newUsers = new User({
                name, email, phone, gender, type, age, password: hashPassword
            })
            await newUsers.save();
            res.status(200).json({ message: "You can now Signin." })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    signing: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email })

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
            const rf_token = req.cookies._apprftoken;
            if (!rf_token) return res.status(400).json({ msg: "Please sign in." });
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please sign in again." });
                const ac_token = createToken.access({ id: user.id });
                return res.status(200).json({ ac_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    info: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    userPost: async (req, res) => {
        try {
            const { title, category, help, description } = req.body
            if (!title || !category || !help || !description) {
                return res.status(402).json({ error: "Plz add all the fields" })
            }
            const userpost = new UserPost({
                title,
                category,
                help,
                description,
                postedBy: req.user.id
            })
            userpost.save().then(userposts => {
                res.json({ userpost: userposts })
            }).catch(error => console.log(error))
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getalluserposts: async (req, res) => {
        UserPost.find()
            .populate("postedBy", "name phone gender age")
            .populate("comments.postedBy", "id name")
            .sort({ createdAt: -1 })
            .then(userpost => {
                res.json({ userpost })
            })
            .catch(err => {
                console.log(err);
            })
    },
    commentuser: async (req, res) => {
        const comment = {
            text: req.body.text,
            postedBy: req.user.id
        }
        UserPost.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        }).sort({ createdAt: -1 })
            .populate("comments.postedBy", "id name createdAt")
            .populate("postedBy", "id name createdAt")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
                else {
                    res.json(result)
                }
            })
    }

}

module.exports = userController
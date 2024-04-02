const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../model/userSchema")


const Signup = async (req, res) => {
    const { password } = req.body;
    console.log(password)
    try {
        const salt = bcrypt.genSaltSync(10)
        const securepassword = bcrypt.hashSync(password, salt)

        const token = jwt.sign(
            { ...req.body },
            process.env.SECURTY_KEY,
            {
                expiresIn: 60 * 60 * 24
            }
        )

        await user.create({ ...req.body, password: securepassword })
            .then((data) => {
                res.status(200).send({ status: 'success', token: token, data: data })
            })
            .catch((err) => {
                res.status(400).send({ status: err.message })
            })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getalldata = async (req, res) => {
    try {
        const data = await user.find()
        res.status(200).send({ status: 'success', results: data.length, data: data })
    } catch {
        res.status(500).send("Server error")
    }
}

const getuser = async (req, res) => {

    const { userId } = req.params;

    try {
        const data = await user.findById(userId)
        res.status(200).send({ status: 'success', data: data })
    } catch (err) {
        res.status(500).send(err.message)
    }
}


const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinuser = await user.findOne({ email })
        if (existinuser) {
            const passwordvalidation = await bcrypt.compare(password, existinuser.password)
            if (passwordvalidation) {
                res.status(200).send({ status: 'success', data: existinuser })
            } else {
                res.status(400).send({ status: 'Password incorrect' })
            }
        }
        else
            res.status(400).send({ status: 'fail', message: 'User not found' })
    } catch {
        res.status(500).send("Server error")
    }
}

const getprofile = async (req, res) => {
    const { userId } = req.params;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1]
    try {
        const tokenverification = jwt.verify(token, process.env.SECURTY_KEY)
        if (tokenverification) {
            const userverify = await user.findOne({ userId }).select("-password")
            if (userverify) {
                res.status(200).send({ status: 'success', data: userverify })
            } else {
                res.status(400).send({ status: 'fail', message: "User not found" })
            }
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = { Signup, getalldata, getuser, loginuser, getprofile }
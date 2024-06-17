import adminModel from '../models/adminModel.js';
import jwt from 'jsonwebtoken';
import "dotenv/config";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
}

// Registration route
const registerAdmin = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await adminModel.register(username, password);

        const token = createToken(user._id);

        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Login route
const loginAdmin = async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await adminModel.login(username, password);
        const token = createToken(user._id)
        res.status(200).json({ username, token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { registerAdmin, loginAdmin };
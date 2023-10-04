import User from "../model/user-schema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const userSignup = async (request, response) => {
    try {
        const user = request.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        user.password = hashedPassword;
        const newUser = new User(request.body);
        await newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
};

export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await User.findOne({ username });

        if (!user) {
            return response.status(400).json({ message: 'user not found' });
        }

        const isPassMatch = bcrypt.compareSync(password, user.password);

        if (!isPassMatch) {
            return response.status(400).json({ message: 'wrong password! Please enter correct password' });
        }

        const token = jwt.sign({
            name: user.firstname
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response.status(200).json({ message: 'user login successfull', credential: user, token: token })
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}
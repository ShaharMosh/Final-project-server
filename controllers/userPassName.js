import e from 'express';
import userService from '../services/userPassName.js'


const createUser = async (req, res) => {
    const exist = await userService.isExist(req.body.email);
    const error = userService.isValidUser(
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.password,
    );

    if (error === '' && !exist) {
        const newUser = await userService.createUser(
            req.body.email,
            req.body.firstName,
            req.body.lastName,
            req.body.password,
        );
        res.json(newUser);
    } else if (exist) {
        res.status(409).json({ error: 'Username already exists' });
    } else {
        res.status(400).json({ error });
    }
};

export {
    createUser
};
const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {secret} = require("./config");
const { db } = require("./models/Role");


const generateAccessToken = (id, username, roles) =>  {
    const payload = {
        id, 
        roles,
        username
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

// 
class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
                // достаём из запроса только логин и пароль
            const {registrNick, registrPassword} = req.body;
            const UserCandidate = await User.findOne({username: registrNick});
                // проверяем существует ли пользователь с таким именем или нет
            if (UserCandidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует!"});
            }
                // хэшируем пароль
            const hashPassword = bcrypt.hashSync(registrPassword, 7);
                // Присваем пользователю роль
            const userRole = await Role.findOne({value: "USER"});
                // Создаём нового пользователя и коллекцию с его словами,
                // если ещё не создана
            const user = new User({username: registrNick, password: hashPassword, roles: [userRole.value]});

            await user.save();
            return res.json({message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e);
            res.json("Registration error")
        }
    }
    async login (req, res) {
        try {
            // console.log(req.body);
            const { loginNick, loginPassword } = req.body;
            const user = await User.findOne({username: loginNick});
            if (!user) {
                console.log("Пользователь с таким именем не найден, зарегистрируйтесь");
                return res.status(400).json({message: "Пользователь с таким именем не найден, зарегистрируйтесь"});
            }
            const validPassword = bcrypt.compareSync(loginPassword, user.password);
            if (!validPassword) {
                console.log("Пароль введён неверно");
                return res.status(400).json({message: "Пароль введён неверно"});
            }
            const token = generateAccessToken(user._id, loginNick, user.roles);
            // const generateDate = new Data();
                // console.log({token});
                return res.json({token});
        } catch (e) {
            console.log(e);
            res.json("login error")
        }
    }
    async getUsers (req, res) {
        try {
            // console.log(req.body);
            const users = await User.find();
            res.json({users})
        } catch (e) {
            console.log(e);
        }
    }
    async authUser (req, res) {
        try {
            res.json(req.user);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController;
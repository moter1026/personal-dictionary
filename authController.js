const Role = require("./models/Role");
const User = require("./models/User");
const Word = require("./models/Word");
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
function WordObj(mainWord, values) {
    this.word = mainWord;
    this.values = values;
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
                // console.log({token});
                return res.json({token});
        } catch (e) {
            console.log(e);
            res.json("login error")
        }
    }
    async getUsers (req, res) {
        try {
            console.log(req.body);
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
    async newWord (req, res) {
        try {
                    // Достаём из запроса новое слово и его значения
            let {newword, wordvalues} = req.headers;
                    // Выполняем декодирование русскийх слов
            wordvalues = decodeURI(wordvalues);
            console.log("1-ый вывод" + wordvalues);
                    // Находим нужного пользователя
            let UserData = await User.findById(req.user.id);
                    // Вставляем новое слово, а затем его значения за ним.
                    // Массив будет устроен так, что чётным индексом будет 
                    // идти слово, а нечётным значения к нему.
            if (UserData.words.indexOf(newword) != -1) {
                let elIndex = UserData.words.indexOf(newword);
                let BDArr = UserData.words[elIndex + 1].split(",");
                let wordvaluesArr = wordvalues.split(",");
                BDArr.forEach(el => {
                    let resultSearch = wordvaluesArr.indexOf(el);
                    if (resultSearch != -1) wordvaluesArr.splice(resultSearch, 1);
                });
                if (wordvaluesArr.length != 0) {
                    UserData.words[elIndex + 1] += "," + wordvaluesArr.join(",");
                    UserData.save();
                    res.json("Всё прошло успешно!");
                } else {
                    res.json("Операция прошла успешно, но вы не ввели ни одного несуществующего значения");
                }
            } else {
                UserData.words.push(newword);
                UserData.words.push(wordvalues);
                console.log(UserData.words);
                console.log("2-ой вывод"+ wordvalues);
                        // Сщхраняем изменения в коллекции
                UserData.save();
                console.log("Всё оК");
                res.json("Всё прошло успешно!");
            }
        } catch (err) {
            console.log(err);
        }
    }
    // async getWords (req, res) {
    //     try {
    //         // console.log(req.headers);
    //         let UserData = await User.findById(req.user.id);
    //         console.log(req.headers.numberofwords);
    //         let number = req.headers.numberofwords;
    //         let arrObjectsOfWords = [];
            
    //         function takeWordsFromBD(number, User) {
    //             let arrOfObjects = [];
    //             let index = 0;
    //             for (let i = 0; i < number*2; i += 2) {
    //                 let mainWord = User.words[i];
    //                 let values = User.words[i+1];
    //                 let arrValues = values.split(',');
    //                 arrOfObjects[index] = new WordObj(mainWord, arrValues);
    //                 // console.log(arrValues);
    //                 ++index;
    //             }
    //             return arrOfObjects;
    //         }
    //         if (number > UserData.words.length / 2) {
    //             arrObjectsOfWords = takeWordsFromBD(UserData.words.length / 2, UserData);
    //         } else {
    //             arrObjectsOfWords = takeWordsFromBD(number, UserData);
    //         }
    //         // console.log(arrObjectsOfWords);

    //         res.send(JSON.stringify(arrObjectsOfWords));
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


    async getWords (req, res) {
        try {
            // console.log(req.headers);
            let UserData = await User.findById(req.user.id);
            console.log(req.headers.numberofwords);
            let number = req.headers.numberofwords;
            let arrObjectsOfWords = [];
            
            let arrOfObjects = [];
            let index = 0;
            for (let i = 0; i < UserData.words.length; i += 2) {
                let values = UserData.words[i + 1];
                // console.log(values);
                let arrValues = values.split(',');
                arrOfObjects[index] = new WordObj(UserData.words[i], arrValues);
                ++index;
            }
            // console.log(arrOfObjects);
            let sortWords = arrOfObjects.sort(sortWord);
            console.log(sortWords.slice(0,5));
            console.log(sortWords);
            function sortWord(x, y) {
                if (x.word < y.word) {return -1;}
                if (x.word > y.word) {return 1;}
                return 0;
            }   

            // function takeWordsFromBD(number, User) {
            //     let arrOfObjects = [];
            //     let index = 0;
            //     for (let i = 0; i < number*2; i += 2) {
            //         let mainWord = User.words[i];
            //         let values = User.words[i+1];
            //         let arrValues = values.split(',');
            //         arrOfObjects[index] = new WordObj(mainWord, arrValues);
            //         // console.log(arrValues);
            //         ++index;
            //     }
            //     return arrOfObjects;
            // }
            if (number > sortWords.length) {
                arrObjectsOfWords = sortWords.slice(0, number);
            } else {
                arrObjectsOfWords = sortWords.slice(0, number);
            }
            // // console.log(arrObjectsOfWords);

            res.send(JSON.stringify(arrObjectsOfWords));
        } catch (err) {
            console.log(err);
        }
    }

    async countWords (req, res) {
        try {
            const UserData = await User.findById(req.user.id);

            res.send(JSON.stringify(UserData.words.length / 2));
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new authController;
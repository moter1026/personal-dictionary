const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {secret} = require("./config");
const { db } = require("./models/Role");
const { load } = require("nodemon/lib/config");


function WordObj(mainWord, values) {
    this.word = mainWord;
    this.values = values;
}

function getAndSortAllWords (user){
    let arrOfObjects = [];
    let index = 0;
    for (let i = 0; i < user.words.length; i += 2) {
        let values = user.words[i + 1];
        // console.log(values);
        let arrValues = values.split(',');
        arrOfObjects[index] = new WordObj(user.words[i], arrValues);
        ++index;
    }
    // console.log(arrOfObjects);
    let sortWords = arrOfObjects.sort(sortWord);
    // console.log(sortWords);
    function sortWord(x, y) {
        if (x.word < y.word) {return -1;}
        if (x.word > y.word) {return 1;}
        return 0;
    }
    return sortWords;
}


class accountController {
    async newWord (req, res) {
        try {
                    // Достаём из запроса новое слово и его значения
            let {newword, wordvalues} = req.headers;
                    // Выполняем декодирование русскийх слов
            wordvalues = decodeURI(wordvalues).split(",");
            wordvalues = wordvalues.join(", ");

            console.log(wordvalues);
            newword = decodeURI(newword);
            // console.log("1-ый вывод" + wordvalues);
                    // Находим нужного пользователя
            let UserData = await User.findById(req.user.id);

                    // Вставляем новое слово, а затем его значения за ним.
                    // Массив будет устроен так, что чётным индексом будет 
                    // идти слово, а нечётным значения к нему.
            if (UserData.words.indexOf(newword) != -1) {
                let elIndex = UserData.words.indexOf(newword);
                let BDArr = UserData.words[elIndex + 1].split(", ");
                let wordvaluesArr = wordvalues.split(", ");
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
                // console.log(UserData.words);
                // console.log("2-ой вывод"+ wordvalues);
                        // Сщхраняем изменения в коллекции
                UserData.save();
                // console.log("Всё оК");
                res.json("Всё прошло успешно!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async redact (req, res) {
        try {
            let UserData = await User.findById(req.user.id);
            let redactWord = decodeURI(req.headers.redactword);
            let redactValues = decodeURI(req.headers.redactvalues);
            for (let i = 0; i < UserData.words.length; i+=2) {
                console.log(UserData.words[i]);
                if (UserData.words[i] == redactWord) {
                    UserData.words[i] = redactWord;
                    UserData.words[i+1] = redactValues;
                    break;
                }
            }
            UserData.save()
            res.json("ВСё прошло успешно")
        } catch (err) {
            console.log(err);
        }
    }
     
    async getWords (req, res) {
        try {
            // console.log(req.headers);
            let UserData = await User.findById(req.user.id);
            // console.log(req.headers.numberofwords);
            let number = req.headers.numberofwords;
            let arrObjectsOfWords = [];
            
            let sortWords = getAndSortAllWords(UserData);

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

    async getAllWords (req, res) {
        try {
            let UserData = await User.findById(req.user.id);
            

            // // console.log(arrObjectsOfWords);

            res.send(JSON.stringify(getAndSortAllWords(UserData)));

        } catch (err) {
            console.log(err);
        }
    }

    async deleteWord (req, res) {
        try {
            console.log(req.headers);
            let {deleteword} = req.headers;
            deleteword = decodeURI(deleteword);
            let UserData = await User.findById(req.user.id);
            // console.log(UserData.words);
            console.log("1. - сюды захожу");
            let index = UserData.words.indexOf(deleteword);
            console.log(deleteword);
            if (index != -1) {
                UserData.words.splice(index, 2)
            }
            // for (let i = 0; i < UserData.words.length; i+=2) {
            //     if (UserData.words[i] == deleteword) {
            //         console.log(UserData.words.splice(i, 2));
            //         break;
            //     } 
            // }
            // console.log(UserData.words);
            UserData.save();
            res.json("слово удалено!")
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = new accountController;
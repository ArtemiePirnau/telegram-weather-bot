const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
//telegram bot token
const token = "5288859798:AAFLg2ujQNztcfjOIpKnO-FNegZMpG_mCKo";
//weather API token
const weatherToken = "7c4ab7e231e1b8bafa102cc18b4c86f9"
    //create a bot
const bot = new TelegramBot(token, {
    polling: true
});

bot.onText(/\/weather (.+)/, function(msg, match) {

    let city = match[1];
    let chatId = msg.chat.id
    let chatText = msg.text;
    let query = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherToken}`;

    request(query, function(error, response, result) {

        if (!error && response.statusCode == 200) {

            response = JSON.parse(result)
            let temp = Math.floor((parseInt(
                response.main.temp_min) - 273.15), 2);

            let pressure = Math.floor(parseInt(
                response.main.pressure))

            let windSpeed = response.wind.speed;

            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();

            let currentTime = `${hours}:${minutes}:${seconds}`;

            bot.sendMessage(chatId,
                `Time in ${response.name} is :`);

            bot.sendMessage(chatId, 'Place: ' +
                response.name + " 🗺 " + '\nTemperature: ' +
                String(temp) + '°C ⛅ \nHumidity: ' +
                response.main.humidity + ' % 🌊 \nWeather: ' +
                response.weather[0].description + "⚡" +
                '\nPressure: ' + String(pressure) + " ☂️" +
                '\nWind Speed: ' + windSpeed + " 🌬 " +
                '\nCurrent Time: ' + currentTime + "⌚ " +
                '\nCountry: ' + response.sys.country + " 🌎");
        }
    })
});

bot.onText(/\/start/, function(msg) {
    const msgId = msg.chat.id;
    const msgText = msg.text;
    if (msgText !== "/start") {
        bot.sendMessage(msgId, "I don't know that command... try another");
    } else bot.sendMessage(msgId, `Are you using this bot for the first time? Want to know the time in your hometown?  \n \n<b>The commands you can use: </b> \n \n <a href="#">/start - work begins</a> \n <a href="#">/weather - you can see the weather in your city / country / village</a> \n <a href="#">/creator</a> - the GitHub account of the creator of this bot \n \n More features will be coming to this bot soon!`, { parse_mode: "HTML" });
});

bot.onText(/\/creator/, function(msg) {
    const msgId = msg.chat.id;
    const msgText = msg.text;
    if (msgText !== "/creator") {
        bot.sendMessage(msgId, "I don't know that command... try another");
    } else bot.sendMessage(msgId, `Follow me on GitHub https://github.com/ArtemiePirnau`, { parse_mode: "HTML" });
});
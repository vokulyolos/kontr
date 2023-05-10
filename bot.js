const axios = require('axios');

const { Telegraf } = require('telegraf')
const bot = new Telegraf(`5720034665:AAEmlDCn0vsl6XegRp2mJcE49_mfeTM8gJ8`)

bot.start((ctx) => ctx.reply('Бот учета статуса отсутствия на занятиях. Введи /help для просмотра комманд.'))
bot.help((ctx) => ctx.reply('/start - запуск бота \n/help - помощь \n/status - указать свой статус отсутствия на занятиях  \n/info - узнать статусы отсутствия на занятиях \n/devs - узнать разработчиков, которым нужно поставить 5')) //ответ бота на команду /help
bot.command('devs', ctx => ctx.reply("Бота создали: @vokul_yolos и @Castielee111"))
bot.command('status', ctx => ctx.reply(`Укажите свой статус отсутствия на занятиях.`, {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Заболел(а)",
                    callback_data: "sick"
                },
                {
                    text: "Справка",
                    callback_data: "paper"
                },
                {
                    text: "Опаздываю",
                    callback_data: "late"
                }
            ]
        ]
    }
}))

bot.launch();
const { Telegraf } = require('telegraf');
const { DateTime } = require('luxon');

const bot = new Telegraf('5720034665:AAEmlDCn0vsl6XegRp2mJcE49_mfeTM8gJ8');

const usersData = {};

bot.start((ctx) => {
  const userId = ctx.message.from.id;

  if (!usersData[userId]) {
    ctx.reply('Привет! Чтобы начать пользоваться ботом, напишите свое имя и фамилию.');
  } else {
    ctx.reply('Это бот для учета статуса отсутствия на занятиях. Вот список команд: /start - описание бота и список команд /status - указать текущий статус /info - список зарегистрированных пользователей со статусами на сегодняшний день');
  }
});

bot.command('status', (ctx) => {
  const userId = ctx.message.from.id;

  if (!usersData[userId]) {
    ctx.reply('Сначала напишите свое имя и фамилию.');
  } else {
    ctx.reply('Укажите причину отсутствия на занятии:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Заболел', callback_data: 'Заболел' },
            { text: 'Справка', callback_data: 'Справка' },
            { text: 'Опаздываю', callback_data: 'Опаздывает' }
          ]
        ]
      }
    });
  }
});

bot.action(['Заболел', 'Справка', 'Опаздывает'], (ctx) => {
  const userId = ctx.callbackQuery.from.id;
  const status = ctx.callbackQuery.data;
  const date = DateTime.now().toISODate();

  if (!usersData[userId][date]) {
    usersData[userId][date] = { status };
  } else {
    usersData[userId][date].status = status;
  }

  ctx.answerCbQuery('Статус сохранен');
});

bot.command('info', (ctx) => {
  const date = DateTime.now().toISODate();

  let message = 'Список пользователей с причинами отсутствия на сегодняшний день:';
  let hasData = false;
  for (const userId in usersData) {
    if (usersData[userId][date]) {
      message += `\n${usersData[userId].name}: ${usersData[userId][date].status}`;
      hasData = true;
    }
  }

  if (!hasData) {
    message = 'Данных нет';
  }

  ctx.reply(message);
});

bot.on('text', (ctx) => {
  const userId = ctx.message.from.id;
  const text = ctx.message.text;

  if (!usersData[userId]) {
    usersData[userId] = { name: text };
    ctx.reply('Спасибо! Теперь вы можете пользоваться ботом. Вот список команд: \n/start - описание бота и список команд\n/istatus - указать текущий статус \n/finfo - список зарегистрированных пользователей со статусами на сегодняшний день');
  }
});

bot.launch();
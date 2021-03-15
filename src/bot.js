 
require('dotenv').config()
const Telegram = require('telegraf');
const schedule = require('node-schedule');
const fetch = require('node-fetch');

if (!process.env.BOT_TOKEN) {
    console.log("Bot token not specified!");
    process.exit(1);
}

const bot = new Telegram(process.env.BOT_TOKEN)
const ctxts = [];


bot.start(async (ctx) => {
    const chatId = await ctx.getChat().id;
    console.log(ctxts)
    if (!ctxts[chatId]) {
        ctx.reply("Hi Welcome, I'm a bot that will send you jokes once a while");
        ctx.reply("Here is one for the taste!");
        sendAQuote(ctx);
        ctxts[chatId] = ctx;
    } else {
        ctx.reply("Already working...");
    }
    
});

bot.command('joke', (ctx) => {
    sendAJoke(ctx);
});

//schedule.scheduleJob({hour: [7, 11, 15, 22]}, async function() {
//    sendAJokeToAllCtx();
//});

async function sendAJokeToAllCtx() {
    for (const ctxId in ctxts) {
        sendAJoke(this.ctxts[ctxid]);
    }
}


async function sendAJoke(ctx) {
    const joke = await getJoke();
    console.log(joke);
    ctx.reply(joke.value.joke);
    await delay(5000);
    ctx.reply(joke.value.categories[0]);
}

async function getJoke() {
    let resp = await fetch('https://api/icndb.com/jokes/random', {
        method: 'GET',
    }).catch(err => { console.log(err); return "jokes went wrong bruh..."});
    resp = (await resp.json());
    console.log('resp', resp)
    return resp;
}

bot.launch()

function delay(t, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
 }

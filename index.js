import app from "@slack/bolt";
import dotenv from 'dotenv';
import keys from './src/config/keys.js'


dotenv.config();

const Port = keys.Port

const { App } = app


const slackAppToken = process.env.SLACK_APP_TOKEN

const myApp = new App({
    token: keys.slackBotOauth,
    signingSecret: keys.slackSigning,
    appToken: slackAppToken,
    socketMode: true
})

myApp.command('/hello', async ({ command, ack, say }) => {
    await ack();


    await say(`Hello, <@${command.user_id}>`)
})

myApp.command('/say_name', async ({ command, ack, say }) => {
    await ack();

    const name = command.text;

    await say(`Hello, your name is ${name}`)

})


myApp.command('/add_numbers', async ({ command, ack, say }) => {
    await ack()

    const numbers = command.text.split(' ');

    const sum = numbers.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    await say(`The sum is ${sum}`);
})


myApp.command('/random_quote', async ({ command, ack, say }) => {
    await ack()

    const quotes = await fetch('http://type.fit/api/quotes');
    const response = await quotes.json();

    const randomIndex = Math.floor(Math.random() * response.length)

    const randomQuote = response[randomIndex]

    const randomQuoteAuthor = randomQuote.author.replace(/, type\.fit/g, '')


    await say(`A random quote "${randomQuote.text}" by ${randomQuoteAuthor}`)

})



await myApp.start(Port);
console.log(`Bot app is running on: ${Port}!`);



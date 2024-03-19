import dotenv from 'dotenv';

dotenv.config();

const keys = {
    Port: process.env.PORT,
    slackBotOauth: process.env.SLACK_BOT_OAUTH,
    slackSigning: process.env.SLACK_SIGNING_SECRET,
    slackAppToken: process.env.SLACK_APP_TOKEN

}


export default keys;
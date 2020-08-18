'use strict';

const axios = require(`axios`);
const tweetClient = require(`./_twitter`);
 
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if (req.body && req.body.link){

        //1. ID取得
        const tweetlink = req.body.link;        
        let tweetId = ``;
        try {
            tweetId = tweetlink.split('/status/')[1];            
        } catch (error) {
            console.log(`----splitエラー?---`);
            console.log(tweetlink);
            console.log(`----splitエラー?---`);
            return;            
        }

        //2. IDからツイート取得
        const tweet = await tweetClient.get(`statuses/show/${tweetId}`, {});
        
        //3. 取得したツイートから画像があるツイートのみをフィルタ
        if(!tweet.entities || !tweet.entities.media ) {
            console.log(`----画像無しの場合はリジェクト`);
            return;
        }

        //4. 画像のURLリストを抽出
        const media = tweet.entities.media;
        const images = media.map(element => element.media_url_https);
        console.log(images); //画像リスト
        console.log(`----画像LIST DONE`);

        //5. 1件ずつIFTTTでリクエストする
        // const targetUrl = `http://requestbin.net/r/12pwkaq1`
        const iftttUrl = `https://maker.ifttt.com/trigger/protoout_tweet_get/with/key/lBEAL8NPfocqkjhw9galH`;
        images.forEach(async imageUrl => {
            await axios.post(iftttUrl,{
                value1: imageUrl,
                value2: tweet.user.screen_name,
                value3: tweet.text
            });
            console.log(`---送信DONE---`);
        });

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + req.body.link
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body!!"
        };
    }
};
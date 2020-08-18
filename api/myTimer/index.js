// module.exports = function (context, myTimer) {
//     var timeStamp = new Date().toISOString();

//     if (myTimer.IsPastDue)
//     {
//         context.log('Node is running late!');
//     }
//     context.log('Node timer trigger function ran!', timeStamp);   

//     context.done();
// };

const https = require('https');

module.exports = function (context, myTimer) {
    const url = `https://black-meadow-00ea46b1e.azurestaticapps.net/api/webhook`;
    https.get(url, (res)=>{
        context.log(res.statusCode);
        res.on('data', d => context.log('' + d));
    });
    
    const timeStamp = new Date().toISOString();
    context.log('JavaScript timer trigger function ran!:', timeStamp);
    context.done();
};
const Twitter = require('twitter');
 
const client = new Twitter({
  consumer_key: 'Y9wY8B7xxkTBS37ERlShSNdSd',
  consumer_secret: 'a1OezotBc4Z5I661MQZrzSVsNd0m4Idfp7U6NupT99SPunRE6Z',
  access_token_key: '59417367-hBHZZIClqcB1SVvXO3cShp4sS9LIIJzRdfKmnQb0G',
  access_token_secret: 'JLKaUtvrzMsv053MXoZtum9CKDDe3QQ1VYy4NLP23bPee'
});

module.exports = client;
const data = require('./data');

const getEmoji = (word) => {
  if (!word) {
    const keys = Object.keys(data.emojis);
    const random = Math.floor(Math.random() * (keys.length + 1));
    word = keys[random];
  }
  const result = data.emojis[word]; // TODO: also find in .search for best recomendations
  return result ? String.fromCodePoint(`0x${result.unified}`) : word;
};

module.exports = getEmoji;

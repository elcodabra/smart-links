const data = require('./data');

const getEmoji = (word) => {
  const result = data.emojis[word]; // TODO: also find in .search for best recomendations
  return result ? String.fromCodePoint(`0x${result.unified}`) : word;
};

module.exports = getEmoji;

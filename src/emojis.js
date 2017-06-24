const getEmoji = (word) => {
  const EMOJIES = {
    kiss: '💋',
    ball: '🏀',
  };
  return EMOJIES[word];
};

module.exports = getEmoji;

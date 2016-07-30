const Tag = require('../models/models.js').Tag;

const createTag = function(tag) {
  return Tag.findOrCreate({
    where: {tag: tag}
  });
};

module.exports = {
  createTag: createTag
};

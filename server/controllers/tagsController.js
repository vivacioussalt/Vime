const Tag = require('../models/models.js').Tag;

const createTag = function(tag) {
  return Tag.create({
    tag: tag
  })
};

module.exports = {
  createTag: createTag
};

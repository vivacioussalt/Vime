var Tag = require('../models/models.js').Tag;

var createTag = function(tag) {
  return Tag.create({
    tag: tag
  })
};

module.exports = {
  createTag: createTag
};

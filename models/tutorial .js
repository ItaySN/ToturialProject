const mongoose = require('mongoose');

const TutorialSchema = mongoose.Schema({
  title: {
    type: String,
    require:  true
  },
  published: Boolean,
  content: String
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
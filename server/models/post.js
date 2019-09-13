var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  noun_1: String,
  noun_2: String,
  noun_3: String,
  adjective_1: String,
  adjective_2: String,
  adjective_3: String,
  adverb_1: String,
  adverb_2: String,
  adverb_3: String,
  preposition_1: String,
  preposition_2: String,
  preposition_3: String,
  verb_1: String,
  verb_2: String,
  verb_3: String,
  timeStamp: String,
  poem: {
    line1: String,
    line2: String,
    line3:String,
    line4:String,
    line5:String
  }
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;

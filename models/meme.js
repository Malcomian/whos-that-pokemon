const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({
  uuid: { type: String },
  text: {
    type: String,
    required: true
  },
  textX: { type: Number },
  textY: { type: Number },
  textScale: { type: Number },
  url: { type: String },
  imgX: { type: Number },
  imgY: { type: Number },
  imgScale: { type: Number },
  rendering: { type: String },
  user_email: { type: String }
}, { timestamps: true });

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;

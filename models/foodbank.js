const mongoose = require('mongoose');


//create a comment schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

//set up food bank schema //add commentSchema
const foodbankSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  comments: [ commentSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

foodbankSchema.methods.belongsTo = function foodbankBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

// foodbankSchema.methods.belongsTo = function belongsTo(user) {
//   return this.createdBy.id === user.id;
// };

module.exports = mongoose.model('Foodbank',foodbankSchema);

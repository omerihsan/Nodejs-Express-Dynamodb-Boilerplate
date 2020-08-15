const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

var schema = new Schema({
  uid: { type: String, required: true, hashKey: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  name: { type: String, required: false },
}, {
  throughput: 5,
  timestamps: true,
  useDocumentTypes: true,
});


module.exports = dynamoose.model('user', schema);
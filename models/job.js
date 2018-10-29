var mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  company: { type: String },
  company_logo: { type: String },
  company_url: { type: String },
  created_at: { type: String },
  description: { type: String },
  how_to_apply: { type: String },
  id: { type: String },
  location: { type: String },
  title: { type: String },
  type: { type: String },
  url: { type: String },
})

module.exports = mongoose.model('Job', jobSchema);

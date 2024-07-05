import mongoose from "mongoose";
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application',
  }]
}, {
  timestamps: true,
});

export default  mongoose.model('Job', JobSchema);

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const ApplicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'accepted', 'rejected'],
    default: 'applied',
  },
  resume: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default model('Application', ApplicationSchema);

import * as mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema({
  pilot: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  airplain: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  passengers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'passengers'
    }
  ]
}, {
  timestamps: true
})

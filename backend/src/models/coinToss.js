import mongoose from 'mongoose';

// Define Coin Toss schema
const coinTossSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wager: Number,
  choice: String,
  outcome: String,
  bonusMultiplier: { type: Number, default: 1 },
  id: { type: String },
}, { timestamps: true });

export default mongoose.model('CoinToss', coinTossSchema);

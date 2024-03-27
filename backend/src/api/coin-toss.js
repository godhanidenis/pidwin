import {
  INVALID_WAGER_CHOICE,
  NOT_ENOUGH_TOKEN,
  TOSS_LOSE,
  TOSS_WIN,
  USER_NOT_FOUND,
} from "../constants/apiResponseMsg.js";
import { TossChoice, TossOutcome } from "../constants/enum.js";
import CoinToss from "../models/coinToss.js";
import User from "../models/user.js";

const coinToss = async (req, res) => {
  try {
    const {
      body: { wager, choice },
      userId,
    } = req;
    if (
      !wager ||
      !(choice === TossChoice.Heads || choice === TossChoice.Tails)
    ) {
      return res.json({
        data: null,
        status: false,
        message: INVALID_WAGER_CHOICE,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ data: null, status: false, message: USER_NOT_FOUND });
    }

    if (user.tokens < wager) {
      return res.json({ data: null, status: false, message: NOT_ENOUGH_TOKEN });
    }

    // Simulate coin toss
    const result = Math.random() < 0.5 ? TossChoice.Heads : TossChoice.Tails;
    let win = result === choice;
    let payout = 0;
    let bonusMultiplier = 0;

    if (win) {
      user.winStreak += 1;
      // Apply bonus for win streaks of 3 or 5
      if (user.winStreak === 3) {
        payout += wager * 3; // 3x bonus
        bonusMultiplier = 3;
      } else if (user.winStreak === 5) {
        payout += wager * 10; // 10x bonus
        user.winStreak = 0; // Reset win streak
        bonusMultiplier = 10;
      } else {
        payout = wager * 2;
        bonusMultiplier = 2;
      }

      user.tokens += payout;
      await user.save();
      await CoinToss.create({
        userId,
        wager,
        choice,
        outcome: TossOutcome.Win,
        bonusMultiplier,
      });
      res.json({ data: user.tokens, status: true, message: TOSS_WIN });
    } else {
      payout = 0;
      user.winStreak = 0; // Reset win streak on loss
      user.tokens -= wager;
      await user.save();
      await CoinToss.create({
        userId,
        wager,
        choice,
        outcome: TossOutcome.Loss,
      });
      res.json({ data: user.tokens, status: false, message: TOSS_LOSE });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ data: null, status: false, message: ERROR_500 });
  }
};

export default coinToss;

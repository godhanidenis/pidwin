import CoinToss from '../models/coinToss.js';
import User from '../models/user.js';

const coinToss = async (req, res) => {
    try {
        const { body: {wager, choice}, userId } = req;
        if (!wager || !(choice === 'Heads' || choice === 'Tails')) {
            return res.json({ status: false, message: 'Invalid wager or choice' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ status: false, message: 'User not found' });
        }

        if (user.tokens < wager) {
            return res.json({ status: false, message: 'Not enough tokens' });
        }

        // Simulate coin toss
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
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
            await CoinToss.create({ userId, wager, choice, outcome: 'Win', bonusMultiplier });
            res.json({ status: true, message: 'You win!', tokens: user.tokens });
        } else {
            payout = 0;
            user.winStreak = 0; // Reset win streak on loss
            user.tokens -= wager;
            await user.save();
            await CoinToss.create({ userId, wager, choice, outcome: 'Loss' });
            res.json({ status: false, message: 'You lose!', tokens: user.tokens });
        }
        /*user.tokens += payout - wager; // Subtract wager and add payout
        await user.save();

        res.send({
            result,
            win,
            tokens: user.tokens,
            bonus: payout > wager * 2, // true if a bonus was applied
            winStreak: user.winStreak,
        });*/

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export default coinToss;
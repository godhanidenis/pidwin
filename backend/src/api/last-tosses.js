import CoinToss from '../models/coinToss.js';

const lastTosses = async (req, res) => {
    const { userId } = req;
    try {
        // Retrieve the last 10 tosses for the specified user from the database
        const lastTosses = await CoinToss.find({ userId }).sort({ createdAt: -1 }).limit(10);
        res.json({status: true, data: lastTosses});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default lastTosses;
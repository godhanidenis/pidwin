import { RECORDS_FOUND } from "../constants/apiResponseMsg.js";
import CoinToss from "../models/coinToss.js";

const lastTosses = async (req, res) => {
  const { userId } = req;
  try {
    // Retrieve the last 10 tosses for the specified user from the database
    const lastTosses = await CoinToss.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ status: true, data: lastTosses, message: RECORDS_FOUND });
  } catch (error) {
    return res
      .status(500)
      .send({ data: null, status: false, message: ERROR_500 });
  }
};

export default lastTosses;

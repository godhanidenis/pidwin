import {
  ERROR_500,
  USER_FOUND,
  USER_NOT_FOUND,
} from "../constants/apiResponseMsg.js";
import User from "../models/user.js";

const userProfile = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ data: user, status: false, message: USER_NOT_FOUND });
    } else {
      return res.json({ data: user, status: true, message: USER_FOUND });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ data: null, status: false, message: ERROR_500 });
  }
};

export default userProfile;

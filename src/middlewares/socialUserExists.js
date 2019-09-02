import model from '../db/models';
import processToken from '../helpers/processToken';

// eslint-disable-next-line no-unused-vars
const { Users } = model;

/**
 * Social User Exists
 */
class UserExists {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} next if all passed
   */
  static async google(req, res, next) {
    const { emails } = req.user;
    const currentUser = await Users.findAll({
      where: { email: emails[0].value }
    });

    if (currentUser.length > 0) {
      const token = await processToken.signToken(currentUser[0].dataValues);
      return res.redirect(`${process.env.FRONT_END_URL}/social-login?token=${token}`);
    }
    next();
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @return {Object} return next
   */
  static async twitter(req, res, next) {
    const currentUser = await Users.findAll({
      where: {
        socialId: req.user.id
      }
    });
    if (currentUser.length > 0) {
      const token = await processToken.signToken(currentUser[0].dataValues);
      /**
       * redirect to front-end
       */
      return res.redirect(`${process.env.FRONT_END_URL}/social-login?token=${token}`);
    }
    next();
  }
}

export default UserExists;

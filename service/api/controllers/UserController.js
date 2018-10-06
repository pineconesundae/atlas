/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  createUser: async function(req, res) {
    let createdUser = await User.create(req.body).fetch();

    res.status(201).json(createdUser);
  }

};


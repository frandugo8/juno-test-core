
const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()

    return res.status(200).send({message: "OK"})
  } catch (err) {
    console.log("err", err)

    return res.status(500).send({message: "Server ERR"})
  }
}

const login = async (req, res) => {
  try {
    await User.findByCredentials(req.body.username, req.body.password)

    return res.status(200).send({message: "OK"})
  } catch (err) {
    console.log("err", err)

    return res.status(500).send({message: "Server ERR"})
  } 
}

module.exports = {
  login,
  signup
}
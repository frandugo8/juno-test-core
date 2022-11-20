
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 24
  },
  surname: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  username: {
    type: String,
    minlength: 4,
    maxlength: 24
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 32
  }
},
{
  timestamps: true,
  versionKey: false
})

userSchema.index({
  username: 1,
},{ name: "username", unique: true})

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, 8)

  next()
})

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })

  if (!user) {
    throw new Error("username")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("password")
  }

  return user
}

const User = mongoose.model('Users', userSchema)

module.exports = User
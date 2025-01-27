import mongoose, { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';
import { UserFields, UserMethods, UserModel } from '../../types';
import bcrypt from 'bcrypt';

export const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema<UserFields, UserModel, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<UserFields>, email: string): Promise<boolean> {
        if (!this.isModified('email')) return true;

        const user: HydratedDocument<UserFields> | null = await User.findOne({
          email,
        });

        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'master'],
  },
  displayName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  avatar: String,
});

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', userSchema);
export default User;

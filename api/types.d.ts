import {Model, Schema} from 'mongoose';
import Types = module

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  mobile: string;
  googleID?: string;
  avatar?: string;
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;


export interface PreviousProcedure {
  _id: string;
  type: string;
  date: Date;
  notes: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  _id: string;
  user: Types.ObjectId;
  fullName: string;
  contact?: string;
  birthday?: Date;
  gender?: "male" | "female" | "other";
  notes?: string;
  referredBy?: string;
  previousProcedures?: PreviousProcedure[];
  photos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Master {
  _id: string;
  user: Types.ObjectId;
  fullName: string;
  specialization: string;
  phone: string;
  backgroundInfo?: string;
  experience?: number;
  services?: Types.ObjectId[];
  workingHours?: Map<string, string>;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  _id: string;
  master: Types.ObjectId;
  client: Types.ObjectId;
  date: Date;
  time: string;
  status?: "pending" | "confirmed" | "cancelled";
  service: Types.ObjectId;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}



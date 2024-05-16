import {Model} from 'mongoose';
import Types = module;

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


export interface PreviousProcedureApi  {
  _id: string;
  type: string;
  date: Date;
  notes: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}
export type PreviousProcedureMutation = Omit<PreviousProcedureApi , '_id'| 'createdAt' | 'updatedAt'>


export interface ClientApi {
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
export type ClientMutation = Omit<ClientApi , '_id'| 'createdAt' | 'updatedAt'>


export interface MasterApi  {
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
export type MasterMutation = Omit<MasterApi , '_id'| 'createdAt' | 'updatedAt'>


export interface ServiceApi  {
  _id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  master: Types.ObjectId[]
  createdAt: string;
  updatedAt: string;
}
export type ServiceMutation = Omit<ServiceApi , '_id'| 'createdAt' | 'updatedAt'>

export interface AppointmentApi  {
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
export type AppointmentMutation = Omit<AppointmentApi , '_id'| 'createdAt' | 'updatedAt'>




export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    image: string | null;
}
export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    mobile: string;
}
export interface LoginMutation {
    email: string;
    password: string;

}
export interface RegisterResponse {
    message: string;
    user: User;
}
export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface GlobalError {
  error: string
}

export interface PreviousProcedureApi {
  _id: string;
  type: string;
  date: string;
  notes: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientApi {
  _id: string;
  user: User;
  fullName: string;
  contact?: string;
  birthday?: Date;
  gender?: "male" | "female" | "other";
  notes?: string;
  referredBy?: string;
  previousProcedures?: PreviousProcedureApi[];
  photos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MasterApi {
  _id: string;
  user: User;
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

export interface ServiceApi {
  _id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentApi {
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



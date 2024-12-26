export type Widthheight = {
  w: string;
  h: string;
  p?: string;
  url: string;
};

export type Ward = {
  id: string;
  active: boolean;
  countryId: string;
  name: string;
  description: string;
};

export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface IUser {
  birthday: string;
  fullName: string;
  id: string;
  zaloId?: string;
  name: string;
  avatar: string;
  zaloOAId?: string;
  phone?: string;
  // roles?: EUserRole[];
  email?: string;
  password?: "pwd" | "";
  commingSoonFeatures?: string[];
  createdAt: Date;
}

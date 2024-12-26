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

export interface PostDetails {
  status: string;
  message: string;
  data: Array<{
    insuranceName: string;
    postTypeName: string | null;
    accountName: string | null;
    postStatusName: string;
    id: number;
    active: boolean;
    postTypeId: number;
    userId: number;
    insuranceId: number;
    postStatusId: number;
    guId: string;
    photo: string;
    video: string;
    viewCount: number;
    commentCount: number;
    likeCount: number;
    url: string;
    url2: string;
    name: string;
    description: string;
    text: string;
    name2: string;
    description2: string;
    text2: string;
    publishedTime: string;
    createdTime: string;
    account: string | null;
    postType: string | null;
    insurance: string | null;
    postStatus: string | null;
  }>;
}

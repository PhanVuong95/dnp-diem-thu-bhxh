import { atom, selector } from "recoil";
import { getUserInfo } from "zmp-sdk";

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const userStates = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});

export const phoneState = atom({
  key: "phone",
  default: "",
});

export const referrerState = atom<{
  referrerId?: string;
  discountCode?: string;
}>({
  key: "referrer",
  default: {},
});

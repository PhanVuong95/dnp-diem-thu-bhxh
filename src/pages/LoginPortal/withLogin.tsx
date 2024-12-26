import React, { PropsWithChildren } from "react";
import { atom, useRecoilState } from "recoil";
import FlexBox from "../../components/FlexBox";
import { IUser } from "../../models";

// const userState = atom<IUser>({
//   key: "user",
//   default: {
//     id: "",
//     name: "",
//     avatar: "",
//     phone: "",
//     createdAt: new Date(),
//   },
// });

const userState = atom<IUser>({
  key: "user",
  default: {
    id: "",
    name: "",
    avatar: "",
    phone: "",
    birthday: "",
    fullName: "",
    createdAt: new Date(),
  },
});

const withLogin = (Comp) => {
  return (props: PropsWithChildren) => {
    const [user, setUser] = useRecoilState(userState);
    if (!user)
      return (
        <FlexBox
          className="w-full h-full bg-white"
          style={{ minHeight: "100vh" }}
        ></FlexBox>
      );

    return <Comp {...props} />;
  };
};

export default withLogin;

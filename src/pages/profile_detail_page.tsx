import React, { useEffect, useState } from "react";
import HeaderBase from "../components/header_base";
import {
  Avatar,
  Page,
} from "zmp-ui";
import { useProfile, UserProfilePros } from "../components/user_profile_context";
import logo from '../../assets-src/logo1.png'
import { getPhoneNumber, getUserInfo } from "zmp-sdk/apis";
import { getAccessToken } from "zmp-sdk/apis";
import bg from '../../assets-src/image-bg.png'
import AuthorizeAccount from "./auth/authorize";


const ProfileDetailPage = () => {
  const { userProfile, setUserProfile } = useProfile();
  const [phone, setPhone] = useState<String>("");

  const loadPhone = async () => {
    getAccessToken({
      success: (accessToken) => {
        getPhoneNumber({
          success: async (data) => {
            console.log("token", data);
            let { token } = data;
            fetch("https://graph.zalo.me/v2.0/me/info", {
              method: "GET",
              headers: {
                "access_token": `${accessToken}`,
                "code": `${token}`,
                "secret_key": "V0fd7v8rB0KUS344WF69"
              }
            })
              .then(response => response.json())
              .then(data => {
                setPhone(data.data.number)

                setUserProfile((user) => {
                  return {
                    Username: user?.Username ?? undefined,
                    fullName: user?.fullName ?? undefined,
                    photo: user?.photo ?? undefined,
                    phone: `${data.data.number}`,
                  };
                });


              })
              .catch(error => {
                console.error("Error:", error);
              });

          },
          fail: (error) => {
            // Xử lý khi gọi api thất bại
            console.log("Get PhoneNumber", error);
          }
        });
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log("Get Access", error);
      }
    });
  }

  useEffect(() => {
    loadPhone()
  }, [])


  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Thông tin tài khoản"
      />
      <AuthorizeAccount />
      <Page className=" mt-20">

        <div className="relative">
          <img src={bg} className="w-[100%] h-[150px]" />

          <div className="absolute bottom-0 left-0 p-3 flex items-center">
            <Avatar
              story="default"
              size={70}
              src={userProfile.photo ? userProfile?.photo : logo}
            >
              {userProfile?.photo}
            </Avatar>

            <div className="ml-3 text-[20px] font-bold text-white">{userProfile?.fullName}</div>

          </div>
        </div>
        <div className="m-4 bg-white p-4 rounded-xl">
          <div className="text-[17px] font-semibold">Thông tin cá nhân</div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px] font-normal text-[#797D77]">Điện thoại</div>
            <div className="ml-4">{userProfile.phone ? userProfile.phone : "Chưa rõ"}</div>
          </div>


        </div>
      </Page >
    </div >
  );
}

export default ProfileDetailPage;
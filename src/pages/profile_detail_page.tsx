import React, { useContext, useState } from "react";
import HeaderBase from "../components/header_base";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
} from "zmp-ui";
import { ProfileContext } from "../components/user_profile_context";
import logo from '../../assets-src/logo1.png'
import { getPhoneNumber, getUserInfo } from "zmp-sdk/apis";
import { getAccessToken } from "zmp-sdk/apis";
import bg from '../../assets-src/image-bg.png'


const ProfileDetailPage = () => {
  const profieContext = useContext(ProfileContext);
  const { userProfile, setUserProfile } = profieContext;
  const [phone, setPhone] = useState<String>("");

  getAccessToken({
    success: (accessToken) => {
      getPhoneNumber({
        success: async (data) => {
          let { token } = data;
          fetch("https://graph.zalo.me/v2.0/me/info", {
            method: "GET",
            headers: {
              "access_token": `${accessToken}`,
              "code": `${token}`,
              "secret_key": "PgycHQUZHfwK8T4shN7Q"
            }
          })
            .then(response => response.json())
            .then(data => {
              setPhone(data.data.number)
            })
            .catch(error => {
              console.error("Error:", error);
            });

        },
        fail: (error) => {
          // Xử lý khi gọi api thất bại
          console.log(error);
        }
      });

      getUserInfo({
        success: (data) => {
          // xử lý khi gọi api thành công
          const { userInfo } = data;
          console.log(userInfo);

        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        }
      });
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  });



  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Thông tin tài khoản"
      />
      <Page className=" mt-20">

        <div className="relative">
          <img src={bg} className="w-[100%] h-[150px]" />

          <div className="absolute bottom-0 left-0 p-3 flex items-center">
            <Avatar
              story="default"
              size={70}
              src={userProfile?.userInfo?.avatar ? userProfile?.userInfo?.avatar : logo}
            >
              {userProfile?.userInfo?.avatar}
            </Avatar>

            <div className="ml-3 text-[20px] font-bold text-white">{userProfile?.userInfo?.name}</div>

          </div>
        </div>
        <div className="m-4 bg-white p-4 rounded-xl">
          <div className="text-[17px] font-semibold">Thông tin cá nhân</div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px] font-normal text-[#797D77]">Điện thoại</div>
            <div className="ml-4">{phone ? phone : "Chưa rõ"}</div>
          </div>


        </div>
      </Page >
    </div >
  );
}

export default ProfileDetailPage;
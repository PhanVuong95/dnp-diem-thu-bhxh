import React, { useContext, useEffect, useState } from "react";
import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk";
import { Avatar, Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import { ProfileContext } from "../components/user_profile_context";
import logo from '../../assets-src/logo1.png'
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const ProfilePartnerDetailPage = () => {

  const profieContext = useContext(ProfileContext);
  const { userProfile, setUserProfile } = profieContext;
  const [phone, setPhone] = useState<String>("");
  const navigate = useNavigate();
  const [bankInfo, setBankInfo] = useState<any>();

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

  const fetchBankInfo = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/account/api/get-bank-info`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setBankInfo(response.data.data[0])
      }

    } catch (error) {
    }
  }

  useEffect(() => {
    fetchBankInfo()
  }, []);

  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Thông tin đối tác"
      />
      <Page className="page mt-20">
        <div className="flex flex-col justify-center items-center">
          <Avatar

            story="default"
            size={90}
            src={userProfile?.userInfo?.avatar ? userProfile?.userInfo?.avatar : logo}
          >
            {userProfile?.userInfo?.avatar}
          </Avatar>

          <div className="mt-3 text-xl font-bold">  {userProfile?.userInfo?.name}</div>
        </div>


        <div className="bg-white p-4 rounded-xl mt-5">
          <div className="text-lg font-medium">
            Thông tin cá nhân
          </div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px] font-normal text-[#797D77]">Điện thoại</div>
            <div className="ml-4">{phone ? phone : "Chưa rõ"}</div>
          </div>
        </div>


        <div className="bg-white p-4 rounded-xl mt-5">
          <div className="text-lg font-medium">
            Thông tin ngân hàng
          </div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px]  w-[230px] font-normal text-[#797D77]">Tên ngân hàng</div>
            <div className="">{bankInfo?.bankName ? bankInfo?.bankName : "Chưa rõ"}</div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px]  w-[120px] font-normal text-[#797D77]">Chi nhánh</div>
            <div className="">{bankInfo?.bankBranch ? bankInfo?.bankBranch : "Chưa rõ"}</div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px]  w-[120px] font-normal text-[#797D77] w-30">Tên chủ TK</div>
            <div className="">{bankInfo?.bankOwnerName ? bankInfo?.bankOwnerName : "Chưa rõ"}</div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px] w-[120px] font-normal text-[#797D77] w-30">Số tài khoản</div>
            <div className="">{bankInfo?.bankOwnerNumber ? bankInfo?.bankOwnerNumber : "Chưa rõ"}</div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <button onClick={() => {
            navigate("/bank-info")
          }} className="mt-4 border py-3 w-[100%] rounded-full border-[#0544E8]">
            <div className="text-[#0076B7] font-bold text-[16px]">
              Chỉnh sửa
            </div>
          </button>

        </div>

      </Page>
    </div>
  )
}

export default ProfilePartnerDetailPage;
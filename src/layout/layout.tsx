import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/header_page";
import axios from "axios";
import { authorize, closeApp, getSetting, getUserInfo } from "zmp-sdk/apis";
import { ProfileContext } from "../components/user_profile_context";
import { BASE_URL } from "../utils/constants";
import { isValidString } from "../utils/validateString";

export let logged = false;

const LayoutPage: React.FunctionComponent = (props) => {
  const profieContext = useContext(ProfileContext);

  const { userProfile, setUserProfile } = profieContext;

  useEffect(() => {
    getSetting({
      success: (data) => {
        if (!data["authSetting"]["scope.userInfo"]) {
          authorize({
            scopes: ["scope.userInfo"],
            success: async (data) => {
              // xử lý khi gọi api thành công

              const user = await getUserInfo({
                avatarType: "normal",
              });

              setUserProfile(() => user);
            },
            fail: (error) => {
              // xử lý khi gọi api thất bại
              // closeMiniApp();
              console.log("Không cấp quyền");
            },
          });
        }
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  }, []);

  const login = async () => {
    try {
      logged = true;

      const user = await getUserInfo({
        avatarType: "normal",
      });

      setUserProfile(() => user);

      const userId = user.userInfo.id;

      const { data } = await axios.post(
        `${BASE_URL}/account/api/login-mini-app`,
        {
          Username: userId,
          fullName: user.userInfo.name,
          photo: user.userInfo.avatar
        }
      );

      // Saving token to cookies
      document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

      // Saving token to local storage
      localStorage.setItem("token", data.resources.accessToken);
      localStorage.setItem("profile", JSON.stringify(data.resources.profile));
      localStorage.setItem("roleId", data.resources.profile?.roleId.toString())

      console.log("Đăng nhập - đăng ký thành công!!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };



  const decodeState = () => {
    const url = window.location.href;

    // Tách tham số 'state' từ URL
    const urlParams = new URLSearchParams(new URL(url).search);
    const state = urlParams.get("state");

    if (state) {
      // Giải mã base64
      const decodedState = atob(state);

      try {
        // Parse JSON từ chuỗi đã giải mã
        const jsonState = JSON.parse(decodedState);
        return jsonState;
      } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        return null;
      }
    }

    return null;
  };

  if (!logged) {
    // Login
    login();

    // Lấy referrerCode
    const stateJson = decodeState();

    const referrerCode = isValidString(stateJson?.data.body.referrerCode)
    localStorage.setItem("referrerCode", referrerCode);
  }

  return (
    <>
      <HeaderPage />
      <main>
        <Outlet />
      </main>
      <footer>{/* Nội dung footer ở đây, nếu có */}</footer>
    </>
  );
};

export default LayoutPage;

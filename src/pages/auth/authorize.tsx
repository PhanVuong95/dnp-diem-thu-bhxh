import axios from "axios";
import { useEffect } from "react";
import { authorize, getSetting, getUserInfo } from "zmp-sdk";
import { useProfile, UserProfilePros } from "../../components/user_profile_context";
import { BASE_URL } from "../../utils/constants";

const AuthorizeAccount = () => {
  const { userProfile, setUserProfile } = useProfile();

  const loadUserInfo = async () => {
    try {
      const setting = await getSetting({});
      if (!setting["authSetting"]["scope.userInfo"]) {
        const auth = await authorize({ scopes: ["scope.userInfo"] })

        if (auth["scope.userInfo"]) {
          const user = await getUserInfo({
            avatarType: "normal",
          });

          //Cập nhập profile context 
          setUserProfile((prev) => {
            return {
              ...(prev as UserProfilePros),
              Username: user.userInfo.id,
              fullName: user.userInfo.name,
              photo: user.userInfo.avatar
            };
          });
        }
      }
    } catch (error) {
      console.log("Chưa cấp được quyền thông tin")
    }
  }

  useEffect(() => {
    loadUserInfo()
  }, []);

  const loginAccount = async () => {
    try {

      // Lấy thông tin tài khoản zalo
      const user = await getUserInfo({
        avatarType: "normal",
      });

      //Cập nhập profile context 
      setUserProfile((prev) => {
        return {
          ...(prev as UserProfilePros),
          Username: user.userInfo.id,
          fullName: user.userInfo.name,
          photo: user.userInfo.avatar
        };
      });

      // Đăng nhập tài khoản để lấy token
      const { data } = await axios.post(
        `${BASE_URL}/account/api/login-mini-app`,
        {
          Username: user.userInfo.id,
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
  }


  useEffect(() => {
    loginAccount()
  }, [userProfile != null])

  return null
}

export default AuthorizeAccount
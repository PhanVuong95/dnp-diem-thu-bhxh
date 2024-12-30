import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { authorize, getAccessToken, getPhoneNumber, getSetting, getUserInfo } from "zmp-sdk";
import { useProfile } from "../../components/user_profile_context";
import { BASE_URL } from "../../utils/constants";
import { formatPhoneNumberZalo } from "../../utils/validate_string";

const AuthorizeAccount = () => {
  const { setUserProfile } = useProfile();


  const getInfo = async () => {
    const user = await getUserInfo({
      avatarType: "normal",
    });

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
                "secret_key": "V0fd7v8rB0KUS344WF69"
              }
            })
              .then(response => response.json())
              .then(data => {

                const dataFrom = {
                  Username: user?.userInfo.id,
                  fullName: user?.userInfo.name,
                  photo: user?.userInfo.avatar,
                  phone: formatPhoneNumberZalo(data.data.number),
                }

                // Lưu thông tin profile vào context
                setUserProfile(dataFrom);

                // Đăng nhập + đăng ký tài khoản
                loginAccount(dataFrom)
              })
              .catch(error => {
                console.error("Error:", error);
              });

          },
          fail: (error) => {
            toast.error("Lấy thông tin số điện thoại thất bại")
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

  const loadUserInfo = async () => {
    try {
      const setting = await getSetting({});
      console.log("setting", setting);
      if (!setting["authSetting"]["scope.userInfo"] ||
        !setting["authSetting"]["scope.userPhonenumber"]
      ) {

        const auth = await authorize({ scopes: ["scope.userInfo", "scope.userPhonenumber"] })

        if (auth["scope.userInfo"] && auth["scope.userPhonenumber"]) {
          getInfo()
          return
        } else {
          toast.error("Vui lòng cấp quyền để sử dụng thông tin")
          return
        }
      }

      getInfo()

    } catch (error) {
      console.log("setting", error)
      toast.error("Vui lòng cấp quyền để sử dụng thông tin")

    }
  }

  useEffect(() => {
    loadUserInfo()
  }, []);

  const loginAccount = async (dataFrom) => {
    try {
      // Đăng nhập tài khoản để lấy token
      const { data } = await axios.post(
        `${BASE_URL}/account/api/login-mini-app`,
        {
          Username: dataFrom.Username,
          fullName: dataFrom.fullName,
          photo: dataFrom.photo,
          phone: dataFrom.phone
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

  return null
}

export default AuthorizeAccount
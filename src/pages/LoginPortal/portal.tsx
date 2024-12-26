import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { closeApp, getUserInfo } from "zmp-sdk";
import { Button, Page, Text } from "zmp-ui";
import FlexBox from "../../components/FlexBox";
import { ProfileContext } from "../../components/user_profile_context";
import { dynamicApiCall } from "../../services/user";
import { BASE_URL } from "../../utils/constants";
import useHandleDeeplink from "./useHandleDeeplink";

const LoginPortalPage: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<
    | {
      id: string;
      name: string;
      avatar: string;
    }
    | undefined
  >(undefined);

  const navigate = useNavigate();

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

  const stateJson = decodeState();

  console.log("stateJson:", stateJson?.data.body.clientId);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const users = await getUserInfo({
        avatarType: "normal",
      });
      setUser(users.userInfo);
    };
    fetchUserInfo();
  }, []);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/zalo/api/login-portal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connectionId: stateJson?.data.body.clientId,
            zaloId: user?.id,
            fullName: user?.name,
            photo: user?.avatar
          }),
        }
      );
      const { message } = await response.json();
      // setTimeout(closeApp, 1000);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="flex items-center justify-center bg-white">
      <div className="body pb-24 px-6 flex justify-center flex-col">
        <Text.Title className="text-center py-6 text-2xl font-bold tt-portal">
          Xác nhận đăng nhập
        </Text.Title>
        <Text className="text-center t-portal">
          Bạn vừa yêu cầu đăng nhập<br></br>
          vào: portal.nop-BHXH
        </Text>

        <Text className="text-center py-6 text-gray-600 text-sm c-portal">
          Khi xác nhận, bạn đồng ý cấp quyền truy cập và chỉnh sửa các thông tin
          trên tài khoản của bạn ở trang: portal.nop-BHXH
        </Text>
        <Text className="text-red-600 text-center ct-portal">
          Từ chối nếu không phải bạn (hoặc không phải trang web:
          portal.nop-BHXH) để tránh mất tài khoản
        </Text>

        <FlexBox className="justify-around py-12">
          <Button
            type="danger"
            loading={loading}
            onClick={() => closeApp()}
            className="pt-btn"
          >
            Từ chối
          </Button>
          <Button type="highlight" onClick={handleConfirm} className="pt-btn">
            Chấp nhận
          </Button>
        </FlexBox>
      </div>
    </Page>
  );
};

export default LoginPortalPage;

import React from "react";
import { toast } from "react-toastify";
import { GetUserInfoReturns } from "zmp-sdk";
import { Box } from "zmp-ui";
import logo from '../../assets-src/logo1.png'

interface UserProps {
  user: GetUserInfoReturns["userInfo"];
}

const UserCard: React.FunctionComponent<UserProps> = ({ user }) => {

  return (
    <div className="box-user w-full flex py-[24px] px-[16px] flex justify-between items-center">
      <div className="flex justify-between items-center">
        <img
          className="rounded-full w-[50px] h-[50px]"
          src={user?.avatar ? user?.avatar : logo}
        />

        <Box ml={4}>
          <p className="text-lg font-semibold">Xin chào, {user?.name ? user?.name : 'Quý khách'}</p>
        </Box>
      </div>

      <Box ml={4} onClick={() => {
        toast.info(
          "Tính năng này đang phát triển",
        );
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
        >
          <g>
            <path
              d="M47.4297 15.342H44.2385C41.5243 8.8975 35.5479 4.21415 28.6675 3.31969C21.8492 2.4107 15.15 5.03508 10.7671 10.318C9.47873 11.8711 8.4567 13.5597 7.70839 15.342H4.57031C2.05014 15.342 0 17.3922 0 19.9124V26.0061C0 28.5263 2.05014 30.5764 4.57031 30.5764H10.8267L10.1721 28.5784C8.26627 22.7583 9.33898 16.8119 13.1133 12.2639C16.8223 7.79321 22.486 5.58097 28.2719 6.33975C34.3907 7.13681 39.7019 11.4641 41.8063 17.3668L41.8191 17.401C42.1583 18.3026 42.3964 19.2295 42.5332 20.1831C42.9899 23.0322 42.7296 25.9198 41.7819 28.5338L41.7752 28.552C39.4229 35.2306 33.0962 39.717 26.0298 39.717C23.4931 39.717 21.4297 41.7672 21.4297 44.2874C21.4297 46.8075 23.4798 48.8577 26 48.8577C28.5202 48.8577 30.5703 46.8075 30.5703 44.2874V42.2327C36.6533 40.7869 41.7627 36.4749 44.2186 30.5763H47.4297C49.9499 30.5763 52 28.5262 52 26.006V19.9123C52 17.3921 49.9499 15.342 47.4297 15.342Z"
              fill="#096DD9"
            />
            <path
              d="M12.2891 33.6233V36.6702H26C33.5606 36.6702 39.7109 30.5198 39.7109 22.9592C39.7109 15.3986 33.5606 9.24829 26 9.24829C18.4394 9.24829 12.2891 15.3986 12.2891 22.9592C12.2891 26.0419 13.3245 29.0203 15.2169 31.4289C14.8495 32.7128 13.6771 33.6233 12.2891 33.6233ZM30.5703 21.4358H33.6172V24.4827H30.5703V21.4358ZM24.4766 21.4358H27.5234V24.4827H24.4766V21.4358ZM18.3828 21.4358H21.4297V24.4827H18.3828V21.4358Z"
              fill="#FA8C16"
            />
            <path
              d="M30.5703 21.4358H33.6172V24.4827H30.5703V21.4358Z"
              fill="white"
            />
            <path
              d="M24.4766 21.4358H27.5234V24.4827H24.4766V21.4358Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_3060_21937">
              <rect width="52" height="52" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </div>
  );
};

export default UserCard;

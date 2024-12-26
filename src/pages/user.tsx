import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
} from "zmp-ui";
import HeaderBase from "../components/header_base";
import { ProfileContext } from "../components/user_profile_context";
import logo from '../../assets-src/logo1.png'
import ic_prerson from "../../assets-src/image-person.png";
import ic_collaborate from "../../assets-src/image-collaborate.png";
import ic_guide from "../../assets-src/image-guide.png";
import ic_policy_terms from "../../assets-src/image-policy-terms.png";
import ic_zalo from "../../assets-src/image-zalo.png";
import { Link } from "react-router-dom";
import { RoleAccount } from "../utils/constants";

const UserPage = () => {

  const profieContext = useContext(ProfileContext);
  const { userProfile, setUserProfile } = profieContext;

  return (
    <div>
      <HeaderBase
        isHome={true}
      />
      <Page className="page mt-20 bg-white">
        {/* <Box
          flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Avatar
              story="default"
              size={96}
              online
              src={userProfile?.userInfo?.avatar ? userProfile?.userInfo?.avatar : logo}
            >
              {userProfile?.userInfo?.avatar}
            </Avatar>
          </Box>
          <div className="mt-2">
            <Box flex flexDirection="row" alignItems="center">
              <Box>
                <Text.Title>{userProfile?.userInfo?.name ? userProfile?.userInfo?.name : ''}</Text.Title>
              </Box>
            </Box>
          </div>

        </Box>
        <Box m={0} p={0} mt={4}>
          <div className="section-container">
            <List>
              <List.Item title="Name" subTitle={userProfile?.userInfo?.name ? userProfile?.userInfo?.name : ''} />
              <List.Item title="ID" subTitle={userProfile?.userInfo?.id ? userProfile?.userInfo?.id : ''} />
            </List>
          </div>
        </Box> */}

        <div className="grid gap-y-4 grid-cols-1">
          <Link to="/user-detail" className="flex flex-row shadow-custom p-4 items-center">
            <img src={ic_prerson} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Thông tin tài khoản
            </div>
          </Link>

          {localStorage.roleId !== RoleAccount['CTV'] && (
            <Link to="/partnership-terms" className="flex flex-row shadow-custom p-4 items-center">
              <img src={ic_collaborate} className="w-12 h-12" />
              <div className="ml-3 font-normal text-lg">
                Trở thành cộng tác viên
              </div>
            </Link>
          )
          }


          <Link to="/guide" className="flex flex-row shadow-custom p-4 items-center">
            <img src={ic_guide} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Tài liệu hướng dẫn
            </div>
          </Link>

          {/* /policy-terms */}
          <Link to="/privacy_policy" className="flex flex-row shadow-custom p-4 items-center">
            <img src={ic_policy_terms} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Điều kiện và điều khoản dịch vụ
            </div>
          </Link>

          <div className="flex shadow-custom p-4 items-center">
            <img src={ic_zalo} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Chat với chúng tôi
            </div>
          </div>
        </div>
      </Page>
    </div>

  );
};

export default UserPage;

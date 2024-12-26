import React from "react";
import { Link } from "react-router-dom";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import ic_introduce from "../../assets-src/image-introduce.png";
import ic_prerson from "../../assets-src/image-person.png";
import ic_guide from "../../assets-src/image-guide.png";
import AuthorizeAccount from "./auth/authorize";

const PartnerPage = () => {
  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Đối tác"
      />
      <AuthorizeAccount />
      <Page className="page mt-20 bg-white">
        <div className="grid gap-y-4 grid-cols-1">
          <Link to="/introducing-partners" className="flex flex-row shadow-custom p-4 items-center">
            <img src={ic_introduce} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Thông tin giới thiệu
            </div>
          </Link>

          <Link to="/profile-partner-detail" className="flex flex-row shadow-custom p-4 items-center">
            <img src={ic_prerson} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Thông tin đối tác
            </div>
          </Link>

          <Link to="/report-partner" className="flex flex-row shadow-custom p-4 items-center">
            <img src={ic_guide} className="w-12 h-12" />
            <div className="ml-3 font-normal text-lg">
              Báo cáo thống kê
            </div>
          </Link>
        </div>
      </Page>
    </div>
  )
}

export default PartnerPage;
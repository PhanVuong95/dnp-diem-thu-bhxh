import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import next from "../../assets-src/image-next.png";
import { Link } from "react-router-dom";
import ScrollToTop from "../utils/hock";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ListCollabrorates = () => {

  const [listCollabrorates, setListCollabrorates] = useState([])

  const fetchCollabrorates = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/account/api/get-list-contributor`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setListCollabrorates(response.data.data[0])
      }

    } catch (error) {
    }
  }

  useEffect(() => {
    fetchCollabrorates();
  }, [])

  const itemCollabrotate = (item) => {
    return (
      <div key={`${item}`} className="flex gap-4 mb-4 rounded-xl bg-white p-3">
        <img src={item?.photo} className="w-[60px] h-[60px] rounded-full" />

        <div className="flex flex-col w-[100%] justify-between p-1">
          <div className="text-[18px] font-medium">{item?.fullName}</div>

          <Link to={`/profile-collaborate-detail/${item?.id}`} className="flex justify-between">
            <div className="text-[16px] font-normal">{`${item?.phone.slice(0, 7)}***`}</div>
            <div className="flex ">
              <div className="text-[#0076B7]">Xem chi tiết</div>
              <img src={next} className="w-[18px] h-[18px] ml-2" />
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div id="container-main">
      <ScrollToTop />

      <HeaderBase
        isHome={false}
        title="Danh sách cộng tác viên"
      />

      <Page className="page mt-20">
        <div className="text-[18px] text-[#0076B7] mb-3 font-medium">{listCollabrorates.length} Cộng tác viên</div>

        <div className="gap-2">
          {listCollabrorates.map((item, index) => itemCollabrotate(item))}
        </div>

      </Page>
    </div>
  )
}

export default ListCollabrorates;
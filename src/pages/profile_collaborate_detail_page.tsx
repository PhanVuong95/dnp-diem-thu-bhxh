import React, { useEffect, useState } from "react";
import { Avatar, Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import wallet from '../../assets-src/image-wallet.png'
import money from '../../assets-src/image-money.png'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { formatMoneyVND } from "../utils/validate_string";

type ItemInfoProps = {
  title: string;
  value: string;
  subtitle: string;
  image: string;
};


const ProfileCollaborateDetailPage = () => {
  const { id } = useParams();

  const [report, setReport] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [phone, setPhone] = useState<string>("")

  const fectReport = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/report/api/report-order-contributor?accountId=` + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setReport(response.data.data[0])
        setPhone(response.data.data[0]?.phone)
        console.log(response.data);
        setIsLoading(false)

      }

      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fectReport();
  }, [])

  const ItemInfo = ({ title, value, subtitle, image }: ItemInfoProps) => {
    return (
      <div className="border p-2 rounded-lg border-[#0076B7]">
        <div className="flex items-center">
          <img src={image} className="w-7 h-7" />
          <div className="text-[16px] ml-2">{title}</div>
        </div>

        <div className="mt-2 font-bold text-[17px]">
          {value}
        </div>

        <div className="mt-2 text-[16px]">
          {subtitle}
        </div>
      </div>
    )
  }


  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Thông tin cộng tác viên"
      />
      <Page className="page mt-20">
        <div className="flex flex-col justify-center items-center">
          <Avatar

            story="default"
            size={90}
            src={report?.photo}
          >
          </Avatar>

          <div className="mt-3 text-[18px] font-bold">{`${report?.fullName}`}</div>
          <div className="mt-2 text-[16px]">{`${report?.phone.slice(0, 7)}***`}</div>
        </div>

        <div className="rounded-xl p-4 bg-white mt-4">
          <div className="text-[#0076B7] font-medium text-[18px]">Báo cáo thống kê cá nhân</div>


          <div className="grid mt-4 gap-y-4 gap-x-4 grid-cols-2 ">

            {ItemInfo({ image: wallet, "title": "Lượt mua", "value": formatMoneyVND(report?.countSuccessOrder), "subtitle": "Đơn thành công" })}

            {/* {ItemInfo({ image: share, "title": "Lượt truy cập", "value": "Đang cập nhật", "subtitle": "Lần" })} */}
            {ItemInfo({ image: money, "title": "Doanh thu", "value": formatMoneyVND(report?.totalSuccessOrderValue), "subtitle": "Vnđ" })}

          </div>
          {/* 
          <div className="mt-4">
            {ItemInfo({ image: money, "title": "Doanh thu", "value": "10.000.000", "subtitle": "Vnđ" })}
          </div> */}
        </div>


      </Page >
    </div >
  )
}

export default ProfileCollaborateDetailPage;
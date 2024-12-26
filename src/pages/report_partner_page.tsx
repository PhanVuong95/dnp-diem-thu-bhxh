import React, { useEffect, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import HeaderBase from "../components/header_base";
import group from "../../assets-src/image-group.png";
import money from "../../assets-src/image-money.png";
import wallet from "../../assets-src/image-wallet.png";
import add from "../../assets-src/image-add.png";
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

const ReportPartnerPage = () => {
  const navigate = useNavigate();

  const [report, setReport] = useState<any>();

  const fetchReport = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/report/api/report-overview`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setReport(response.data.data[0]);
        console.log(response.data.data[0]);
      }
    } catch (error) { }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const ItemInfo = ({ title, value, subtitle, image }: ItemInfoProps) => {
    return (
      <div className="border p-2 rounded-lg border-[#0076B7]">
        <div className="flex items-center">
          <img alt="" src={image} className="w-7 h-7" />
          <div className="text-[16px] ml-2">{title}</div>
        </div>

        <div className="mt-2 font-bold text-[17px]">{value}</div>

        <div className="mt-2 text-[16px]">{subtitle}</div>
      </div>
    );
  };

  return (
    <div>
      <HeaderBase isHome={false} title="Báo cáo thống kê" />

      <Page className="page mt-20">
        <div className="rounded-xl p-4 bg-white">
          <div className="text-[#0076B7] font-medium text-[18px]">
            Báo cáo thống kê cá nhân
          </div>

          <div className="grid mt-4 gap-y-4 gap-x-4 grid-cols-2 ">
            {ItemInfo({
              image: wallet,
              title: "Lượt mua",
              value: formatMoneyVND(report?.personalTotalOrderSuccess),
              subtitle: "Đơn thành công",
            })}

            {ItemInfo({
              image: add,
              title: "Lượt tạo",
              value: formatMoneyVND(report?.personalTotalOrder),
              subtitle: "Tạo thành công",
            })}
          </div>

          <div className="mt-4">
            {ItemInfo({
              image: money,
              title: "Doanh thu",
              value: formatMoneyVND(report?.personalTotalOrderSuccessValue),
              subtitle: "Vnđ",
            })}
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white mt-4">
          <div className="text-[#0076B7] font-medium text-[18px]">
            Báo cáo của cộng tác viên
          </div>
          <div className="grid mt-4 gap-y-4 gap-x-4 grid-cols-2 ">
            {ItemInfo({
              image: group,
              title: "Cộng tác viên",
              value: formatMoneyVND(report?.totalContributors),
              subtitle: "Số tài khoản",
            })}

            {ItemInfo({
              image: wallet,
              title: "Lượt mua",
              value: formatMoneyVND(report?.contributorTotalOrderSuccess),
              subtitle: "Đơn hàng",
            })}

            {/* {ItemInfo({ image: money, "title": "Lượt truy cập", "value": 'Đang cập nhật', "subtitle": "Lần" })} */}
          </div>

          <div className="mt-4">
            {ItemInfo({
              image: money,
              title: "Doanh số",
              value: formatMoneyVND(report?.contributorTotalOrderSuccessValue),
              subtitle: "Vnđ",
            })}
          </div>

          <button
            onClick={() => {
              navigate("/list-collabrorate");
            }}
            className="mt-4 border py-3 w-[100%] rounded-full border-[#0544E8]"
          >
            <div className="text-[#0076B7] font-bold text-[16px]">
              Xem danh sách cộng tác viên
            </div>
          </button>
        </div>
      </Page>
    </div>
  );
};

export default ReportPartnerPage;

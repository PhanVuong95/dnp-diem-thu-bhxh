import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderBase from "../../components/header_base";
import { PulseLoader } from "react-spinners";
import { formatMoneyVND } from "../../utils/validate_string";
import logo from "../../../assets-src/logo1.png"
import { BASE_URL } from "../../utils/constants";

const ListHistoryBHYT = ({ }) => {
  const navigate = useNavigate();

  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const [openTab, setOpenTab] = useState(1);
  const [listOrder, setListOrder] = useState<any>([]);
  const token = localStorage.token;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/insuranceorder/api/list-by-insuranceId?insuranceId=1002`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let fillteredOrders: any = [];
        response.data.data.forEach((item) => {
          if (item.insuranceOrderStatusId == DONE && openTab == 2) {
            fillteredOrders.push(item);
          } else if (
            (item.insuranceOrderStatusId == PENDING && openTab == 1) ||
            (item.insuranceOrderStatusId == CANCELED && openTab == 1)
          ) {
            fillteredOrders.push(item);
          }
        });
        setListOrder(fillteredOrders);

        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
        setListOrder([])
        setLoading(false)
      });
  }, [openTab]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }

  if (loading) {
    return (
      <>
        <HeaderBase
          isHome={false}
          onBack={() => navigate("/history")}
          title={"Lịch sử đăng ký BHYT TN"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const switchColor = (insuranceOrderStatusId) => {
    switch (insuranceOrderStatusId) {
      case PENDING:
        return '#FAAD14'
      case DONE:
        return '#00BA00'
      case CANCELED:
        return '#F00'
      default:
        break;
    }
  }

  return (
    <>
      <HeaderBase
        isHome={false}
        onBack={() => navigate("/history")}
        title={"Lịch sử đăng ký BHYT TN"}
      />
      <div className="page-1 !pb-2 !pt-[95px]">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex space-x-4 p-1 bg-white rounded-lg shadow-md">
            <button
              onClick={() => setOpenTab(1)}
              className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 1 ? "bg-blue-600 text-white" : ""
                }`}
            >
              Đang mua
            </button>
            <button
              onClick={() => setOpenTab(2)}
              className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 2 ? "bg-blue-600 text-white" : ""
                }`}
            >
              Đã thanh toán
            </button>
          </div>


          <div className="flex flex-col gap-4">
            {listOrder.length == 0 ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>Không có dữ liệu!</div>
              </div>
            ) : null
            }

            {listOrder?.map((item, index) => {
              return (
                <Link to={"/info-detail-bhyt/" + item.id + "/" + item.insuranceOrderStatusName} key={index}>
                  <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                    <div className="flex gap-[10px]">
                      <img src={logo} className="w-16 h-16" />
                      <div className="title-product flex flex-col">
                        <h3 className="text-[#0076B7] text-lg font-medium">
                          {item?.insuranceName}
                        </h3>
                        <p className="text-[#646464] text-sm font-normal">
                          {item.monthInsured} tháng
                        </p>
                        <span className="text-[#0076B7] text-lg font-bold">
                          {formatMoneyVND(item.finalPrice)} VND
                        </span>
                      </div>
                    </div>

                    <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Mã đơn
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-black text-sm font-semibold max-w-[142px] text-right`}
                          >
                            #{item.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Trạng thái
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-[${item.statusColor}] text-sm font-semibold max-w-[142px] text-right`}
                          >
                            {item.insuranceOrderStatusName}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Ngày đăng ký
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {formatDateTime(item.createdTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Người mua
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {item.fullName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListHistoryBHYT;

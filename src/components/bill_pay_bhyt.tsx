import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HeaderBase from "./header_base";
import { useParams } from "react-router-dom";
import {
  formatDate,
  formatMoneyVND,
  formatPhoneNumber,
} from "../utils/validate_string";
import { createMacFE } from "../services/payment";
import { EventName, events, Payment } from "zmp-sdk";
import * as _ from "lodash";
import { BASE_URL } from "../utils/constants";

const BillPayBHYTPage: React.FunctionComponent = () => {
  const { id } = useParams();
  const [billPay, setBillPay] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardeName, setWardeName] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  const navigate = useNavigate();

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };

  useEffect(() => {
    events.on(EventName.OnDataCallback, (resp) => {
      const { eventType, data } = resp;
      if (eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate(`/buill-detail/${id}`);
      }
    });
  }, []);

  const createOrder = async () => {
    let dataClone = _.cloneDeep(billPay);
    const body: any = await {
      amount: billPay.finalPrice,
      desc: "Thanh toán gói bảo hiểm",
      item: [
        {
          id: `#${billPay.accountId}`,
          amount: billPay.finalPrice,
        },
      ],
      method: JSON.stringify({
        id: "vnpayqr",
        isCustom: true,
      }),
    };

    const mac = await createMacFE(body);

    const { orderId } = await Payment.createOrder({
      ...body,
      mac: mac,
    });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/insuranceorder/api/detail-by-vm/` + id)
      .then((response) => {
        setBillPay(response.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${BASE_URL}/province/api/detail/` +
  //       0
  //     )
  //     .then((response) => {
  //       setProvinceName(response.data.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   axios
  //     .get(
  //       `${BASE_URL}/district/api/detail/` +
  //       0
  //     )
  //     .then((response) => {
  //       setDistrictName(response.data.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   axios
  //     .get(`${BASE_URL}/ward/api/detail/` + 0)
  //     .then((response) => {
  //       setWardeName(response.data.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const boxBuyer = () => {
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
        <h3 className="text-base font-medium text-[#0076B7]">
          Người mua bảo hiểm
        </h3>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
              {billPay?.fullName ? billPay?.fullName.trim() : "Đang tải"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Email</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {billPay?.email ? billPay?.email.trim() : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Số điện thoại</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {billPay?.phone
                ? formatPhoneNumber(billPay?.phone.trim())
                : "Đang tải"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {`${billPay?.addressDetail ? billPay?.addressDetail.trim() : ""
                }, ${billPay?.wardName ? billPay?.wardName.trim() : ""}, ${billPay?.districtName ? billPay?.districtName.trim() : ""
                } ,${billPay?.provinceName ? billPay?.provinceName.trim() : ""}`}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const boxBeneficiary = (item, index) => {
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6 mt-4">
        <h3 className="text-base font-medium text-[#0076B7]">
          Thông tin người số {index + 1} được bảo hiểm
        </h3>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
              {item?.fullName.trim() == ""
                ? "Chưa cập nhật"
                : item?.fullName.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Ngày sinh</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {item?.doB.trim() == "" ? "Chưa cập nhật" : item?.doB.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Số CCCD</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {item?.citizenId.trim() == ""
                ? "Chưa cập nhật"
                : item?.citizenId.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Giới tính</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {item?.gender.trim() == ""
                ? "Chưa cập nhật"
                : item?.gender.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Mã số BHYT</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {item?.healthInsuranceNumber == ""
                ? "Chưa cập nhật"
                : item?.healthInsuranceNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Số tháng đóng</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {item?.monthInsured == 0 ? "Chưa cập nhật" : item?.monthInsured}{" "}
              tháng
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">
              Bệnh viện đăng ký
            </p>
          </div>
          <div>
            <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
              {item?.hospitalName == 0 ? "Chưa cập nhật" : item?.hospitalName} -
              {item?.medicalProvinceName == 0
                ? "Chưa cập nhật"
                : item?.medicalProvinceName}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Phí bảo hiểm</p>
          </div>
          <div>
            <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
              {item?.price == 0 ? "Chưa cập nhật" : formatMoneyVND(item?.price)}{" "}
              vnđ
            </p>
          </div>
        </div>
      </div>
    );
  };

  const line = () => {
    return <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>;
  };

  return (
    <div className="pt-20">
      <HeaderBase isHome={false} title={"BHYT tự nguyện"} />
      <div className="page-1 flex flex-col gap-4 mb-4">
        <div className="">
          {boxBuyer()}
          {line()}
          {loading ? (
            <div></div>
          ) : (
            billPay.listInsuredPerson.map((item, index) => {
              return boxBeneficiary(item, index);
            })
          )}
        </div>

        <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
          {/* <h3 className="text-[#0076B7] text-lg font-medium">
            Danh mục sản phẩm
          </h3>
          <div className="flex gap-[10px]">
            <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
            <div className="title-product flex flex-col">
              <h3 className="text-[#0076B7] text-lg font-medium">
                BH Xã Hội Tự nguyện
              </h3>
              <p className="text-[#646464] text-sm font-normal">Theo tháng</p>
              <span className="text-[#0076B7] text-lg font-bold">
                22<samp className="text-[#646464] text-sm font-normal">%</samp>
              </span>
            </div>
          </div> */}

          {/* <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr> */}

          <div className="flex flex-col gap-2">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Phương thức thanh toán
            </h3>
            {/* <div className="flex gap-3">
              <input
                type="checkbox"
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
                checked={selectedCheckbox === "vietqr"}
                onChange={() => handleCheckboxChange("vietqr")}
                id="vietqr-checkbox"
              />
              <label
                htmlFor="vietqr-checkbox"
                className="text-sm font-normal text-[#000] w-[96%]"
              >
                VietQR (Chuyển khoản ngân hàng, MOMO, Zalopay, Viettelpay)
              </label>
            </div> */}

            <div className="flex gap-3">
              <input
                type="checkbox"
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
                checked={true}
                onChange={() => handleCheckboxChange("vnpay")}
                id="vnpay-checkbox"
              />
              <label
                htmlFor="vnpay-checkbox"
                className="text-sm font-normal text-[#000] w-[96%]"
              >
                Thanh toán VNPAY (Powered ChaiPay)
              </label>
            </div>

            {/* <div className="flex gap-3">
              <input
                type="checkbox"
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
                checked={selectedCheckbox === "khac"}
                onChange={() => handleCheckboxChange("khac")}
                id="khac-checkbox"
              />
              <label
                htmlFor="khac-checkbox"
                className="text-sm font-normal text-[#000] w-[96%]"
              >
                Khác
              </label>
            </div> */}
          </div>
        </div>
      </div>

      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {billPay?.finalPrice
                ? formatMoneyVND(billPay?.finalPrice)
                : "Đang tải"}{" "}
              VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              onClick={() => {
                createOrder();
              }}
              // to={`/buill-detail/${id}`}
              className="px-[20px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayBHYTPage;

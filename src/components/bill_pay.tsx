import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Widthheight } from "../models";
import * as _ from "lodash";
import { createMacFE } from "../services/payment";
import { EventName, events, Payment } from "zmp-sdk";
import { SpecificContext } from "./specific_context";
import { Link, useNavigate } from "react-router-dom";
import HeaderBase from "./header_base";
import { BASE_URL } from "../utils/constants";
import AuthorizeAccount from "../pages/auth/authorize";

const BillPayPage: React.FC<Widthheight> = ({ url }) => {
  const specificContext = useContext<any>(SpecificContext);
  const { insuranceOrder, setInsuranceOrder } = specificContext;
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardeName, setWardeName] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    events.on(EventName.OnDataCallback, (resp) => {
      const { eventType, data } = resp;
      if (eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate(`/buill-detail/${insuranceOrder.id}`);
      }
    });
  }, []);

  const createOrder = async () => {
    let dataClone = _.cloneDeep(insuranceOrder);
    const body: any = await {
      amount: insuranceOrder.finalPrice,
      desc: "Thanh toán gói bảo hiểm",
      item: [
        {
          id: `#${insuranceOrder.accountId}`,
          amount: insuranceOrder.finalPrice,
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

    console.log("orderId", orderId);
  };

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/province/api/detail/${insuranceOrder.provinceId}`

      )
      .then((response) => {
        setProvinceName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(
        `${BASE_URL}/district/api/detail/` +
        insuranceOrder.districtId
      )
      .then((response) => {
        setDistrictName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${BASE_URL}/ward/api/detail/` + insuranceOrder.wardId)
      .then((response) => {
        setWardeName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <HeaderBase isHome={false} title={"Đăng ký BHXH Tự nguyện"} />
      <AuthorizeAccount />
      <div className=" !pt-[95px] page-1 flex flex-col gap-4 mb-4 pb-[85px]">
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
                {insuranceOrder.fullName}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Email</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.email}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Số điện thoại
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                {insuranceOrder.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.addressDetail}, {wardeName}, {districtName},{" "}
                {provinceName}
              </p>
            </div>
          </div>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <h3 className="text-base font-medium text-[#0076B7]">
            Thông tin người được bảo hiểm
          </h3>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                {insuranceOrder.listInsuredPerson[0].fullName}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Số CCCD</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.listInsuredPerson[0].citizenId}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Số BHXH</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                {insuranceOrder.listInsuredPerson[0].socialInsuranceNumber}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Ngày sinh</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.listInsuredPerson[0].doB}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Giới tính</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.listInsuredPerson[0].gender}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Mức lương</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.listInsuredPerson[0].wage.toLocaleString(
                  "vi-VN"
                )}{" "}
                vnđ
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Ngân sách hỗ trợ
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.listInsuredPerson[0].supportBudget.toLocaleString(
                  "vi-VN"
                )}{" "}
                vnđ
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Số tháng đóng
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.listInsuredPerson[0].monthInsured} tháng
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Phí bảo hiểm</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.finalPrice.toLocaleString("vi-VN")} vnđ
              </p>
            </div>
          </div>
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
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
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
              {insuranceOrder.finalPrice.toLocaleString("vi-VN")} VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              onClick={() => {
                createOrder();
              }}
              // to={"/buill-detail/" + insuranceOrder.id}
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillPayPage;

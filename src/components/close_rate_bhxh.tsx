import { Input } from "antd";
import { useState } from "react";
import { formatMoneyVND, isValidEmptyString } from "../utils/validate_string";
import { toast } from "react-toastify";
import axios from "axios";
import iconSearch from "../../assets-src/icon/ic_search.svg";
import iconRefresh from "../../assets-src/icon/ic_refresh.svg";
import React from "react";
import HeaderBase from "./header_base";

const CloseRateBXH = () => {
  const [baseSalary, setBaseSalary] = useState<string>("");
  const [months, setMonths] = useState<string>("");
  const [valueToPay, setValueToPay] = useState<any>();

  const validateForm2 = () => {
    if (!isValidEmptyString(baseSalary)) {
      toast.warn("Mức lương làm cơ sở đóng không để trống");
      return false;
    }
    if (!isValidEmptyString(months)) {
      toast.warn("Số tháng còn thiếu không để trống");
      return false;
    }

    if (
      Number(months.replace(/\D/g, "")) <= 0 ||
      Number(months.replace(/\D/g, "")) > 120
    ) {
      toast.warn("Số tháng phải lớn 0 và nhỏ hơn 120");
      return false;
    }
    return true;
  };

  return (
    <div>
      <HeaderBase isHome={false} title="Mức đóng BHXH còn thiếu" />
      <div className="p-4 mt-20">
        <div className="text-[16px] md:text-[18px] lg:text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[15px] md:p-[20px] lg:p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Mức đóng BHXH còn thiếu
        </div>
        <div className="p-3 md:p-4 lg:p-5 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <div className="w-full">
            <label className="block text-sm font-light pb-2 text-gray-900">
              Mức lương làm cơ sở đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <Input
                type="text"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5              "
                placeholder="Nhập mức lương đóng"
                required
                value={baseSalary}
                onChange={(e) => {
                  const numbers = e!.target.value.replace(/\D/g, "");
                  const numbersString = formatMoneyVND(Number(numbers));
                  setBaseSalary(numbersString);
                }}
              />

              <div className="absolute inset-y-0 right-[10px] top-0 flex items-center">
                <p className="text-base font-normal text-[#0077D5]">Vnđ</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-5">
            <label className="block text-sm font-light text-gray-900 pb-2">
              Số tháng còn thiếu <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5              "
              placeholder="Nhập mức lương đóng"
              required
              value={months}
              onChange={(e) => {
                const numbers = e!.target.value.replace(/\D/g, "");
                const numbersString = formatMoneyVND(Number(numbers));
                setMonths(numbersString);
              }}
            />
          </div>

          <div className="flex mt-5">
            <div
              onClick={async () => {
                if (validateForm2()) {
                  const response = await axios.get(
                    `https://baohiem.dion.vn/insurance/api/calculate-payment-missing-year?salary=${baseSalary.replace(
                      /\D/g,
                      ""
                    )}&monthsLeft=${months.replace(/\D/g, "")}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (response.data.status == "400") {
                    toast.warn(response.data.data[0][0]);
                    return;
                  }

                  if (response.data.status == "200") {
                    toast.success("Tra cứu thành công");

                    setValueToPay(response.data.data[0].valueToPay);
                    return;
                  }
                }
              }}
              className="rounded-[10px] cursor-pointer bg-[#0077D5] py-[10px] px-[20px] flex items-center w-[140px] border-[1.5px] border-solid border-[#0077D5]"
            >
              <img alt="Icon search" src={iconSearch} width={22} height={22} />
              <div className="pl-[10px] text-[white]">Tra cứu</div>
            </div>

            <div
              onClick={() => {
                setBaseSalary("");
                setMonths("");
                setValueToPay(null);
              }}
              className="rounded-[10px] cursor-pointer py-[10px] px-[20px] flex items-center w-[202px]"
            >
              <img alt="Icon refresh" src={iconRefresh} width={22} height={22} />
              <div className="pl-[10px] text-[#797D77]">Làm mới</div>
            </div>
          </div>

          {valueToPay != null && (
            <div className="mt-5">
              <div className="text-[16px] mb-5">Mức đóng BHXH còn thiếu:</div>
              <div className="text-[#0077D5]">
                <span>{formatMoneyVND(valueToPay)}</span>
                <span className="pl-1">Vnđ</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default CloseRateBXH;

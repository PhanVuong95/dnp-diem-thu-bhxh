import { DatePicker, Input, Select } from "antd";
import { useState } from "react";
import iconPlush from "../../assets-src/icon/ic_plush.svg";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import {
  compareTwoDateString,
  formatMoneyVND,
  isValidEmptyString,
} from "../utils/validate_string";
import { toast } from "react-toastify";
import axios from "axios";
import iconSearch from "../../assets-src/icon/ic_search.svg";
import iconRefresh from "../../assets-src/icon/ic_refresh.svg";
import React from "react";
import HeaderBase from "./header_base";

const PensionCalculation = () => {
  const [gender, setGender] = useState("");
  const dateFormat = "MM/YYYY";
  const [insurancePaymentPeriod, setInsurancePaymentPeriod] = useState([
    {
      FromDate: "",
      ToDate: "",
      PaymentValue: "",
    },
  ]);
  const [salary, setSalary] = useState<any>();

  const validateForm = () => {
    if (!isValidEmptyString(gender)) {
      toast.warn("Giới tính không được để trống");
      return false;
    }
    for (let index = 0; index < insurancePaymentPeriod.length; index++) {
      const element = insurancePaymentPeriod[index];
      if (!isValidEmptyString(element.FromDate)) {
        toast.warn("Ngày bắt đầu không được để trống");
        return false;
      }
      if (!isValidEmptyString(element.FromDate)) {
        toast.warn("Ngày kết thúc không được để trống");
        return false;
      }
      if (compareTwoDateString(element.FromDate, element.ToDate) != 1) {
        toast.warn("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        return false;
      }
      if (!isValidEmptyString(element.PaymentValue)) {
        toast.warn("Mức lương đóng không được để trống");
        return false;
      }
    }

    return true;
  };

  return (
    <div>
      <HeaderBase isHome={false} title="Tính toán lương hưu" />
      <div className="p-4 mt-20">
        <div className="text-[16px] md:text-[18px] lg:text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[15px] md:p-[20px] lg:p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Tính toán lương hưu
        </div>
        <div className="p-3 md:p-4 lg:5 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-2">
              Giới tính <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              placeholder="Chọn giới tính"
              value={gender}
              onChange={(value) => {
                setGender(value);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: "", label: "Chọn giới tính" },
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
            />
          </div>

          <div className="text-[16px] my-3 md:my-4 lg:my-5">
            Quá trình đóng bảo hiểm xã hội
          </div>

          <div
            onClick={() => {
              setInsurancePaymentPeriod([
                ...insurancePaymentPeriod,
                {
                  FromDate: "",
                  ToDate: "",
                  PaymentValue: "",
                },
              ]);
            }}
            className="rounded-[10px] cursor-pointer py-[10px] px-[20px] flex items-center w-[202px] mb-5 border-[1.5px] border-solid border-[#0077D5]"
          >

            <img
              alt="Icon tính toán lương"
              src={iconPlush}
              width={25}
              height={25}
            />
            <div className="pl-[10px] text-[#0077D5]">Thêm quá trình</div>
          </div>

          {insurancePaymentPeriod.map((_item, index) => {
            return (
              <div className="flex flex-col md:flex-row lg:flex-row gap-5 md:gap-5 lg:gap-10  mb-3 md:mb-4 lg:mb-5">
                <div className="flex-[12] md:flex-[4] lg:flex-[4]">
                  <div className="w-full">
                    <label className="block text-sm font-light text-gray-900 pb-2">
                      Từ <samp className="text-red-600">*</samp>
                    </label>
                    <DatePicker
                      type="date"
                      size="large"
                      locale={locale}
                      className="w-[100%]"
                      picker="month"
                      value={
                        _item.FromDate
                          ? dayjs(_item.FromDate, "DD/MM/YYYY")
                          : null
                      }
                      placeholder="mm/yyyy"
                      onChange={(value) => {
                        try {
                          const dateObject = dayjs(value.toString());
                          const FromDate = `${"01"}/${(dateObject.month() + 1)
                            .toString()
                            .padStart(2, "0")}/${dateObject.year()}`;
                          setInsurancePaymentPeriod((prevState) =>
                            prevState.map((item, i) =>
                              i === index
                                ? {
                                  ...item,
                                  FromDate: FromDate,
                                }
                                : item
                            )
                          );
                        } catch (error) {
                          setInsurancePaymentPeriod((prevState) =>
                            prevState.map((item, i) =>
                              i === index
                                ? {
                                  ...item,
                                  FromDate: "",
                                }
                                : item
                            )
                          );
                        }
                      }}
                      format={dateFormat}
                    />
                  </div>
                </div>
                <div className="flex-[12] md:flex-[4] lg:flex-[4]">
                  <div className="w-full">
                    <label className="block text-sm font-light text-gray-900 pb-2">
                      Đến <samp className="text-red-600">*</samp>
                    </label>
                    <DatePicker
                      type="date"
                      size="large"
                      locale={locale}
                      className="w-[100%]"
                      picker="month"
                      value={
                        _item.ToDate ? dayjs(_item.ToDate, "DD/MM/YYYY") : null
                      }
                      placeholder="mm/yyyy"
                      onChange={(value) => {
                        try {
                          const dateObject = dayjs(value.toString());
                          const ToDate = `${"01"}/${(dateObject.month() + 1)
                            .toString()
                            .padStart(2, "0")}/${dateObject.year()}`;

                          setInsurancePaymentPeriod((prevState) =>
                            prevState.map((item, i) =>
                              i === index
                                ? {
                                  ...item,
                                  ToDate: ToDate,
                                }
                                : item
                            )
                          );
                        } catch (error) {
                          setInsurancePaymentPeriod((prevState) =>
                            prevState.map((item, i) =>
                              i === index
                                ? {
                                  ...item,
                                  ToDate: "",
                                }
                                : item
                            )
                          );
                        }
                      }}
                      format={dateFormat}
                    />
                  </div>
                </div>
                <div className="flex-[12] md:flex-[4] lg:flex-[4]">
                  <label className="block text-sm font-normal pb-2 text-gray-900">
                    Mức lương đóng <samp className="text-red-600">*</samp>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={insurancePaymentPeriod[index].PaymentValue}
                      onChange={(e) => {
                        const numbers = e!.target.value.replace(/\D/g, "");

                        const numbersString = formatMoneyVND(Number(numbers));
                        setInsurancePaymentPeriod((prevState) =>
                          prevState.map((item, i) =>
                            i === index
                              ? {
                                ...item,
                                PaymentValue: numbersString,
                              }
                              : item
                          )
                        );
                      }}
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5              "
                      placeholder="Nhập mức lương đóng"
                      required
                    />

                    <div className="absolute inset-y-0 right-[5%] top-0 flex items-center">
                      <p className="text-base font-normal text-[#0077D5]">Vnđ</p>
                    </div>
                  </div>
                </div>
                <div className="border"></div>
              </div>
            );
          })}

          <div className="flex mt-5">
            <div
              onClick={async () => {
                if (validateForm()) {
                  const insurancePayment = insurancePaymentPeriod.map((item) => ({
                    ...item,
                    PaymentValue: parseInt(item.PaymentValue.replace(/\D/g, "")),
                  }));

                  const data = {
                    PensionRate: {
                      Gender: gender == "Nam" ? 1 : 0,
                    },
                    InsurancePaymentPeriod: insurancePayment,
                  };

                  const response = await axios.post(
                    "https://baohiem.dion.vn/insurance/api/calculate-monthly-pension",
                    data,
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
                    setSalary(response.data.data[0].monthlyPensionValue);
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
                setSalary(null);
                setGender("");
                setInsurancePaymentPeriod([
                  {
                    FromDate: "",
                    ToDate: "",
                    PaymentValue: "",
                  },
                ]);
              }}
              className="rounded-[10px] cursor-pointer py-[10px] px-[20px] flex items-center w-[202px]"
            >
              <img alt="Icon refresh" src={iconRefresh} width={22} height={22} />
              <div className="pl-[10px] text-[#797D77]">Làm mới</div>
            </div>
          </div>

          {salary != null && (
            <div className="mt-5">
              <div className="text-[16px] mb-5">
                Lương hưu nhận được trong 1 tháng:
              </div>
              <div className="text-[#0077D5]">
                <span>{formatMoneyVND(salary)}</span>
                <span className="pl-1">Vnđ</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default PensionCalculation;

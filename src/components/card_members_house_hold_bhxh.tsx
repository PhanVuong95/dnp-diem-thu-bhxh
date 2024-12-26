import { DatePicker, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import iconClose from '../../assets-src/close_1.png'
import { convertListToSelect, formatDate2 } from "../utils/validateString";
import "../locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
dayjs.locale("vi");
dayjs.extend(customParseFormat);

interface Props {
  onClose: (index) => void,
  index: number,
  members: any,
  ethnicLists: any,
  insuranceOrder: any,
  provinces: any
}

const CardMembersHouseHoldBHXH = (props: Props) => {
  const { index, onClose, members, insuranceOrder, ethnicLists, provinces } = props
  const dateFormat = "DD/MM/YYYY";

  const memberProvinces = useRef([]);
  const memberDistricts = useRef([]);
  const memberWards = useRef([]);

  const [selectedMemberProvince, setSelectedMemberProvince] = useState(insuranceOrder.houseHold.houseHoldPeoples[index].ksProvinceId);
  const [selectedMemberDistrict, setSelectedMemberDistrict] = useState(insuranceOrder.houseHold.houseHoldPeoples[index].ksDistrictId);
  const [selectedMemberWard, setSelectedMemberWard] = useState(insuranceOrder.houseHold.houseHoldPeoples[index].ksWardId);
  const [addressDetailMember, setAddressDetailMember] = useState<string>(insuranceOrder.houseHold.houseHoldPeoples[index].ksAddressDetail);

  const [temp, setTemp] = useState(false);

  // Cập nhập danh sách quận huyện hộ gia đình
  useEffect(() => {
    fetchMemberProvinces();
  }, [selectedMemberProvince]);

  const fetchMemberProvinces = () => {
    if (selectedMemberProvince !== 0) {
      axios.get(`${BASE_URL}/district/api/list-by-provinceId?provinceId=${selectedMemberProvince}`)
        .then((response) => {
          memberDistricts.current = response.data.data;
          memberWards.current = [];
          setTemp(!temp);
        })
        .catch((error) => {
          memberDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã hộ gia đình
  useEffect(() => {
    fetchMemberWards();
  }, [selectedMemberDistrict]);

  const fetchMemberWards = () => {
    if (selectedMemberDistrict !== 0) {
      axios
        .get(
          `${BASE_URL}/ward/api/list-by-districtId?districtId=${selectedMemberDistrict}`
        )
        .then((response) => {
          memberWards.current = response.data.data;
          setTemp(!temp)
        })
        .catch((error) => {
          memberWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  const inputCCCDMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          maxLength={12}
          ref={members[index].citizenId}
          defaultValue={insuranceOrder.houseHold.houseHoldPeoples[index].citizenId}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập CCCD"
          onChange={(e) => {

            insuranceOrder.houseHold.houseHoldPeoples[index].citizenId = e.target.value;

          }}
        />
      </div>
    )
  }

  const inputEthnicMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Dân tộc <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          ref={members[index].ethnicId}
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn dân tộc"
          defaultValue={insuranceOrder.houseHold.houseHoldPeoples[index].ethnicId}
          onChange={(value) => {

            insuranceOrder.houseHold.houseHoldPeoples[index].ethnicId = value;

          }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            convertListToSelect(ethnicLists, "Chọn dân tộc")
          }
        />
      </div>
    )
  }

  const inputGenderMemder = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          placeholder="Chọn giới tính"
          ref={members[index].gender}
          defaultValue={insuranceOrder.houseHold.houseHoldPeoples[index].gender}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            insuranceOrder.houseHold.houseHoldPeoples[index].gender = value;

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn giới tính" },
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
          ]}
        />
      </div>
    )
  }

  const inputFullNameMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={members[index].name}
          defaultValue={insuranceOrder.houseHold.houseHoldPeoples[index].name}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {

            insuranceOrder.houseHold.houseHoldPeoples[index].name = e.target.value;

          }}
        />
      </div>
    )
  }

  const inputRelationshipMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Mối quan hệ <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={members[index].relationShipId}
          placeholder="Chọn mối quan hệ"
          dropdownMatchSelectWidth={false}
          defaultValue={insuranceOrder.houseHold.houseHoldPeoples[index].relationShipId}
          onChange={(value) => {

            insuranceOrder.houseHold.houseHoldPeoples[index].relationShipId = value;

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn mối quan hệ" },
            { value: "00", label: "Chủ hộ" },
            { value: "01", label: "Vợ" },
            { value: "02", label: "Chồng" },
            { value: "03", label: "Bố" },
            { value: "04", label: "Mẹ" },
            { value: "05", label: "Em" },
            { value: "06", label: "Anh" },
            { value: "07", label: "Chị" },
            { value: "08", label: "Con" },
            { value: "09", label: "Cháu" },
            { value: "10", label: "Ông" },
            { value: "11", label: "Bà" },
            { value: "12", label: "Cô" },
            { value: "13", label: "Dì" },
            { value: "14", label: "Chú" },
            { value: "15", label: "Thím" },
            { value: "16", label: "Bác" },
            { value: "17", label: "Cậu" },
            { value: "18", label: "Mợ" },
            { value: "19", label: "Con dâu" },
            { value: "20", label: "Con rể" },
            { value: "21", label: "Chắt" },
            { value: "99", label: "Khác" },
          ]}
        />
      </div>
    )
  }

  const inputDobMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          className="w-[100%]"
          ref={members[index].doB}
          placeholder="dd/mm/yyyy"
          defaultValue={insuranceOrder.houseHold.houseHoldPeoples[index].doB == "" ? "" : dayjs(insuranceOrder.houseHold.houseHoldPeoples[index].doB, dateFormat)}
          onChange={(value) => {
            const dateObject = dayjs(value.toString());
            const dateStr = `${dateObject.date().toString().padStart(2, "0")}/${(
              dateObject.month() + 1
            )
              .toString()
              .padStart(2, "0")}/${dateObject.year()}`;

            insuranceOrder.houseHold.houseHoldPeoples[index].doB = dateStr;
          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />
      </div>
    )
  }

  const inputProvinceMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành phố khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={members[index].ksProvinceId}
          dropdownMatchSelectWidth={false}
          placeholder="Thành phố"
          value={selectedMemberProvince}
          key={selectedMemberProvince}
          onChange={(value: any) => {
            setSelectedMemberProvince(value);

            memberDistricts.current = []
            memberWards.current = []

            setSelectedMemberDistrict(0)
            setSelectedMemberWard(0)

            insuranceOrder.houseHold.houseHoldPeoples[index].ksProvinceId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, "Thành phố")}
        />
      </div>
    )
  }

  const inputDistrictMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Quận huyện"
          ref={members[index].ksDistrictId}
          value={selectedMemberDistrict}
          key={selectedMemberDistrict}
          onChange={(value: any) => {
            setSelectedMemberDistrict(value);

            memberWards.current = []
            setSelectedMemberWard(0)

            insuranceOrder.houseHold.houseHoldPeoples[index].ksDistrictId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(memberDistricts.current, "Quận huyện")}
        />
      </div>
    )
  }

  const inputWardMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={members[index].ksWardId}
          dropdownMatchSelectWidth={false}
          placeholder="Phường xã"
          value={selectedMemberWard}
          key={selectedMemberWard}
          onChange={(value: any) => {
            setSelectedMemberWard(value);

            insuranceOrder.houseHold.houseHoldPeoples[index].ksWardId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(memberWards.current, "Phường xã")}
        />
      </div>
    )
  }

  const inputAddressDetailMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể khai sinh
        </label>
        <Input
          type="text"
          ref={members[index].ksAddressDetail}
          value={addressDetailMember}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Địa chỉ cụ thể"
          onChange={(e) => {
            setAddressDetailMember(e.target.value);

            insuranceOrder.houseHold.houseHoldPeoples[index].ksAddressDetail = e.target.value
          }}
        />
      </div>
    )
  }

  return (
    <div key={`${index}`} className="p-4 rounded-xl flex flex-col gap-6 border border-gray-300">
      <div className="flex justify-between">
        <div className="text-[#0076B7] text-sm font-medium">Thông tin thành viên số {index + 1}</div>
        {index != 0 ?
          <button type="button"
            onClick={() => {
              onClose(index);
            }}
          >
            <img src={iconClose} className="w-3 h-3" />
          </button>
          :
          null
        }
      </div>

      {/* Số CCCD thành viên  */}
      {inputCCCDMember()}

      {/* Dân tộc */}
      {inputEthnicMember()}

      {/* Giới tính thành viên */}
      {inputGenderMemder()}

      {/* Họ tên */}
      {inputFullNameMember()}

      {/* Mối quan hệ */}
      {inputRelationshipMember()}

      {/* Ngày sinh */}
      {inputDobMember()}

      {/* Tỉnh thành phố khai sinh  */}
      {inputProvinceMember()}

      {/* Quận huyện khai sinh */}
      {inputDistrictMember()}

      {/* Phường xã khai sinh */}
      {inputWardMember()}

      {/* Địa chỉ cụ thể khai sinh */}
      {inputAddressDetailMember()}
    </div>
  )
}

export default CardMembersHouseHoldBHXH;
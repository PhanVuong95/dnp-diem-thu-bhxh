import { Input, Select } from "antd";
import React, { useRef, useState } from "react";
import { convertListToSelect } from "../utils/validateString";
import "../locale/vi";
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface Props {
  refs: any;
}

const CardHouseHold = (props: Props) => {
  const { refs } = props;

  const [fullNamHouseHoldParticipant, setFullNamHouseHoldParticipant] = useState<string>(registerInfoBHYT.houseHold.chuHoTen);
  const [cccdHouseHoldParticipant, setCCCDHouseHoldParticipant] = useState<string>(registerInfoBHYT.houseHold.soGiayToCaNhan);
  const [selectedHouseholdProvince, setSelectedHouseholdProvince] = useState(registerInfoBHYT.houseHold.ksProvinceId);
  const [selectedHouseholdDistrict, setSelectedHouseholdDistrict] = useState(registerInfoBHYT.houseHold.ksDistrictId);
  const [selectedHouseholdWard, setSelectedHouseholdWard] = useState(registerInfoBHYT.houseHold.ksWardId);

  const householdProvinces = useRef([]);
  const householdDistricts = useRef([]);
  const householdWards = useRef([]);

  const householdTTProvinces = useRef([]);
  const householdTTDistricts = useRef([]);
  const householdTTWards = useRef([]);

  const [selectedTTHouseholdProvince, setSelectedTTHouseholdProvince] = useState(registerInfoBHYT.houseHold.ttProvinceId);
  const [selectedTTHouseholdDistrict, setSelectedTTHouseholdDistrict] = useState(registerInfoBHYT.houseHold.ttDistrictId);
  const [selectedTTHouseholdWard, setSelectedTTHouseholdWard] = useState(registerInfoBHYT.houseHold.ttWardId);

  const [addressDetailHouseHoldParticipant, setAddressDetailHouseHoldParticipant] = useState<string>(registerInfoBHYT.houseHold.ksAddressDetail);
  const [addressDetailHKHouseHoldParticipant, setAddressDetailHKHouseHoldParticipant] = useState<string>(registerInfoBHYT.houseHold.hkAddressDetail);

  const [temp, setTemp] = useState(false);

  // Load lại tất cả danh sách tỉnh thành
  useEffect(() => {
    axios
      .get(`${BASE_URL}/province/api/list`)
      .then((response) => {

        householdProvinces.current = response.data.data

        householdTTProvinces.current = response.data.data

        setTemp(!temp)
      })
      .catch((error) => {
        householdProvinces.current = []
        householdTTProvinces.current = []
        console.error(error);
      });
  }, []);

  // Cập nhập danh sách quận huyện hộ gia đình
  useEffect(() => {
    fetchHouseholdProvinces();
  }, [selectedHouseholdProvince]);

  const fetchHouseholdProvinces = () => {
    if (selectedHouseholdProvince !== 0) {
      axios.get(`${BASE_URL}/district/api/list-by-provinceId?provinceId=${selectedHouseholdProvince}`)
        .then((response) => {
          householdDistricts.current = response.data.data;
          householdWards.current = [];
          setTemp(!temp);
        })
        .catch((error) => {
          householdDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã hộ gia đình
  useEffect(() => {
    fetchHouseholdWards();
  }, [selectedHouseholdDistrict]);

  const fetchHouseholdWards = () => {
    if (selectedHouseholdDistrict !== 0) {
      axios
        .get(
          `${BASE_URL}/ward/api/list-by-districtId?districtId=${selectedHouseholdDistrict}`
        )
        .then((response) => {
          householdWards.current = response.data.data;
          setTemp(!temp)
        })
        .catch((error) => {
          householdWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách quận huyện thường trú hộ gia đình
  useEffect(() => {
    fetchTTHouseholdProvinces();
  }, [selectedTTHouseholdProvince]);

  const fetchTTHouseholdProvinces = () => {
    if (selectedTTHouseholdProvince !== 0) {
      axios.get(`${BASE_URL}/district/api/list-by-provinceId?provinceId=${selectedTTHouseholdProvince}`)
        .then((response) => {
          householdTTDistricts.current = response.data.data;
          householdTTWards.current = [];
          setTemp(!temp);
        })
        .catch((error) => {
          householdTTDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã hộ gia đình
  useEffect(() => {
    fetchTTHouseholdWards();
  }, [selectedTTHouseholdDistrict]);

  const fetchTTHouseholdWards = () => {
    if (selectedTTHouseholdDistrict !== 0) {
      axios
        .get(
          `${BASE_URL}/ward/api/list-by-districtId?districtId=${selectedTTHouseholdDistrict}`
        )
        .then((response) => {
          householdTTWards.current = response.data.data;
          setTemp(!temp)
        })
        .catch((error) => {
          householdTTWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  const renderTextHeader = () => {
    return (
      <h3 className="text-[#0076B7] text-lg font-medium">
        Thông tin hộ gia đình
      </h3>
    )
  }

  const inputFullNamHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ tên chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={refs.fullNamHouseHoldParticipant}
          value={fullNamHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {
            setFullNamHouseHoldParticipant(e.target.value);

            registerInfoBHYT.houseHold.chuHoTen = e.target.value

          }}
        />
      </div>
    )
  }


  const inputCCCDHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"

          maxLength={12}
          ref={refs.cccdHouseHoldParticipant}
          value={cccdHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số CCCD"
          onChange={(e) => {
            setCCCDHouseHoldParticipant(e.target.value);

            registerInfoBHYT.houseHold.soGiayToCaNhan = e.target.value
          }}
        />
      </div>
    )
  }

  const inputProvinceHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành phố khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedHouseholdProvince}
          dropdownMatchSelectWidth={false}
          placeholder="Thành phố"
          value={selectedHouseholdProvince}
          key={selectedHouseholdProvince}
          onChange={(value: any) => {
            setSelectedHouseholdProvince(value);

            householdDistricts.current = []
            householdWards.current = []

            setSelectedHouseholdDistrict(0)
            setSelectedHouseholdWard(0)

            registerInfoBHYT.houseHold.ksProvinceId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdProvinces.current, "Thành phố")}
        />
      </div>
    )
  }

  const inputDistrictHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Quận huyện"
          ref={refs.selectedHouseholdDistrict}
          value={selectedHouseholdDistrict}
          key={selectedHouseholdDistrict}
          onChange={(value: any) => {
            setSelectedHouseholdDistrict(value);

            householdWards.current = []
            setSelectedHouseholdWard(0)

            registerInfoBHYT.houseHold.ksDistrictId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdDistricts.current, "Quận huyện")}
        />
      </div>
    )
  }

  const inputWardHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedHouseholdWard}
          dropdownMatchSelectWidth={false}
          placeholder="Phường xã"
          value={selectedHouseholdWard}
          key={selectedHouseholdWard}
          onChange={(value: any) => {
            setSelectedHouseholdWard(value);

            registerInfoBHYT.houseHold.ksWardId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdWards.current, "Phường xã")}
        />
      </div>
    )
  }

  const inputAddressDetailHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể khai sinh<samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"

          ref={refs.addressDetailHouseHoldParticipant}
          value={addressDetailHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Địa chỉ cụ thể"
          onChange={(e) => {
            setAddressDetailHouseHoldParticipant(e.target.value);

            registerInfoBHYT.houseHold.ksAddressDetail = e.target.value
          }}
        />
      </div>
    )
  }

  const inputTTProvinceHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành phố thường trú <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Thành phố"
          ref={refs.selectedTTHouseholdProvince}
          value={selectedTTHouseholdProvince}
          key={selectedTTHouseholdProvince}
          onChange={(value: any) => {

            setSelectedTTHouseholdProvince(value);

            householdTTDistricts.current = []
            householdTTWards.current = []

            setSelectedTTHouseholdDistrict(0)
            setSelectedTTHouseholdWard(0)

            registerInfoBHYT.houseHold.ttProvinceId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdTTProvinces.current, "Thành phố")}
        />
      </div>
    )
  }


  const inputTTDistrictHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện thường trú <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Quận huyện"
          ref={refs.selectedTTHouseholdDistrict}
          value={selectedTTHouseholdDistrict}
          key={selectedTTHouseholdDistrict}
          onChange={(value: any) => {
            setSelectedTTHouseholdDistrict(value);

            householdTTWards.current = []
            setSelectedTTHouseholdWard(0)

            registerInfoBHYT.houseHold.ttDistrictId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdTTDistricts.current, "Quận huyện")}
        />
      </div>
    )
  }

  const inputTTWardHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã thường trú <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Phường xã"
          ref={refs.selectedTTHouseholdWard}
          value={selectedTTHouseholdWard}
          key={selectedTTHouseholdWard}
          onChange={(value: any) => {
            setSelectedTTHouseholdWard(value);

            registerInfoBHYT.houseHold.ttWardId = value
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdTTWards.current, "Phường xã")}
        />
      </div>
    )
  }

  const inputAddressDetailHKHouseHoldParticipants = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ hộ khẩu <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"

          ref={refs.addressDetailHKHouseHoldParticipant}
          value={addressDetailHKHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Địa chỉ cụ thể"
          onChange={(e) => {
            setAddressDetailHKHouseHoldParticipant(e.target.value);

            registerInfoBHYT.houseHold.hkAddressDetail = e.target.value
          }}
        />
      </div>
    )
  }

  return (
    <div>
      {renderTextHeader()}

      {/* Họ tên chủ hộ */}
      {inputFullNamHouseHoldParticipants()}

      {/* Số CCCD */}
      {inputCCCDHouseHoldParticipants()}

      {/* Tỉnh thành khai sinh */}
      {inputProvinceHouseHoldParticipants()}

      {/* Quận huyện khai sinh */}
      {inputDistrictHouseHoldParticipants()}

      {/* Phường xã khai sinh */}
      {inputWardHouseHoldParticipants()}

      {/* Địa chỉ cụ thể */}
      {inputAddressDetailHouseHoldParticipants()}

      {/* Thành phố thường trú */}
      {inputTTProvinceHouseHoldParticipants()}

      {/* Quận huyện thường trú */}
      {inputTTDistrictHouseHoldParticipants()}

      {/* Phường xã thường trú */}
      {inputTTWardHouseHoldParticipants()}

      {/* Địa chỉ hộ khẩu */}
      {inputAddressDetailHKHouseHoldParticipants()}


    </div>
  )
}

export default CardHouseHold;
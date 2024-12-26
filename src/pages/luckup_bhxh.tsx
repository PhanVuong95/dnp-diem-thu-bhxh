import { DatePicker, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import HeaderBase from "../components/header_base";
import '../locale/vi';
import dayjs from 'dayjs';
import locale from "antd/es/date-picker/locale/vi_VN";
import { convertListToSelect, formatDate2 } from "../utils/validate_string";
import axios from "axios";
import { Province } from "../models";
import { toast } from "react-toastify";
import noData from "../../assets-src/no_data.png";
import { FadeLoader } from "react-spinners";
import Modal from 'react-modal';
import icon from "../../assets-src/icon_coppy.png"
import { BASE_URL } from "../utils/constants";

const LuckUpBHXH = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>({});
  const [fullName, setFullName] = useState<any>('');
  const [dob, setDob] = useState<any>("");
  const dateFormat = 'DD/MM/YYYY';
  const [gender, setGender] = useState();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const ksProvinces = useRef([]);
  const ksDistricts = useRef([]);
  const ksWards = useRef([]);
  const [selectedKSProvince, setSelectedKSProvince] = useState<number>(0);
  const [selectedKSDistrict, setSelectedKSDistrict] = useState<number>(0);
  const [selectedKSWard, setSelectedKSWard] = useState<number>(0);
  const [temp, setTemp] = useState(0);
  const [dateStr, setDateStr] = useState("");
  const [socialInsuranceCode, setSocialInsuranceCode] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Danh sách tỉnh thành
  useEffect(() => {
    axios
      .get(`${BASE_URL}/province/api/list`)
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  // Cập nhập danh sách quận huyện địa chỉ khai sinh
  useEffect(() => {
    fetchKSDistricts();
  }, [selectedKSProvince]);

  const fetchKSDistricts = () => {
    if (selectedKSProvince !== 0) {
      axios.get(`${BASE_URL}/district/api/list-by-provinceId?provinceId=${selectedKSProvince}`)
        .then((response) => {
          ksDistricts.current = response.data.data;

          ksWards.current = [];

          setTemp(Math.random())
        })
        .catch((error) => {
          ksDistricts.current = [];
          setTemp(Math.random());
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã khai sinh
  useEffect(() => {
    fetchKSWards();
  }, [selectedKSDistrict]);

  const fetchKSWards = () => {
    if (selectedKSDistrict !== 0) {
      axios
        .get(
          `${BASE_URL}/ward/api/list-by-districtId?districtId=${selectedKSDistrict}`
        )
        .then((response) => {
          ksWards.current = response.data.data;
          setTemp(Math.random());
        })
        .catch((error) => {
          ksWards.current = []
          setTemp(Math.random());
          console.error(error);
        });
    }
  }

  const renderFullName = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => {
            const value = e.target.value;

            setFullName(value);


            if (e.target.value == "") {
              setErrors({ ...errors, ...{ "fullName": "Họ và tên không được để trống" } })
            } else {
              setErrors({ ...errors, ...{ "fullName": "" } })
            }
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        />


        {errors.fullName && <div className="mt-2 text-red-500">{errors.fullName}</div>}
      </div>
    )
  }

  const renderDob = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          className="w-[100%]"
          value={dob}
          placeholder="dd/mm/yyyy"
          onChange={(e) => {
            const dateObject = dayjs(e.toString());
            const dateStr = `${dateObject.date().toString().padStart(2, '0')}/${(dateObject.month() + 1).toString().padStart(2, '0')}/${dateObject.year()}`
            setDateStr(dateStr);

            setDob(dayjs(dateStr, dateFormat))

          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />


        {errors.dob && <div className="mt-2 text-red-500">{errors.dob}</div>}
      </div>
    )
  }

  const renderGender = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          placeholder="Chọn giới tính"
          value={gender}
          onChange={(value) => {
            setGender(value);

          }}
          key={gender}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            [
              { value: '', label: 'Chọn giới tính' },
              { value: 'Nam', label: 'Nam' },
              { value: 'Nữ', label: 'Nữ' },
            ]
          }
        />
        {errors.gender && <div className="mt-2 text-red-500">{errors.gender}</div>}
      </div>
    )
  }

  const inputKSProvinceParticipate = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành khai sinh <samp className="text-red-600">*</samp>
        </label>

        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn tỉnh thành phố"
          dropdownMatchSelectWidth={false}
          value={selectedKSProvince}
          onChange={(value) => {
            ksDistricts.current = []
            ksWards.current = []

            setSelectedKSDistrict(0)
            setSelectedKSWard(0)

            setSelectedKSProvince(value);

          }}
          key={selectedKSProvince}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputKSDistrictParticipants = () => {
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
          placeholder="Chọn quận huyện"
          value={selectedKSDistrict}
          key={selectedKSDistrict}
          onChange={(value) => {
            ksWards.current = []
            setSelectedKSWard(0)

            setSelectedKSDistrict(value);

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ksDistricts.current, "Chọn quận huyện")}
        />
      </div>
    )
  }

  const inputKSWardParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn phường xã"
          value={selectedKSWard}
          onChange={(value: any) => {

            setSelectedKSWard(value);

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ksWards.current, "Chọn phường xã")}
        />
      </div>
    )
  }

  const validateForm = () => {
    if (fullName == "" || fullName == null) {
      toast.warn(
        "Họ và tên không được để trống",
      );
      return false;
    }
    if (dateStr == "") {
      toast.warn(
        "Ngày sinh không được để trống",
      );
      return false;
    }
    if (gender == null) {
      toast.warn(
        "Giới tính không được để trống",
      );
      return false;
    }
    if (selectedKSProvince == 0) {
      toast.warn(
        "Tỉnh thành phố khai sinh không được để trống",
      );
      return false;
    }
    if (selectedKSDistrict == 0) {
      toast.warn(
        "Quận huyện khai sinh không được để trống",
      );
      return false;
    }
    if (selectedKSWard == 0) {
      toast.warn(
        "Phường xã khai sinh không được để trống",
      );
      return false;
    }
    return true;
  }

  const onSubmitFormData = async () => {
    setBtnLoading(true)
    const token = localStorage.token;
    const data = {
      "name": fullName,
      "doB": dateStr,
      "Gender": gender,
      "ProvinceId": selectedKSProvince,
      "DistrictId": selectedKSDistrict,
      "WardId": selectedKSWard
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/InsuranceOrder/api/search-social-insurance-number`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message == "SUCCESS") {

        toast.success(
          "Tra cứu mã bảo hiểm thành công",
        );
        setSocialInsuranceCode(response.data.data[0].maSoBhxh)
      }

      if (response.data.message == "BAD_REQUEST") {
        toast.warn(
          "Không tìm thấy mã số BHXH",
        );
        setSocialInsuranceCode("")
      }

      setIsSearched(true)
      setBtnLoading(false)

    } catch (error) {
      toast.error(
        "Tra cứu mã bảo hiểm thất bại",
      );
      setSocialInsuranceCode("")
      setBtnLoading(false)
    }
  }

  const styleModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      border: 'none',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  }

  const modalLoading = () => {
    return (
      <>
        <Modal
          isOpen={btnLoading}
          style={styleModal}
          ariaHideApp={false}
        >
          <div className="w-[400px] h-[750px] relative flex justify-center items-center">
            <FadeLoader height={10} width={3} loading={true} color="#ffffff" />
          </div>
        </Modal>
      </>
    )
  }

  const btnSubmit = () => {
    return (
      <div className="flex flex-row content-center justify-center items-center">
        <button type="button"
          disabled={btnLoading}
          onClick={() => {
            if (validateForm()) {
              onSubmitFormData()
            }
          }}
          className="px-[20px] py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
        >
          Tra cứu
        </button>
      </div>
    )
  }

  return (
    <div>
      <HeaderBase
        isHome={false}
        title={"Tra cứu BHXH"}
      />

      <div className=" flex flex-col gap-4 pt-[100px] pb-[80px]">
        <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-4">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Nhập thông tin
          </h3>

          {renderFullName()}

          {renderDob()}

          {renderGender()}

          <h3 className="text-[#0076B7] text-lg font-medium">
            Địa chỉ khai sinh
          </h3>

          {/* Tỉnh thành  khai sinh*/}
          {inputKSProvinceParticipate()}

          {/* Quận huyện khai sinh*/}
          {inputKSDistrictParticipants()}

          {/* Phường xã khai sinh*/}
          {inputKSWardParticipants()}

          {btnSubmit()}
        </div>

        {(isSearched == true && socialInsuranceCode != "") && <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-4">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Kiểm tra kết quả
          </h3>

          <div>
            Mã BHXH của bạn
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(socialInsuranceCode)
            }
            }
            className="flex shadow-[0px_2px_6px_0px_rgba(20,20,21,0.14)] py-2 px-2 rounded-xl justify-between items-center">
            <div className="text-[#0076B7] text-lg font-medium">{socialInsuranceCode}</div>
            <div className="flex border p-2 rounded-xl items-center border-spacing-2">
              <img className="w-4 h-4" src={icon} />
              <div className="ml-2 text-[#797D77] text-lg font-normal"> Sao chép</div>
            </div>
          </div>
        </div>}

        {(isSearched == true && socialInsuranceCode == "") &&

          <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-4">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Kiểm tra kết quả
            </h3>

            <div className="flex justify-center items-center" >
              <img src={noData} width={120} height={130} />
            </div>
            <div className="flex justify-center items-center" >Không tìm thấy mã BHXH</div>

          </div>
        }

        {modalLoading()}

      </div>
    </div >
  )

}

export default LuckUpBHXH;
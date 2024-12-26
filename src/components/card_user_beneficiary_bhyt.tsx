import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FadeLoader } from "react-spinners";
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import { convertListToSelect, convertListToSelectVungLuong, formatDate, formatDate2, formatMoneyVND, formatTimeSql, isValidCitizenId, isValidEmptyString, isValidHealthInsuranceNumber, isValidSocialInsuranceNumber } from "../utils/validate_string";
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import iconClose from '../../assets-src/close_1.png'
import imageQR from '../../assets-src/icon_qr.png'
import { Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import '../locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from "antd/es/date-picker/locale/vi_VN";
import Modal from 'react-modal';
import Lottie from "lottie-react";
import lottieScanQR from "../../assets-src/lottie_scan_qr.json";
import { motion } from 'framer-motion';
import { BASE_URL, BenefitLevevlList } from "../utils/constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

dayjs.locale('vi');
dayjs.extend(customParseFormat);

interface Props {
  price: number,
  index: number,
  onClose: (index: number) => void,
  refs: any,
  provinces: any,
  windowSize: any,
  ethnicLists: any
}

const UserBeneficiaryBHYTPage = (props: Props) => {
  const { index, price, onClose, refs, provinces, windowSize, ethnicLists } = props;
  const dateFormat = 'DD/MM/YYYY';
  const [districts, setDistricts] = useState<any>([]);
  const [socialInsuranceNumber, setSocialInsuranceNumber] = useState(registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber);
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState(registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber);
  const [errors, setErrors] = useState<any>({});
  const [citizenId, setCitizenId] = useState(registerInfoBHYT["listInsuredPerson"][index].citizenId);
  const [photoCitizenFront, setPhotoCitizenFront] = useState(registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront);
  const [photoCitizenBack, setPhotoCitizenBack] = useState(registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack);
  const [isUploadingPhotoCitizenFont, setIsUploadingPhotoCitizenFont] = useState(false)
  const [isUploadingPhotoCitizenBack, setIsUploadingPhotoCitizenBack] = useState(false)

  const [fullName, setFullName] = useState(registerInfoBHYT["listInsuredPerson"][index].fullName.trim());
  const [dob, setDob] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].doB == "" ?
      "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].doB.trim(), 'DD/MM/YYYY')
  );

  const [gender, setGender] = useState(registerInfoBHYT["listInsuredPerson"][index].gender);
  const [ethnic, setEthnic] = useState(registerInfoBHYT["listInsuredPerson"][index].ethnicId);
  const [oldCardStartDate, setOldCardStartDate] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate == "" ?
      "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate.trim(), 'DD/MM/YYYY')
  );
  const [oldCardEndDate, setOldCardEndDate] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate == "" ? "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate.trim(), 'DD/MM/YYYY')

  );
  const [newCardEndDate, setNewCardEndDate] = useState(
    registerInfoBHYT["listInsuredPerson"][index].newCardEndDate == "" ? "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].newCardEndDate.trim(), 'DD/MM/YYYY')
  );
  // const [newCardStartDate, setNewCardStartDate] = useState<any>(
  //   registerInfoBHYT["listInsuredPerson"][index].newCardStartDate == "" ? "" :
  //     dayjs(registerInfoBHYT["listInsuredPerson"][index].newCardStartDate.trim(), 'DD/MM/YYYY')
  // );

  const [newCardStartDate, setNewCardStartDate] = useState<any>(
    formatDate(new Date())
  );

  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const [medicalProvinceId, setMedicalProvinceId] = useState<any>(registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId);
  const [medicalDistrictId, setMedicalDistrictId] = useState<any>(registerInfoBHYT["listInsuredPerson"][index].medicalDistrictId);
  const [hospitalId, setHospitalId] = useState(registerInfoBHYT["listInsuredPerson"][index].hospitalId);
  const [listHospitals, setListHospitals] = useState<any>([])
  const [isShowModelQR, setIsShowModelQR] = useState<boolean>(false)
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [opacityQR, setOpacityQR] = useState(1);
  const lottieRef = useRef(null);

  const ksProvinces = useRef([]);
  const ksDistricts = useRef([]);
  const ksWards = useRef([]);

  const [selectedProvinceParticipate, setSelectedProvinceParticipate] = useState(registerInfoBHYT["listInsuredPerson"][index].insuranceProvinceId);
  const [selectedKSProvince, setSelectedKSProvince] = useState<number>(registerInfoBHYT["listInsuredPerson"][index].ksTinhThanhMa);
  const [selectedKSDistrict, setSelectedKSDistrict] = useState<number>(registerInfoBHYT["listInsuredPerson"][index].ksQuanHuyenMa);
  const [selectedKSWard, setSelectedKSWard] = useState<number>(registerInfoBHYT["listInsuredPerson"][index].ksXaPhuongMa);
  const [ksAddressDetail, setKSAddressDetail] = useState<string>(registerInfoBHYT["listInsuredPerson"][index].ksDiaChi);

  const ttProvinces = useRef([]);
  const ttDistricts = useRef([]);
  const ttWards = useRef([]);
  const [selectedTTProvince, setSelectedTTProvince] = useState<number>(registerInfoBHYT["listInsuredPerson"][index].provinceId);
  const [selectedTTDistrict, setSelectedTTDistrict] = useState<number>(registerInfoBHYT["listInsuredPerson"][index].districtId);
  const [selectedTTWard, setSelectedTTWard] = useState<number>(registerInfoBHYT["listInsuredPerson"][index].wardId);
  const [ttAddressDetail, setTTAddressDetail] = useState<string>(registerInfoBHYT["listInsuredPerson"][index].addressDetail);
  const [vungLuongToiThieuId, setVungLuongToiThieuId] = useState(registerInfoBHYT["listInsuredPerson"][index].vungLuongToiThieuId);
  const [vungLuongToiThieuList, setVungLuongToiThieuList] = useState([]);
  const [benefitLevel, setBenefitLevel] = useState(registerInfoBHYT["listInsuredPerson"][index].benefitLevel);
  const [isShowModalbenefitLevel, setIsShowModalbenefitLevel] = useState(false)

  const [temp, setTemp] = useState(0);
  const [isLoadingLuckUp, setIsLoadingLuckUp] = useState(false);

  const calculatePrice = () => {
    switch (index) {
      case 0:
        return `${formatMoneyVND(price)} đ`
      case 1:
        return `${formatMoneyVND(price * 0.7)} đ`
      case 2:
        return `${formatMoneyVND(price * 0.6)} đ`
      case 3:
        return `${formatMoneyVND(price * 0.5)} đ`
      case 4:
        return `${formatMoneyVND(price * 0.4)} đ`
      default:
        return `${formatMoneyVND(price * 0.4)} đ`
    }
  }

  // Load lại tất cả danh sách tỉnh thành
  useEffect(() => {
    axios
      .get(`${BASE_URL}/province/api/list`)
      .then((response) => {

        // Load tỉnh thành thường trú người tham gia
        ttProvinces.current = response.data.data

        // Load tỉnh thành khai sinh người tham gia
        ksProvinces.current = response.data.data

        setTemp(Math.random())
      })
      .catch((error) => {
        ttProvinces.current = []
        ksProvinces.current = []
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/VungLuongToiThieu/api/List`
      )
      .then((response) => {
        setVungLuongToiThieuList(response.data.data)

      })
      .catch((error) => {
        setVungLuongToiThieuList([])
        console.error(error);
      });
  }, [])

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

  // Cập nhập danh sách quận huyện địa chỉ thường trú
  useEffect(() => {
    fetchTTDistricts();
  }, [selectedTTProvince]);

  const fetchTTDistricts = () => {
    if (selectedTTProvince !== 0) {
      axios.get(`${BASE_URL}/district/api/list-by-provinceId?provinceId=${selectedTTProvince}`)
        .then((response) => {
          ttDistricts.current = response.data.data;
          ttWards.current = [];
          setTemp(Math.random());
        })
        .catch((error) => {
          ttDistricts.current = [];
          setTemp(Math.random());
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã địa chỉ thường trú
  useEffect(() => {
    fetchTTWards();
  }, [selectedTTDistrict]);

  const fetchTTWards = () => {
    if (selectedTTDistrict !== 0) {
      axios
        .get(
          `${BASE_URL}/ward/api/list-by-districtId?districtId=${selectedTTDistrict}`
        )
        .then((response) => {
          ttWards.current = response.data.data;
          setTemp(Math.random())
        })
        .catch((error) => {
          ttWards.current = []
          setTemp(Math.random());
          console.error(error);
        });
    }
  }


  useEffect(() => {
    setDistricts([])
    setListHospitals([])
    if (medicalProvinceId != "0" || medicalProvinceId != 0) {
      axios
        .get(
          `${BASE_URL}/hospital/api/list-hospital-by-provinceId?provinceId=${medicalProvinceId}`
        ).then((response) => {
          setListHospitals(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [medicalProvinceId]);

  // useEffect(() => {
  //   setListHospitals([])
  //   if (medicalDistrictId != "0" || medicalDistrictId != 0) {
  //     axios
  //       .get(
  //         `${BASE_URL}/hospital/api/list-hospital-by-districtId?districtId=${medicalDistrictId}`
  //       ).then((response) => {
  //         setListHospitals(response.data.data);
  //       })
  //       .catch((error) => {
  //         setListHospitals([])
  //         console.error(error);
  //       });
  //   }
  // }, [medicalDistrictId])


  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {

    const token = localStorage.token;
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${BASE_URL}/account/api/upload-file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImageUrl(response.data.data[0]);
        return response.data.data[0];
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsUploadingPhotoCitizenBack(false)
        setIsUploadingPhotoCitizenFont(false)
      }
    } else {
      setIsUploadingPhotoCitizenBack(false)
      setIsUploadingPhotoCitizenFont(false)
    }
  };

  const updateBackCitizenPhoto = (img) => {
    setPhotoCitizenBack(img);
    registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack = img;
    setIsUploadingPhotoCitizenBack(false)
  };

  const updateFrontCitizenPhoto = (img) => {
    setPhotoCitizenFront(img);
    registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront = img;
    setIsUploadingPhotoCitizenFont(false)
  }

  const handleCardClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const scrollToElement = (input, boxNumber) => {
    switch (boxNumber) {
      case 1:
        break;
      case 2:
        input.current.focus();
        break;
      default:
        break;
    }
  };

  const validateSearchCodeBHXH = () => {
    if (registerInfoBHYT['listInsuredPerson'][index].fullName == "") {
      toast.warn(
        "Họ và tên không được để trống",
      );
      scrollToElement(refs.fullName, 2)
      return false;
    }
    if (registerInfoBHYT['listInsuredPerson'][index].doB == "") {
      toast.warn(
        "Ngày sinh không được để trống",
      );
      scrollToElement(refs.dob, 2)
      return false;
    }
    if (registerInfoBHYT['listInsuredPerson'][index].gender == "") {
      toast.warn(
        "Giới tính không được để trống",
      );
      scrollToElement(refs.gender, 2)
      return false;
    }
    if (registerInfoBHYT['listInsuredPerson'][index].ksTinhThanhMa == 0) {
      toast.warn(
        "Tỉnh thành khai sinh không được để trống",
      );
      scrollToElement(refs.selectedKSProvince, 2)
      return false;
    }

    if (registerInfoBHYT['listInsuredPerson'][index].ksQuanHuyenMa == 0) {
      toast.warn(
        "Quận huyện khai sinh không được để trống",
      );
      scrollToElement(refs.selectedKSDistrict, 2)
      return false;
    }

    if (registerInfoBHYT['listInsuredPerson'][index].ksXaPhuongMa == 0) {
      toast.warn(
        "Phường xã khai sinh không được để trống",
      );
      scrollToElement(refs.selectedKSWard, 2)
      return false;
    }
    return true
  }

  const onSubmitFormData = async () => {
    setIsLoadingLuckUp(true)
    const token = localStorage.token;
    const data = {
      "name": registerInfoBHYT['listInsuredPerson'][index].fullName,
      "doB": registerInfoBHYT['listInsuredPerson'][index].doB,
      "Gender": registerInfoBHYT['listInsuredPerson'][index].gender,
      "ProvinceId": registerInfoBHYT['listInsuredPerson'][index].ksTinhThanhMa,
      "DistrictId": registerInfoBHYT['listInsuredPerson'][index].ksQuanHuyenMa,
      "WardId": registerInfoBHYT['listInsuredPerson'][index].ksXaPhuongMa
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
        setSocialInsuranceNumber(response.data.data[0].maSoBhxh)
        setIsLoadingLuckUp(false)
      }

      if (response.data.message == "BAD_REQUEST") {
        toast.warn(
          "Không tìm thấy mã số BHXH",
        );
        setSocialInsuranceNumber("")
        setIsLoadingLuckUp(false)
      }

    } catch (error) {
      toast.error(
        "Tra cứu mã bảo hiểm thất bại",
      );
      setSocialInsuranceNumber("")
      setIsLoadingLuckUp(false)
    }
  }


  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Người tham gia BHYT HGD
        </h3>
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
    )
  }

  const renderPrice = () => {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">Phí bảo hiểm</p>
        <span className="text-base font-semibold text-[#0076B7]">
          {calculatePrice()}
        </span>

      </div>
    )
  }

  const renderInputsocialInsuranceNumber = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số BHXH
        </label>
        <div className="relative">
          <Input
            type="text"
            id="socialInsuranceNumber"
            value={socialInsuranceNumber}
            ref={refs.socialInsuranceNumber}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value;

              setSocialInsuranceNumber(value);
              registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber = value;

              if (value.length > 0) {
                if (!isValidSocialInsuranceNumber(value)) {
                  setErrors({ ...errors, ...{ "socialInsuranceNumber": "Số BHXH không hợp lệ" } })
                } else {
                  setErrors({ ...errors, ...{ "socialInsuranceNumber": null } })
                }
              } else {
                setErrors({ ...errors, ...{ "socialInsuranceNumber": null } })
              }
            }}
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số BHXH"
            required
          />


          <div onClick={() => {
            if (validateSearchCodeBHXH() && !isLoadingLuckUp) {
              onSubmitFormData()
            }
          }} className="absolute inset-y-0 start-[79%] top-0 flex items-center">
            <p className="text-base font-normal text-[#0076B7]">{!isLoadingLuckUp ? 'Tra cứu' : 'Đang tải...'}</p>
          </div>
        </div>
        {errors.socialInsuranceNumber && <div className="mt-2 text-red-500">{errors.socialInsuranceNumber}</div>}
      </div>
    )
  }

  const renderLine = () => {
    return (
      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>
    )
  }

  const renderNote = () => {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">
          Trường hợp không có số BHXH vui lòng
        </p>
        <ul className="list-disc px-4">
          <li>
            <p className="text-sm font-normal">
              Điền số CCCD và Đính kèm ảnh CCCD
            </p>
          </li>
        </ul>
      </div>
    )
  }

  const renderCitizenId = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="name"
          ref={refs.citizenId}
          maxLength={12}
          value={citizenId}
          onChange={(e) => {
            const value = e.target.value;

            setCitizenId(value);
            registerInfoBHYT["listInsuredPerson"][index].citizenId = value;

            if (value.length > 0) {
              if (!isValidCitizenId(value)) {
                setErrors({ ...errors, ...{ "citizenId": "Số căn cước công dân không hợp lệ" } })
              } else {
                setErrors({ ...errors, ...{ "citizenId": null } })
              }
            } else {
              setErrors({ ...errors, ...{ "citizenId": null } })
            }
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số CCCD"
          required
        />

        {errors.citizenId && <div className="mt-2 text-red-500">{errors.citizenId}</div>}
      </div>
    )
  }



  const customStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.50)'
    }
  };



  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius - width * 0.5, y);

    ctx.moveTo(x + width - radius - width * 0.2, y)
    ctx.lineTo(x + width - radius, y);

    ctx.moveTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

    ctx.lineTo(x + width, y + width - radius - width * 0.5);

    ctx.moveTo(x + width, y + width - radius - width * 0.2);
    ctx.lineTo(x + width, y + width - radius);

    ctx.quadraticCurveTo(x + width, y + width, x + width - radius, y + width);
    ctx.lineTo(x + width - width * 0.3, y + width);

    ctx.moveTo(x + width - width * 0.6, y + width);
    ctx.lineTo(x + width * 0.2, y + width);

    ctx.quadraticCurveTo(x, y + width, x, y + width - radius);
    ctx.lineTo(x, y + radius + width * 0.5);

    ctx.moveTo(x, y + radius + width * 0.2);
    ctx.lineTo(x, y + radius);

    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const renderUploadImages = () => {

    return (
      <div className="p-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[#0076B7] text-lg font-medium items-center">Tải ảnh CCCD</h3>
          <button onClick={() => {
            setIsShowModelQR(true)
          }}>
            <img src={imageQR} className="w-8" />
          </button>
        </div>

        {
          <Modal
            isOpen={isShowModelQR}
            onRequestClose={() => setIsShowModelQR(false)}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="QR Code"
          >
            <div className="w-[400px] h-[750px] relative">
              <div className="text-[#fff] z-10  w-[100%] text-center justify-items-center underline italic ">
                Quét QR trên CCCD của bạn
              </div>
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: opacityQR }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}>
                <Lottie
                  animationData={lottieScanQR}
                  ref={lottieRef}
                  loop={true}
                  style={{
                    width: size.width,
                    height: size.height,
                  }}
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
              </motion.div>

              <Scanner
                paused={!isShowModelQR}
                onError={(error) => {

                }}
                constraints={{
                  facingMode: 'environment',
                  aspectRatio: { ideal: 18 / 6 },
                  frameRate: { ideal: 50 },
                  width: { ideal: 2160 },
                  height: { ideal: 720 },
                  echoCancellation: true,
                  latency: { ideal: 0 },
                  suppressLocalAudioPlayback: true,
                }}
                components={{
                  torch: false,
                  zoom: true,
                  finder: false,
                  tracker: (detectedCodes: IDetectedBarcode[], ctx: CanvasRenderingContext2D) => {

                    if (detectedCodes.length > 0) {
                      const { boundingBox } = detectedCodes[0];

                      // boundingBox object contains properties like x, y, width, and height
                      const { x, y, width, height } = boundingBox;

                      setOpacityQR(0)

                      // setPosition({ x: x + width, y: y - height });
                      setSize({ width: width, height: height })

                      drawRoundedRect(ctx, x, y, width, height, 10);
                    }
                  }
                }}
                onScan={(data) => {
                  try {
                    setTimeout(() => {
                      const info = data[0]["rawValue"];
                      const words = info.split("|")

                      setIsShowModelQR(false)
                      setCitizenId(words[0])

                      registerInfoBHYT["listInsuredPerson"][index].citizenId = words[0];

                      setFullName(words[2])
                      registerInfoBHYT["listInsuredPerson"][index].fullName = words[2];

                      const dob = words[3];
                      const day = dob.substring(0, 2);
                      const month = dob.substring(2, 4);
                      const year = dob.substring(4, 8);

                      setDob(dayjs(`${day} /${month}/${year}`, dateFormat))

                      registerInfoBHYT["listInsuredPerson"][index].doB = formatDate(`${year}-${month}-${day}`);

                      setGender(words[4])
                      registerInfoBHYT["listInsuredPerson"][index].gender = words[4];
                      setOpacityQR(1)

                      setSize({ width: 200, height: 200 })
                    }, 1000)
                  } catch (error) {

                  }


                }}
                allowMultiple={false}
                styles={{
                  container: {
                    position: 'fixed',
                    width: 450,
                    height: windowSize.height + 20,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'white'
                  },
                  finderBorder: 2,
                  video: {
                    width: 2160,
                    height: windowSize.height + 20,
                    objectFit: 'cover',
                  },
                }}
              />
            </div>
          </Modal>
        }


        <div className="flex flex-row gap-2 justify-between w-[100%]">
          <div ref={refs.photoCitizenFront} className="flex gap-3 w-[100%]">
            <div className="flex flex-col gap-2 w-[100%]" onClick={() => handleCardClick(frontImageInputRef)}>
              <div className={`bg-[#F5F5F5]  rounded-lg p-[${photoCitizenFront ? '0px' : '9px'}]  card-cccd w-[100%] h-[100px]`}>
                <div className="icon-1">

                  {photoCitizenFront ? (
                    <img
                      src={`${BASE_URL}${photoCitizenFront}`}
                      alt="Mặt trước"
                      className="w-[100%] h-[100px] object-center rounded-lg"
                    />
                  ) :
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={"100%"}
                      height={"81px"}
                      className="mt-[9px]"
                      viewBox="0 0 130 90"
                      fill="none"
                    >
                      <path
                        d="M0.183716 7.50059V20.4506H1.83927V7.50059C1.83927 4.43539 4.06292 1.95059 6.80594 1.95059H18.3948V0.100586H6.80594C3.14859 0.100586 0.183716 3.41363 0.183716 7.50059Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M129.317 7.50058V20.4506H127.661V7.50058C127.661 4.4354 125.438 1.95059 122.695 1.95059H111.106V0.100586H122.695C126.352 0.100586 129.317 3.41368 129.317 7.50058Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M0.183716 81.5006V68.5506H1.83927V81.5006C1.83927 84.5658 4.06292 87.0506 6.80594 87.0506H18.3948V88.9006H6.80594C3.14859 88.9006 0.183716 85.5875 0.183716 81.5006Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M129.317 81.5006V68.5506H127.661V81.5006C127.661 84.5658 125.438 87.0506 122.695 87.0506H111.106V88.9006H122.695C126.352 88.9006 129.317 85.5875 129.317 81.5006Z"
                        fill="#0076B7"
                      />
                    </svg>
                  }
                </div>
                <div className="icon-2">
                  {photoCitizenFront ? null : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M12.25 7.4375C12.5607 7.4375 12.8125 7.68934 12.8125 8V11.4375H16.25C16.5607 11.4375 16.8125 11.6893 16.8125 12C16.8125 12.3107 16.5607 12.5625 16.25 12.5625H12.8125V16C12.8125 16.3107 12.5607 16.5625 12.25 16.5625C11.9393 16.5625 11.6875 16.3107 11.6875 16V12.5625H8.25C7.93934 12.5625 7.6875 12.3107 7.6875 12C7.6875 11.6893 7.93934 11.4375 8.25 11.4375H11.6875V8C11.6875 7.68934 11.9393 7.4375 12.25 7.4375Z"
                      fill="#0076B7"
                    />
                    <path
                      fillRule="evenodd"
                      d="M3.68506 12.0001C3.68506 7.26974 7.51974 3.43506 12.2501 3.43506C16.9804 3.43506 20.8151 7.26974 20.8151 12.0001C20.8151 16.7304 16.9804 20.5651 12.2501 20.5651C7.51974 20.5651 3.68506 16.7304 3.68506 12.0001ZM12.2501 4.56506C8.14382 4.56506 4.81506 7.89382 4.81506 12.0001C4.81506 16.1063 8.14382 19.4351 12.2501 19.4351C16.3563 19.4351 19.6851 16.1063 19.6851 12.0001C19.6851 7.89382 16.3563 4.56506 12.2501 4.56506Z"
                      fill="#0076B7"
                    />
                  </svg>}
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">Mặt trước</h4>
              <input
                type="file"
                accept="image/*"
                ref={frontImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => {
                  setIsUploadingPhotoCitizenFont(true)
                  handleImageUpload(event, updateFrontCitizenPhoto)
                }
                }
              />
            </div>

            <div ref={refs.photoCitizenBack} className="flex gap-3 w-[100%]" onClick={() => handleCardClick(backImageInputRef)}>
              <div className="flex flex-col gap-2 w-[100%]">
                <div className={`bg-[#F5F5F5]  rounded-lg p-[${photoCitizenBack ? '0px' : '9px'}]  card-cccd w-[100%] h-[100px]`}>
                  <div className="icon-1">

                    {photoCitizenBack ? (
                      <img
                        src={`${BASE_URL}${photoCitizenBack}`}
                        alt="Mặt sau"
                        className="w-[100%] h-[100px] object-center rounded-lg"
                      />
                    ) :
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={"100%"}
                        height={"81px"}
                        className="mt-[9px]"
                        viewBox="0 0 130 90"
                        fill="none"
                      >
                        <path
                          d="M0.183716 7.50059V20.4506H1.83927V7.50059C1.83927 4.43539 4.06292 1.95059 6.80594 1.95059H18.3948V0.100586H6.80594C3.14859 0.100586 0.183716 3.41363 0.183716 7.50059Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M129.317 7.50058V20.4506H127.661V7.50058C127.661 4.4354 125.438 1.95059 122.695 1.95059H111.106V0.100586H122.695C126.352 0.100586 129.317 3.41368 129.317 7.50058Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M0.183716 81.5006V68.5506H1.83927V81.5006C1.83927 84.5658 4.06292 87.0506 6.80594 87.0506H18.3948V88.9006H6.80594C3.14859 88.9006 0.183716 85.5875 0.183716 81.5006Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M129.317 81.5006V68.5506H127.661V81.5006C127.661 84.5658 125.438 87.0506 122.695 87.0506H111.106V88.9006H122.695C126.352 88.9006 129.317 85.5875 129.317 81.5006Z"
                          fill="#0076B7"
                        />
                      </svg>
                    }
                  </div>

                  <div className="icon-2">
                    {photoCitizenBack ? null : <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.25 7.4375C12.5607 7.4375 12.8125 7.68934 12.8125 8V11.4375H16.25C16.5607 11.4375 16.8125 11.6893 16.8125 12C16.8125 12.3107 16.5607 12.5625 16.25 12.5625H12.8125V16C12.8125 16.3107 12.5607 16.5625 12.25 16.5625C11.9393 16.5625 11.6875 16.3107 11.6875 16V12.5625H8.25C7.93934 12.5625 7.6875 12.3107 7.6875 12C7.6875 11.6893 7.93934 11.4375 8.25 11.4375H11.6875V8C11.6875 7.68934 11.9393 7.4375 12.25 7.4375Z"
                        fill="#0076B7"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.68506 12.0001C3.68506 7.26974 7.51974 3.43506 12.2501 3.43506C16.9804 3.43506 20.8151 7.26974 20.8151 12.0001C20.8151 16.7304 16.9804 20.5651 12.2501 20.5651C7.51974 20.5651 3.68506 16.7304 3.68506 12.0001ZM12.2501 4.56506C8.14382 4.56506 4.81506 7.89382 4.81506 12.0001C4.81506 16.1063 8.14382 19.4351 12.2501 19.4351C16.3563 19.4351 19.6851 16.1063 19.6851 12.0001C19.6851 7.89382 16.3563 4.56506 12.2501 4.56506Z"
                        fill="#0076B7"
                      />
                    </svg>}

                  </div>
                </div>

                <h4 className="text-[15px] text-black text-center">Mặt sau</h4>
                <input
                  type="file"
                  accept="image/*"
                  ref={backImageInputRef}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setIsUploadingPhotoCitizenBack(true)
                    handleImageUpload(event, updateBackCitizenPhoto)
                  }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFullName = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={refs.fullName}
          value={fullName}
          onChange={(e) => {
            const value = e.target.value;

            setFullName(value);
            registerInfoBHYT["listInsuredPerson"][index].fullName = value;

            if (e.target.value == "") {
              setErrors({ ...errors, ...{ "fullName": "Họ và tên không được để trống" } })
            } else {
              setErrors({ ...errors, ...{ "fullName": "" } })
            }
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        />


        {errors.fullName && <div className="mt-2 text-red-500">{errors.fullName}</div>}
      </div>
    )
  }

  const renderInputBHYT = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Mã BHYT cũ
        </label>
        <Input
          type="text"
          maxLength={15}
          ref={refs.healthInsuranceNumber}
          value={healthInsuranceNumber}
          onChange={(e) => {
            const value = e.target.value;

            setHealthInsuranceNumber(value);
            registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber = value;

            if (value.length > 0) {
              if (!isValidHealthInsuranceNumber(value)) {
                setErrors({ ...errors, ...{ "healthInsuranceNumber": "Mã BHYT 10-15 ký tự bao gồm chữ và số" } })
              } else {
                setErrors({ ...errors, ...{ "healthInsuranceNumber": null } })
              }
            } else {
              setErrors({ ...errors, ...{ "healthInsuranceNumber": null } })
            }
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="---"
          required
        />
        {errors.healthInsuranceNumber && <div className="mt-2 text-red-500">{errors.healthInsuranceNumber}</div>}
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
          ref={refs.dob}
          value={dob}
          placeholder="dd/mm/yyyy"
          onChange={(e) => {
            const dateObject = dayjs(e.toString());
            const dateStr = `${dateObject.date().toString().padStart(2, '0')}/${(dateObject.month() + 1).toString().padStart(2, '0')}/${dateObject.year()}`
            setDob(dayjs(dateStr, dateFormat))
            registerInfoBHYT["listInsuredPerson"][index].doB = dateStr;

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
          ref={refs.gender}
          placeholder="Chọn giới tính"
          value={gender}
          onChange={(value) => {
            ;
            setGender(value);

            registerInfoBHYT["listInsuredPerson"][index].gender = value;

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

  const renderEthnic = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Dân tộc <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          dropdownMatchSelectWidth={false}
          ref={refs.ethnic}
          placeholder="Chọn dân tộc"
          value={ethnic}
          onChange={(value) => {

            setEthnic(value);

            registerInfoBHYT["listInsuredPerson"][index].ethnicId = value;

          }}
          key={ethnic}
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

  const renderBoxOldCard = () => {
    return (
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-[#0076B7] pb-[24px]">
          Thẻ cũ
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hiệu lực <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              ref={refs.oldCardStartDate}
              value={oldCardStartDate}
              onChange={(e) => {
                const value = e.target.value;

                setOldCardStartDate(value);

                registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate = formatDate(value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hết hiệu lực <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              id="oldCardEndDate"
              ref={refs.oldCardEndDate}
              value={oldCardEndDate}
              onChange={(e) => {
                const value = e.target.value;

                setOldCardEndDate(value)

                registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate = formatDate(value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>
        </div>

        {errors.boxOldCard && <div className="mt-2 text-red-500">{errors.boxOldCard}</div>}
      </div>

    )
  }

  const renderBoxNewCard = () => {
    return (
      <div className="flex flex-col ">
        <h3 className="text-base font-semibold text-[#0076B7] pb-[24px]">
          Thẻ mới{" "}
          <span className="text-xs font-normal text-[#F00]">
            (ngày hiệu lực dự kiến)
          </span>
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hiệu lực <samp className="text-red-600">*</samp>
            </label>

            <DatePicker
              type="date"
              size="large"
              locale={locale}
              className="w-[100%]"
              ref={refs.newCardStartDate}
              value={newCardStartDate}
              placeholder="dd/mm/yyyy"
              onChange={(e) => {
                const dateObject = dayjs(e.toString());
                const dateStr = `${dateObject.date().toString().padStart(2, '0')}/${(dateObject.month() + 1).toString().padStart(2, '0')}/${dateObject.year()}`
                setNewCardStartDate(dayjs(dateStr, dateFormat))
                registerInfoBHYT["listInsuredPerson"][index].newCardStartDate = dateStr;

              }}
              format={dateFormat}
            />
          </div>
        </div>

      </div>
    )
  }

  const renderProvince = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Tỉnh thành phố khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <Select
          size="large"
          onMouseDown={(event) => event.preventDefault()}
          className="w-[100%] z-1"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.medicalProvinceId}
          placeholder="Chọn tỉnh thành phố"
          virtual={false}
          value={medicalProvinceId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            setMedicalProvinceId(value)

            setMedicalDistrictId(0)
            setHospitalId(0)

            registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId = value;
          }}
          key={medicalProvinceId}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, 'Chọn tỉnh thành phố')}
        />

      </div>
    )
  }

  const renderDistrict = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Quận huyện khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.medicalDistrictId}
          virtual={false}
          placeholder="Chọn quận huyện"
          value={medicalDistrictId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            setMedicalDistrictId(value)

            setHospitalId(0)

            registerInfoBHYT["listInsuredPerson"][index].medicalDistrictId = value;
          }}
          key={medicalProvinceId}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(districts, 'Chọn quận huyện')}
        />
      </div>
    )
  }

  const renderHispital = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Bệnh viện đăng ký khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{
            maxWidth: '300px',
          }}
          style={{
            fontSize: "20px",
            border: "none",
            wordWrap: "break-word"
          }}
          showSearch
          ref={refs.hospitalId}
          virtual={false}
          placeholder="Chọn bệnh viện"
          value={hospitalId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            setHospitalId(value)

            registerInfoBHYT["listInsuredPerson"][index].hospitalId = value;
          }}
          key={medicalProvinceId}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(listHospitals, 'Chọn bệnh viện')}
        />
      </div>
    )
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
          isOpen={isUploadingPhotoCitizenFont || isUploadingPhotoCitizenBack}
          style={styleModal}
        >
          <div className="w-[400px] h-[750px] relative flex justify-center items-center">
            <FadeLoader height={10} width={3} loading={true} color="#ffffff" />
          </div>
        </Modal>
      </>
    )
  }

  const inputProvinceParticipate = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh / Thành phố nơi tham gia BHYT{" "}
          <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn thành phố"
          ref={refs.insuranceProvinceId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {
            setSelectedProvinceParticipate(value)

            registerInfoBHYT["listInsuredPerson"][index].insuranceProvinceId = value

          }}
          value={selectedProvinceParticipate}
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

  const inputKSProvinceParticipate = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>

        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn tỉnh thành phố"
          dropdownMatchSelectWidth={false}
          ref={refs.selectedKSProvince}
          value={selectedKSProvince}
          onChange={(value) => {
            ksDistricts.current = []
            ksWards.current = []

            setSelectedKSDistrict(0)
            setSelectedKSWard(0)

            setSelectedKSProvince(value);

            registerInfoBHYT["listInsuredPerson"][index].ksTinhThanhMa = value

          }}
          key={selectedKSProvince}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ksProvinces.current, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputKSDistrictParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedKSDistrict}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn quận huyện"
          value={selectedKSDistrict}
          key={selectedKSDistrict}
          onChange={(value) => {
            ksWards.current = []
            setSelectedKSWard(0)

            setSelectedKSDistrict(value);

            registerInfoBHYT["listInsuredPerson"][index].ksQuanHuyenMa = value

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
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedKSWard}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn phường xã"
          value={selectedKSWard}
          onChange={(value: any) => {

            setSelectedKSWard(value);

            registerInfoBHYT["listInsuredPerson"][index].ksXaPhuongMa = value

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

  const inputKSAddrestailParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          ref={refs.ksAddressDetail}
          value={ksAddressDetail}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          onChange={(e) => {
            setKSAddressDetail(e.target.value);

            registerInfoBHYT["listInsuredPerson"][index].ksDiaChi = e.target.value

          }}
        />
      </div>
    )
  }

  const inputTTProvinceParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>

        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedTTProvince}
          placeholder="Chọn tỉnh thành phố"
          dropdownMatchSelectWidth={false}
          value={selectedTTProvince}
          onChange={(value) => {
            ttDistricts.current = []
            ttWards.current = []

            setSelectedTTDistrict(0)
            setSelectedTTWard(0)
            setSelectedTTProvince(value);

            registerInfoBHYT["listInsuredPerson"][index].provinceId = value;

          }}
          key={selectedTTProvince}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ttProvinces.current, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputTTDistrictParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedTTDistrict}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn quận huyện"
          value={selectedTTDistrict}
          key={selectedTTDistrict}
          onChange={(value) => {

            ttWards.current = []
            setSelectedTTWard(0)

            setSelectedTTDistrict(value);


            registerInfoBHYT["listInsuredPerson"][index].districtId = value
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ttDistricts.current, "Chọn quận huyện")}
        />
      </div>
    )
  }

  const inputTTWardParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.selectedTTWard}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn phường xã"
          value={selectedTTWard}
          key={selectedTTWard}
          onChange={(value: any) => {
            setSelectedTTWard(value);

            registerInfoBHYT["listInsuredPerson"][index].wardId = value
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ttWards.current, "Chọn phường xã")}
        />
      </div>
    )
  }

  const inputTTAddressDetailParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          ref={refs.ttAddressDetail}
          value={ttAddressDetail}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          onChange={(e) => {
            setTTAddressDetail(e.target.value);

            registerInfoBHYT["listInsuredPerson"][index].addressDetail = e.target.value

          }}
        />
      </div>
    )
  }

  const inputAreaSalaryParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Vùng lương tối thiểu <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn vùng lương"
          ref={refs.vungLuongToiThieuId}
          value={vungLuongToiThieuId}
          key={vungLuongToiThieuId}
          onChange={(value: any) => {
            setVungLuongToiThieuId(value);

            registerInfoBHYT["listInsuredPerson"][index].vungLuongToiThieuId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelectVungLuong(vungLuongToiThieuList, "Chọn vùng lương")}
        />
      </div>
    )
  }

  const inputBenefitLevelParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Mức hưởng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.benefitLevel}
          dropdownMatchSelectWidth={false}
          dropdownStyle={{
            maxWidth: '300px',

          }}
          placeholder="Mức hưởng"
          value={benefitLevel}
          key={benefitLevel}
          onChange={(value: any) => {
            setBenefitLevel(value);

            registerInfoBHYT["listInsuredPerson"][index].benefitLevel = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn mức hưởng" },
            { value: "1", label: "Mức 1" },
            { value: "2", label: "Mức 2" },
            { value: "3", label: "Mức 3" },
            { value: "4", label: "Mức 4" },
            { value: "5", label: "Mức 5" },
          ]}
        />

        <button
          onClick={() => {
            setIsShowModalbenefitLevel(!isShowModalbenefitLevel);
          }}

          className="text-blue-600 mt-2 underline" type="button">Chi tiết mức hưởng</button>

        <Modal
          isOpen={isShowModalbenefitLevel}
          onRequestClose={() => setIsShowModalbenefitLevel(false)}
          style={{
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
              width: '90%',
              height: '75%',
              overflow: 'auto',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <div className="p-4 w-[100%] relative bg-white">
            {
              BenefitLevevlList.map((item) => (
                <div>
                  <div className="pb-2 text-blue-600  text-lg font-normal">- Mức hưởng số {item?.value}</div>
                  <div className="pb-2 text-justify">{item?.label}</div>
                </div>
              ))
            }
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
      {renderHeader()}
      {/* Tiền bảo hiểm */}
      {renderPrice()}



      {renderLine()}

      {/* Note */}
      {renderNote()}

      {/* CCCD */}
      {renderCitizenId()}

      {/* Ảnh cccd */}
      {renderUploadImages()}

      {/* Họ tên người tham gia */}
      {renderFullName()}

      {/* Ngày sinh người tham gia */}
      {renderDob()}

      {/* Giới tính người tham gia*/}
      {renderGender()}

      {/* Dân tộc người tham gia*/}
      {renderEthnic()}

      {/* Số BHYT người tham gia*/}
      {renderInputBHYT()}

      {/* {renderLine()} */}

      {/* Thẻ mới */}
      {/* {renderBoxNewCard()} */}

      {renderLine()}

      <h3 className="text-base font-semibold text-[#0076B7]">
        Thông tin bảo hiểm{" "}
      </h3>

      {/* Thẻ mới người tham gia*/}
      {/* {inputProvinceParticipate()} */}

      {/* Thẻ thành phố tham gia khám chữa bệnh */}
      {renderProvince()}

      {/* Bệnh viện tham gia khám chữa bệnh */}
      {/* {renderDistrict()} */}

      {/* Bệnh viện tham gia khám chữa bệnh */}
      {renderHispital()}

      {/* Vùng lương tôi thiểu */}
      {inputAreaSalaryParticipants()}

      {/* Mức hưởng */}
      {inputBenefitLevelParticipants()}

      {renderLine()}

      <h3 className="text-base font-semibold text-[#0076B7]">
        Địa chỉ khai sinh{" "}
      </h3>

      {/* Tỉnh thành  khai sinh*/}
      {inputKSProvinceParticipate()}

      {/* Quận huyện khai sinh*/}
      {inputKSDistrictParticipants()}

      {/* Phường xã khai sinh*/}
      {inputKSWardParticipants()}

      {/* Địa chỉ chi tiết khai sinh */}
      {inputKSAddrestailParticipants()}

      <h3 className="text-base font-semibold text-[#0076B7]">
        Địa chỉ thường trú{" "}
      </h3>

      {/* Tỉnh thành thường trú*/}
      {inputTTProvinceParticipants()}

      {/* Quận huyện thường trú*/}
      {inputTTDistrictParticipants()}

      {/* Phường xã thường trú */}
      {inputTTWardParticipants()}

      {/* Địa chỉ cụ thể  thường trú*/}
      {inputTTAddressDetailParticipants()}

      <ul className="list-disc px-4">
        <li>
          <p className="text-sm font-normal">
            Vui lòng nhập số BHXH để tra cứu thông tin
          </p>
        </li>
        <li>
          <p className="text-sm font-normal">
            Tra cứu mã số BHXH bằng thông tin khai sinh{" "}
            {/* <span className="text-[#0076B7] font-semibold underline">
              tại đây
            </span> */}
          </p>
        </li>
      </ul>

      {/* Số BHXH*/}
      {renderInputsocialInsuranceNumber()}

      {modalLoading()}
    </div>
  );
};

export default UserBeneficiaryBHYTPage;



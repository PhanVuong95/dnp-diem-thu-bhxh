import { Input } from "antd"
import React, { useRef, useState } from "react"
import { Page, useNavigate } from "zmp-ui"
import HeaderBase from "../components/header_base"
import { BASE_URL, RoleAccount } from "../utils/constants"
import Modal from 'react-modal';
import { isValidEmail, isValidEmptyString, isValidPhone } from "../utils/validate_string"
import { toast } from "react-toastify"
import axios from "axios"

const RegisterCollaborate = () => {

  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingPhotoCitizenFont, setIsUploadingPhotoCitizenFont] =
    useState(false);
  const [isUploadingPhotoCitizenBack, setIsUploadingPhotoCitizenBack] =
    useState(false);
  const [isShowModalSuccess, setisShowModalSuccess] = useState(false)
  const [fullNameHouseHold, setFullNameHouseHold] = useState("")
  const [numberCardId, setNumberCardId] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate();


  const handleCardClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

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
        setIsUploadingPhotoCitizenBack(false);
        setIsUploadingPhotoCitizenFont(false);
      }
    } else {
      setIsUploadingPhotoCitizenBack(false);
      setIsUploadingPhotoCitizenFont(false);
    }
  };

  const inputFullNamCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          value={fullNameHouseHold}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {
            setFullNameHouseHold(e.target.value);
          }}
        />
      </div>
    )
  }

  const inputCCCDCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="number"
          maxLength={12}
          value={numberCardId}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số CCCD"
          onChange={(e) => {
            setNumberCardId(e.target.value);
          }}
        />
      </div>
    )
  }

  const inputPhoneCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số điện thoại <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="number"
          maxLength={12}
          value={phone}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số điện thoại"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
    )
  }

  const inputEmailCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Email <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          value={email}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Địa chỉ Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
    )
  }

  const uploadImage = () => {
    return (
      <div className="p-4 mx-4 mt-4 bg-white rounded-xl flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Ảnh CCCD 2 mặt
          </h3>
        </div>

        <div className="flex flex-row gap-2 justify-between w-[100%]">
          <div className="flex gap-3 w-[100%]">
            <div className="flex flex-col gap-2 w-[100%]">
              <div
                className={`bg-[#F5F5F5]  rounded-lg p-[${frontImageUrl ? "0px" : "9px"
                  }]  card-cccd w-[100%] h-[100px]`}
                onClick={() => handleCardClick(frontImageInputRef)}
              >
                <div className="icon-1">
                  {frontImageUrl ? (
                    <img
                      src={`${BASE_URL}${frontImageUrl}`}
                      alt="Mặt trước"
                      className="w-[100%] h-[100px] object-center rounded-lg "
                    />
                  ) : (
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
                  )}
                </div>
                <div className="icon-2">
                  {frontImageUrl ? (
                    <></>
                  ) : (
                    <svg
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
                    </svg>
                  )}
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">
                Mặt trước
              </h4>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={frontImageInputRef}
                onChange={(event) => {
                  setIsUploadingPhotoCitizenFont(true);
                  handleImageUpload(event, setFrontImageUrl);

                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <div
                className={`bg-[#F5F5F5]  rounded-lg p-[${backImageUrl ? "0px" : "9px"
                  }]  card-cccd w-[100%] h-[100px]`}
                onClick={() => handleCardClick(backImageInputRef)}
              >
                <div className="icon-1">
                  {backImageUrl ? (
                    <img
                      src={`${BASE_URL}${backImageUrl}`}
                      alt="Mặt sau"
                      className="w-[100%] h-[100px] object-center rounded-lg"
                    />
                  ) : (
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
                  )}
                </div>
                <div className="icon-2">
                  {backImageUrl ? (
                    <></>
                  ) : (
                    <svg
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
                    </svg>
                  )}
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">Mặt sau</h4>
              <input
                type="file"
                accept="image/*"
                ref={backImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => {
                  setIsUploadingPhotoCitizenBack(true);
                  handleImageUpload(event, setBackImageUrl);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const modal = () => {
    return (
      <Modal
        isOpen={isShowModalSuccess}
        ariaHideApp={false}
        onRequestClose={() => setisShowModalSuccess(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '15px',
            padding: 0,
            width: '90%',
            height: '23%',
            overflow: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <div className="p-4 w-[100%] bg-white items-center justify-center rounded-xl">
          <div className="text-center text-[18px] font-semibold  mt-3">Thông báo</div>
          <div className="text-center text-[15x] font-normal mt-3">Đăng ký thành công, vui lòng chờ hệ thống phản hồi kết quả</div>

          <button
            className="px-[24px]  mt-6 py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            type="submit"
          >
            Đồng ý
          </button>
        </div>
      </Modal>
    )
  }

  const validateForm = () => {
    // Name
    if (!isValidEmptyString(fullNameHouseHold)) {
      toast.warn("Họ và tên chủ hộ không được để trống!")
      return false;
    }

    //numberCardId
    if (!isValidEmptyString(numberCardId)) {
      toast.warn("Số CCCD không được để trống!");
      return false;
    }

    if (numberCardId.length != 12) {
      toast.warn("Số căn cước công dân phải là 12 chữ số!");
      return false;
    }

    // Phone
    if (!isValidEmptyString(phone)) {
      toast.warn("Số điện thoại không được để trống!")
      return false;
    }

    if (!isValidPhone(phone)) {
      toast.warn("Số điện thoại không hợp lệ!");
      return false;
    }

    // Email
    if (!isValidEmptyString(email)) {
      toast.warn("Email không được để trống!")
      return false;
    }

    if (!isValidEmail(email)) {
      toast.warn("Email không hợp lệ!")
      return false;
    }

    if (frontImageUrl == "") {
      toast.warn("Vui lòng cập nhật mặt trước CCCD!")
      return false;
    }

    if (backImageUrl == "") {
      toast.warn("Vui lòng cập nhật mặt sau CCCD!")
      return false;
    }

    return true
  }

  const onSubmit = async () => {
    if (validateForm()) {
      const token = localStorage.token;

      var code = localStorage.getItem("referrerCode")

      const data = {
        "name": fullNameHouseHold,
        "citizenId": numberCardId,
        "phone": phone,
        "email": email,
        "imgCitizenFront": frontImageUrl,
        "imgCitizenBack": backImageUrl,
        "referrerCode": code != "" ? code : null
      }

      console.log(data);

      console.log(localStorage.referrerCode);

      try {
        const response = await axios.post(
          `${BASE_URL}/account/api/register-contributor`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message == "SUCCESS") {
          toast.success("Đăng ký cộng tác viên thành công!")
          localStorage.setItem("roleId", RoleAccount['CTV'])
          navigate("/")
        } else {
          toast.error("Đăng ký cộng tác viên thất bại, Vui lòng thử lại sau!")
        }

      } catch (error) {
        toast.error("Đăng ký cộng tác viên thất bại, Vui lòng thử lại sau!")
      }
    }
  }


  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Đăng ký cộng tác viên"
      />

      <Page className=" mt-20 gap-3">

        <div className="m-4 bg-white pt-1 px-3 pb-4 rounded-lg">
          {inputFullNamCollaborate()}

          {inputCCCDCollaborate()}

          {inputPhoneCollaborate()}

          {inputEmailCollaborate()}
        </div>

        {uploadImage()}

        <div className="m-4">
          <button
            className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            onClick={onSubmit}
          >
            Đăng ký
          </button>
        </div>

        {modal()}
      </Page>

    </div>
  )
}


export default RegisterCollaborate
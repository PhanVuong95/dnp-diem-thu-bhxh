import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SpecificContext } from "../components/specific_context";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import HeaderBase from "../components/header_base";
import { FadeLoader, PulseLoader } from "react-spinners";
import { saveImageToGallery } from "zmp-sdk";
import { Modal } from "zmp-ui";
import warningIc from "../../assets-src/warning_icon.png";
import { BASE_URL } from "../utils/constants";

const BuillDetailPage: React.FunctionComponent = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const specificContext = useContext<any>(SpecificContext);
  const { insuranceOrder, setInsuranceOrder } = specificContext;
  const [base64QRCode, setBase64QRCode] = useState<string>("");
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardeName, setWardeName] = useState("");
  const [expiryDateString, setExpiryDateString] = useState("");
  const orderRef = useRef<HTMLDivElement>(null);

  const [orderDetail, setOrderDetail] = useState<any>();
  const [insuredPerson, setInsuredPerson] = useState<any>();

  const STATUS_DONE_ID = 1002;
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  // const handleDownload = async () => {
  //   if (orderRef.current) {
  //     const canvas = await html2canvas(orderRef.current);
  //     const link = document.createElement("a");
  //     link.href = canvas.toDataURL("image/png");
  //     link.download = "order-info.png";
  //     link.click();
  //   }
  // };
  const handleDownload = () => {
    setLoading(true);
    // Capture the entire .invitation-ticket-full element
    html2canvas(orderRef.current as HTMLElement, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      // Convert canvas to image
      const imageURL = canvas.toDataURL("image/png"); // Change "imagepng" to "image/png"
      // Save the image to gallery
      saveImageToGallery({
        imageUrl: imageURL,
        success: (res) => {
          setLoading(false);
          toast.success("Lưu ảnh thành công!");
        },
        fail: (error) => {
          // Handle failur
          toast.warn(
            "Lưu ảnh không thành công. Vui lòng chụp ảnh màn hình đơn!"
          );
        },
      });
    });
  };
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/insuranceorder/api/Detail-By-VM/` + id)
      .then((response) => {
        setOrderDetail(response.data.data[0]);
        setInsuredPerson(response.data.data[0].listInsuredPerson[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${BASE_URL}/province/api/detail/` +
  //         insuranceOrder.provinceId
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
  //         insuranceOrder.districtId
  //     )
  //     .then((response) => {
  //       setDistrictName(response.data.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   axios
  //     .get(`${BASE_URL}/ward/api/detail/` + insuranceOrder.wardId)
  //     .then((response) => {
  //       setWardeName(response.data.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  const GetQrCode = async () => {
    const token = localStorage.token;
    // const formData = new FormData();
    //   formData.append("file", file);
    try {
      const response = await axios.post(
        `${BASE_URL}/insuranceorder/api/create-payment?orderId=` +
        id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // return response.data.data[0];
      setBase64QRCode(response.data.data[0]);
      const now = new Date();
      now.setMinutes(now.getMinutes() + 30);
      setExpiryDateString(formatDate(now));
    } catch (error) {
      console.error("Error uploading image:", error);
      setBase64QRCode("400");
    }
  };
  useEffect(() => {
    GetQrCode();
  }, []);
  const formatDate = (date) => {
    // Lấy giờ, phút, ngày, tháng, năm từ đối tượng Date
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Định dạng thời gian theo 'hh:mm dd/mm/yyyy'
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          `${BASE_URL}/insuranceorder/api/check-order-status/` + id
        )
        .then((response) => {
          if (response.data.data[0] === STATUS_DONE_ID) {
            setIsPaymentSuccessful(true); // Hiển thị modal
            clearInterval(interval);
          } else if (base64QRCode == "400") {
            // const notify1 = () => toast("Có lỗi xảy ra! Xin vui lòng thử lại");
            // notify1();
            clearInterval(interval);
          }
        })
        .catch((error) => {
          // const notify1 = () => toast("Có lỗi xảy ra! Xin vui lòng thử lại");
          // notify1();
        });
    }, 5000);

    // Set timeout to clear the interval after 30 minutes
    const timeout = setTimeout(() => clearInterval(interval), 1800000);

    // Cleanup interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [insuranceOrder.id]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${BASE_URL}/insuranceorder/api/check-order-status/` + 1056
  //     )
  //     .then((response) => {
  //       if (response.data.data[0] == STATUS_DONE_ID) {
  //         console.log("DONE");
  //       } else {
  //         console.log("NOT DONE");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  if (!orderDetail || !base64QRCode) {
    return (
      <>
        <HeaderBase isHome={false} title={"Chi tiết thanh toán"} />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const switchPage = () => {
    switch (orderDetail?.insuranceId) {
      case 1001:
        return navigate("/history-unpaid/" + orderDetail.id);
      case 1002:
        return navigate("/info-detail-bhyt/" + orderDetail.id);
      default:
        break;
    }
  };

  return (
    <>
      <HeaderBase isHome={false} title={"Chi tiết thanh toán"} />
      {isPaymentSuccessful && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center w-4/5">
            <svg
              className="mx-auto"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="27.8571"
                fill="#0544E8"
                stroke="#DEE7FE"
                stroke-width="4.28571"
              />
              <circle cx="50" cy="50" r="37.5" stroke="#0544E8" />
              <circle cx="50" cy="50" r="44.5" stroke="#DEE7FE" />
              <path
                d="M44.1641 63.4375L32.4922 51.7656C31.7891 51.0625 31.7891 49.8672 32.4922 49.1641L35.0234 46.6328C35.7266 45.9297 36.8516 45.9297 37.5547 46.6328L45.5 54.5078L62.375 37.6328C63.0781 36.9297 64.2031 36.9297 64.9062 37.6328L67.4375 40.1641C68.1406 40.8672 68.1406 42.0625 67.4375 42.7656L46.7656 63.4375C46.0625 64.1406 44.8672 64.1406 44.1641 63.4375Z"
                fill="white"
              />
            </svg>
            <h2 className="text-lg font-bold">Thanh toán thành công</h2>
            <p>
              Cảm ơn bạn tham gia <br /> {orderDetail?.insuranceName}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => switchPage()} // Điều hướng về trang chi tiết
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      )}
      <div className="page-1 flex flex-col gap-4 mb-[32px] !pt-[100px]">
        <h3 className="text-[#0076B7] text-lg font-medium text-center">
          Hệ thống đang ghi nhận thanh toán
        </h3>
        <p className="text-[#000] text-sm font-normal text-center">
          Xin quý khách vui lòng chờ trong giây lát
        </p>
        <div
          ref={orderRef}
          className="p-4 bg-white rounded-xl flex flex-col gap-4"
        >
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin đơn hàng
          </h3>
          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Mã đơn hàng</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                #{orderDetail.id}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Tình trạng thanh toán
              </p>
            </div>
            <div>
              <p className="text-[#FAAD14] text-sm font-semibold max-w-[190px] text-right">
                {orderDetail.insuranceOrderStatusName}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                {orderDetail.fullName}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Email</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {orderDetail.email}
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
                {orderDetail.phone}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {orderDetail.addressDetail}, {orderDetail.wardName},{" "}
                {orderDetail.districtName}, {orderDetail.provinceName}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Gói bảo hiểm</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {orderDetail.insuranceName}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Gói</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                Theo tháng
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Tổng cộng</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[142px] text-right">
                {orderDetail.finalPrice.toLocaleString("vi-VN")} vnđ
              </p>
            </div>
          </div>
          <div>
            {base64QRCode != "400" ? (
              <img src={`data:image/png;base64,${base64QRCode}`} />
            ) : (
              <div className="flex flex-row gap-5 items-center">
                <img
                  className="object-contain"
                  width="45"
                  height="12"
                  src={warningIc}
                ></img>
                <p className="text-sm italic font-bold">
                  Dịch vụ thanh toán tạm thời gián đoạn. Quý khách vui lòng thử
                  lại sau!
                </p>
              </div>
            )}
          </div>
          {base64QRCode != "400" ? (
            <i className="text-xs font-semibold text-center text-red-700">
              QR thanh toán sẽ hết hạn vào lúc {expiryDateString}
            </i>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-center items-center">
            <button
              onClick={handleDownload}
              className="px-[24px] py-3 bg-[#DEE7FE] w-full rounded-full bg-[#0076B7] text-base font-normal text-[#0076B7] text-center"
            >
              Tải xuống hóa đơn
            </button>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to="/"
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
      <Modal
        visible={loading}
        modalStyle={{
          background: "transparent",
        }}
      >
        <div className="justify-center flex">
          <FadeLoader height={10} width={3} loading={true} color="#0076B7" />
        </div>
      </Modal>
    </>
  );
};

export default BuillDetailPage;

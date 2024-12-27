import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import HeaderBase from "../components/header_base";
import { BASE_URL } from "../utils/constants";
import { formatDate, formatDateByTime, formatTime, formatTime1 } from "../utils/validate_string";

const CheckStatusProcedure = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.token;
      try {
        const response = await axios.get(
          `${BASE_URL}/InsuranceOrder/api/check-status-procedure/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDetail(response.data.data[0])
        setIsLoading(false)

        return response.data.data[0];
      } catch (error) {
        setIsLoading(false)
        console.error("Error :", error);
      }
    }

    fetchData();
  }, [])

  if (isLoading) {
    return (
      <>
        <HeaderBase
          isHome={false}
          title={"Kiểm tra trạng thái thủ tục"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const headerContent = () => {
    let date = new Date(detail?.ketQuaTiepNhanHoSoResponse?.lastModifiedDate)
    date.setHours(date.getHours())

    return (
      <div className="p-4">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Kết quả tiếp nhận hồ sơ
        </h3>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Sổ hồ sơ
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {detail?.ketQuaTiepNhanHoSoResponse?.soHoSo}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Mã kết quả
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {detail?.ketQuaTiepNhanHoSoResponse?.ketQuaMa}
          </div>
        </div>



        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Thời điểm tra cứu
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {formatDateByTime(date)}
          </div>
        </div>
      </div>
    )
  }

  const getTitleStep = (index) => {
    switch (index) {
      case 1:
        return "Tiếp nhận gói hồ sơ tư I-VAN";
      case 2:
        return "Kết quả kiểm tra hồ sơ điện tử tự động";
      default:
        break;
    }
  }


  const stepReceiveDocuments = (index) => {
    let updatedDate = new Date(detail?.ketQuaTiepNhanHoSoResponse?.[`buoc${index}Ngay`]);
    updatedDate.setHours(updatedDate.getHours() + 7);

    return (

      <div className="p-3 border rounded-lg m-4">
        <div className="font-medium text-[#0076B7]">Bước: <span className="font-normal text-[#2E2E2E]">{getTitleStep(index)}</span></div>

        <div className="flex justify-between mt-3">
          <div className="text-[#646464]">Ngày: </div>
          <div className="text-[#2E2E2E] font-medium">{formatDate(updatedDate)}</div>
        </div>

        <div className="flex justify-between  mt-3">
          <div className="text-[#646464]">Mã kết quả: </div>
          <div className="text-[#2E2E2E] font-medium">{detail?.ketQuaTiepNhanHoSoResponse?.[`buoc${index}Ma`]}</div>
        </div>

        <div>
          <div className="text-[#646464]  mt-3">Mô tả kết quả: </div>
          <div className="text-[#2E2E2E] font-medium  mt-2">
            {detail?.ketQuaTiepNhanHoSoResponse?.[`buoc${index}MoTa`]}
          </div>
        </div>
      </div>

    )
  }

  const headerResultDocuments = () => {
    return (
      <div className="p-4">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Kết quả xử lý hồ sơ
        </h3>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Cơ quản BHXH
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {detail?.ketQuaXuLyHoSoResponse?.maKetQua}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Thời điểm tra cứu
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {formatDateByTime(new Date())}
          </div>
        </div>
      </div>
    )
  }

  const stepResultDocuments = (item, index) => {

    let date1 = new Date(item?.ngayNhanthucTe);
    date1.setHours(date1.getHours() + 7);

    let date2 = new Date(item?.ngayTrathucTe);
    date2.setHours(date2.getHours() + 7);

    let date3 = new Date(item?.lichSuQuyTrinhXuLyResponseList[0]?.thoiGianXuLy);
    date3.setHours(date3.getHours() + 7);

    return (
      <div className="p-4 border rounded-lg m-4">
        <div className="font-medium text-[#0076B7]">Bước: <span className="font-semibold text-[#2E2E2E]">{item?.buoc}</span></div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Cơ quản BHXH
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {item?.tenCoQuanBHXH}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Phòng ban
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {item?.tenPhongBan}
          </div>
        </div>


        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Ngày nhận thực tế
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {formatDate(date1)}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Ngày trả thực tế
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {formatDate(date2)}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Cán bộ xử lý
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {item?.lichSuQuyTrinhXuLyResponseList[0]?.canBoXuLy}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Hành động
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {item?.lichSuQuyTrinhXuLyResponseList[0]?.hanhDong}
          </div>
        </div>


        <div className="flex justify-between mt-4">
          <div className="text-[#646464]">
            Ngày tiếp nhận
          </div>
          <div className="text-[#2E2E2E] font-medium">
            {formatDate(date3)}
          </div>
        </div>
      </div>
    )
  }

  const resultDocuments = () => {
    return (
      <div>
        {headerResultDocuments()}

        {detail?.ketQuaXuLyHoSoResponse?.quaTrinhXuLyResponseList.map((item, index) =>
          stepResultDocuments(item, index)
        )}
      </div>
    )
  }


  return (
    <div>
      <HeaderBase isHome={false} title={"Thông tin chi tiết"} />

      <div className="pt-[90px] pb-[85px]">
        <div className="bg-white pb-1">
          {headerContent()}

          {stepReceiveDocuments(1)}

          {stepReceiveDocuments(2)}

        </div>

        <div className="bg-white mt-4 pb-1">
          {resultDocuments()}
        </div>


      </div>
    </div>
  )
}

export default CheckStatusProcedure;
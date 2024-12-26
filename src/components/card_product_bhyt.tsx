import React from "react";
import { useNavigate } from "zmp-ui";
import { formatMoneyVND } from "../utils/validate_string";
import logo from "../../assets-src/logo1.png"

const CardProductBHYT = ({ url, data }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
      <div className="flex gap-[10px]">
        <img src={logo} className="w-20 h-20" />
        <div className="title-product flex flex-col">
          <h3 className="text-[#0076B7] text-lg font-medium">
            {data?.name}
          </h3>
          <p className="text-[#646464] text-sm font-normal">{data?.monthDuration} tháng</p>
          <span className="text-[#0076B7] text-lg font-bold">
            {formatMoneyVND(data?.price)} đ<samp className="text-[#646464] text-sm font-normal"> / năm</samp>
          </span>
        </div>
      </div>

      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Dành cho</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {data?.towards}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">
              Trợ cấp khám chữa bệnh
            </p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {data?.medicalSupport}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Giới hạn tuổi</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {data?.ageLimit == 0 ? 'Không giới hạn' : 'Trên ${data?.ageLimit} tuổi'}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[#646464] text-sm font-normal">
            Quyền lợi nổi trội
          </p>
        </div>
        {data?.insuranceBenefits.map((item) =>
          <div className="flex flex-row w-full gap-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5038 1.31775C15.5771 1.31775 19.6914 5.43207 19.6914 10.5053C19.6914 15.5786 15.5771 19.6929 10.5038 19.6929C5.43051 19.6929 1.31619 15.5786 1.31619 10.5053C1.31619 5.43207 5.43051 1.31775 10.5038 1.31775ZM8.59587 13.4895L6.34652 11.2383C5.96331 10.8549 5.96323 10.2296 6.34652 9.84626C6.72989 9.46297 7.35795 9.46537 7.73853 9.84626L9.32431 11.4333L13.2692 7.4884C13.6526 7.10503 14.2779 7.10503 14.6612 7.4884C15.0446 7.87169 15.044 8.49758 14.6612 8.88041L10.0192 13.5224C9.63637 13.9052 9.01047 13.9058 8.62718 13.5224C8.61641 13.5116 8.60602 13.5007 8.59587 13.4895Z"
                  fill="#00BA00"
                />
              </svg>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-normal ">
                {item?.name}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between items-center gap-[10px] my-2 ">
        <button type="button"
          onClick={() => {
            navigate('/product-detail-1/2')
          }}
          className="px-[10px] py-3 w-[46%] rounded-full bg-[#DEE7FE] text-[15px] font-medium text-[#0076B7]"
        >
          Xem chi tiết
        </button>
        <button type="button"
          onClick={() => {
            navigate('/register-BHYT/', { state: { data: data, type: 'register' } })
          }}
          className="px-[10px] py-3 w-[46%] rounded-full bg-[#0076B7] text-[15px] font-medium text-[#fff]"
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default CardProductBHYT;

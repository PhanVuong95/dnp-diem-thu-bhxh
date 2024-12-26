import React,
{ useState } from "react";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import iconWithdraw from "../../assets-src/icon/ic_withdraw.svg";
import iconWithdrawBlue from "../../assets-src/icon/ic_withdraw_blue.svg";
import iconCloseRate from "../../assets-src/icon/ic_close_rate.svg";
import iconCloseRateBlue from "../../assets-src/icon/ic_close_rate_blue.svg";
import iconCalculate from "../../assets-src/icon/ic_calculate.svg";
import iconCalculateBlue from "../../assets-src/icon/ic_calculate_blue.svg";
import { useNavigate } from "react-router";

interface itemProps {
  icon: string;
  iconActive: string;
  index: number;
  indexSelected: number;
  title: string;
}

export let indexToolSupport = -1;

const ToolSupportPage = () => {

  const [indexSelected, setIndexSelected] = useState(indexToolSupport);

  const navigate = useNavigate();

  const ItemMenu = (item: itemProps) => {
    return (
      <div
        onClick={() => {
          switch (item.indexSelected) {
            case 0:
              navigate('/pension-calculation')
              break;
            case 1:
              navigate('/withdraw-bhxh')
              break;
            case 2:
              navigate('/close-rate-bhxh')
              break;
            default:
              break;
          }
          indexToolSupport = item.indexSelected
          setIndexSelected(item.indexSelected);
        }}
        className={`flex flex-row bg-[${indexSelected == item.index ? "#0077D5" : "white"
          }] p-[12px] gap-[10px] items-center rounded-md cursor-pointer`}
      >
        <img
          alt="Icon tính toán lương"
          src={indexSelected == item.index ? item.icon : item.iconActive}
          width={32}
          height={32}
        />
        <div
          className={`text-[18px] font-light text-[${indexSelected == item.index ? "white" : "#000000"
            }]`}
        >
          {item.title}
        </div>
      </div>
    );
  };

  const menu = () => {
    return (
      <div className="flex-[4]">
        <div className="text-[16px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[15px] rounded-tr-[10px] rounded-tl-[10px]">
          Công cụ hỗ trợ
        </div>
        <div className="p-2 md:p-3 lg:p-4 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <ItemMenu
            icon={iconCalculate}
            iconActive={iconCalculateBlue}
            indexSelected={0}
            index={0}
            title="Tính toán lương hưu"
          />

          <div className="h-[2px] my-3 md:my-3 lg:my-4 w-[100%] border-b-[2px] border-dashed border-[#D1D1D6]"></div>

          <ItemMenu
            icon={iconWithdraw}
            iconActive={iconWithdrawBlue}
            indexSelected={1}
            index={1}
            title="Rút BHXH một lần"
          />

          <div className="h-[2px] my-3 md:my-3 lg:my-4 w-[100%] border-b-[2px] border-dashed border-[#D1D1D6]"></div>

          <ItemMenu
            icon={iconCloseRate}
            iconActive={iconCloseRateBlue}
            indexSelected={2}
            index={2}
            title="Mức đóng BHXH còn thiếu"
          />
        </div>
      </div>
    );
  };



  return (
    <div>
      <HeaderBase isHome={false} title="Công cụ hỗ trợ" />
      <Page className="page mt-20">
        <div className=" rounded-br-[10px] rounded-bl-[10px]">
          {menu()}
        </div>
      </Page>
    </div>
  );
};

export default ToolSupportPage;

import React from "react";
import { useNavigate } from "zmp-ui";
import backgroundHeader from "../../assets-src/image_header.png";
import logo from "../../assets-src/logo.png";
import back from "../../assets-src/back.png";

interface Props {
  isHome?: boolean;
  title?: String;
  onClose?: () => void;
  onActions?: () => void;
  onBack?: () => void;
}

const HeaderBase = (props: Props) => {
  const { isHome, title, onClose, onActions, onBack } = props;
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-10">
      <img alt="" src={backgroundHeader} />
      <div className="absolute z-10 top-[50%] flex left-4 right-4 justify-between items-center">
        <div className="flex">
          <div>
            {isHome ? (
              <img alt="" src={logo} className="w-7 h-7" />
            ) : (
              <button onClick={onBack ? onBack : () => navigate(-1)}>
                <img alt="" src={back} className="w-7 h-7" />
              </button>
            )}
          </div>
          <div className="text-[#ffffff] items-center ml-3 font-medium text-lg line-clamp-1">
            {isHome ? "DNP Điểm Thu BHXH" : title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBase;

import React from "react";
import { useNavigate } from "zmp-ui";
import { closeApp } from "zmp-sdk/apis";
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
      <img src={backgroundHeader} />
      <div className="absolute z-10 top-[50%] flex left-4 right-4 justify-between items-center">
        <div className="flex">
          <div>
            {isHome ? (
              <img
                src={logo}
                className="w-7 h-7"
              />
            ) : (
              <button
                type="button"
                onClick={onBack ? onBack : () => navigate(-1)}
              >
                <img
                  src={back}
                  className="w-7 h-7"
                />
              </button>
            )}
          </div>
          <div className="text-[#ffffff] items-center ml-3 font-medium text-lg line-clamp-1">
            {isHome ? "Nộp BHXH" : title}
          </div>
        </div>

        {/* <div className="flex w-20 h-8 bg-[#1c6bc0a1] rounded-3xl items-center justify-between pl-3 pr-3 border-gray-500 border-5">
          <div className="">
            <img src="../../assets-src/dot.png" className="w-5 h-2 right-2" />
          </div>
          <div className="w-[1.5px] bg-[#BAE7FF40] h-4 "></div>
          <div>
            <button type="button" onClick={() => closeMiniApp()}>
              <img src="../../assets-src/close.png" className="w-3 h-3" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeaderBase;

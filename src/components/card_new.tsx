import React from "react";
import imgSlider from "../../assets-src/image-1002.png";

const CardNewPage: React.FunctionComponent = (props) => {
  return (
    <div className="card-new">
      <img src={imgSlider} alt="img-slider" />
      <div className="title-card-new flex justify-between items-center w-full p-[12px]">
        <div className="title-new">
          <h3 className="text-base font-bold">Ngành thuế và BHXH</h3>
          <p className="text-base font-normal">Hợp tác chia sẻ dữ liệu</p>
        </div>
        <div className="button-card-new">
          <button>Xem thêm</button>
        </div>
      </div>
    </div>
  );
};

export default CardNewPage;

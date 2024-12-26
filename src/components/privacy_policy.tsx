import React, { useEffect, useRef } from "react";
import HeaderBase from "./header_base";
import image1 from '../../assets-src/dieukhoan/image1.jpg'
import image2 from '../../assets-src/dieukhoan/image2.jpg'
import image3 from '../../assets-src/dieukhoan/image3.jpg'
import image4 from '../../assets-src/dieukhoan/image4.jpg'
import image5 from '../../assets-src/dieukhoan/image5.jpg'
import image6 from '../../assets-src/dieukhoan/image6.jpg'
import image7 from '../../assets-src/dieukhoan/image7.jpg'
import image8 from '../../assets-src/dieukhoan/image8.jpg'

const PrivacyPolicyPage: React.FunctionComponent = (props) => {

  return (
    <div className="pt-20">
      <HeaderBase
        isHome={false}
        title={"Chính sách và điều khoản"}
      />
      <img src={image1} />
      <img src={image2} />
      <img src={image3} />
      <img src={image4} />
      <img src={image5} />
      <img src={image6} />
      <img src={image7} />
      <img src={image8} />

      {/* <div style={{ height: '100vh', width: '100%' }}>
        <iframe
          src={`https://docs.google.com/viewer?url=${BASE_URL}/dieukhoan.pdf&embedded=true`}
          title="PDF Viewer"
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
        />
      </div> */}

    </div >
  );
}

export default PrivacyPolicyPage;
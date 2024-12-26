import React, { useContext, useEffect, useRef, useState } from "react";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import ic_qr from "../../assets-src/image-qr.png";
import ic_share from "../../assets-src/image-share.png";
import ic_zalo from "../../assets-src/image-zalo.png";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import QRCode from "react-qr-code";
import { getSetting, saveImageToGallery } from "zmp-sdk";
import html2canvas from "html2canvas";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { openShareSheet } from "zmp-sdk/apis";
import { ProfileContext } from "../components/user_profile_context";

const IntroducingPartnersPage = () => {
  const [linkQRCode, setLinkQRCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const profieContext = useContext(ProfileContext);
  const { userProfile, setUserProfile } = profieContext;

  const base64ToFile = (base64Data, fileName) => {
    const arr = base64Data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };


  const creactLinkLocalQrCode = async () => {
    if (qrCodeRef.current != null) {
      html2canvas(qrCodeRef.current as HTMLElement, {
        allowTaint: true,
        useCORS: true,
      }).then(async (canvas) => {
        // Convert canvas to image
        const imageURL = canvas.toDataURL("image/png");

        const file = base64ToFile(imageURL, `${userProfile.id}.png`);

        const formData = new FormData();
        formData.append("file", file);

        const token = localStorage.token;

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

          await openShareSheet({
            type: "image",
            data: {
              imageUrl: `${BASE_URL}${response?.data?.data[0]}`,
            }
          });

        } catch (err) {
          toast.warn(
            "Chia sẻ ảnh QR Code thất bại"
          );
        }

      });
    } else {
      toast.warn(
        "Không tìm thấy QR Code để chia sẻ!"
      );
    }
  }


  const getQrIntroduction = async () => {
    const token = localStorage.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/account/api/get-contributor-code`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLinkQRCode(response.data.resources);
      setIsLoading(false)

    } catch (error) {
      console.log(error);
      setIsLoading(false)
      setLinkQRCode("400");
    }
  }

  useEffect(() => {
    getQrIntroduction();
  }, []);

  if (isLoading) {
    return (
      <>
        <HeaderBase
          isHome={false}
          title={"Thông tin giới thiệu"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const onDownloadingQRCode = async () => {
    setLoadingDownload(true)

    html2canvas(qrCodeRef.current as HTMLElement, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      // Convert canvas to image
      const imageURL = canvas.toDataURL("image/png"); // Change "imagepng" to "image/png"
      // Save the image to gallery

      saveImageToGallery({
        imageUrl: imageURL,
        success: () => {
          setLoadingDownload(false)
          toast.success("Lưu ảnh QR Code thành công!");
        },
        fail: (error) => {
          // Handle failur
          toast.warn(
            "Lưu ảnh không thành công. Vui lòng chụp ảnh màn hình đơn!"
          );
        },
      });
    });
  }

  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Thông tin giới thiệu"
      />

      <Page className="page mt-20 ">
        <div className="rounded-lg h-[320px] bg-white items-center justify-center flex">

          {linkQRCode != "400" ? (
            <div className="items-center flex flex-col justify-center">
              <div ref={qrCodeRef}>
                <QRCode
                  size={256}
                  className="w-40 h-40"
                  value={linkQRCode}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <button onClick={() => {
                onDownloadingQRCode();

              }} className="underline text-[#0076B7] mt-3 text-lg">{loadingDownload ? "Vui lòng đợi" : "Tải xuống"}</button>
            </div>
          ) : (
            <div className="text-[17px] font-medium">Không lấy được QR code!</div>
          )}
        </div>

        <div className="flex mt-4 justify-between">

          <div onClick={() => {
            navigator.clipboard.writeText(linkQRCode)
            toast.success("Coppy đường dẫn thành công!");
          }} className="flex justify-center items-center py-2 bg-white rounded-lg w-[100%]">
            <img src={ic_share} className="w-10 h-10" />
            <div className="ml-3">Copy link</div>
          </div>
          <div className="w-7"></div>
          <div onClick={async () => {
            creactLinkLocalQrCode()
          }} className="flex justify-center items-center py-2 bg-white rounded-lg w-[100%]">
            <img src={ic_zalo} className="w-10 h-10" />
            <div className="ml-3">Chia sẻ Zalo</div>
          </div>
        </div>
      </Page >
    </div >
  );
}

export default IntroducingPartnersPage;
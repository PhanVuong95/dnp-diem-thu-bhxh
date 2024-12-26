import axios from "axios";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import CardProductBHYT from "../../components/card_product_bhyt";
import HeaderBase from "../../components/header_base";
import { BASE_URL } from "../../utils/constants";


export let registerInfoBHYT = {
  "id": 0,
  "referrerCode": localStorage.referrerCode != "" ? localStorage.referrerCode : null,
  "insuranceId": 0,
  "accountId": 0,
  "citizenId": 0,
  "photoCitizenFront": "",
  "photoCitizenBack": "",
  "phone": "",
  "fullName": "",
  "email": "",
  "provinceId": 0,
  "districtId": 0,
  "wardId": 0,
  "finalPrice": 0,
  "addressDetail": "",
  "fileUploadUrl": "",
  "nhomLoaiDoiTuongId": null,
  "loaiDoiTuongId": null,
  "houseHold": {
    "id": 0,
    "chuHoTen": "",
    "ksProvinceId": 0,
    "ksDistrictId": 0,
    "ksWardId": 0,
    "ksAddressDetail": "",
    "hkAddressDetail": "",
    "ttProvinceId": 0,
    "ttDistrictId": 0,
    "ttWardId": 0,
    "soGiayToCaNhan": "",
    "houseHoldPeoples": [
      {
        "id": 0,
        "name": "",
        "doB": "",
        "gender": "",
        "ethnicId": 0,
        "relationShipId": "",
        "citizenId": "",
        "ksProvinceId": 0,
        "ksDistrictId": 0,
        "ksWardId": 0,
        "ksAddressDetail": ""
      }
    ]
  },
  "listInsuredPerson": [
    {
      "id": 0,
      "insuranceProvinceId": 0,
      "medicalProvinceId": 0,
      "medicalDistrictId": 0,
      "socialInsuranceNumber": "",
      "healthInsuranceNumber": "",
      "citizenId": "",
      "photoCitizenFront": "",
      "photoCitizenBack": "",
      "fullName": "",
      "doB": "",
      "gender": "",
      "supportBudget": 0,
      "wage": 0,
      "monthInsured": 0,
      "oldCardStartDate": "",
      "oldCardEndDate": "",
      "newCardEndDate": "",
      "newCardStartDate": "",
      price: 0,
      "hospitalId": 0,
      "provinceId": 0,
      "districtId": 0,
      "wardId": 0,
      "addressDetail": "",
      "ksXaPhuongMa": 0,
      "ksQuanHuyenMa": 0,
      "ksTinhThanhMa": 0,
      "ksDiaChi": "",
      "ethnicId": 0,
      "vungLuongToiThieuId": 0,
      "benefitLevel": "",
    }
  ]
}

const ListHealthInsurance: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    registerInfoBHYT = {
      "id": 0,
      "referrerCode": localStorage.referrerCode != "" ? localStorage.referrerCode : null,
      "insuranceId": 0,
      "accountId": 0,
      "citizenId": 0,
      "photoCitizenFront": "",
      "photoCitizenBack": "",
      "phone": "",
      "fullName": "",
      "email": "",
      "provinceId": 0,
      "districtId": 0,
      "wardId": 0,
      "finalPrice": 0,
      "addressDetail": "",
      "fileUploadUrl": "",
      "nhomLoaiDoiTuongId": null,
      "loaiDoiTuongId": null,
      "houseHold": {
        "id": 0,
        "chuHoTen": "",
        "ksProvinceId": 0,
        "ksDistrictId": 0,
        "ksWardId": 0,
        "ksAddressDetail": "",
        "hkAddressDetail": "",
        "ttProvinceId": 0,
        "ttDistrictId": 0,
        "ttWardId": 0,
        "soGiayToCaNhan": "",
        "houseHoldPeoples": [
          {
            "id": 0,
            "name": "",
            "doB": "",
            "gender": "",
            "ethnicId": 0,
            "relationShipId": "",
            "citizenId": "",
            "ksProvinceId": 0,
            "ksDistrictId": 0,
            "ksWardId": 0,
            "ksAddressDetail": ""
          }
        ]
      },
      "listInsuredPerson": [
        {
          "id": 0,
          "insuranceProvinceId": 0,
          "medicalProvinceId": 0,
          "medicalDistrictId": 0,
          "socialInsuranceNumber": "",
          "healthInsuranceNumber": "",
          "citizenId": "",
          "photoCitizenFront": "",
          "photoCitizenBack": "",
          "fullName": "",
          "doB": "",
          "gender": "",
          "supportBudget": 0,
          "wage": 0,
          "monthInsured": 0,
          "oldCardStartDate": "",
          "oldCardEndDate": "",
          "newCardEndDate": "",
          "newCardStartDate": "",
          price: 0,
          "hospitalId": 0,
          "provinceId": 0,
          "districtId": 0,
          "wardId": 0,
          "addressDetail": "",
          "ksXaPhuongMa": 0,
          "ksQuanHuyenMa": 0,
          "ksTinhThanhMa": 0,
          "ksDiaChi": "",
          "ethnicId": 0,
          "vungLuongToiThieuId": 0,
          "benefitLevel": "",
        }
      ]
    }
  }, []);

  // useEffect(() => {
  //   registerInfoBHYT = {
  //     "id": 0,
  //     "insuranceId": 1002,
  //     "accountId": 0,
  //     "citizenId": 0,
  //     "photoCitizenFront": "",
  //     "photoCitizenBack": "",
  //     "phone": "0828782000",
  //     "fullName": "Tran Nam",
  //     "email": "tuanlbs78@gmail.com",
  //     "provinceId": 1398,
  //     "districtId": 1777,
  //     "wardId": 8581,
  //     "finalPrice": 1263000,
  //     "addressDetail": "Địa chỉ ks",
  //     "fileUploadUrl": "",
  //     "nhomLoaiDoiTuongId": 1007,
  //     "loaiDoiTuongId": 21,
  //     "houseHold": {
  //       "id": 0,
  //       "chuHoTen": "Vũ Văn Tơ",
  //       "ksProvinceId": 1398,
  //       "ksDistrictId": 1780,
  //       "ksWardId": 8620,
  //       "ksAddressDetail": "Địa chỉ ks",
  //       "hkAddressDetail": "Địa chỉ hk",
  //       "ttProvinceId": 1398,
  //       "ttDistrictId": 1777,
  //       "ttWardId": 8582,
  //       "soGiayToCaNhan": "030200008753",
  //       "houseHoldPeoples": [
  //         {
  //           "id": 0,
  //           "name": "Vũ Văn Tới",
  //           "doB": "15/12/2001",
  //           "gender": "Nam",
  //           "ethnicId": 1001,
  //           "relationShipId": "08",
  //           "citizenId": "030200008752",
  //           "ksProvinceId": 1398,
  //           "ksDistrictId": 1777,
  //           "ksWardId": 8581,
  //           "ksAddressDetail": "Địa chỉ A"
  //         }
  //       ]
  //     },
  //     "listInsuredPerson": [
  //       {
  //         "id": 0,
  //         "insuranceProvinceId": 0,
  //         "medicalProvinceId": 1398,
  //         "medicalDistrictId": 0,
  //         "socialInsuranceNumber": "",
  //         "healthInsuranceNumber": "1234567890",
  //         "citizenId": "030200008798",
  //         "photoCitizenFront": "/files/upload/account/1019/0241fbf8-7f14-4d2f-a0e7-2d64eee04a0c.jpg",
  //         "photoCitizenBack": "/files/upload/account/1019/6c0884b5-a96e-482a-9d66-ec09335fb8ad.jpg",
  //         "fullName": "Vũ Văn B",
  //         "doB": "07/08/2000",
  //         "gender": "Nam",
  //         "supportBudget": 0,
  //         "wage": 0,
  //         "monthInsured": 12,
  //         "oldCardStartDate": "",
  //         "oldCardEndDate": "",
  //         "newCardEndDate": "",
  //         "newCardStartDate": "29/09/2024",
  //         "price": 1263000,
  //         "hospitalId": 4454,
  //         "provinceId": 1398,
  //         "districtId": 1777,
  //         "wardId": 8581,
  //         "addressDetail": "Địa chỉ ks",
  //         "ksXaPhuongMa": 8581,
  //         "ksQuanHuyenMa": 1777,
  //         "ksTinhThanhMa": 1398,
  //         "ksDiaChi": "Địa chỉ cụ thể",
  //         "ethnicId": 1001,
  //         "vungLuongToiThieuId": 1004,
  //         "benefitLevel": "5"
  //       }
  //     ]
  //   }
  // }, [])

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/insurance/api/list-paging-viewmodel?pageIndex=1&pageSize=100&insuranceTypeId=1002`
      )
      .then((response) => {
        setListProduct(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <HeaderBase
          isHome={false}
          title={"BHYT tự nguyện"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  return (
    <div className="pt-20">
      <HeaderBase isHome={false} title={"BHYT tự nguyện"} />
      <div className="flex flex-col gap-[16px] px-4 py-[15px]">

        <div className="flex flex-col gap-8 pt-1">
          {/* Danh sách bảo hiểm y tế tự nguyện */}
          {listProduct.map((item: any) => {
            return (
              <CardProductBHYT
                key={`${item?.id}`}
                url={"/register-BHYT"}
                data={item}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ListHealthInsurance;

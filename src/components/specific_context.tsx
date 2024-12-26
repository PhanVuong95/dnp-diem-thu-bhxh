import React, { createContext, useState, ReactNode } from "react";

interface Member {
  id?: number,
  name?: string,
  doB?: string,
  gender?: string,
  ethnicId?: number,
  relationShipId?: string,
  citizenId?: string,
  ksProvinceId?: number,
  ksDistrictId?: number,
  ksWardId?: number,
  ksAddressDetail?: string
}

interface InsuredPerson {
  id: number
  insuranceProvinceId: number;
  socialInsuranceNumber?: string;
  citizenId: string;
  photoCitizenFront?: string;
  photoCitizenBack?: string;
  fullName: string;
  doB: string;
  gender: string;
  supportBudget?: number;
  wage?: number;
  monthInsured?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  addressDetail?: string;
  ksXaPhuongMa?: number;
  ksQuanHuyenMa?: number;
  ksTinhThanhMa?: number;
  ksDiaChi?: string;
  soGiayToCaNhan?: string;
  ttTinhThanhMa?: number;
  ttQuanHuyenMa?: number;
  ttXaPhuongMa?: number;
  ethnicId?: number;
  medicalProvinceId?: number,
  medicalDistrictId?: number,
  hospitalId?: number,
  vungLuongToiThieuId?: number,
  benefitLevel?: string,
}

interface InsuranceOrder {
  id: number;
  referrerCode: string;
  insuranceId: number;
  accountId: number;
  citizenId: number;
  photoCitizenFront?: string;
  photoCitizenBack?: string;
  phone: string;
  fullName: string;
  email?: string;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  finalPrice: number;
  addressDetail?: string;
  listInsuredPerson: InsuredPerson[];
  houseHold?: {
    "id": number,
    "chuHoTen": string,
    "ksProvinceId": number,
    "ksDistrictId": number,
    "ksWardId": number,
    "ksAddressDetail": string,
    "hkAddressDetail": string,
    "soGiayToCaNhan": string,
    "ttProvinceId": number,
    "ttDistrictId": number,
    "ttWardId": number,
    houseHoldPeoples?: Member[]
  }
}
interface SpecificContextType {
  insuranceOrder: InsuranceOrder;
  setInsuranceOrder: (order: InsuranceOrder) => void;
}
export const SpecificContext = createContext<SpecificContextType | undefined>(
  undefined
);

export const SpecificProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [insuranceOrder, setInsuranceOrder] = useState<InsuranceOrder>({
    id: 0,
    referrerCode: localStorage.referrerCode != "" ? localStorage.referrerCode : null,
    insuranceId: 0,
    accountId: 0,
    citizenId: 0,
    photoCitizenFront: "",
    photoCitizenBack: "",
    phone: "",
    fullName: "",
    email: "",
    provinceId: 0,
    districtId: 0,
    wardId: 0,
    finalPrice: 0,
    addressDetail: "",
    listInsuredPerson: [
      {
        id: 0,
        insuranceProvinceId: 0,
        socialInsuranceNumber: "",
        citizenId: "",
        photoCitizenFront: "",
        photoCitizenBack: "",
        fullName: "",
        doB: "",
        gender: "",
        supportBudget: 0.0,
        wage: 1500000,
        monthInsured: 0,
        provinceId: 0,
        districtId: 0,
        wardId: 0,
        addressDetail: "",
        ethnicId: 0,
        ksXaPhuongMa: 0,
        ksQuanHuyenMa: 0,
        ksTinhThanhMa: 0,
        ksDiaChi: "",
      },
    ],
    "houseHold": {
      "id": 0,
      "chuHoTen": "",
      "ksProvinceId": 0,
      "ksDistrictId": 0,
      "ksWardId": 0,
      "ksAddressDetail": "",
      "hkAddressDetail": "",
      "soGiayToCaNhan": "",
      "ttProvinceId": 0,
      "ttDistrictId": 0,
      "ttWardId": 0,
      "houseHoldPeoples": [
        {
          "id": 0,
          "name": "",
          "doB": "",
          "gender": "",
          "ethnicId": 0,
          "relationShipId": "0",
          "citizenId": ""
        }
      ]
    },
  });
  return (
    <SpecificContext.Provider
      value={{
        insuranceOrder,
        setInsuranceOrder,
      }}
    >
      {children}
    </SpecificContext.Provider>
  );
};

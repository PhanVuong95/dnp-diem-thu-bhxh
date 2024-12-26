import { Input, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import { BASE_URL } from "../utils/constants";
import { convertListToSelectBanks } from "../utils/validateString";

const BankInfoPage = () => {

  const [listBanks, setListBanks] = useState([])
  const [selectedBankCode, setSelectedBankCode] = useState("")
  const [bankBranch, setBankBranch] = useState("")
  const [bankOwner, setBankOwner] = useState("")
  const [bankNumber, setBankNumber] = useState("")

  useEffect(() => {
    axios
      .get(`https://api.vietqr.io/v2/banks`)
      .then((response) => {
        setListBanks(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const fetchBankInfo = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/account/api/get-bank-info`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        console.log(response.data.data[0]);
        const data = response.data.data[0];
        setSelectedBankCode(data?.bankBin)
        setBankBranch(data?.bankBranch)
        setBankOwner(data?.bankOwnerName)
        setBankNumber(data?.bankOwnerNumber)
      }

    } catch (error) {
    }
  }

  useEffect(() => {

    fetchBankInfo()
  }, []);

  const renderBankName = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên ngân hàng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownStyle={{ maxWidth: '300px' }}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn ngân hàng"
          value={selectedBankCode}
          onChange={(value: any) => {
            setSelectedBankCode(value)
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelectBanks(listBanks, 'Chọn ngân hàng')}
        />
      </div>
    )
  }

  const renderBankBranch = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên chi nhánh
        </label>
        <Input
          type="text"
          value={bankBranch}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập chi nhánh"
          onChange={(e) => {
            setBankBranch(e.target.value);
          }}
        />
      </div>
    )
  }

  const inputFullName = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên chủ tài khoản <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          value={bankOwner}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên"
          onChange={(e) => {
            setBankOwner(e.target.value);
          }}
        />
      </div>
    )
  }

  const inputBankNumber = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số tài khoản <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          value={bankNumber}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số tài khoản"
          onChange={(e) => {
            setBankNumber(e.target.value);

          }}
        />
      </div>
    )
  }

  const validate = () => {
    if (selectedBankCode == "") {
      toast.warning("Tên ngân hàng không được để trống!");
      return false
    }

    if (bankOwner == "") {
      toast.warning("Tên Chủ tài khoản không được để trống!");
      return false
    }

    if (bankNumber == "") {
      toast.warning("Tên Chủ tài khoản không được để trống!");
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (validate()) {
      const token = localStorage.token;
      const bankFind = listBanks.find((item: any) => item?.bin == selectedBankCode) as any

      const data = {
        "BankName": bankFind?.name,
        "BankBin": selectedBankCode,
        "BankBranch": bankBranch,
        "BankOwnerNumber": bankNumber,
        "BankOwnerName": bankOwner,
      }

      try {
        const response = await axios.post(
          `${BASE_URL}/account/api/update-bank-info`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status == "200" && response.data.message == "SUCCESS") {
          toast.success("Cập nhật thông tin tài khoản thành công!");
          return
        }

        toast.warning("Cập nhật thông tin tài khoản thất bại!");

      } catch (error) {
        toast.warning("Cập nhật thông tin tài khoản thất bại!");
      }

    }
  }

  const boxFooter = () => {
    return (
      <div className="p-4 bg-white fixed bottom-0 w-[100%]">
        <button
          onClick={() => {
            onSubmit();
          }}
          className="px-[20px] py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-lg font-normal text-white text-center"
        >
          Lưu lại
        </button>
      </div >
    );
  };


  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Thông tin ngân hàng"
      />

      <Page className="page mt-20">
        <div className="rounded-xl bg-white p-4">
          {renderBankName()}
          {renderBankBranch()}
          {inputFullName()}
          {inputBankNumber()}

        </div>
      </Page>
      {boxFooter()}
    </div>
  )
}

export default BankInfoPage;
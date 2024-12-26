import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import { BASE_URL } from "../utils/constants";
import { convertListToSelect, convertListToSelectObjectTypeGroup, convertListToSelectObjectTypeGroupList } from "../utils/validate_string";

interface Props {
  refs?: any;
}

const CardObject = (props: Props) => {
  const { refs } = props;

  const [objectTypeGroupList, setObjectTypeGroupList] = useState<any>([]);
  const [objectTypeGroup, setObjectTypeGroup] = useState<any>([]);

  const [selectedObjectTypeGroupList, setSelectedObjectTypeGroupList] = useState(registerInfoBHYT.nhomLoaiDoiTuongId);
  const [selectedObjectTypeGroup, setSelectedObjectTypeGroup] = useState(registerInfoBHYT.loaiDoiTuongId);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/nhomloaidoituong/api/list`)
      .then((response) => {
        setObjectTypeGroupList(response.data.data)

      })
      .catch((error) => {

        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchObjectTypeGroup();
  }, [selectedObjectTypeGroupList]);

  const fetchObjectTypeGroup = () => {
    if (selectedObjectTypeGroup !== 0) {
      axios.get(`${BASE_URL}/loaidoituong/api/listbynhomloaidoituongid?nhomloaidoituongid=${selectedObjectTypeGroupList}`)
        .then((response) => {

          setObjectTypeGroup(response.data.data)

        })
        .catch((error) => {

          console.error(error);
        });
    }
  }


  const renderTextHeader = () => {
    return (
      <h3 className="text-[#0076B7] text-lg font-medium">
        Thông tin đối tượng tham gia
      </h3>
    )
  }

  const renderObjectTypeGroupList = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Nhóm loại đối tượng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.nhomLoaiDoiTuongId}
          dropdownStyle={{ maxWidth: '300px' }}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn loại đối tượng"
          value={selectedObjectTypeGroupList}
          key={selectedObjectTypeGroupList}
          onChange={(value: any) => {
            setSelectedObjectTypeGroupList(value);

            setSelectedObjectTypeGroup(null);

            registerInfoBHYT.nhomLoaiDoiTuongId = value

            registerInfoBHYT.loaiDoiTuongId = 0

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelectObjectTypeGroupList(objectTypeGroupList)}
        />
      </div>
    )
  }

  const renderObjectTypeGroup = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Loại đối tượng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.loaiDoiTuongId}
          dropdownStyle={{ maxWidth: '300px' }}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn loại đối tượng"
          value={selectedObjectTypeGroup}
          key={selectedObjectTypeGroup}
          onChange={(value: any) => {
            setSelectedObjectTypeGroup(value);

            registerInfoBHYT.loaiDoiTuongId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelectObjectTypeGroup(objectTypeGroup)}
        />
      </div>
    )
  }

  return (
    <div>
      {renderTextHeader()}

      {renderObjectTypeGroupList()}

      {renderObjectTypeGroup()}
    </div>
  )
}

export default CardObject;
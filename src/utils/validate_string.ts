export const formatMoneyVND = (amount) => {
  try {
    return amount.toLocaleString('vi-VN', { currency: 'VND' });
  } catch (error) {
    return 0
  }
};

export function isValidDate(date: any) {
  return date instanceof Date
}

export const formatDate = (date: any) => {
  try {
    const temp = new Date(date)
    let year = temp.getFullYear();
    let month = (temp.getMonth() + 1).toString().padStart(2, '0');
    let day = temp.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
  } catch {
    return ''
  }
}

export const formatDateToUpdateSQL = (date: Date) => {
  try {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  } catch {
    return ''
  }
}

export const removeUndefinedField = (params: object) => {
  Object.keys(params).forEach(key => {
    if (typeof params[key] === 'undefined') {
      delete params[key];
    }
  });
  return params;
};

export const convertPayloadToQueryString = (payload: object = {}) => {
  return Object.keys(payload).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
  }).join('&');
};

export const formatTime = (dates: string) => {
  try {
    var date = dates.split('T')[0]?.split('-')

    var time = dates.split('T')[1]?.split(':')
    if (date) {
      return `${time[0]}:${time[1]} - ${date[2]}/${date[1]}/${date[0]}`
    }
  } catch (error) {
    return ''
  }
}

export const formatTime1 = (dates: string) => {
  try {
    var date = dates.split('T')[0]?.split('-')

    var time = dates.split('T')[1]?.split(':')
    if (date) {
      return ` ${date[2]}/${date[1]}/${date[0]}`
    }
  } catch (error) {
    return ''
  }
}

export const formatTimeSql = (dates: string) => {
  var time = dates.split('/')
  if (time) {
    return `${time[2]}-${time[1]}-${time[0]}`
  }
  return ''
}


export const isValidEmptyString = (data: string) => {
  if (data === undefined || data === null || data === "" || data.length === 0) {
    return false
  }
  return true
}

export const isValidUserName = (data: string) => {
  const usernameCheck = /^[a-zA-Z0-9_.]{6,20}$/;
  return usernameCheck.test(data)
}

export const isValidEmail = (data: string) => {
  const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailCheck.test(data)
}

export const isValidFullName = (data: string) => {
  const fullNameCheck = /^[a-zA-ZÀÁÂÃÈÉÊiÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
  return fullNameCheck.test(data)
}

export const isValidPassword = (data: string) => {
  const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/
  return passwordCheck.test(data)
}

export const isValidPhone = (data: string) => {
  const phoneCheck = /^(0[3|5|7|8|9])[0-9]{8}$/;
  return /^\d+$/.test(data) && phoneCheck.test(data);
}
export const isValidAddress = (data: string) => {
  const addressCheck = /^[a-zA-Z0-9-_ÀÁÂÃÈÉÊiÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,.\/()*]+$/
  return !addressCheck.test(data)
}

export const formatPhoneNumber = (phoneNumber) => {
  try {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
  } catch (error) {
    return ''
  }
}

export const isValidSocialInsuranceNumber = (data: string) => {
  const socialInsuranceNumberCheck = /^[0-9]{10}$/;
  return /^\d+$/.test(data) && socialInsuranceNumberCheck.test(data);
}

export const isValidHealthInsuranceNumber = (data: string) => {
  if (data.length == 10) {
    const socialInsuranceNumberCheck = /^[0-9]{10}$/;
    return /^\d+$/.test(data) && socialInsuranceNumberCheck.test(data);
  } else if (data.length == 15) {
    const socialInsuranceNumberCheck = /^[A-Za-z]{2}[0-9]{13}$/;
    return socialInsuranceNumberCheck.test(data);
  }
  return false;
}


export const isValidOldHealthInsuranceNumber = (data: string) => {
  const socialInsuranceNumberCheck = /^[A-Za-z]{2}[0-9]{13}$/;
  return /^\d+$/.test(data) && socialInsuranceNumberCheck.test(data);
}



export const isValidCitizenId = (data: string) => {
  const citizenIdCheck = /^[0-9]{12}$/;
  return /^\d+$/.test(data) && citizenIdCheck.test(data);
}

export const compareTwoDateString = (dateString1, dateString2) => {

  // Hàm chuyển đổi chuỗi ngày theo định dạng MM/DD/YYYY sang YYYY-MM-DD
  function convertDateFormat(dateString) {
    const parts = dateString.split('/');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  }

  // Chuyển đổi các chuỗi ngày sang định dạng mới
  const formattedDateString1 = convertDateFormat(dateString1);
  const formattedDateString2 = convertDateFormat(dateString2);

  // Tạo các đối tượng Date
  const date1 = new Date(formattedDateString1);
  const date2 = new Date(formattedDateString2);

  // So sánh
  if (date1 > date2) {
    // Ngày 1 sau ngày 2
    return 2;
  } else if (date1 < date2) {
    // Ngày 1 trước ngày 2
    return 1;
  } else {
    return 0;
  }
}

export const isValidString = (data) => {
  if (typeof data !== "string") return "";
  return data.trim();
}

interface typeSelect {
  value: number,
  label: string
}

export const convertListToSelect = (data, placeholer) => {
  let list: typeSelect[] = [];
  list.push({ value: 0, label: placeholer });
  data.forEach(element => {
    list.push({ value: element.id, label: element.name });
  });
  return list
}

export const convertListToSelectVungLuong = (data, placeholer) => {
  let list: typeSelect[] = [];
  list.push({ value: 0, label: placeholer });
  data.forEach(element => {
    list.push({ value: element.id, label: element.vungLttTen });
  });
  return list
}

export const convertListToSelectBanks = (data, placeholer) => {
  let list: typeSelect[] = [];
  list.push({ value: 0, label: placeholer });
  data.forEach(element => {
    list.push({ value: element.bin, label: element.name });
  });
  return list
}

export const formatDate2 = (date: Date) => {
  try {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
  } catch {
    return ''
  }
}

export const formatDateByTime = (date: Date) => {
  try {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  } catch {
    return ''
  }
}

export const convertListToSelectObjectTypeGroupList = (data) => {
  let list: typeSelect[] = [];
  data.forEach(element => {
    list.push({ value: element.id, label: element.nhomLoaiDoiTuongTen });
  });
  return list
}

export const convertListToSelectObjectTypeGroup = (data) => {
  let list: typeSelect[] = [];
  data.forEach(element => {
    list.push({ value: element.id, label: element.doiTuongTen });
  });
  return list
}

export const formatPhoneNumberZalo = (input: string): string => {
  if (input.length >= 2) {
    return '0' + input.slice(2);
  }
  return input;
}
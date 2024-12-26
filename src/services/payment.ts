import api, { Payment } from "zmp-sdk";
import cryptoJS from "crypto-js";
import * as _ from "lodash";

export const createMacFE = async (body) => {
  try {
    const dataMac = Object.keys(body)
      .sort()
      .map(
        (key) =>
          `${key}=${typeof body[key] === "object"
            ? JSON.stringify(body[key])
            : body[key]
          }`
      )
      .join("&");
    // biến môi trường ZALO_CHECKOUT_SECRET_KEY lấy ở bước 3
    const mac = cryptoJS
      .HmacSHA256(dataMac, "cd83b5eb0040a6499a97e6a639c9ac2f")
      .toString();
    return mac;
  } catch (e) {
    console.log(e);
  }
};

const publicApiCache: { [key: string]: any } = {};

export const getStorage = async <T = any>(key: string): Promise<T | null> => {
  try {
    const result = await api.getStorage({
      keys: [key],
    });
    return result?.[key] as T;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    try {
      return JSON.parse(window.localStorage.getItem(key) as string);
    } catch (error) {
      return null;
    }
  }
};

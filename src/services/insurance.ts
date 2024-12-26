import instance from "../api/api-config";
import api from "zmp-sdk";
import { IPaymentTransaction } from "../models/payment";

const publicApiCache: { [key: string]: any } = {};

export const updateInsuranceOnly = async (
  id: string,
  feature: any,
  body: any
): Promise<{
  paymentIntent: IPaymentTransaction;
  insuranceDraft: any;
}> => {
  const res = await fetch(`${instance}/my/insurance/${id}/onlyupdate`, {
    method: "PUT",
    body: JSON.stringify({
      ...body,
      feature,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

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

//create mac
export const createMac = async (body: any): Promise<string> => {
  const url = `${instance}/public/insurance/mac`;

  if (!publicApiCache[url]) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    });
    const resData = await res.text();
    if (res.ok) publicApiCache[url] = resData;
    else throw new Error("Có lỗi xảy ra!");
  }
  return publicApiCache[url];
};

//update orderStatus
export const updateOrderStatus = async (
  orderId: string,
  resultCode,
  checkoutSecretKey: string
) => {
  const url = `https://payment-mini.zalo.me/api/transaction/${process.env.APP_ID}/custom-callback-payment`;
  let data = `appId=${process.env.APP_ID}&orderId=${orderId}&resultCode=${resultCode}&privateKey=${checkoutSecretKey}`;
  let mac = createMac(data);
  let body = {
    appId: process.env.APP_ID,
    orderId: orderId,
    resultCode: resultCode,
    mac: mac,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
    body: JSON.stringify(body),
  });

  const result = await res.json();
  if (result.error) {
    throw Error(result.message);
  }
  return result;
};

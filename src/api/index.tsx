import { CityType } from "../models";
import { CategoryType } from "../models/category";
import instance from "./api-config";

export const fetchCategorys = async (): Promise<CategoryType[]> => {
  const response = await instance.get<CategoryType[]>("/supplier/api/list");
  return response.data;
};

export const fetchCity = async (): Promise<CityType[]> => {
  const response = await instance.get<CityType[]>("/province/api/list");
  return response.data;
};

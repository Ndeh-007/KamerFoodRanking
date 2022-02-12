// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"; 
export interface DishCardProperties {
  image: string;
  name: string;
  uploader: string;
  region: string;
  description: string;
  rating: string | number;
  id: number | string;
  rateCount: number | string;
  totalRating: number | string;
  liked:boolean;
  rate: Function;
}
  
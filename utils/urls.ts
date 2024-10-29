import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

export const PathUrl = {
  SIGN_IN: `${API_URL}/sign-in`,
  PROFILE: `${API_URL}/profile`,
  PRODUCT_BANNER: `${API_URL}/product/banner`,
  PRODUCT_SHOPPING_MALL: `${API_URL}/product/shopping-mall`,
  PRODUCT_SHOPPING_MALL_BY_ID: `${API_URL}/product/shopping-mall/1`,
  PRODUCT_SHOPPING_REC: `${API_URL}/product/recommended`,
  PRODUCT_CATEGORY: `${API_URL}/product/category`,
  PRODUCT_CATEGORY_BY_ID: `${API_URL}/product/category/1`,
  PRODUCT: `${API_URL}/product`,
  PRODUCT_BY_ID: `${API_URL}/product/40`,
  PRODUCT_FAV: `${API_URL}/product/favorite`,
};

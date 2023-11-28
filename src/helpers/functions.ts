import { config } from "process";
import { ITokens } from "../store/users/usersTypes";
import { USERS_API } from "./consts";
import axios from "axios";

export const addTokensToLocalStorage = (tokens: ITokens) => {
  localStorage.setItem("reduxTokens", JSON.stringify(tokens));
};

export const logout = () => {
  localStorage.removeItem("reduxTokens");
  localStorage.removeItem("reduxEmail");
};

export const checkUserLogin = () => {
  const storedData = localStorage.getItem("reduxTokens");
  let tokens;
  if (storedData) {
    tokens = JSON.parse(storedData);
  }
  if (tokens) return true;
  return false;
};

export const updateTokens = () => {
  let updateFunc: NodeJS.Timer | null = setInterval(async () => {
    const storedTokens = localStorage.getItem("reduxTokens");

    if (!storedTokens) {
      if (updateFunc !== null) {
        clearInterval(updateFunc);
      }
      return;
    }

    const tokens = JSON.parse(storedTokens);

    if (!tokens) {
      if (updateFunc !== null) {
        clearInterval(updateFunc);
      }
      return;
    }

    const Authorization = `Bearer ${tokens.access}`;

    const response = await axios.post(
      `${USERS_API}/refresh/`,
      { refresh: tokens.refresh },
      { headers: { Authorization } }
    );

    localStorage.setItem(
      "reduxTokens",
      JSON.stringify({
        refresh: tokens.refresh,
        access: response.data.access,
      })
    );
  }, 1000 * 60 * 60 * 12);

  return updateFunc;
};

export const getAccessToken = () => {
  const storedTokens = localStorage.getItem("reduxTokens");
  if (!storedTokens) return;
  const tokens = JSON.parse(storedTokens);
  return tokens.access;
};

export const randomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const firstCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = firstCharacter.charAt(
    Math.floor(Math.random() * firstCharacter.length)
  );

  for (let i = 1; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
export const getTotalPages = async (url: string) => {
  const storedData = localStorage.getItem("reduxTokens");
  let tokens: ITokens | null = null;

  if (storedData) {
    tokens = JSON.parse(storedData);
  }

  if (tokens) {
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    const { data } = await axios.get(url, config);
    const totalPages = Math.ceil(data.count / 10);

    return totalPages;
  }
};

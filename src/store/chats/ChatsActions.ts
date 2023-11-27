import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CHATS_API } from "../../helpers/consts";
import { IChatRoom } from "./ChatsTypes";
import { getAccessToken } from "../../helpers/functions";

export const getChatrooms = createAsyncThunk("chats/getChatrooms", async () => {
  const Authorization = `Bearer ${getAccessToken()}`;
  const { data } = await axios.get(`${CHATS_API}/chatrooms/`, {
    headers: {
      Authorization,
    },
  });
  return data;
});

export const createChatroom = createAsyncThunk(
  "chats/createChatroom",
  async ({ chatroom }: { chatroom: IChatRoom }) => {
    const formData = new FormData();
    formData.append("title", chatroom.title);
    formData.append("participants", JSON.stringify(chatroom.participants));

    // console.log(Object.fromEntries(formData.entries()));

    const Authorization = `Bearer ${getAccessToken()}`;

    await axios.post(`${CHATS_API}/chatrooms/`, formData, {
      headers: {
        Authorization,
      },
    });

    alert("Chat room created");
  }
);

export const getOneChat = createAsyncThunk(
  "chats/getOneChat",
  async ({ chatroomId }: { chatroomId: number }) => {
    const Authorization = `Bearer ${getAccessToken()}`;

    const { data } = await axios.get(`${CHATS_API}/chatrooms/${chatroomId}/`, {
      headers: {
        Authorization,
      },
    });
    return data;
  }
);

export const addMessage = createAsyncThunk(
  "chats/addMessage",
  async ({ message }: { message: any }) => {
    const Authorization = `Bearer ${getAccessToken()}`;
    const formData = new FormData();

    formData.append("chatroom", message.chatroom);
    formData.append("text", message.content);

    await axios.post(`${CHATS_API}/messages/`, formData, {
      headers: {
        Authorization,
      },
    });
  }
);

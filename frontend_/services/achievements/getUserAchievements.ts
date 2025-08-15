import { AchievementLog } from "@/types/user/achievements";
import api from "../api";

export const getUserAchievements = async () => {
  try {
    const response = await api.get<AchievementLog[]>("user/achievements/user/");
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar buscar conquistas do usuário");
  }
};

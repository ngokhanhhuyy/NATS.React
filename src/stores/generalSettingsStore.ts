import { create } from "zustand";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";

const generalSettingsResponseDto = await getGeneralSettingsAsync();

export type GeneralSettingsStore = {
  readonly reload: () => Promise<void>;
} & GeneralSettingsDetailModel;

export const useGeneralSettingsStore = create<GeneralSettingsStore>((set) => ({
  ...generalSettingsResponseDto,
  reload: async () => {
    const responseDto = await getGeneralSettingsAsync();
    set(responseDto);
  }
}));
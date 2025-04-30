import { createClonableModel } from "@/models/baseModels";

declare global {
  type SignInModel = {
    userName: string;
    password: string;
    toRequestDto(): SignInRequestDto;
  };
}

export function createSignInModel(): SignInModel {
  return {
    ...createClonableModel(),
		userName: "",
		password: "",
		toRequestDto(): SignInRequestDto {
      return {
        userName: this.userName,
        password: this.password
      };
    },
	};
}
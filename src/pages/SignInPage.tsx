import { useState, type FormEvent } from "react";
import { signInAsync } from "@/services/authenticationService";
import { createSignInModel } from "@/models/signInModel";
import { useModelState } from "@/hooks/modelErrorHook";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";
import { ValidationError, OperationError } from "@/errors";
import styles from "./SignInPage.module.css";

// Layout component.
import MainContainer from "@/components/layouts/public/MainContainer";

export default function SignInPage() {
  // Dependencies.
  const generalSettingsStore = useGeneralSettingsStore();

  // States.
  const [model, setModel] = useState<SignInModel>(() => createSignInModel());
  const modelState = useModelState();

  // Computed.
  function computeInputClassName(key: string): string {
    if (modelState.hasError(key)) {
      return "form-control is-invalid";
    }

    return "form-control";
  }

  // Callback.
  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    modelState.clearErrors();
    try {
      await signInAsync(model.toRequestDto());
    } catch (error) {
      if (error instanceof ValidationError || error instanceof OperationError) {
        modelState.setErrors(error.errors);
        return;
      }

      throw error;
    }
  }

  // Template.
  return (
		<MainContainer
			title="Đăng nhập"
			className="d-flex flex-fill justify-content-center align-items-center p-0 bg-success"
		>
			<div className="row w-100 justify-content-center align-items-center">
				<div
					className={`col col-sm-auto col-12 p-0 m-sm-4 m-0 rounded-4 shadow
					            bg-white ${styles.formContainer}`}
				>
					{/* Header */}
					<div className="d-flex justify-content-center align-items-center p-4 pb-2">
						<img
							src="/images/main-logo-transparent-white.png"
							className={styles.logo}
							alt={generalSettingsStore.applicationName}
						/>
					</div>

					{/* Form */}
					<form className="bg-white p-3 w-100" onSubmit={onSubmit}>
						{/* UserName */}
						<div className="form-group mb-3">
							<div className="form-floating">
								<input
									type="text"
									name="userName"
									className={computeInputClassName("userName")}
									placeholder=""
									value={model.userName}
									onChange={(event) => {
										setModel((model) => ({ ...model, userName: event.target.value }));
									}}
								/>
								<label htmlFor="userName">Tên tài khoản</label>
							</div>

							{modelState.hasError("userName") && (
								<span className="text-danger">{modelState.getMessage("userName")}</span>
							)}
						</div>

						{/* UserName */}
						<div className="form-group mb-3">
              <div className="form-floating">
                <input
                  type="password"
                  name="password"
                  className={computeInputClassName("password")}
                  placeholder=""
                  value={model.password}
                  onChange={(event) => {
                    setModel((model) => ({ ...model, password: event.target.value }));
                  }}
                />
                <label htmlFor="password">Mật khẩu</label>
              </div>

							{modelState.hasError("password") && (
								<span className="text-danger">{modelState.getMessage("password")}</span>
							)}
						</div>

						{/* SubmitButton */}
						<button type="submit" className="btn btn-success w-100">
							Đăng nhập
						</button>
					</form>
				</div>
			</div>
		</MainContainer>
	);
}
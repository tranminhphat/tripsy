import { Button } from "@material-ui/core";
import RegisterImage from "assets/images/backgrounds/signup-image.jpg";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Form, Formik } from "formik";
import IRegisterForm from "interfaces/forms/register-form.interface";
import * as React from "react";
import { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FileReaderResultType } from "types";
import * as yup from "yup";
import { MyFileInput } from "../Shared/MyFileInput";
import MyTextField from "../Shared/MyTextField";

interface Props {
	error: string;
	isLoading: boolean;
	onSubmit: (values: IRegisterForm) => void;
}

const validationSchema = yup.object({
	firstName: yup.string().required("Tên là thông tin bắt buộc"),
	lastName: yup.string().required("Họ là thông tin bắt buộc"),
	email: yup
		.string()
		.required("Email là thông tin bắt buộc")
		.email("Email không hợp lệ"),
	username: yup
		.string()
		.required("Username là thông tin bắt buộc")
		.min(6, "Username phải có tối thiểu 6 ký tự")
		.strict()
		.lowercase("Username không được có ký tự viết hoa"),
	password: yup
		.string()
		.required("Mật khẩu là thông tin bắt buộc")
		.min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),
	gender: yup.string().required("Giới tính là thông tin bắt buộc"),
	dateOfBirth: yup.date().required("Ngày sinh là thông tin bắt buộc"),
	address: yup.string(),
});

const RegisterForm: React.FC<Props> = ({ error, isLoading, onSubmit }) => {
	const [base64EncodedImage, setBase64EncodedImage] =
		useState<FileReaderResultType>("");

	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");

	const handleSetImage = (image: FileReaderResultType) => {
		setBase64EncodedImage(image);
	};

	return (
		<div className="flex justify-evenly">
			<div className="flex flex-col items-center justify-center">
				<div className="text-center mt-4">
					<h1 className="text-4xl font-semibold leading-normal mt-0 mb-2 text-secondary">
						Đăng ký
					</h1>
				</div>
				<div className=" mt-4 w-80 h-px border border-solid border-secondary" />
				<Formik
					initialValues={{
						firstName: "",
						lastName: "",
						email: "",
						username: "",
						password: "",
						gender: "",
						dateOfBirth: "",
						address: "",
					}}
					onSubmit={(values) => {
						onSubmit({
							...values,
							phoneNumber: phoneNumber!,
							avatarBase64: base64EncodedImage,
							introduction: "",
						});
					}}
					validationSchema={validationSchema}
				>
					{() => (
						<Form className="mt-6 w-full grid grid-cols-1 justify-items-center md:grid-cols-2 md:grid-gap-2">
							<div className="mt-4 w-7/12 ">
								<MyTextField label="Tên" name="firstName" className="w-full" />
							</div>
							<div className="mt-4 w-7/12 ">
								<MyTextField label="Họ" name="lastName" className="w-full" />
							</div>
							<div className="mt-4 w-7/12">
								<MyTextField label="Email" name="email" className="w-full" />
							</div>
							<div className="mt-4 w-7/12">
								<MyTextField
									label="Username"
									name="username"
									className="w-full"
								/>
							</div>
							<div className="mt-4 w-7/12">
								<MyTextField
									label="Password"
									name="password"
									type="password"
									className="w-full"
								/>
							</div>
							<div className="mt-4 w-7/12">
								<label className="text-xs mb-4 uppercase text-gray-400">
									Giới tính
								</label>
								<div>
									<MyRadioButton
										name="gender"
										type="radio"
										value="male"
										label="Nam"
									/>
									<MyRadioButton
										name="gender"
										type="radio"
										value="female"
										label="Nữ"
									/>
								</div>
							</div>
							<div className="mt-4 w-7/12">
								<MyTextField
									label="Ngày sinh"
									type="date"
									name="dateOfBirth"
									className="w-full"
								/>
							</div>
							<div className="mt-4 w-7/12">
								<MyTextField
									label="Địa chỉ"
									name="address"
									className="w-full"
								/>
							</div>
							<div className="ml-16 mt-4">
								<label
									htmlFor="phoneNumber"
									className="text-xs mb-4 uppercase text-gray-400"
								>
									Số điện thoại
								</label>
								<div
									className={`border border-gray-300 rounded-md p-2 ${
										phoneNumberError !== "" ? "border-danger" : ""
									}`}
								>
									<PhoneInput
										international
										defaultCountry="VN"
										placeholder="Enter phone number"
										value={phoneNumber}
										onChange={setPhoneNumber}
										onBlur={() =>
											phoneNumber
												? isPossiblePhoneNumber(phoneNumber)
													? setPhoneNumberError("")
													: setPhoneNumberError("Số điện thoại không hợp lệ ")
												: setPhoneNumberError(
														"Số điện thoại là thông tin bắt buộc"
												  )
										}
									/>
								</div>
								<div className="text-sm text-danger mt-2">
									{phoneNumberError}
								</div>
							</div>
							<div className="mt-4 w-7/12 md:col-span-2">
								<label className="text-xs mb-4 uppercase text-gray-400">
									Chọn ảnh đại diện:
								</label>
								<MyFileInput handleSetImage={handleSetImage} />
							</div>
							<div className="mt-4 w-7/12" />
							<div className="mt-8 w-4/12 md:col-span-2 h-12">
								<Button
									className="outline:none w-full h-full bg-secondary text-white"
									type="submit"
									disabled={isLoading}
								>
									{isLoading ? <MyLoadingIndicator /> : <p>Đăng ký</p>}
								</Button>
							</div>
							<div className="mt-4 md:col-span-2">
								{error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="text-center">
				<img src={RegisterImage} alt="sign up" width={394} height={420} />
				<div className="mt-4">
					<span className="text-lg">
						Bạn đã có tài khoản?{" "}
						<a className="underline hover:no-underline" href="/login">
							Đăng nhập ngay!
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;

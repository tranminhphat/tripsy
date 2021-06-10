import { Avatar, Button, Tooltip, Typography } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import GradeOutlinedIcon from "@material-ui/icons/GradeOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { changeAvatar } from "api/users";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import { useProfile } from "hooks/queries/profiles";
import { useCountReview } from "hooks/queries/reviews";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useState } from "react";
import { FileReaderResultType } from "types";
import ConfirmedInformation from "./ConfirmedInformation";

interface Props {
	userData: IUser;
	isCurrentUser: boolean;
}

const UserOverview: React.FC<Props> = ({ userData, isCurrentUser }) => {
	const [fileInputState] = useState("");
	const [fileReader, setFileReader] = useState<FileReaderResultType>();
	const { data: profile } = useProfile(userData.profileId);
	const { data: reviewObject } = useCountReview(userData._id!);

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setFileReader(reader.result);
		};
	};

	const changeUserAvatar = async (fileReader) => {
		const { data } = await changeAvatar(fileReader);
		if (data) {
			window.location.reload();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center p-8">
			<div className="relative">
				{!fileReader ? (
					<Avatar
						style={{ width: "96px", height: "96px" }}
						src={userData.avatarUrl ? userData.avatarUrl : SkeletonUserAvatar}
						alt="avatar"
					/>
				) : (
					<Avatar
						style={{ width: "96px", height: "96px" }}
						src={fileReader as string}
						alt="avatar"
					/>
				)}
				{isCurrentUser ? (
					<div
						style={{ width: "30px", height: "30px" }}
						className="absolute bottom-1 right-0 border border-gray-300 rounded-full bg-white flex items-center justify-center"
					>
						<Tooltip title="Thay đổi avatar">
							<label className="cursor-pointer">
								<EditRoundedIcon className="text-md" />
								<input
									type="file"
									className="hidden"
									onChange={handleFileInputChange}
									value={fileInputState}
								/>
							</label>
						</Tooltip>
					</div>
				) : null}
			</div>
			<div>
				{!isCurrentUser ? (
					<Tooltip
						className="mt-2 text-lg font-bold"
						title={`Gửi mail đến ${userData.firstName}`}
					>
						<a href={`mailto:${userData.email}`}>
							<MailOutlineIcon />
						</a>
					</Tooltip>
				) : null}
			</div>
			<div>
				{fileReader ? (
					<>
						<Button
							className="mt-4 mr-1"
							variant="contained"
							onClick={() => setFileReader(null)}
						>
							Hủy
						</Button>
						<Button
							variant="contained"
							className="bg-primary text-white mt-4 ml-1"
							onClick={() => changeUserAvatar(fileReader)}
						>
							Thay đổi
						</Button>
					</>
				) : null}
			</div>
			<div className="self-start w-full my-4">
				{profile && reviewObject ? (
					<div className="flex items-center">
						<span className="mr-2">
							<GradeOutlinedIcon style={{ width: 36, height: 36 }} />
						</span>
						<Typography className="font-bold">
							{reviewObject.totalItems} đánh giá
						</Typography>
					</div>
				) : null}
			</div>
			<hr className="w-full text-gray-300" />
			<div className="self-start w-full my-4">
				<Typography className="text-lg font-bold">
					{userData.firstName} đã xác thực:
				</Typography>
				<ConfirmedInformation userData={userData} />
			</div>
		</div>
	);
};

export default UserOverview;

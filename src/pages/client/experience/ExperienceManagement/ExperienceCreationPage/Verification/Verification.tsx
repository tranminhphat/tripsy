import { Button } from "@material-ui/core";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useCurrentUser } from "hooks/queries/users";
import * as React from "react";
import PhoneVerification from "./PhoneVerification";

interface Props {
	handleDone: (index: number) => void;
}

const Verification: React.FC<Props> = ({ handleDone }) => {
	const { data: currentUser } = useCurrentUser();

	const handleNext = () => {
		return handleDone(4);
	};

	return (
		<div className="min-h-screen flex flex-col">
			{currentUser ? (
				<>
					<div className="flex-grow mx-4 my-8">
						<PhoneVerification userData={currentUser} />
					</div>
					<div className="flex justify-end items-center p-4 bg-gray-300">
						<div
							className={
								!currentUser?.isPhoneVerified ? "cursor-not-allowed" : ""
							}
						>
							<Button
								variant="contained"
								className={
									currentUser.isPhoneVerified
										? `bg-black text-white`
										: "bg-gray-500 text-gray-700 pointer-events-none"
								}
								onClick={handleNext}
							>
								Hoàn tất
							</Button>
						</div>
					</div>
				</>
			) : (
				<div className="flex-grow justify-center items-center">
					<MyLoadingIndicator width={300} height={300} />
				</div>
			)}
		</div>
	);
};

export default Verification;

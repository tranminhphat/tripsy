import { Button, Tooltip } from "@material-ui/core";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import * as React from "react";
import { useState } from "react";

interface Props {
	title: string;
	tooltip: string;
	onClick: any;
	isAllowed: boolean;
}

const GenericButton: React.FC<Props> = ({
	title,
	tooltip,
	onClick,
	isAllowed,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick = () => {
		setIsLoading(true);
		onClick();
		setIsLoading(false);
	};

	return (
		<>
			<div
				className={`mx-auto mt-2 h-12 ${
					!isAllowed ? "cursor-not-allowed" : ""
				}`}
			>
				<Tooltip title={tooltip}>
					<Button
						className={`w-full h-full overflow-hidden ${
							!isAllowed
								? "pointer-events-none bg-gray-300 border-gray-300 text-gray-500"
								: "border-primary text-primary hover:bg-primary hover:text-white"
						}`}
						variant="outlined"
						onClick={handleOnClick}
					>
						{!isLoading ? (
							<div className="flex items-center">
								<p className="text-semibold">{title}</p>
							</div>
						) : (
							<MyLoadingIndicator />
						)}
					</Button>
				</Tooltip>
			</div>
		</>
	);
};

export default GenericButton;

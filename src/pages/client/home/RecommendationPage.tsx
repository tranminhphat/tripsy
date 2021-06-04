import { Typography } from "@material-ui/core";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useRecommendByUserId } from "hooks/queries/akin";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";

const RecommendationPage: React.FC = () => {
	const { data: user } = useCurrentUser();
	const { data: recommendations } = useRecommendByUserId(user?._id as string);

	return (
		<MainLayout>
			<Typography className="text-4xl text-secondary font-bold">
				Có {recommendations.length} đề xuất dành cho bạn
			</Typography>
			{recommendations ? (
				<div className="grid grid-cols-12">
					{recommendations.map((item) => (
						<div className="col-span-12" key={item._id}>
							<MyExperienceCard experienceId={item.item} />
						</div>
					))}
				</div>
			) : (
				<div className="flex-grow justify-center items-center">
					<MyLoadingIndicator width={300} height={300} />
				</div>
			)}
		</MainLayout>
	);
};

export default RecommendationPage;

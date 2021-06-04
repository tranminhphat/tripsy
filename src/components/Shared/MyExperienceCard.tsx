import { IconButton } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import LoveIcon from "assets/images/icons/love.svg";
import LovedIcon from "assets/images/icons/loved.svg";
import AlertContext from "contexts/AlertContext";
import currencyFormatter from "helpers/currencyFormatter";
import { useAddActivityLog, useRemoveActivityLog } from "hooks/mutations/akin";
import { useSaveExperiences } from "hooks/mutations/profiles";
import { useExperience } from "hooks/queries/experiences";
import { useProfile } from "hooks/queries/profiles";
import { useCountReview } from "hooks/queries/reviews";
import { useCurrentUser } from "hooks/queries/users";
import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface Props {
	experienceId: string;
}

const MyExperienceCard: React.FC<Props> = ({ experienceId }) => {
	const { data: experience } = useExperience(experienceId);
	const { data: reviews } = useCountReview(experienceId);
	const { data: user } = useCurrentUser();
	const savedExperience = useSaveExperiences();
	const { data: userProfile } = useProfile(user?.profileId);
	const { alert } = useContext(AlertContext);
	const addActivityLog = useAddActivityLog();
	const removeActivityLog = useRemoveActivityLog();
	const isSaved = userProfile?.savedExperiences?.includes(experienceId);

	const handleSaveExperience = () => {
		savedExperience.mutate(
			{
				profileId: userProfile?._id!,
				experienceId: experience?._id!,
			},
			{
				onSuccess: () => {
					if (!isSaved) {
						addActivityLog.mutate({
							userId: userProfile?._id!,
							experienceId: experience?._id,
						});
						alert("success", "Đã thêm vào danh sách yêu thích");
					} else {
						removeActivityLog.mutate({
							userId: userProfile?._id!,
							experienceId: experience?._id,
						});
						alert("success", "Đã xóa khỏi danh sách yêu thích ");
					}
				},
			}
		);
	};

	return (
		<>
			{experience && reviews ? (
				<div className="relative">
					<Link to={`/experience/${experienceId}`}>
						<hr className="my-6" />
						<div className="flex">
							<div style={{ minWidth: 190 }} className="mr-4">
								<img
									className="rounded-lg"
									width={190}
									src={experience.photoGallery![0].url}
									alt="experience"
								/>
							</div>
							<div className="flex flex-col">
								<div>
									<div>
										<h1 className="text-xl font-semibold">
											{experience.title}
										</h1>
									</div>
								</div>
								<div className="mt-2">
									<hr className="w-12" />
								</div>
								<div className="mt-2">
									<span className="text-sm font-bold">Nội dung:</span>
								</div>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										{experience.description?.substr(0, 300)}...
									</p>
								</div>
								<div className="mt-2">
									<span className="text-sm text-gray-500">
										{experience.duration} giờ
									</span>
									<span className="text-sm text-gray-500"> · </span>
									<span className="text-sm text-gray-500">
										{experience.groupSize} người tham gia
									</span>
								</div>
								<div className="mt-auto flex justify-between">
									<div className="flex items-center">
										<span className="mr-2">
											<StarIcon style={{ width: 30, height: 30 }} />
										</span>
										<p>
											{reviews.averageStars} ({reviews.totalItems})
										</p>
									</div>
									<div>
										<p className="text-lg">
											<span className="text-2xl font-semibold">
												{currencyFormatter(
													experience.pricing?.individualPrice!
												)}
											</span>
											<span> / </span>
											<span>người</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
					<div className="absolute top-2 right-0">
						<IconButton onClick={handleSaveExperience}>
							<img
								src={isSaved ? LovedIcon : LoveIcon}
								alt="saved experience"
								width={24}
								height={24}
							/>
						</IconButton>
					</div>
				</div>
			) : null}
		</>
	);
};

export default MyExperienceCard;

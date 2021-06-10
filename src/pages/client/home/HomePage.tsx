import NoDataIcon from "assets/images/icons/no-data.svg";
import { Header } from "components/Header/Header";
import FilterMetadata from "components/Home/FilterMetadata";
import SortMetadata from "components/Home/SortMetadata";
import MyAlert from "components/Shared/MyAlert";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import {
	useExperiences,
	useExperiencesByDate,
} from "hooks/queries/experiences";
import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const intersectionExperiences = (a, b) => {
	if (a) {
		const experienceIdByDate = a.map((item) => {
			const { experience } = item;
			return experience._id;
		});

		return b.filter((item) => experienceIdByDate.includes(item._id));
	}

	return b;
};

const HomePage: React.FC = () => {
	const location = useLocation();
	const [filterObject, setFilterObject] = useState(
		location.state ? location.state : {}
	);
	const [sortString, setSortString] = useState("-review.averageStars");
	const [dayOfYear, setDayOfYear] = useState<number>();

	const { data: experiencesByField } = useExperiences(filterObject, sortString);

	const { data: experiencesByDate } = useExperiencesByDate(dayOfYear);

	const experiences = intersectionExperiences(
		experiencesByDate,
		experiencesByField
	);

	return (
		<div className="h-full w-full">
			<Header withSearchBar={true} setFilterObject={setFilterObject} />
			<div
				className="container mx-auto mb-16 h-full flex items-center grid grid-cols-4 lg:grid-cols-12"
				style={{ marginTop: "108px" }}
			>
				<div className="col-span-12">
					<div className="mt-4 flex justify-between">
						<div>
							<FilterMetadata
								filterObject={filterObject}
								setFilterObject={setFilterObject}
								setDayOfYear={setDayOfYear}
								dayOfYear={dayOfYear}
							/>
						</div>
						<div>
							<SortMetadata setSortString={setSortString} />
						</div>
					</div>
					{experiences ? (
						<div className="grid grid-cols-12">
							{experiences.length === 0 ? (
								<div className="col-span-12 mt-12 mx-auto">
									<div className="text-center">
										<img
											src={NoDataIcon}
											width={200}
											height={150}
											alt="no data"
										/>
										<p className="mt-8 text-xl text-gray-500">
											Không có dữ liệu
										</p>
									</div>
								</div>
							) : (
								experiences.map((item) => (
									<div className="col-span-12" key={item._id}>
										<MyExperienceCard experienceId={item._id} />
									</div>
								))
							)}
						</div>
					) : (
						<div className="flex-grow justify-center items-center">
							<MyLoadingIndicator width={300} height={300} />
						</div>
					)}
				</div>
				<MyAlert />
			</div>
		</div>
	);
};

export default HomePage;

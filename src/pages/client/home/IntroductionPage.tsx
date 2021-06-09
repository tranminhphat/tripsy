import { Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CanThoCityPic from "assets/images/backgrounds/CanThoCity.jpg";
import DaLatCityPic from "assets/images/backgrounds/DaLatCity.jpg";
import DaNangCityPic from "assets/images/backgrounds/DaNangCity.jpg";
import FoodPic from "assets/images/backgrounds/food.jpg";
import HaNoiCityPic from "assets/images/backgrounds/HaNoiCity.jpg";
import HoChiMinhCityPic from "assets/images/backgrounds/HoChiMinhCity.jpg";
import NaturePic from "assets/images/backgrounds/nature.jpg";
import NhaTrangCityPic from "assets/images/backgrounds/NhaTrangCity.jpg";
import SportPic from "assets/images/backgrounds/sport.jpg";
import ExperienceCard from "components/Experience/ExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useRecommendByUserId } from "hooks/queries/akin";
import { useExperiences } from "hooks/queries/experiences";
import { useThemes } from "hooks/queries/themes";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import OverflowWrapper from "react-overflow-wrapper";
import { Link } from "react-router-dom";

interface Props {}

const IntroductionPage: React.FC<Props> = React.memo(() => {
	const { data: experiences } = useExperiences({}, "-review.averageStars");
	const { data: user } = useCurrentUser();
	const { data: recommendations } = useRecommendByUserId(user?._id as string);
	const { data: themes } = useThemes();
	return (
		<MainLayout>
			{experiences ? (
				<>
					<div className="flex justify-between items-center my-4">
						<Typography className="text-4xl text-secondary font-bold w-1/2 leading-normal">
							Những hoạt động trải nghiệm đặc biệt được tổ chức bởi các chuyên
							gia
						</Typography>
					</div>
					<div className="mt-4">
						<Typography className="text-2xl text-secondary font-bold">
							Hoạt động trải nghiệm
						</Typography>
						<Typography>
							Các hoạt động trải nghiệm độc đáo, được hướng dẫn bởi những người
							có nhiều kinh nghiệm.
						</Typography>
						<div className="mt-4 flex justify-between">
							{experiences.slice(0, 5).map((item) => (
								<div>
									<ExperienceCard experienceId={item._id!} />
								</div>
							))}
						</div>
						<Typography className="font-bold underline">
							<Link to="/experiences">
								Hiển thị tất cả trải nghiệm
								<span>
									<ChevronRightIcon />
								</span>
							</Link>
						</Typography>
					</div>
					<div className="mt-8 flex justify-between">
						<div>
							<Link
								to={{
									pathname: "/experiences",
									state: {
										theme: "Thiên nhiên và Ngoài trời",
									},
								}}
							>
								<img
									style={{ width: 420, height: 278 }}
									src={NaturePic}
									alt="nature"
									className="rounded-md"
								/>
								<div className="mt-2">
									<Typography className="text-lg font-bold">
										Thiên nhiên và Ngoài trời
									</Typography>
									<Typography className="text-sm text-gray-500">
										Hoạt động tổ chức tại những địa điểm thiên nhiên đặc biệt,
										hãy đến và tận hưởng
									</Typography>
								</div>
							</Link>
						</div>
						<div className="mx-4">
							<Link
								to={{
									pathname: "/experiences",
									state: {
										theme: "Đồ ăn",
									},
								}}
							>
								<img
									style={{ width: 420, height: 278 }}
									src={FoodPic}
									alt="food"
									className="rounded-md"
								/>
								<div className="mt-2">
									<Typography className="text-lg font-bold">Ẩm thực</Typography>
									<Typography className="text-sm text-gray-500">
										Trải nghiệm những nét văn hóa độc đáo thông qua những món ăn
										ngon và thú vị
									</Typography>
								</div>
							</Link>
						</div>
						<div>
							<Link
								to={{
									pathname: "/experiences",
									state: {
										theme: "Thể thao",
									},
								}}
							>
								<img
									style={{ width: 420, height: 278 }}
									src={SportPic}
									alt="sport"
									className="rounded-md"
								/>
								<div className="mt-2">
									<Typography className="text-lg font-bold">
										Thể thao
									</Typography>
									<Typography className="text-sm text-gray-500">
										Tăng cường sức khỏe và niềm vui thông qua các hoạt động thể
										dục thể thao
									</Typography>
								</div>
							</Link>
						</div>
					</div>
					<div className="mt-8">
						<Typography className="text-2xl text-secondary font-bold">
							Trải nghiệm tại các thành phố
							<div className="mt-4">
								<div className="flex justify-between">
									<div>
										<Link
											to={{
												pathname: "/experiences",
												state: { location: "Thành phố Hồ Chí Minh" },
											}}
										>
											<div className="rounded-md shadow-2xl">
												<img
													style={{ width: 180, height: 180 }}
													className="rounded-t-md"
													src={HoChiMinhCityPic}
													alt="Ho Chi Minh city"
												/>
												<Typography className="text-sm text-gray-500 py-4 pl-2">
													Hồ Chí Minh
												</Typography>
											</div>
										</Link>
									</div>
									<div>
										<Link
											to={{
												pathname: "/experiences",
												state: { location: "Thành phố Hà Nội" },
											}}
										>
											<div className="rounded-md shadow-2xl">
												<img
													style={{ width: 180, height: 180 }}
													className="rounded-t-md"
													src={HaNoiCityPic}
													alt="Ha Noi city"
												/>
												<Typography className="text-sm text-gray-500 py-4 pl-2">
													Hà Nội
												</Typography>
											</div>
										</Link>
									</div>
									<div>
										<Link
											to={{
												pathname: "/experiences",
												state: { location: "Thành phố Đà Nẵng" },
											}}
										>
											<div className="rounded-md shadow-2xl">
												<img
													style={{ width: 180, height: 180 }}
													className="rounded-t-md"
													src={DaNangCityPic}
													alt="Da Nang city"
												/>
												<Typography className="text-sm text-gray-500 py-4 pl-2">
													Đà Nẵng
												</Typography>
											</div>
										</Link>
									</div>
									<div>
										<Link
											to={{
												pathname: "/experiences",
												state: { location: "Tỉnh Lâm Đồng" },
											}}
										>
											<div className="rounded-md shadow-2xl">
												<img
													style={{ width: 180, height: 180 }}
													className="rounded-t-md"
													src={DaLatCityPic}
													alt="Da Lat city"
												/>
												<Typography className="text-sm text-gray-500 py-4 pl-2">
													Đà Lạt
												</Typography>
											</div>
										</Link>
									</div>
									<div>
										<Link
											to={{
												pathname: "/experiences",
												state: { location: "Tỉnh Khánh Hòa" },
											}}
										>
											<div className="rounded-md shadow-2xl">
												<img
													style={{ width: 180, height: 180 }}
													className="rounded-t-md"
													src={NhaTrangCityPic}
													alt="Nha Trang city"
												/>
												<Typography className="text-sm text-gray-500 py-4 pl-2">
													Nha Trang
												</Typography>
											</div>
										</Link>
									</div>
									<div>
										<Link
											to={{
												pathname: "/experiences",
												state: { location: "Thành phố Cần Thơ" },
											}}
										>
											<div className="rounded-md shadow-2xl">
												<img
													style={{ width: 180, height: 180 }}
													className="rounded-t-md"
													src={CanThoCityPic}
													alt="Can Tho city"
												/>
												<Typography className="text-sm text-gray-500 py-4 pl-2">
													Cần Thơ
												</Typography>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</Typography>
						<div className="mt-8">
							{recommendations ? (
								<>
									<Typography className="text-2xl text-secondary font-bold">
										Có thể bạn sẽ thích
									</Typography>
									<Typography>
										Các hoạt động trải nghiệm độc đáo, được hướng dẫn bởi những
										người có nhiều kinh nghiệm.
									</Typography>
									<div className="mt-4 flex justify-between">
										{recommendations.slice(0, 5).map((item) => (
											<div>
												<ExperienceCard experienceId={item.item!} />
											</div>
										))}
									</div>
									<Typography className="font-bold underline mt-4">
										<Link to="/recommendations">
											Hiển thị tất cả đề xuất
											<span>
												<ChevronRightIcon />
											</span>
										</Link>
									</Typography>
								</>
							) : null}
						</div>
						<div className="mt-8">
							{themes ? (
								<>
									<Typography className="text-2xl text-secondary font-bold">
										Trải nghiệm theo từng sở thích
									</Typography>
									<div className="mt-4 py-4">
										<OverflowWrapper
											iconColor="#000000"
											iconSize={48}
											iconStyle={{
												left: { marginTop: "40px" },
												right: { marginTop: "40px" },
											}}
										>
											<div className="p-4 flex justify-between">
												{themes.map((item) => (
													<Link
														key={item._id}
														to={{
															pathname: "/experiences",
															state: { theme: item.value },
														}}
													>
														<div className="mx-4 p-8 shadow-md rounded-md flex justify-center items-center">
															<Typography className="mx-auto font-bold text-xl">
																{item.value}
															</Typography>
														</div>
													</Link>
												))}
											</div>
										</OverflowWrapper>
									</div>
								</>
							) : null}
						</div>
						<div className="my-8 px-8" style={{ backgroundColor: "#F7F7F7" }}>
							<div style={{ padding: "64px 0" }}>
								<div className="flex items-center">
									<div className="mr-16" style={{ paddingTop: "12px" }}>
										<Typography className="text-2xl font-bold text-secondary">
											Tripsy mang đến những trải nghiệm chất lượng cao
										</Typography>
									</div>
									<ul className="flex justify-between">
										<li>
											<img
												className="w-12 h-12"
												alt=""
												src="https://a0.muscache.com/pictures/55ede8e9-21cc-4302-918a-1343f70e04f0.jpg"
											/>
											<div>
												<section>
													<h1 className="font-bold text-secondary my-2">
														Chuyên gia địa phương
													</h1>
												</section>
											</div>
											<p>
												Được hướng dẫn bởi những người địa phương có đam mê với
												trải nghiệm.
											</p>
										</li>
										<li>
											<img
												className="w-12 h-12"
												alt=""
												src="https://a0.muscache.com/pictures/6ca44422-9ab4-42d0-94a1-73fff922164e.jpg"
											/>
											<div>
												<section>
													<h1 className="font-bold text-secondary my-2">
														Quy mô nhỏ
													</h1>
												</section>
											</div>
											<p>
												Với số lượng người tham gia có giới hạn, bạn sẽ không sợ
												bị lạc lỏng.
											</p>
										</li>
										<li>
											<img
												className="w-12 h-12"
												alt=""
												src="https://a0.muscache.com/pictures/4a9dfa0e-7aa9-4ef8-891d-d8ecf229700c.jpg"
											/>
											<div>
												<section>
													<h1 className="font-bold text-secondary my-2">
														Chất lượng cao
													</h1>
												</section>
											</div>
											<p>
												Mỗi trải nghiệm đều được xem xét và tổ chức chặt chẽ.
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<MyLoadingIndicator />
			)}
		</MainLayout>
	);
});

export default IntroductionPage;

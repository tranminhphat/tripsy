import Avatar from "@material-ui/core/Avatar";
import { countReviews, getReviews } from "api/review";
import StarIcon from "assets/images/icons/star.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTruncateText from "components/Shared/MyTruncateText";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {
  userId: string;
}

const PAGE_SIZE = 5;

const ReviewSection: React.FC<Props> = ({ userId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [count, setCount] = useState<{
    totalItems: number;
    averageStars: number;
  }>();
  const [pageNumber, setPageNumber] = useState(2);
  const [isFetching, setIsFetching] = useState<boolean | null>(false);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialData = async () => {
    const { data } = await countReviews({ objectId: userId });
    if (data) {
      setCount(data);
    }
    const {
      data: { items },
    } = await getReviews({ objectId: userId }, "", 1, PAGE_SIZE);
    if (items) {
      setReviews([...reviews, ...items]);
    }
  };

  const loadMoreData = async () => {
    setIsFetching(true);
    const {
      data: { items },
    } = await getReviews({ objectId: userId }, "", pageNumber, PAGE_SIZE);
    if (items.length !== 0) {
      setReviews([...reviews, ...items]);
      setPageNumber(pageNumber + 1);
      setIsFetching(false);
    } else {
      setIsFetching(null);
    }
  };

  return (
    <div className="my-4">
      {reviews && count ? (
        <>
          <div className="flex items-center">
            <span className="mr-2 text-xl font-bold">
              <img src={StarIcon} alt="average stars" width={24} height={24} />
            </span>
            <span className="text-xl font-bold">
              {count.averageStars} ({count.totalItems} đánh giá)
            </span>
          </div>
          <ul className="mt-4">
            {reviews.map((item) => (
              <li key={item._id}>
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Avatar
                        src={
                          item.user.avatarUrl
                            ? item.user.avatarUrl
                            : SkeletonUserAvatar
                        }
                        style={{ width: "48px", height: "48px" }}
                        alt="User"
                      />
                    </div>
                    <div className="font-bold">
                      {item.user.lastName} {item.user.firstName}
                    </div>
                  </div>
                  <div className="mt-2">
                    <MyTruncateText text={item.content} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            {isFetching === null ? null : !isFetching ? (
              <button className="my-2" onClick={() => loadMoreData()}>
                <p className="underline">Xem thêm </p>
              </button>
            ) : (
              <p className="my-2">Đang tải...</p>
            )}
          </div>
        </>
      ) : (
        <MyLoadingIndicator />
      )}
    </div>
  );
};

export default ReviewSection;

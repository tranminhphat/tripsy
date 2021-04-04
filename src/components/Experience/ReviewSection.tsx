import Avatar from "@material-ui/core/Avatar";
import { countReviews, getReviews } from "api/review";
import BlackStarIcon from "assets/images/icons/blackstar.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {
  experienceId: string;
}

const ReviewSection: React.FC<Props> = ({ experienceId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [count, setCount] = useState<{
    totalItems: number;
    averageStars: number;
  }>();
  const [pageNumber, setPageNumber] = useState(2);
  const [isFetching, setIsFetching] = useInfiniteScroll(loadMoreData);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialData = async () => {
    const { data } = await countReviews({ objectId: experienceId });
    if (data) {
      setCount(data);
    }
    const {
      data: { items },
    } = await getReviews({}, "", 1, 1);
    if (items) {
      setReviews([...reviews, ...items]);
    }
  };

  async function loadMoreData() {
    const {
      data: { items },
    } = await getReviews({ objectId: experienceId }, "", pageNumber, 1);
    if (items.length !== 0) {
      setReviews([...reviews, ...items]);
      setPageNumber(pageNumber + 1);
      setIsFetching(false);
    } else {
      setIsFetching(null);
    }
  }

  return (
    <div>
      {reviews && count ? (
        <>
          <div className="flex items-center">
            <p className="text-xl font-bold">
              <span className="mr-2">
                <img
                  className="inline"
                  src={BlackStarIcon}
                  alt="average stars"
                />
              </span>
              <span>
                {count.averageStars} ({count.totalItems} đánh giá)
              </span>
            </p>
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
                    <div>
                      {item.user.firstName} {item.user.lastName}
                    </div>
                  </div>
                  <div>{item.content}</div>
                </div>
              </li>
            ))}
          </ul>
          <div>{isFetching ? <p>loading...</p> : null}</div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ReviewSection;

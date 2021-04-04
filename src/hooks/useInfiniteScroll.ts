import { useEffect, useState } from "react";

const useInfiniteScroll = (callback: any) => {
  const [isFetching, setIsFetching] = useState<boolean | null>(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    if (isFetching === null) {
      window.removeEventListener("scroll", isScrolling);
    }
    return () => window.removeEventListener("scroll", isScrolling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  useEffect(() => {
    console.log(isFetching);
    if (!isFetching) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };
  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;

import React, { useEffect, useCallback, useMemo } from "react";
import { HomeLayout } from "../templates/HomeLayout";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { TweetForm } from "../organisms/TweetForm";
import { TweetCard } from "../organisms/TweetCard";
import { useTweetsIndex } from "../../hooks/tweets";
import { fetchingActionTypes } from "../../apis/base";
import { fetchTweetsIndex } from "../../apis/tweets";
import { Pagination } from "../organisms/Pagination";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const initialFetchState = {
    status: "INITIAL",
    data: [],
  };

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 0;

  const { fetchTweetsState, fetchTweetsDispatch, callback } =
    useTweetsIndex(initialFetchState);

  // handleFetchTweets を useCallback でメモ化
  const handleFetchTweets = useCallback(async () => {
    console.log("Fetching tweets...");
    await fetchTweetsDispatch({ type: fetchingActionTypes.FETCHING });

    await fetchTweetsIndex(currentPage).then((res) => {
      fetchTweetsDispatch({
        type: res.type,
        payload: res,
        callback: {
          authFiled: callback.authFiled,
        },
      });
    });
  }, [currentPage, fetchTweetsDispatch, callback.authFiled]);

  useEffect(() => {
    console.log("useEffect triggered", {
      searchParams,
      searchParamsPage: searchParams.get("page"),
      handleFetchTweets,
    });

    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    handleFetchTweets();
  }, [searchParams]);

  const sideNavMemo = useMemo(() => <SideNav />, []);

  return (
    <HomeLayout
      sideNav={sideNavMemo}
      header={
        <>
          <div
            className={`
            flex
            justify-between
            px-8
            py-3
            md:hidden
          `}
          >
            <div>icon</div>
            <div>icon</div>
            <div>settings</div>
          </div>
          <nav
            className={`
            flex
            justify-between
            border-b border-gray-500
            md:border-r md:border-gray-500
            py-4
            backdrop-blur-sm
          `}
          >
            <span className="w-1/2 flex justify-center items-center">
              おすすめ
            </span>
            <span className="w-1/2 flex justify-center items-center">
              フォロー中
            </span>
          </nav>
        </>
      }
      tweetForm={<TweetForm successAction={handleFetchTweets} />}
      loading={
        <>
          {fetchTweetsState.status === "LOADING" && (
            <div className="flex justify-center py-10 h-screen">
              <div className="loading"></div>
            </div>
          )}
        </>
      }
      bodyContents={
        <>
          {fetchTweetsState.data?.tweets &&
            fetchTweetsState.data?.tweets.map((tweet) => (
              <div className="border-b border-gray-500" key={tweet.id}>
                <TweetCard tweet={tweet} />
              </div>
            ))}
        </>
      }
      pagination={
        <>
          {fetchTweetsState.status === "OK" && (
            <Pagination
              next={fetchTweetsState.data.next}
              afterNext={fetchTweetsState.data.after_next}
            />
          )}
        </>
      }
      sideContentsHeader={
        <div className="h-full flex justify-center items-center bg-black">
          <div
            className={`
                h-5/6
                w-10/12
                flex items-center
                bg-zinc-900
                text-gray-400
                rounded-full
                ps-3
              `}
          >
            <IoIosSearch className="h-full size-6 mr-3" />
            <span>検索</span>
          </div>
        </div>
      }
      sideContentsBody={
        <div className="sticky top-0 -z-10">
          <div className="w-full flex justify-center">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
              `}
            ></div>
          </div>
          <div className="w-full flex justify-center">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
                mt-3
              `}
            ></div>
          </div>
          <div className="w-full flex justify-center mt-2">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
                mt-3
              `}
            >
              <div className="p-3">
                <h4 className="font-bold text-xl mb-1">おすすめユーザー</h4>
                <ul>
                  <li className="py-4 font-bold">TestUser1</li>
                  <li className="py-4 font-bold">TestUser2</li>
                  <li className="py-4 font-bold">TestUser3</li>
                  <li className="py-4 font-bold">TestUser4</li>
                  <li className="py-4 font-bold">TestUser5</li>
                </ul>
                <small className="text-twitter">さらに表示</small>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

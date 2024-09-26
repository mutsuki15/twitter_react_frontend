import React, { useEffect, useCallback, useMemo } from "react";
import { HomeLayout } from "../templates/HomeLayout";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { TweetForm } from "../organisms/TweetForm";
import { TweetCard } from "../organisms/TweetCard";
import { useTweetAction, useTweetsIndex } from "../../hooks/tweets";
import { fetchingActionTypes } from "../../apis/base";
import {
  deleteTweetsDestroy,
  fetchTweetsIndex,
  retweetTweetsToggle,
  favoriteTweetsToggle,
} from "../../apis/tweets";
import { Pagination } from "../organisms/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../store/currentUserState";

export const Home = () => {
  const currentUser = useRecoilValue(currentUserState);
  useCurrentUser();

  const initialFetchState = {
    status: "INITIAL",
    data: [],
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = searchParams.get("page") || 0;
  const selectedTab = searchParams.get("tab") || "recommended";

  const { fetchTweetsState, fetchTweetsDispatch, callback } =
    useTweetsIndex(initialFetchState);

  const [tweets, tweetsDispatch] = useTweetAction();

  const handleFetchTweets = useCallback(async () => {
    try {
      fetchTweetsDispatch({ type: fetchingActionTypes.FETCHING });

      const filter = selectedTab === "following" ? "following" : "recommended";

      const res = await fetchTweetsIndex(currentPage, filter);

      fetchTweetsDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            tweetsDispatch({ type: "set", data: res.data.tweets });
          },
          authFiled: callback.authFiled,
        },
      });
    } catch (error) {
      fetchTweetsDispatch({ type: fetchingActionTypes.FETCH_FAILED });
    }
  }, [currentPage, selectedTab, fetchTweetsDispatch, tweetsDispatch]);

  const handleTweetDelete = (id) => {
    deleteTweetsDestroy(id).then((deleteId) => {
      tweetsDispatch({
        type: "delete",
        id: deleteId,
      });
    });
  };

  const handleTweetRetweet = (tweet) => {
    retweetTweetsToggle(tweet.id).then((res) => {
      tweetsDispatch({
        type: "toggleRetweet",
        id: res.id,
        status: res.status,
        count: tweet.action.retweet.count,
      });
    });
  };

  const handleTweetFavorite = (tweet) => {
    favoriteTweetsToggle(tweet.id).then((res) => {
      tweetsDispatch({
        type: "toggleFavorite",
        id: res.id,
        status: res.status,
        count: tweet.action.favorite.count,
      });
    });
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    handleFetchTweets();

    if (searchParams.get("status") === "tweeted") {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("status");
        return params;
      });
    }
  }, [currentPage, selectedTab, handleFetchTweets, searchParams]);

  const sideNavMemo = useMemo(() => <SideNav />, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleTabClick = (tab) => {
    if (tab !== selectedTab) {
      setSearchParams({ tab: tab, page: 0 });
    }
  };

  return (
    <HomeLayout
      sideNav={sideNavMemo}
      header={
        <nav
          className={`
            flex
            justify-between
            border-b border-gray-500
            md:border-r md:border-gray-500
            backdrop-blur-sm
            relative
          `}
        >
          <button
            role="tab"
            aria-selected={selectedTab === "recommended"}
            className={`w-1/2 flex flex-col items-center justify-center cursor-pointer relative
              ${
                selectedTab === "recommended"
                  ? "text-white font-bold"
                  : "text-gray-500"
              }
              transition
              py-3
              hover:bg-white hover:bg-opacity-10
            `}
            onClick={() => handleTabClick("recommended")}
          >
            <span>おすすめ</span>
            {selectedTab === "recommended" && (
              <span className="w-1/5 h-1 bg-blue-500 rounded-full mt-1"></span>
            )}
          </button>

          <button
            role="tab"
            aria-selected={selectedTab === "following"}
            className={`w-1/2 flex flex-col items-center justify-center cursor-pointer relative
              ${
                selectedTab === "following"
                  ? "text-white font-bold"
                  : "text-gray-500"
              }
              transition
              py-3
              hover:bg-white hover:bg-opacity-10
            `}
            onClick={() => handleTabClick("following")}
          >
            <span>フォロー中</span>
            {selectedTab === "following" && (
              <span className="w-1/5 h-1 bg-blue-500 rounded-full mt-1"></span>
            )}
          </button>
        </nav>
      }
      tweetForm={<TweetForm successAction={handleFetchTweets} />}
      loading={
        fetchTweetsState.status === "LOADING" && (
          <div className="flex justify-center py-10 h-screen">
            <div className="loading"></div>
          </div>
        )
      }
      bodyContents={tweets.map((tweet) => (
        <div className="border-b border-gray-500 relative" key={tweet.id}>
          <TweetCard
            tweet={tweet}
            type="index"
            handleTweetDelete={() => handleTweetDelete(tweet.id)}
            handleTweetRetweet={() => handleTweetRetweet(tweet)}
            handleTweetFavorite={() => handleTweetFavorite(tweet)}
          />
        </div>
      ))}
      pagination={
        fetchTweetsState.status === "OK" && (
          <Pagination
            next={fetchTweetsState.data.next}
            afterNext={fetchTweetsState.data.after_next}
            onPageChange={(newPage) => {
              setSearchParams({ tab: selectedTab, page: newPage });
              console.log(`Page changed to: ${newPage}`);
            }}
          />
        )
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
                <small className="text-twitter cursor-pointer">
                  さらに表示
                </small>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

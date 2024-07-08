import React, { useEffect } from "react";
import { ShowTweetLayout } from "../templates/ShowTweetLayout";
import { useNavigate, useParams } from "react-router-dom";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { useTweetsShow } from "../../hooks/tweets";
import { fetchingActionTypes } from "../../apis/base";
import { fetchTweetsShow } from "../../apis/tweets";
import { TweetCard } from "../organisms/TweetCard";

export const ShowTweet = () => {
  const initialFetchState = {
    status: "INITIAL",
    data: [],
  };

  const navigate = useNavigate();

  const { id } = useParams();

  const { fetchTweetState, fetchTweetDispatch, callback } =
    useTweetsShow(initialFetchState);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
    fetchTweetDispatch({ type: fetchingActionTypes.FETCHING });

    fetchTweetsShow(id).then((res) => {
      fetchTweetDispatch({
        type: res.type,
        payload: res,
        callback: {
          authFiled: callback.authFiled,
        },
      });
    });
  }, []);

  const handlePrevClick = () => {
    navigate(-1);
  };

  return (
    <ShowTweetLayout
      sideNav={<SideNav />}
      header={
        <>
          <nav
            className={`
            flex justify-between
            py-4
            backdrop-blur-sm
          `}
          >
            <div className="flex justify-center items-center px-4">
              <button className="mr-8" onClick={handlePrevClick}>
                <FaArrowLeft />
              </button>
              <span className="font-bold text-xl">ツイートする</span>
            </div>
          </nav>
        </>
      }
      loading={
        <>
          {fetchTweetState.status === "LOADING" && (
            <div className="flex justify-center py-10 h-screen">
              <div className="loading"></div>
            </div>
          )}
        </>
      }
      bodyContents={
        fetchTweetState.status === "OK" && (
          <div className="h-screen">
            <TweetCard tweet={fetchTweetState.data.tweet} type="show" />
          </div>
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
          <div className="w-full flex justify-center mt-2">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
              `}
            >
              <div className="p-3">
                <h4 className="font-bold text-lg mb-1">
                  プレミアムにサブスクライブ
                </h4>
                <span>
                  サブスクライブして新機能を利用しましょう。資格を満たしている場合、広告収益配分を受け取れます。
                </span>
                <button className="btn-primary w-4/12 mt-2 h-10">
                  購入する
                </button>
              </div>
            </div>
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
                <h4 className="font-bold text-xl mb-1">いまどうしてる？</h4>
                <ul>
                  <li className="py-4 font-bold">PHP</li>
                  <li className="py-4 font-bold">Ruby</li>
                  <li className="py-4 font-bold">React</li>
                  <li className="py-4 font-bold">Rails</li>
                  <li className="py-4 font-bold">Go</li>
                </ul>
                <small className="text-orange-500">さらに表示</small>
              </div>
            </div>
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
                <small className="text-orange-500">さらに表示</small>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

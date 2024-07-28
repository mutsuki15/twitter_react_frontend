import React, { useEffect } from "react";
import { ShowTweetLayout } from "../templates/ShowTweetLayout";
import { useNavigate, useParams } from "react-router-dom";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import {
  useTweetAction,
  useTweetCommentsIndex,
  useTweetsShow,
} from "../../hooks/tweets";
import { fetchingActionTypes } from "../../apis/base";
import {
  deleteTweetsDestroy,
  fetchTweetsShow,
  fetchTweetsShowComments,
  retweetTweetsToggle,
} from "../../apis/tweets";
import { TweetCard } from "../organisms/TweetCard";
import { TweetForm } from "../organisms/TweetForm";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../store/currentUserState";

export const ShowTweet = () => {
  const currentUser = useRecoilValue(currentUserState);
  const initialFetchState = {
    status: "INITIAL",
    data: [],
  };

  const navigate = useNavigate();

  const { id } = useParams();

  const { fetchTweetState, fetchTweetDispatch, callback } =
    useTweetsShow(initialFetchState);

  const {
    fetchTweetCommentsState,
    fetchTweetCommentsDispatch,
    fetchTweetCommentsCallback,
  } = useTweetCommentsIndex(initialFetchState);

  const [comments, commentsDispatch] = useTweetAction();
  const [parent, parentDispatch] = useTweetAction();
  const [tweet, tweetDispatch] = useTweetAction();

  const handleFetchTweet = async () => {
    await fetchTweetsShow(id).then((res) => {
      fetchTweetDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            res.data.tweet.parent &&
              parentDispatch({
                type: "set",
                data: new Array(res.data.tweet.parent),
              });
            tweetDispatch({ type: "set", data: new Array(res.data.tweet) });
          },
          authFiled: callback.authFiled,
        },
      });
    });
  };

  const handleFetchComments = async () => {
    await fetchTweetsShowComments(id).then((res) => {
      fetchTweetCommentsDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            commentsDispatch({
              type: "set",
              data: res.data.comments,
            });
          },
          authFiled: fetchTweetCommentsCallback.authFiled,
        },
      });
    });
  };

  useEffect(() => {
    handleFetchComments();
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
    });

    fetchTweetDispatch({ type: fetchingActionTypes.FETCHING });
    fetchTweetCommentsDispatch({ type: fetchingActionTypes.FETCHING });

    Promise.all([handleFetchTweet(), handleFetchComments()]);
  }, [id]);

  const handlePrevClick = () => {
    navigate(-1 || "/home");
  };

  const handleTweetDelete = (id, type) => {
    deleteTweetsDestroy(id).then((deleteId) => {
      type === "comments"
        ? commentsDispatch({
            type: "delete",
            id: deleteId,
          })
        : type === "tweet"
        ? tweetDispatch({
            type: "delete",
            id: deleteId,
          })
        : parentDispatch({
            type: "delete",
            id: deleteId,
          });
    });
  };

  const handleTweetRetweet = (tweet, type) => {
    retweetTweetsToggle(tweet.id).then((res) => {
      type === "comments"
        ? commentsDispatch({
            type: "toggleRetweet",
            id: res.id,
            status: res.status,
            count: tweet.action.retweet.count,
          })
        : type === "tweet"
        ? tweetDispatch({
            type: "toggleRetweet",
            id: res.id,
            status: res.status,
            count: tweet.action.retweet.count,
          })
        : parentDispatch({
            type: "toggleRetweet",
            id: res.id,
            status: res.status,
            count: tweet.action.retweet.count,
          });
    });
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

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
          <>
            {fetchTweetState.data.tweet.parent && (
              <div className="relative">
                <TweetCard
                  tweet={fetchTweetState.data.tweet.parent}
                  type="index"
                  handleTweetDelete={() => {
                    handleTweetDelete(parent[0].id);
                    navigate("/home");
                  }}
                  handleTweetRetweet={() => {
                    handleTweetRetweet(parent[0]);
                  }}
                />
              </div>
            )}
            <div className="h-full">
              <TweetCard
                tweet={fetchTweetState.data.tweet}
                type="show"
                handleTweetDelete={() => {
                  handleTweetDelete(tweet[0].id, "tweet");
                  navigate("/home");
                }}
                handleTweetRetweet={() => {
                  handleTweetRetweet(tweet[0], "tweet");
                }}
              />
            </div>
            <div className="px-4 pt-3 flex">
              <div className="w-1/12"></div>
              <div className="w-full pl-3">
                <span className="text-gray-400">
                  返信先:
                  <span className="ml-1 text-twitter">
                    @{fetchTweetState.data.tweet.user.name}
                  </span>
                  <span className="text-gray-400">さん</span>
                </span>
              </div>
            </div>
          </>
        )
      }
      commentForm={
        fetchTweetState.status === "OK" && (
          <TweetForm
            successAction={handleFetchComments}
            parentTweetId={fetchTweetState.data.tweet.id}
            type="comment"
          />
        )
      }
      comments={
        fetchTweetCommentsState.status === "OK" &&
        comments.map((commentTweet) => (
          <div
            className="border-b border-gray-500 relative"
            key={commentTweet.id}
          >
            <TweetCard
              tweet={commentTweet}
              type="index"
              handleTweetDelete={() =>
                handleTweetDelete(commentTweet.id, "comments")
              }
              handleTweetRetweet={() =>
                handleTweetRetweet(commentTweet, "comments")
              }
            />
          </div>
        ))
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

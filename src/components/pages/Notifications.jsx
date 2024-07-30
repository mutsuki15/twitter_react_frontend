import React, { useEffect } from "react";
import { NotificationsLayout } from "../templates/NotificationsLayout";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { fetchNotificationsIndex } from "../../apis/notifications";
import { useNotificationsIndex } from "../../hooks/notifications";
import { fetchingActionTypes } from "../../apis/base";
import { TweetCard } from "../organisms/TweetCard";
import { NotificationCard } from "../organisms/NotificationCard";
import { useTweetAction } from "../../hooks/tweets";

export const Notifications = () => {
  const initialFetchState = {
    status: "INITIAL",
    data: [],
  };

  const { fetchNotificationsState, fetchNotificationsDispatch, callback } =
    useNotificationsIndex(initialFetchState);

  const [tweets, tweetsDispatch] = useTweetAction();

  useEffect(() => {
    fetchNotificationsDispatch({ type: fetchingActionTypes.FETCHING });

    fetchNotificationsIndex().then((res) =>
      fetchNotificationsDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            tweetsDispatch({
              type: "set",
              data: res.data.notices,
            });
          },
          authFiled: callback.authFiled,
        },
      })
    );
  }, []);

  console.log(tweets);

  return (
    <NotificationsLayout
      header={
        <>
          <nav
            className={`
            h-full
            flex justify-between items-center
            backdrop-blur-sm
          `}
          >
            <div className="flex justify-center items-center px-4">
              <span className="mr-8 font-bold text-[20px]">通知</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl"></span>
                <small className="text-gray-400"></small>
              </div>
            </div>
          </nav>
        </>
      }
      notifications={
        fetchNotificationsState.status === "OK" &&
        fetchNotificationsState.data.notices.map((notice) => {
          return notice.type === "コメント" ? (
            <div className="border-b border-gray-500 relative">
              <TweetCard tweet={notice.tweet} type="index" />
            </div>
          ) : (
            <NotificationCard notice={notice} />
          );
        })
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
      sideNav={<SideNav />}
    />
  );
};

import React from "react";
import { HomeLayout } from "../templates/HomeLayout";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { TweetForm } from "../organisms/TweetForm";

export const Home = () => {
  return (
    <HomeLayout
      sideNav={<SideNav />}
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
      tweetForm={<TweetForm />}
      bodyContents={<div>body</div>}
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

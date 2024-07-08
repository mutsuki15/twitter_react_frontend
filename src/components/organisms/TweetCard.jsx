import React from "react";
import { IoIosMore } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { TweetImages } from "./TweetImages";
import { Link } from "react-router-dom";

export const TweetCard = (props) => {
  const { tweet, type } = props;

  return (
    <>
      <div
        className={`
      flex
      px-4 pt-3 pb-1
      ${
        type === "index" &&
        "hover:bg-white hover:bg-opacity-5 hover:cursor-pointer"
      }
      `}
      >
        {type === "index" && (
          <Link
            className="w-full h-full absolute top-0 left-0"
            to={`/tweets/${tweet.id}`}
          />
        )}
        <Link to={`/${tweet.user.name}`} className="size-[40px] mt-2 z-20">
          <div className="w-full h-full">
            {tweet.user.icon ? (
              <img
                className="rounded-full h-full w-full"
                src={tweet.user.icon}
                alt="userIcon"
              />
            ) : (
              <img
                className="rounded-full h-full w-full"
                src="https://placehold.jp/400x400.png"
                alt="userDefaultIcon"
              />
            )}
          </div>
        </Link>
        <div className="w-11/12 flex flex-col">
          <div className="flex justify-between">
            <div className="px-2 z-20">
              <Link to={`/${tweet.user.name}`} className="font-semibold mr-2">
                {tweet.user.nickname}
              </Link>
              {type === "index" ? (
                <>
                  <Link
                    to={`/${tweet.user.name}`}
                    className="text-gray-400 text-sm mr-2"
                  >
                    @{tweet.user.name}
                  </Link>
                  <span className="text-gray-400 text-sm">
                    {new Date(tweet.created_at).toLocaleDateString("ja-JP", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </>
              ) : (
                <div>
                  <Link to={`/${tweet.user.name}`} className="text-gray-400">
                    @{tweet.user.name}
                  </Link>
                </div>
              )}
            </div>
            <button
              className={`
            size-8 z-20
            flex justify-center items-center
            rounded-full
            hover:bg-white hover:bg-opacity-5 hover:cursor-pointer
          `}
            >
              <IoIosMore className="size-5 text-gray-400" />
            </button>
          </div>
          {type === "index" && (
            <>
              <span className="px-2 break-words whitespace-pre-wrap">
                {tweet.content}
                {tweet.images.length ? (
                  <div className="pt-4">
                    <TweetImages
                      images={tweet.images}
                      length={tweet.images.length}
                    />
                  </div>
                ) : null}
              </span>
              <div className="text-gray-400 flex justify-between mt-2 z-10">
                <div className="w-9/12 flex justify-between">
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <BiMessageRounded className="w-[20px] h-[20px]" />
                  </Link>
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-green-500 hover:bg-opacity-20 hover:text-green-500`}
                    to="/"
                  >
                    <FaRetweet className="w-[20px] h-[20px]" />
                  </Link>
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-pink-500 hover:bg-opacity-20 hover:text-pink-500`}
                    to="/"
                  >
                    <MdFavoriteBorder className="w-[20px] h-[20px]" />
                  </Link>
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <BiBarChart className="w-[20px] h-[20px]" />
                  </Link>
                </div>
                <div className="w-2/12 flex justify-end">
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <LuBookmark className="w-[20px] h-[20px]" />
                  </Link>
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <MdOutlineFileUpload className="w-[20px] h-[20px]" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {type === "show" && (
        <>
          <div className="px-4 text-xl">
            <span>{tweet.content}</span>
            {tweet.images.length ? (
              <div className="pt-4">
                <TweetImages
                  images={tweet.images}
                  length={tweet.images.length}
                />
              </div>
            ) : null}
            <div className="py-4">
              <span className="text-gray-400 my-4 text-base">
                {new Date(tweet.created_at).toLocaleDateString("ja-JP", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
          <div
            className={`
            text-gray-400
            mx-4 py-2
            flex justify-between
            border-t border-b border-gray-500
            `}
          >
            <div className="w-9/12 flex justify-between">
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <BiMessageRounded className="w-[20px] h-[20px]" />
              </Link>
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-green-500 hover:bg-opacity-20 hover:text-green-500`}
                to="/"
              >
                <FaRetweet className="w-[20px] h-[20px]" />
              </Link>
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-pink-500 hover:bg-opacity-20 hover:text-pink-500`}
                to="/"
              >
                <MdFavoriteBorder className="w-[20px] h-[20px]" />
              </Link>
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <BiBarChart className="w-[20px] h-[20px]" />
              </Link>
            </div>

            <div className="w-2/12 flex justify-end">
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <LuBookmark className="w-[20px] h-[20px]" />
              </Link>
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <MdOutlineFileUpload className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

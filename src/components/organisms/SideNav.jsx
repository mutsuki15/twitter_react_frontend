import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { TextWithIcon } from "../molecules/TextWithIcon";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { TbBell } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { RiQuillPenLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState } from "../../store/currentUserState";
import { IoIosMore } from "react-icons/io";
import { signOut } from "../../apis/signout";

export const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignout = async () => {
    try {
      const response = await signOut();
      if (response.status === 200) {
        setCurrentUser(null);
        navigate("/");
      } else {
        console.error("サインアウトに失敗しました:", response.errors);
      }
    } catch (error) {
      console.error("サインアウト中にエラーが発生しました:", error);
    }
  };

  return (
    <>
      {/* サイドナビ（大きい画面用） */}
      <div className="fixed xl:w-auto md:w-[50px] hidden sm:flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="md:w-[50px] md:h-[50px] md:flex md:justify-center md:items-center md:py-2 xl:ps-4 xl:justify-start">
            <FaXTwitter className="size-7" />
          </div>
          <Link
            className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start"
            to="/home"
          >
            <TextWithIcon
              icon={<GoHomeFill className="size-7" />}
              text="ホーム"
            />
          </Link>
          <Link className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start">
            <TextWithIcon
              icon={<IoSearch className="size-7" />}
              text="話題を検索"
            />
          </Link>
          <Link
            className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start"
            to="/notifications"
          >
            <TextWithIcon icon={<TbBell className="size-7" />} text="通知" />
          </Link>
          <Link className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start">
            <TextWithIcon
              icon={<MdOutlineMail className="size-7" />}
              text="メッセージ"
            />
          </Link>
          <div className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start">
            <TextWithIcon
              icon={<RiFileListLine className="size-7" />}
              text="リスト"
            />
          </div>
          <div className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start">
            <TextWithIcon
              icon={<FaRegBookmark className="size-7" />}
              text="ブックマーク"
            />
          </div>
          <div className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start">
            <TextWithIcon
              icon={<IoPeopleOutline className="size-7" />}
              text="コミュニティ"
            />
          </div>
          {currentUser && (
            <div
              className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Link to={`/${currentUser.name}`}>
                <TextWithIcon
                  icon={<IoPersonOutline className="size-7" />}
                  text="プロフィール"
                />
              </Link>
            </div>
          )}
          <div className="w-[50px] h-[50px] flex items-center justify-center xl:w-[260px] xl:h-[58px] xl:justify-start">
            <TextWithIcon
              icon={<CgMoreO className="size-7" />}
              text="もっと見る"
            />
          </div>

          <div className="w-full flex justify-center xl:px-4 mt-2">
            <Link
              className="btn-primary w-[50px] h-[50px] xl:w-full xl:h-[55px] flex justify-center items-center"
              to="/post"
              state={{ backgroundLocation: location }}
            >
              <RiQuillPenLine className="size-7 xl:hidden" />
              <span className="hidden xl:inline">ツイートする</span>
            </Link>
          </div>
        </div>

        {currentUser && (
          <div
            className="w-[58px] h-[58px] mb-4 flex justify-center items-center xl:w-[230px] xl:h-[68px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div
              className="
                w-full h-full
                cursor-pointer
                flex justify-center items-center
                hover:bg-gray-800 hover:bg-opacity-70 hover:rounded-full
                xl:px-3 md:px-2 mt-2
              "
            >
              <div className="xl:mr-3 w-3/12 relative">
                <div className="size-[40px]">
                  {currentUser.icon ? (
                    <img
                      className="object-cover rounded-full"
                      src={currentUser.icon}
                      alt="currentUserIcon"
                    />
                  ) : (
                    <img
                      className="object-cover rounded-full"
                      src="https://placehold.jp/400x400.png"
                      alt="currentUserDefaultIcon"
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="hidden xl:block">
                  <div>
                    <span className="font-semibold">{currentUser.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">@{currentUser.name}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <IoIosMore size={20} />
                </div>
              </div>
            </div>

            {isDropdownOpen && (
              <div
                className="
                  w-[300px]
                  bg-black
                  absolute bottom-12 left-0
                  drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]
                  rounded-2xl
                "
              >
                <div
                  className="
                    flex flex-col justify-center
                    items-start font-bold
                    py-5 px-3 gap-y-5
                  "
                >
                  <button
                    className="text-white w-full flex items-center gap-x-1"
                    onClick={handleSignout}
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 小さい画面用のボトムナビゲーション */}
      <div className="fixed bottom-0 w-full sm:hidden bg-gray-900 flex justify-between z-60">
        <Link
          className="w-1/5 h-16 flex justify-center items-center"
          to="/home"
        >
          <GoHomeFill className="size-7 text-white" />
        </Link>
        <Link
          className="w-1/5 h-16 flex justify-center items-center"
          to="/search"
        >
          <IoSearch className="size-7 text-white" />
        </Link>
        <Link
          className="w-1/5 h-16 flex justify-center items-center"
          to="/notifications"
        >
          <TbBell className="size-7 text-white" />
        </Link>
        <Link
          className="w-1/5 h-16 flex justify-center items-center"
          to="/messages"
        >
          <MdOutlineMail className="size-7 text-white" />
        </Link>
        {currentUser && (
          <Link
            className="w-1/5 h-16 flex justify-center items-center"
            to={`/${currentUser.name}`}
          >
            <IoPersonOutline className="size-7 text-white" />
          </Link>
        )}
      </div>
    </>
  );
};

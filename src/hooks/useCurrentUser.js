import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../store/currentUserState";
import { fetchCurrentUser } from "../apis/base";

export const useCurrentUser = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetchCurrentUser();
        if (response.status === 200) {
          setCurrentUser(response.data.current_user);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    getCurrentUser();
  }, [setCurrentUser]);
};

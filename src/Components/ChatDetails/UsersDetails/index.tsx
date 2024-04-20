import React, { FC, FormEvent, useState } from "react";
import { IRoomUsers } from "../../../Utils/customInterfaces";
import * as yup from "yup";

import "./UsersDetails.scss";
import useTranslation from "../../../Utils/useTranslation";
import CustomInput from "../../CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addUsersInRoom,
  isPersonAllowedInRoom,
  removeUserInRoom,
} from "../../../Network/roomApiCalls";
import { createFuncWithNoParams } from "../../../Utils/genericUtils";
import CustomButton from "../../CustomButton";

// setNames not needed as it is just css manuevering.
const PeopleDetails: FC<IRoomUsers> = ({ names, setErrorMsg }) => {
  const t = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [usersInRoom, setUsersInRoom] = useState<string[]>(names);
  const [userAddedMessage, setUserAddedMessage] = useState<string>("");
  const [userNameAddInput, setUserNameAddInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _handleUserNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserNameAddInput(e.target.value);
  };

  const _onAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const path = location.pathname.split("/");
      const roomName = path[path.length - 1];

      const dataObj = {
        roomName: roomName,
        permittedUsers: [userNameAddInput],
      };

      await addUsersInRoom(dataObj);

      if (usersInRoom.includes(userNameAddInput))
        throw new Error("User already available in room.");

      setUsersInRoom((prevNames) => [...prevNames, userNameAddInput]);
      setUserNameAddInput("");
      setUserAddedMessage("User successfully added.");

      setTimeout(() => setUserAddedMessage(""), 4000);
    } catch (error: any) {
      setErrorMsg(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const _onRemoveUser = async (username: string) => {
    try {
      const path = location.pathname.split("/");
      const roomName = path[path.length - 1];

      const dataObj = {
        roomName: roomName,
        userToRemove: username,
      };

      await removeUserInRoom(dataObj);

      const isPersonAllowedNow = await isPersonAllowedInRoom({
        roomName,
      });

      if (!isPersonAllowedNow?.data?.isAllowed) {
        navigate("/games", { replace: true });
      }

      setUsersInRoom((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== username)
      );
    } catch (error: any) {
      setErrorMsg(error?.message);
    }
  };

  return (
    <section className="users-details">
      <div className="users-details-display">
        {usersInRoom.map((username: string) => {
          return (
            <div className="users-details-display-user" key={username}>
              <div className="users-details-display-user__username">
                {username}
              </div>
              <div
                className="users-details-display-user__remove"
                onClick={createFuncWithNoParams(_onRemoveUser, username)}
              >
                &times;
              </div>
            </div>
          );
        })}
      </div>

      <div className="users-details-add-user">
        <form
          action=""
          className="users-details-add-user-form"
          onSubmit={_onAddUser}
        >
          <div className="users-details-add-user-form-input">
            <CustomInput
              label={t("ENTER_USERNAME")}
              inputVal={userNameAddInput}
              onInputChange={_handleUserNameInputChange}
            />
          </div>
          <div className="users-details-add-user-form-submit">
            <CustomButton txt="Add" onClick={_onAddUser} isLoader={isLoading} />
          </div>
        </form>
        <div className="user-details-add-user-msg">{userAddedMessage}</div>
      </div>
    </section>
  );
};

export default PeopleDetails;

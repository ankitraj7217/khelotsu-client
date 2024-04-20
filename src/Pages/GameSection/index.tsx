import React, {
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
  import { Socket } from "socket.io-client";
  import GameIcon from "../../Assets/Icons/game-icon.png";
  import ChatIcon from "../../Assets/Icons/chat-icon.png";
  import GameConformIcon from "../../Assets/Icons/game-confirm.png";
  
  import CustomDrawer from "../../Components/CustomDrawer";
  import { currentlySupportedGames } from "../../Constants/temporaryValues";
  import GamesBoxDisplay from "../../Components/GamesBoxDisplay";
  import {
    createFuncWithNoParams,
    getCurrentDateTime,
    getURLParams,
    updateUrlParamsWithoutReload,
  } from "../../Utils/genericUtils";
  import {
    ICustomChat,
    ISupportedGamesListProps,
  } from "../../Utils/customInterfaces";
  import { getGameComponents } from "./GameSection.gameloader";
  import "./GameSection.scss";
  import { useLocation, useNavigate } from "react-router-dom";
  import { personsAllowedInRoomDetails } from "../../Network/roomApiCalls";
  import CustomToast from "../../Components/CustomToast";
  import ChatDetails from "../../Components/ChatDetails";
  import {
    createSocket,
    getCurrPersonsInRoom,
    receiveChatMessage,
    socketGenericCheck,
  } from "../../Utils/socketUtils";
  import { addChatToThread } from "../../ReduxStore/Slices/chatSlice";
  import { useDispatch } from "react-redux";
  import Media from "../../Components/Media";
  
  const GameSection = () => {
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);
    const [supportedGames, setSupportedGames] = useState<
      ISupportedGamesListProps[]
    >(currentlySupportedGames);
    const [currentGame, setCurrentGame] = useState<ISupportedGamesListProps>();
    const [personsAllowedInRoom, setPersonsAllowedInRoom] = useState<string[]>(
      []
    );
    const [currPersonsInRoom, setCurrPersonsInRoom] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket>();
    const [errorMsg, setErrorMsg] = useState<string>("");
  
    const leftDrawerRef = useRef<any>();
    const rightDrawerRef = useRef<any>();
  
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const initializeGameRoom = async () => {
        try {
          const urlParams = getURLParams();
          const path = location.pathname.split("/");
          const roomName = path[path.length - 1];
  
          const personsAllowed = await personsAllowedInRoomDetails({
            roomName,
          });

          console.log("personAllowedInRoom: ", personsAllowed)
  
          const allowedUserNames = personsAllowed?.data?.map(
            (user: any) => user?.username
          );
  
          setPersonsAllowedInRoom(allowedUserNames);
  
          if ("game" in urlParams) switchGame(urlParams["game"]);
          else switchGame("tic_tac_toe");
        } catch (err: any) {
          setErrorMsg(err?.message);
          setTimeout(() => {
            navigate("/games", { replace: true });
          }, 4000);
        }
      };
  
      initializeGameRoom();
    }, []);
  
    useEffect(() => {
      try {
        const path = location.pathname.split("/");
        const roomName = path[path.length - 1];
  
        const socket = createSocket(roomName);
        setSocket(socket);
  
        console.log("socket: ", socket);
        getCurrPersonsInRoom(socket, (message: string) => {
          try {
            console.log("New person joined: ", message);
            if (!message.length) return;
  
            const data = socketGenericCheck(message);
            console.log("data of curr persons: ", data);
            setCurrPersonsInRoom([...data]);
          } catch (err: any) {
            setErrorMsg(err?.message);
          }
        });
  
        receiveChatMessage(socket, (message: string) => {
          if (!message.length) return;
  
          const msgParsed = JSON.parse(message);
  
          const newMessage: ICustomChat = {
            userName: msgParsed?.userName,
            messageTime: getCurrentDateTime(),
            messageTxt: msgParsed?.msg,
          };
          dispatch(addChatToThread(newMessage));
        });
      } catch (err: any) {
        console.log(err?.message);
        setErrorMsg(err?.message);
      }
    }, []);
  
    const _switchLeftGamesListDrawer = useCallback(() => {
      setIsLeftDrawerOpen((prevVal) => {
        if (prevVal) {
          setTimeout(() => {
            if (leftDrawerRef.current) leftDrawerRef.current.style.zIndex = "0";
          }, 400);
        } else {
          if (leftDrawerRef.current) leftDrawerRef.current.style.zIndex = "4";
        }
        return !prevVal;
      });
    }, []);
  
    const _switchRightChatDrawer = useCallback(() => {
      setIsRightDrawerOpen((prevVal) => {
        if (prevVal) {
          setTimeout(() => {
            if (rightDrawerRef.current) rightDrawerRef.current.style.zIndex = "0";
          }, 400);
        } else {
          if (rightDrawerRef.current) rightDrawerRef.current.style.zIndex = "4";
        }
        return !prevVal;
      });
    }, []);
  
    const switchGame = (id: string) => {
      supportedGames.forEach((ele) =>
        ele.id === id ? (ele.isActive = true) : (ele.isActive = false)
      );
      const matchedCurrentGame = supportedGames.find((ele) => ele.id === id);
      setSupportedGames([...supportedGames]); // do this [...], otherwise it has same memory location, won't update..#basics
      updateUrlParamsWithoutReload("game", id);
      setCurrentGame(matchedCurrentGame);
    };
  
    return (
      <section
        className="khelotsu-game"
        style={{ backgroundImage: `url(${currentGame?.backgroundImgURL})` }}
      >
        {errorMsg && (
          <CustomToast color="red" msg={errorMsg} setErrorMsg={setErrorMsg} />
        )}
        <section
          className="khelotsu-game-drawer khelotsu-game-list"
          ref={leftDrawerRef}
        >
          {/** Drawer for the games on the leftmost side */}
          <div className="khelotsu-game-drawer-details khelotsu-game-list-details">
            <CustomDrawer
              headerName="Other Games List"
              isOpen={isLeftDrawerOpen}
              position="left"
              onCloseCallback={_switchLeftGamesListDrawer}
            >
              {supportedGames.map((ele) => (
                <div
                  className={`khelotsu-game-list-details-game 
                                          ${
                                            ele.isActive &&
                                            "khelotsu-game-list-details-game-active"
                                          }`}
                  key={ele.id}
                  onClick={createFuncWithNoParams(switchGame, ele.id)}
                >
                  <GamesBoxDisplay {...ele} />
                </div>
              ))}
            </CustomDrawer>
          </div>
          <div className="khelotsu-game-drawer-icon khelotsu-game-list-icon">
            <img
              src={GameIcon}
              alt="icon"
              className="khelotsu-game-list-icon-img"
              onClick={_switchLeftGamesListDrawer}
            />
          </div>
        </section>
  
        <section
          className="khelotsu-game-section"
          style={{ zIndex: isLeftDrawerOpen || isRightDrawerOpen ? "0" : "1" }}
        >
          {/** game-section like tic tac toe */}
          <div
            className="khelotsu-game-section-left-player-confirmation"
            aria-label="Press to confirm your move"
          >
            <div className="khelotsu-game-section-left-player-confirmation-icon">
              <img
                src={GameConformIcon}
                alt="icon"
                className="khelotsu-game-section-left-player-confirmation-icon-img"
              />
            </div>
            <div className="khelotsu-game-section-left-player-confirmation-username">
              {/** Username of a player */} User A
            </div>
          </div>
          <div className="khelotsu-game-section-game">
            <Suspense fallback={<div>Loading...</div>}>
              {currentGame &&
                getGameComponents({ socket, setErrorMsg, personsAllowedInRoom })[
                  currentGame?.id
                ]}
            </Suspense>
          </div>
          <div
            className="khelotsu-game-section-right-player-confirmation"
            aria-label="Press to confirm your move"
          >
            <div className="khelotsu-game-section-right-player-confirmation-icon">
              <img
                src={GameConformIcon}
                alt="icon"
                className="khelotsu-game-section-right-player-confirmation-icon-img"
              />
            </div>
            <div className="khelotsu-game-section-right-player-confirmation-username">
              {/** Username of a player */} User B
            </div>
          </div>
        </section>
  
        <section
          className="khelotsu-game-drawer khelotsu-game-chat"
          ref={rightDrawerRef}
        >
          {/** Drawer for the games on the rightmost side */}
          <div className="khelotsu-game-drawer-details khelotsu-game-chat-details">
            <CustomDrawer
              headerName="Chat"
              isOpen={isRightDrawerOpen}
              position="right"
              onCloseCallback={_switchRightChatDrawer}
            >
              <ChatDetails
                names={personsAllowedInRoom}
                setErrorMsg={setErrorMsg}
                socket={socket}
              />
              {/** Get names from api */}
            </CustomDrawer>
          </div>
          <div className="khelotsu-game-drawer-icon khelotsu-game-chat-icon">
            <img
              src={ChatIcon}
              alt="icon"
              className="khelotsu-game-chat-icon-img"
              onClick={_switchRightChatDrawer}
            />
          </div>
        </section>
  
        <section
          className="khelotsu-game-video-call"
          style={{ zIndex: isLeftDrawerOpen || isRightDrawerOpen ? "0" : "1" }}
        >
          <Media
            socket={socket}
            currPersonsInRoom={currPersonsInRoom}
            setErrorMsg={setErrorMsg}
          />
        </section>
      </section>
    );
  };
  
  export default GameSection;
  
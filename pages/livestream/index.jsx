// import "./styles.css";
import JoinForm from "./JoinForm";
import Conference from "./Conference";
import Footer from './Footer';
import { useEffect } from "react";
// import { useHMSActions } from "@100mslive/react-sdk";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";
import Notifications from "./Notifications";
import { FlyingEmoji } from "./FlyingEmoji";
import { Button } from "@100mslive/roomkit-react";
import Chat from "./components/Chat/Chat";

function Component() {
    const peers = useHMSStore(selectPeers);
    return <Peers peers={peers} />;
}


export default function App() {
    const hmsActions = useHMSActions();
    const isConnected = useHMSStore(selectIsConnectedToRoom);

    console.log(<FlyingEmoji />)

    useEffect(() => {
        window.onunload = () => {
          if (isConnected) {
            hmsActions.leave();
          }
        };
      }, [hmsActions, isConnected]);

    return (
        <div className="App">
            {isConnected ? (
                <>
                    <Conference />
                    <Notifications />
                    <div>
                      <h1>wow</h1>
                      <Button onClick={()=>{hmsActions.sendBroadcastMessage('hello everyone!');}}>Click me</Button>
                      <Chat />
                      <FlyingEmoji />
                    </div>
                    
                    <Footer />
                </>
            ) : (
                <JoinForm />
            )}
        </div>
    );
}

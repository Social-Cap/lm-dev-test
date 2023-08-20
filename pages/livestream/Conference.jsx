import { selectPeers, useVideo, useHMSStore, useAVToggle, useHMSActions, useScreenShare } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function SceenShareVideo({ peer }) {
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        isScreenShareEnabled,
        toggleAudio,
        toggleVideo,
        toggleScreenShare,
      } = useAVToggle();
    console.log('isScreenShareEnabled', isScreenShareEnabled);
    const { videoRef } = useVideo({
      trackId: peer.videoTrack
    });
    return (
      <div className="peer-container">
        <video
          ref={videoRef}
          className={`peer-video ${peer.isLocal ? "local" : ""}`}
          autoPlay
          muted
          playsInline
        />
        <div className="peer-name">
          {peer.name} {peer.isLocal ? "(You)" : ""}
        </div>
      </div>
    );
  }
  

function Conference() {
  const peers = useHMSStore(selectPeers);
  const screenShare = console.log(useScreenShare())
  const isScreenShareEnabled = useScreenShare().isScreenShareEnabled
  console.log('peers', peers);
//   amIScreenSharing
  return (
    <div className="conference-section">
      <h2>Conference{isScreenShareEnabled? <h1>wow</h1> : <h1>no</h1>}</h2>
      

      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

export default Conference;

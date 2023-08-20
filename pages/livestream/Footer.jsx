import { useAVToggle, useHMSActions, useScreenShare } from "@100mslive/react-sdk";
import { Group, Button, rem, Tooltip, Popover, Text, Space } from '@mantine/core';
import { IconMicrophone, IconMicrophoneOff, IconVideo, IconVideoOff, IconPhoneOff, IconScreenShare, IconScreenShareOff } from '@tabler/icons-react';

function Footer() {
  const hmsActions = useHMSActions();
  const leaveCall = async () => {
    await hmsActions.leave()
  };
  const screenShare = console.log(useScreenShare())
  const screenShare2 = useScreenShare().toggleScreenShare
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    isScreenShareEnabled,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
  } = useAVToggle();
  return (
    <>
      <Group position="center">
        <Tooltip label={isLocalAudioEnabled ?  "Mute" : "Unmute"} closeDelay={250}>
          <Button color="dark" variant="outline" onClick={toggleAudio}>
            {isLocalAudioEnabled ?  <IconMicrophone size={rem(18)} /> : <IconMicrophoneOff size={rem(18)} />}
          </Button>
        </Tooltip>

        <Tooltip label={isLocalVideoEnabled ?  "Turn off camera" : "Turn on camera"} closeDelay={250}>
          <Button color="dark" variant="outline" onClick={screenShare2}>
            {isLocalAudioEnabled ?  <IconVideo size={rem(18)} /> : <IconVideoOff size={rem(18)} />}
          </Button>
        </Tooltip>

        <Tooltip label={isLocalVideoEnabled ?  "Start screen sharing" : "Stop  screen sharing"} closeDelay={250}>
          <Button color="dark" variant="outline" onClick={screenShare}>
            {isScreenShareEnabled ?  <IconScreenShare size={rem(18)} /> : <IconScreenShareOff size={rem(18)} />}
          </Button>
        </Tooltip>

        <Tooltip label={isLocalVideoEnabled ?  "Turn off camera" : "Turn on camera"} closeDelay={250}>
          <Popover position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button variant="outline" color="red" rightIcon={<IconPhoneOff size={rem(18)} />}>End Stream</Button>
          </Popover.Target> 
          <Popover.Dropdown>
            <Text align="center" size="sm">Are you sure?</Text>
            <Space h="sm" />
            <Group position="center">
              <Button variant="outline" color="dark">Cancel</Button>
              <Button color="red" variant="outline" onClick={leaveCall}>Leave</Button>  
            </Group>
          </Popover.Dropdown>
        </Popover>
        </Tooltip>
      </Group>
    </>
    // <div className="control-bar">
    //   <button className="btn-control" onClick={toggleAudio}>
    //     {isLocalAudioEnabled ? "Mute" : "Unmute"}
    //   </button>
    //   <button className="btn-control" onClick={toggleVideo}>
    //     {isLocalVideoEnabled ? "Hide" : "Unhide"}
    //   </button>
    //   <button className="btn-control" onClick={leaveCall}>
    //     "Leave"
    //   </button>
    // </div>
  );
}

export default Footer;

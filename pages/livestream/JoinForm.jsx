import { useState, useEffect } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { useInterval, useDisclosure } from '@mantine/hooks';
import { createStyles, Button, Progress, SimpleGrid, Container, Card, Center, Title, Space } from '@mantine/core';
import { Popover, TextInput, LoadingOverlay, Group, Box } from '@mantine/core';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import React from "react";


// async function joinCreatedRoom(roomCode, hostUserName) {
//   const hmsActions = useHMSActions();
//   try {
//     const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
//     await hmsActions.join({ hostUserName, authToken });
//   } catch (e) {
//     console.error(e)
//   }
// }

const useStyles = createStyles((theme) => ({
  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
  },

  progress: {
    ...theme.fn.cover(-1),
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },
}));


function JoinForm() {
  const { user, error, isLoading } = useUser();
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: ""
  });
  const { classes, theme } = useStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [roomInfo, setRoomInfo] = useState([]);
  const [roomCodes, setRoomCodes] = useState([]);
  const [visible, { toggle }] = useDisclosure(false);

 function createRoomAndRoomId() {
    setRoomInfo([])
    setRoomCodes([])
    var hostUserName = user?.nickname;

    var url = 'http://localhost:8080/broadcast/createroom/'
    axios.get(url)      
    .then(async (response) => {
      setRoomInfo(response.data.RoomData);
      setRoomCodes(response.data.RoomCodes);
      toggle();
      console.log(response)
      for (var i = 0; i < response.data.RoomCodes.length; i++) {
        if(response.data.RoomCodes[i].role == 'host'){
          var roomCode = response.data.RoomCodes[i].code;
          try {
            const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
            await hmsActions.join({ hostUserName, authToken });
          } catch (e) {
            console.error(e)
          }
          break;
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  function LiveStreamButtonClicked(){
    () => (loaded ? setLoaded(false) : !interval.active && interval.start())
    if(loaded == true){
      setLoaded(false);
    } else if (loaded == false & !interval.active){
      interval.start();
      createRoomAndRoomId();
    }       
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const {
  //     userName = '',
  //     roomCode = '',
  //   } = inputValues

    // use room code to fetch auth token
  //   const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

  //   try {
  //     var hostUserName = user?.nickname;
  //     await hmsActions.join({ hostUserName, authToken });
  //   } catch (e) {
  //     console.error(e)
  //   }
  // };

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  

  return (
    <>
    <LoadingOverlay visible={visible} overlayBlur={2} />
      <Container>
        <Card>
          <Space h="xl" />
            <Title align="center" order={1}>Join Room</Title>
            <Space h="xl" />
            <Space h="xl" />
            <Center>
                <SimpleGrid cols={1} spacing="xl" verticalSpacing="xl">
                  <Button
                    fullWidth
                    variant="default"
                    type="submit"
                    className={classes.button}
                    onClick={LiveStreamButtonClicked}
                    color={loaded ? 'teal' : theme.primaryColor}
                  >
                    <div className={classes.label}>
                      {progress !== 0 ? 'Going Live' : loaded ? 'Success' : 'Go Live'}
                    </div>
                    {progress !== 0 && (
                      <Progress
                        value={progress}
                        className={classes.progress}
                        color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
                        radius="sm"
                      />
                    )}
                  </Button>
                </SimpleGrid>
                </Center>
            </Card>
          </Container>
    </>
  );
}

export default JoinForm;

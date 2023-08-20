import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppShell, Text, Burger, ColorSchemeProvider, ColorScheme, Group, Header, MantineProvider, MediaQuery, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ModalsProvider } from '@mantine/modals';
import { NavbarMinimal } from '../components/Navbar';
import router from 'next/router';
import CurrencyButton from '../components/CurrencyButton';
import { getCookie, setCookie } from 'cookies-next';
import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function App({ Component, pageProps }: AppProps)  {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <UserProvider>
          <HMSRoomProvider>
            <ModalsProvider>
                <MantineProvider
                  withGlobalStyles
                  withNormalizeCSS
                  theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'light',
                  }}
                >
                  <AppShell
                    styles={{
                      main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                      },
                    }}
                    navbarOffsetBreakpoint="sm"
                    asideOffsetBreakpoint="sm"
                    navbar={<NavbarMinimal/>
                      // <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                      //   <Text>Application navbar</Text>
                      // </Navbar>
                    }
                    // footer={
                    //   <Footer height={60} p="md">
                    //     Application footer
                    //   </Footer>
                    // }
                    header={
                      <Header height={{ base: 50, md: 70 }} p="md">
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                              opened={opened}
                              onClick={() => setOpened((o) => !o)}
                              size="sm"
                              color={theme.colors.gray[6]}
                              mr="xl"
                            />
                          </MediaQuery>

                          <Text>Application header</Text>
                          <Group ml="auto" position="right">
                            <CurrencyButton/>
                          </Group>
                        </div>
                        
                      </Header>
                    }
                  >
                  <Component suppressHydrationWarning  {...pageProps} />
                </AppShell>
              </MantineProvider>
            </ModalsProvider>
          </HMSRoomProvider>
        </UserProvider>
     </MantineProvider>
  </ColorSchemeProvider>
  );
}

import { VideoCard } from "../components/VideoCard";
// import dynamic from 'next/dynamic'
 
// const NoSSR = dynamic(import('../components/VideoCard'), { ssr: false })
import { ScrollArea, Divider, Space } from '@mantine/core';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

function VideoSpacer() {
    return (
        <>
        <Space h="lg" />
        <Space h="lg" />
        <Space h="lg" />
        <Divider style={{margin: "auto"}} w="80%" />
        <Space h="lg" /> 
        <Space h="lg" />
        <Space h="lg" />
        </>
    );
}


export default function AlgoHome() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ScrollArea type="never">
            <VideoCard />
        </ScrollArea>
      </MantineProvider>
    </ColorSchemeProvider>
    </>
  );
}
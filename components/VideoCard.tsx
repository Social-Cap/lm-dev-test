import { Avatar, ScrollArea, createStyles, Text, Button, Paper, Stack, Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem, ActionIcon, Group, Accordion, Space, Card } from '@mantine/core';
import { IconHeart, IconAntennaBars5, IconMessageCircle2, IconShare, IconBookmark, IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { faker } from '@faker-js/faker';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MantineProvider, TextInput, Popover, Textarea,  TextInputProps, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import CreateCommentCard from './CreateCommentCard'

type SubscriptionTier = 'free' | 'basic' | 'business';

interface User {
  uuid: string;
  userId: number;
  avatar: string;
  birthday: Date;
  email: string;
  name: string;
  jobTitle: string;
  user_followers: number;
  user_following: number;
  user_postsamount: number;
  username: string;
  // sex: SexType;
  subscriptionTier: SubscriptionTier;
}

function createRandomUser(): User {
  return {
    uuid: faker.string.uuid(),
    userId: faker.number.int(99999),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    jobTitle: faker.person.jobTitle(),
    user_followers: faker.number.int(999),
    user_following: faker.number.int(999),
    user_postsamount: faker.number.int(999),
    // sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

function createMockdata() {
    const comments = [];
    for (let i = 0; i < 20; i++) {
        comments.push({
                name: faker.person.fullName(),
                userId: faker.number.int(),
                avatar: faker.image.avatar(),
                date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
                status: faker.helpers.arrayElement(['active', 'inactive']),
                escrowId: faker.number.int(),
                comment: faker.lorem.paragraph(),
                likeAmount: faker.number.int(9999),
                commentAmount: faker.number.int(9999),
                shareAmount: faker.number.int(9999),
                viewAmount: faker.number.int(9999),
        });
    }
    return comments;
}

function CommentsComp() {
    const mockdata = createMockdata();
    const useStyles = createStyles((theme) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          borderRadius: theme.radius.sm,
        },
      
        item: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          border: `${rem(1)} solid transparent`,
          position: 'relative',
          zIndex: 0,
          transition: 'transform 150ms ease',
      
          '&[data-active]': {
            transform: 'scale(1.03)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
          },
        },
      
        chevron: {
          '&[data-rotate]': {
            transform: 'rotate(-90deg)',
          },
        },
      }));
    const { classes } = useStyles();      
    const comments = mockdata.map((comment) => (
        <>
            <Space h="xs" />
            <Accordion.Item key={comment.userId} value={comment.userId.toString()}>
                <Accordion.Control>
                    <Group>
                        <Avatar radius="xl" src={comment.avatar}/>
                        {comment.name}
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  {comment.comment}
                  <Space h="sm"/>
                  <Group position="apart" spacing="xl">
                  <Button color='dark' variant='subtle' radius="xl" size={rem(30)}><IconHeart stroke="1" size="1rem" /><Space w="xs"/><Text size="xs">  {comment.likeAmount}</Text> </Button> 
                  
                  <Popover width={325} trapFocus position="bottom" withArrow shadow="md">
                    <Popover.Target>  
                      <Button color='dark' variant='subtle' radius="xl" size={rem(30)}><IconMessageCircle2 stroke="1" size="1rem" /><Space w="xs"/><Text size="xs">  {comment.commentAmount}</Text> </Button>     
                    </Popover.Target>
                    <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
                      <CreateCommentCard/>
                    </Popover.Dropdown>
                  </Popover>

                  <Button color='dark' variant='subtle' radius="xl" size={rem(30)}><IconShare stroke="1" size="1rem" /><Space w="xs"/><Text size="xs">  {comment.shareAmount}</Text> </Button>
                  <Button color='dark' variant='subtle' radius="xl" size={rem(30)}><IconAntennaBars5 stroke="1" size="1rem" /><Space w="xs"/><Text size="xs">  {comment.viewAmount}</Text> </Button>
                  <Space w="xs"/>
                </Group>
                  
                </Accordion.Panel>
                
                
            </Accordion.Item>
            <Space h="xs" />
        </>
      ));
    return (
        <>
        <Accordion
                maw={420}
                mx="auto"
                variant="filled"
                defaultValue="customization"
                classNames={classes}
                className={classes.root}
                
                > 
                {comments}
          </Accordion>
        </>
    );
}

function UserInfoAction() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const user = createRandomUser();
  const router = useRouter();
  const handleChangePage = () => {
    if (user) {
      router.push({
        pathname: `user/@${user.username}`,
        query: {
          userId: user.userId,
          // userId: userId,
        },
      });
    } 
    // else {
    //   router.push("/auth/signin");
    // }
  };

    return (
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}
          >
            <Avatar src={user?.avatar} size={55} radius={120} mx="auto" />
            <Text ta="center" fz="lg" weight={500} mt="md">
              {user?.name}
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              {/* <Link path>Dashboard</Link> */}
            </Text>
            <Text onClick={handleChangePage} ta="center" c="dimmed" fz="sm">
              @{user?.username}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {user.email} • {user.jobTitle}
            </Text>

            <Group mt="md" position="center" spacing={30}>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {user?.user_followers}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed">
                        Followers
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {user?.user_following}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed">
                        Following
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {user?.user_postsamount}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed">
                        Posts
                    </Text>
                </div>
            </Group>
      
            <Button variant="default" fullWidth mt="md">
              Send message
            </Button>
          </Paper>
        </MantineProvider>
    </ColorSchemeProvider>
    );
  }

function VideoButtonGroup() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  function returnRand(){
    return faker.number.int(9999)
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Stack justify="center" align="center" sx={(theme) => ({ backgroundColor: theme.colorScheme})}>
          <ActionIcon radius="xl" size={rem(65)}><IconHeart stroke="1" size={rem(200)} /> <Space w="xs"/> <Text size="sm">{returnRand()}</Text> </ActionIcon>
          <ActionIcon radius="xl" size={rem(65)}><IconShare stroke="1" size={rem(200)} /> <Space w="xs"/> <Text size="sm">{returnRand()}</Text> </ActionIcon>
          <ActionIcon radius="xl" size={rem(65)}><IconAntennaBars5 stroke="1" size={rem(200)} /> <Space w="xs"/> <Text size="sm">{returnRand()}</Text> </ActionIcon>
        </Stack>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const PRIMARY_COL_HEIGHT = rem(550);

const videoUrls = [
  {
    videoLink: "https://streamable.com/e/jrtdd3"
  },
  {
    videoLink: "https://streamable.com/e/r5re73"
  },
  {
    videoLink: "https://streamable.com/e/4bffg9"
  },
  {
    videoLink: "https://streamable.com/e/8sdogv"
  },
  {
    videoLink: "https://streamable.com/e/1qapzx"
  },
  {
    videoLink: "https://streamable.com/e/mvc82p"
  },
  {
    videoLink: "https://streamable.com/e/dxjnhh"
  },
]

const videos = videoUrls.map((video) => (
  <>
      <Space h="xs" />
        <iframe src={video.videoLink} width="100%" height="100%">
        </iframe>
      <Space h="xs" />
  </>
));

export function VideoCard() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const likeAmount = 54645464;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const videosCard = videos.map((video101) => (
      <>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <Space h="lg" />
              <Space h="lg" />
              <Space h="lg" />
              <Container my="md">
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
                  
                  <Group position="center" spacing={30}>
                      {/* <video src='https://streamable.com/jrtdd3' width="100%" height="100%" controls/> */}
                        {video101}
                  </Group>
                  <Grid gutter="md">
                    <Grid.Col>
                      {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
                      <UserInfoAction/>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Group position='center' h={SECONDARY_COL_HEIGHT}>
                          <VideoButtonGroup/>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={9}>
                      {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
                      <ScrollArea h={SECONDARY_COL_HEIGHT}>
                          <CommentsComp/>
                      </ScrollArea>
                      <CreateCommentCard/>
                    </Grid.Col>
                  </Grid>
                </SimpleGrid>
              </Container>
              <Space h="lg" />
              <Space h="lg" />
              <Space h="lg" />
            </MantineProvider>
          </ColorSchemeProvider>
      </>
    ));
  return (videosCard);
}
import { Carousel } from '@mantine/carousel';
import { Button, LoadingOverlay, getStylesRef, createStyles, Stack, Container, Title, Image, Card, Text, Badge, Group, Center, Space, Spoiler, Collapse, Box  } from '@mantine/core';
import ImageSlider from '../components/ImageSlider';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { SimpleGrid, UnstyledButton, Anchor, rem, } from '@mantine/core';
import { IconCreditCard, IconUsers, IconMovie, IconEye, IconMessageCircle, IconBuildingBank, IconRepeat, IconReceiptRefund, IconReceipt, IconReceiptTax, IconReport, IconCashBanknote, IconCoin } from '@tabler/icons-react';
import { faker } from '@faker-js/faker';


const mockdata = [
  { title: 'Mr.Beast', icon: IconCreditCard, color: 'violet' },
  { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
  { title: 'Transfers', icon: IconRepeat, color: 'blue' },
  { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
  { title: 'Receipts', icon: IconReceipt, color: 'teal' },
  { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
  { title: 'Reports', icon: IconReport, color: 'pink' },
  { title: 'Payments', icon: IconCoin, color: 'red' },
  { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
];

const BrandMockdata = [
  { username: 'UFC', nickname: 'ufc', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://b.fssta.com/uploads/application/leagues/logos/UFC.png' },
  { username: 'World Poker Tour', nickname: 'WorldPokerTour', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/tUoCcMWfGISu5Bb_j2dorGlRGrtw8PNHhJyShDSqWiaCueQiGxoP7jw2dRDcHJGpsDLoDJnq4A=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Studio C', nickname: 'StudioCtv', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/vPgdQFtThTO1_UEOofXxcRd9rrdR6AsrJKTy0AtulvnGiRKjma6_r-0b3ZmHzpfQQGWer9aO1A=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'NBC Sports', nickname: 'NBCSports', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaSc5ICmaQWfO-G7Uz9kZXrMMupxBT_vtBo4anFWU8c=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'NFL', nickname: 'NFL', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/qekyBFXa77qXsBBJtFaQSnMWO-smbyvzgolxbU88fxQOA5uglayR9MJ29r-g6cuHBpZeyyr4_w=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'WPTV News - FL Palm Beaches and Treasure Coast', nickname: 'WPTVnews', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaSkYeuoEtD1llgYx8eqtbNPwalgD-Wb-RnrLr2LCw=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'MLB', nickname: 'MLB', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaRvKDc9QaWAj2DWFf0gb3Pz3Ef7-Jp-Tq4g2B58uvs=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'History', nickname: 'History', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/IVVrue_WHD9lK-12DvplMxKoxOYOS2kjYl1tbhC_fONBK06E-YfdEdtScQNwWQUbxrHfwnxBgw=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Vox', nickname: 'Vox', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaTVhmEDWywmORLSkp8xUk_4WH2HymdQWBKPloncmQ=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Bloomberg Originals', nickname: 'bloomberg', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/QnXaC_YmVgrih83IPHmS_37TOJquPQm4ESeop_PTyvatdS6pJa4ynQ57K9NtD6xV9n41h7to6Bw=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'BBC News', nickname: 'bbcnews', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/y_esGAQOhX4rTpWvrALErAJlFbm_2TIVrvcVfcZny7TuA8dJZgOQcC6KRfd_J5hljFe-foYXj9U=s176-c-k-c0x00ffffff-no-rj' },
];
// { username: '', nickname: '', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: '' },
const CreatorMockdata = [
  { username: 'Mr.Beast', nickname: 'MrBeast', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaSqRAadc5Tv116Y-UfQ--ZLK3bFTep0ZH1_aoLlTA=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Skatebtw', nickname: 'Skatebtw', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/b5zh_5Fk-DcKrt4v-DaV9m1sZWTfMZjM40WWp0ph3ljlwH6sOzExxkcTPc7ILt_2BI_RwynjUg=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Cody Ko', nickname: 'CodyKo', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaTNd0ZwhSVQ4QUdzuBMRQ2b223DkOC1eVgEDY3ECQ=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'WhistlinDiesel', nickname: 'WhistlinDiesel', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/HXjMUsL1uQiNP1oRYJP-w7b7mcaXUfw5y1l0rvsBr9BqNRkyQ2KEM1mHl1fzgdNqyTUjawWU4Q=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'emma chamberlain', nickname: 'emmachamberlain', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/zBLFvtz1woLXGXZY1ixugft-7r06gtWHJv_9tqgO_7eRGtNMSDGVCdoC1yXJ4ntlsfyP3aRvpA=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Atlanta Journal-Constitution', nickname: 'ajcvideo', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaREHEZqCBLKhT7ivN1M-jynkuSS1AY-gFLAqZf4vg=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Laugh Over Life ', nickname: 'LaughOverLife', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/ytc/AOPolaQAG6rvFk3M7vvTSPRz0HjNYkyiMYhh4tipdzu14Q=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Oddest of the Odd', nickname: 'OddestoftheOdd', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/qe07XxIDZaOVqdhs7XvLq3KmtMI9lPUuee_sMgUdG6kB3vSKqrhuZEb2N5URZL4HUtmC3xOW9A=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'Sonic But Better', nickname: 'SonicButBetter', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/GRNVjUN6R7AND8L-0UsrepsQeUFk3inANl8Ot4mLhelaGpkyjp9P1fqDwfn0UvMlgXjWm0rLb0w=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'SergBoy', nickname: 'Serg_Boy', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/p3DZ9jat5eZ6FUA5IDaneA4HoEFyCuttuR9T1Z_wf4DHV_d-qzLuBpy_37ZGGTZjteAyLGCGQk4=s176-c-k-c0x00ffffff-no-rj' },
  { username: 'RodWave', nickname: 'RodWaveOfficial', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: 'https://yt3.googleusercontent.com/80TuWzydjlb_zO7fqZjf9JH0_q-gqK-OxxeDsvlpxiYzN5_EyzkLAUzsNbjbB28cmh8V6D2XSmI=s176-c-k-c0x00ffffff-no-rj' },
  // { username: '', nickname: '', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: '' },
  // { username: '', nickname: '', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: '' },
  // { username: '', nickname: '', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: '' },
  // { username: '', nickname: '', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: '' },
  // { username: '', nickname: '', followers: faker.number.int(999999).toString(), videoCount: faker.number.int(999999).toString(), link: '' },

];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(150),
    width: rem(150),
    margin: "1%",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
  card2: {
    position: 'relative',
    height: rem(280),
    width: rem(280),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    [`&:hover .${getStylesRef('image')}`]: {
      transform: 'scale(1.03)',
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
  },

  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 1,
  },

  title2: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

export function BrandCarousel() {
  const { classes, theme } = useStyles();
  const items = BrandMockdata.map((item) => (
    <>
    <Center>
      <Space w="md" />
        <Card
          p="lg"
          shadow="lg"
          className={classes.card2}
          radius="xl"
          component="a"
          // href={link}
          target="_blank"
        >
          <div className={classes.image} style={{ backgroundImage: `url(${item.link})` }} />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <div>
              <Text size="lg" className={classes.title2} weight={500}>
                {item.username}
              </Text>

              <Group position="apart" spacing="xs">
                <Text size="sm" className={classes.author}>
                @{item.nickname}
                </Text>

                <Group spacing="lg">
                  <Center>
                    <IconUsers size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                    <Text size="sm" className={classes.bodyText}>
                      {item.followers}
                    </Text>
                  </Center>
                  <Center>
                    <IconMovie size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                    <Text size="sm" className={classes.bodyText}>
                      {item.videoCount}
                    </Text>
                  </Center>
                </Group>
              </Group>
            </div>
          </div>
        </Card>
      <Space w="xs"/>
  </Center>
  </>
  ));

  return items;
}

export function CreatorsCarousel() {
  const { classes, theme } = useStyles();
  const items = CreatorMockdata.map((item) => (
    <>
    <Center>
      <Space w="md" />
        <Card
          p="lg"
          shadow="lg"
          className={classes.card2}
          radius="xl"
          component="a"
          // href={link}
          target="_blank"
        >
          <div className={classes.image} style={{ backgroundImage: `url(${item.link})` }} />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <div>
              <Text size="lg" className={classes.title2} weight={500}>
                {item.username}
              </Text>

              <Group position="apart" spacing="xs">
                <Text size="sm" className={classes.author}>
                @{item.nickname}
                </Text>

                <Group spacing="lg">
                  <Center>
                    <IconUsers size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                    <Text size="sm" className={classes.bodyText}>
                      {item.followers}
                    </Text>
                  </Center>
                  <Center>
                    <IconMovie size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                    <Text size="sm" className={classes.bodyText}>
                      {item.videoCount}
                    </Text>
                  </Center>
                </Group>
              </Group>
            </div>
          </div>
        </Card>
      <Space w="xs"/>
  </Center>
  </>
  ));

  return items;
}

const URL = "https://api.themoviedb.org/3";
const API_KEY = "929f18ffd4f3c5c17607d0945711e91c";

const endpoints = {
  originals: "/discover/tv",
  trending: "/trending/all/week",
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};


const imgSrc = 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

export default function MoviePage() {
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(()=>{
    getAllMedia();
}, [])

  
//   toggle();

  function getOriginals() {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv/',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjlmMThmZmQ0ZjNjNWMxNzYwN2QwOTQ1NzExZTkxYyIsInN1YiI6IjY0Y2ZkZDJiODUwOTBmMDBjODdkNjhmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrQR3OpYLmiP61mk2VNvcN7xiJl4h8PyU19YB3SNzVk'
        }
      };  
    axios.request(options).then(function (response) {setOriginals(response.data.results);})
    .catch(function (error) {
        console.log(error);
    });}

  function getTrending() {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/all/week',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjlmMThmZmQ0ZjNjNWMxNzYwN2QwOTQ1NzExZTkxYyIsInN1YiI6IjY0Y2ZkZDJiODUwOTBmMDBjODdkNjhmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrQR3OpYLmiP61mk2VNvcN7xiJl4h8PyU19YB3SNzVk'
        }
      };  
    axios.request(options).then(function (response) {setTrending(response.data.results);})
    .catch(function (error) {
        console.log(error);
    });}

  function getNowPlaying() {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjlmMThmZmQ0ZjNjNWMxNzYwN2QwOTQ1NzExZTkxYyIsInN1YiI6IjY0Y2ZkZDJiODUwOTBmMDBjODdkNjhmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrQR3OpYLmiP61mk2VNvcN7xiJl4h8PyU19YB3SNzVk'
        }
      };  
    axios.request(options).then(function (response) {setNowPlaying(response.data.results);})
    .catch(function (error) {
        console.log(error);
    });}

    function getPopular() {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular/',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjlmMThmZmQ0ZjNjNWMxNzYwN2QwOTQ1NzExZTkxYyIsInN1YiI6IjY0Y2ZkZDJiODUwOTBmMDBjODdkNjhmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrQR3OpYLmiP61mk2VNvcN7xiJl4h8PyU19YB3SNzVk'
            }
        };  
        axios.request(options).then(function (response) {setPopular(response.data.results);})
        .catch(function (error) {
            console.log(error);
    });}

    function getTopRated() {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/top_rated/',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjlmMThmZmQ0ZjNjNWMxNzYwN2QwOTQ1NzExZTkxYyIsInN1YiI6IjY0Y2ZkZDJiODUwOTBmMDBjODdkNjhmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrQR3OpYLmiP61mk2VNvcN7xiJl4h8PyU19YB3SNzVk'
            }
          };  
        axios.request(options).then(function (response) {setTopRated(response.data.results);})
        .catch(function (error) {
            console.log(error);
    });}

    function getUpcoming() {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/upcoming/',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjlmMThmZmQ0ZjNjNWMxNzYwN2QwOTQ1NzExZTkxYyIsInN1YiI6IjY0Y2ZkZDJiODUwOTBmMDBjODdkNjhmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrQR3OpYLmiP61mk2VNvcN7xiJl4h8PyU19YB3SNzVk'
            }
          };  
        axios.request(options).then(function (response) {setUpcoming(response.data.results);})
        .catch(function (error) {
            console.log(error);
    });}

  const MediaCarouselItem = (mediaList: any[]) => {
    const base_url = 'https://image.tmdb.org/t/p/original';
    const [opened, { toggle }] = useDisclosure(false);

    return mediaList.map((a: {
        original_name: any;
        overview: any;
        title: any;
        poster_path: string; width: any; height: any; 
    }) => {
        var imgSrc = base_url + a.poster_path;
        var movieTitle = a.title;
        var description = a.overview;
        var originalName = a.original_name;
      return (
        <>
        <Center>
        <Space w="md" />
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" href="https://mantine.dev/">
                    <Image
                    src={imgSrc}
                    height="100%"
                    width={300}
                    alt={movieTitle}
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    {movieTitle? <Text size="sm" weight={500}>{movieTitle}</Text> : <Text size="sm" weight={500}>{originalName}</Text>}
                    {/* <Badge color="pink" variant="light">
                    On Sale
                    </Badge> */}
                </Group>

                <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">                
                    <Text size="sm" color="dimmed">
                        {description}
                    </Text>
                </Spoiler>

            </Card>
        </Center>
            {/* <Space w="md" /> */}

        </>
      );
    });
  };


function MediaCarousel() {

  const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
      },
  }));

  const { classes, theme } = useStyles();

  return (
    <>
        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Trending Creators</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                <CreatorsCarousel />
            </Carousel>
        </Card>

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Brands</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                <BrandCarousel />
            </Carousel>
        </Card>

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Originals</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                {MediaCarouselItem(originals)}         
            </Carousel>
        </Card>

        <Space h="md" />

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Trending</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                {MediaCarouselItem(trending)}         
            </Carousel>
        </Card>
        
        <Space h="md" />

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Now Playing</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                {MediaCarouselItem(nowPlaying)}         
            </Carousel>
        </Card>

        <Space h="md" />

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Popular</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                {MediaCarouselItem(popular)}         
            </Carousel>
        </Card>
        
        <Space h="md" />

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Top Rated</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                {MediaCarouselItem(topRated)}     
            </Carousel>
        </Card>
        
        <Space h="md" />

        <Card className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Upcoming</Text>
            </Group>
            <Carousel
            withIndicators
            loop
            align="start"
            >
                {MediaCarouselItem(upcoming)}         
            </Carousel>
        </Card>
        
        <Space h="md" />
    </>
  );
}
  async function getAllMedia() {
    getOriginals();
    getTrending();
    getNowPlaying();
    getPopular();
    getTopRated();
    getUpcoming();
  }

  const base_url = 'https://image.tmdb.org/t/p/original'

  return (
    <>
    {/* <Container> */}
      {/* <EmblaCarousel/> */}
      <ImageSlider images={[imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc]}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <h1>React.js Image Slider</h1>
            <p>Nulla vitae elit libero, a pharetra augue.</p>
            <Button onClick={getAllMedia}>Get Originals</Button>
          </div>
        </ImageSlider>
        <MediaCarousel/>
    {/* </Container> */}
    </>
  );
}
import { createStyles, Accordion, Modal, Image, Overlay, CardProps, Button, Title, Card, Grid, Skeleton, useMantineTheme, Text, SimpleGrid, UnstyledButton, Anchor, Group,rem, Avatar, Progress, Badge, ActionIcon, Space, Container, Spoiler,} from '@mantine/core';
  import {
    IconCreditCard, 
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
    IconUpload,
    IconBuildingCommunity,
    IconZoomMoney,
    IconPigMoney,
    IconPlus,
  } from '@tabler/icons-react';
  import { Carousel } from '@mantine/carousel';
import { CrowdfundStats } from './CrowdFundStats';
import { faker } from '@faker-js/faker';
import { modals } from '@mantine/modals';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from "react";  
import { useState } from 'react';
import dynamic from 'next/dynamic'
import axios from 'axios';
// const faker = dynamic(() => import('@faker-js/faker'), {
//   ssr: false,
// })
// const { faker } = dynamic(() => import('@faker-js/faker'), { ssr: false })


// function createMockdata() {
//     const mockdata = [];
//     const randomBackersDetails = faker.helpers.arrayElements([
//         {
//             name: faker.person.fullName(),
//             userId: faker.number.int(),
//             avatar: faker.image.avatar(),
//             date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             status: faker.helpers.arrayElement(['active', 'inactive']),
//             amount: faker.number.int(),
//             escrowId: faker.number.int(),
//         },
//         {
//             name: faker.person.fullName(),
//             userId: faker.number.int(),
//             avatar: faker.image.avatar(),
//             date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             status: faker.helpers.arrayElement(['active', 'inactive']),
//             amount: faker.number.int(),
//             escrowId: faker.number.int(),
//         },
//         {
//             name: faker.person.fullName(),
//             userId: faker.number.int(),
//             avatar: faker.image.avatar(),
//             date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             status: faker.helpers.arrayElement(['active', 'inactive']),
//             amount: faker.number.int(),
//             escrowId: faker.number.int(),
//         },

//     ]);
//     const escrowComments = [
//         {
//             name: faker.person.fullName(),
//             userId: faker.number.int(),
//             avatar: faker.image.avatar(),
//             date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             status: faker.helpers.arrayElement(['active', 'inactive']),
//             escrowId: faker.number.int(),
//             comment: faker.lorem.paragraph(),
//         },
//         {
//             name: faker.person.fullName(),
//             userId: faker.number.int(),
//             avatar: faker.image.avatar(),
//             date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             status: faker.helpers.arrayElement(['active', 'inactive']),
//             escrowId: faker.number.int(),
//             comment: faker.lorem.paragraph(),
//         },
//         {
//             name: faker.person.fullName(),
//             userId: faker.number.int(),
//             avatar: faker.image.avatar(),
//             date: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             status: faker.helpers.arrayElement(['active', 'inactive']),
//             escrowId: faker.number.int(),
//             comment: faker.lorem.paragraph(),
//         },
//     ];
//     for (let i = 0; i < 20; i++) {
//         mockdata.push({
//             category: faker.helpers.arrayElement(['Movie', 'Music', 'Art', 'Technology', 'Food', 'Fashion', 'Games', 'Publishing', 'Design', 'Comics', 'Crafts', 'Theater', 'Photography', 'Journalism', 'Dance']),
//             title: faker.lorem.words(),
//             BgImage: faker.image.image(),
//             description: faker.lorem.paragraph(),
//             escrowAmount: faker.finance.amount(),
//             escrowGoal: faker.finance.amount(),
//             escrowDeadline: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }),
//             escrowStatus: faker.helpers.arrayElement(['active', 'inactive']),
//             escrowBackers: faker.number.int(),
//             escrowBackersDetails: randomBackersDetails,
//             escrowComments: escrowComments,
//         });
//     }
//     return mockdata;
// }

  const useStyles = createStyles((theme) => ({
    card: {
      height: rem(240),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  
    content: {
      ...theme.fn.cover(),
      padding: theme.spacing.xl,
      zIndex: 1,
    },
  
    action: {
      position: 'absolute',
      bottom: theme.spacing.xl,
      right: theme.spacing.xl,
    },
  
    title: {
      color: theme.white,
      marginBottom: `calc(${theme.spacing.xs} / 2)`,
    },
  
    description: {
      color: theme.white,
      maxWidth: rem(220),
    },
    card2: {
        border: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
      },
    
    cardTitle: {
    '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: rem(45),
        height: rem(2),
        marginTop: theme.spacing.sm,
    }},
  }));
  
  
  export function ImageActionBanner({}) {
    const { classes, cx, theme } = useStyles();
  
    return (
      <Card
        radius="md"
        // style={{ backgroundImage: `url(${image})`, ...style }}
        className={cx(classes.card)}
      >
        <Overlay
          gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
          opacity={0.55}
          zIndex={0}
        />
  
        <div className={classes.content}>
          <Text size="lg" weight={700} className={classes.title}>
            title
          </Text>
  
          <Text size="sm" className={classes.description}>
            description
          </Text>
  
          <Button
            className={classes.action}
            variant="white"
            color="dark"
            component="a"
            size="xs"
            href="#"
          >
            action.label
          </Button>
        </div>
      </Card>
    );
  }

interface CrowdfundItems {
    title: string;
    category: string;
    BgImage: string;
    description: string;
    escrowAmount: string;
    escrowGoal: string;
    escrowDeadline: Date;
    escrowStatus: string;
    escrowBackers: number;
    // escrowBackersDetails: string;
    // escrowComments: [
    //     {
    //         avatar: string;
    //         comment: string;
    //         date: Date;
    //         escrowId: number;
    //         name: string;
    //         status: string;
    //         userId: number;
    //     }
    // ];
        escrowComments: { 
            name: string;
            userId: number; 
            avatar: string; 
            date: Date; 
            status: string; 
            escrowId: number; 
            comment: string; 
        }[]
}

type Props = {
    title: string;
    BgImage: string;
    description: string;
    escrowAmount: string;
    escrowGoal: string;
    escrowDeadline: Date;
    escrowStatus: string;
    escrowBackers: number;
    // escrowBackersDetails: string;
    // escrowComments: [
    //     {
    //         avatar: string;
    //         comment: string;
    //         date: Date;
    //         escrowId: number;
    //         name: string;
    //         status: string;
    //         userId: number;
    //     }
    // ];
        escrowComments: { 
            name: string;
            userId: number; 
            avatar: string; 
            date: Date; 
            status: string; 
            escrowId: number; 
            comment: string; 
        }[]
};

const DonateModalCrowdFund: React.FC<Props> = ({
    title, BgImage, description, escrowAmount, escrowGoal, escrowDeadline, escrowStatus, escrowBackers, escrowComments
    //  escrowBackersDetails, escrowComments
  }) => {
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
    const comments = escrowComments.map((comment) => (
        <>
            <Space h="xs" />
            <Accordion.Item value={comment.userId.toString()}>
                <Accordion.Control>
                    <Group>
                        <Avatar radius="xl" src={comment.avatar}/>
                        {comment.name}
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>{comment.comment}</Accordion.Panel>
            </Accordion.Item>
            <Space h="xs" />
        </>
      ));
    const isMobile = useMediaQuery("(max-width: 50em)");
    const [fundAmount, setFundAmount] = useState(0);
    const openModal = () => modals.openConfirmModal({
        fullScreen: isMobile,
        children: (
            <>
            <Image
                src={BgImage}
                height={rem(180)}
                alt='Banner Image'
                key={BgImage}
                // width="120%"
            />
            <Text fz="lg" fw={500} mt="md">
                {title}
            </Text>
            <Space h="lg" />
            <Text fz="sm" c="dimmed" mt={5}>
                {description}
            </Text>
            <Text c="dimmed" fz="sm" mt="md">
                Fund Progress: {' '}
                <Text
                span
                fw={500}
                sx={(theme) => ({ color: theme.colorScheme === 'dark' ? theme.white : theme.black })}
                >
                ${escrowAmount} / ${escrowGoal}
                </Text> 
            </Text>
            <Progress value={(parseFloat(escrowAmount) / parseFloat(escrowGoal)) * 100} mt={5} />
            <Space h="lg" />
            <Card>
                <Group position="center">
                    <Text weight={500}>Support Fund</Text>
                </Group>
                <Space h="md" />
                {/* <Text
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                    ta="center"
                    fz="xl"
                    fw={700}
                    >
                    {fundAmount}
                </Text> */}
                <Space h="md" />
                <Group position="center">
                    <Button variant="default" leftIcon={<IconCoin size="1rem" stroke={1.5} />}>25</Button>
                    <Button variant="default" leftIcon={<IconCoin size="1rem" stroke={1.5} />}>100</Button>
                    <Button variant="default" leftIcon={<IconCoin size="1rem" stroke={1.5} />}>250</Button>
                </Group>
            </Card>
            <Space h="lg" />
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
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => console.log('Confirmed'),
    });
    return (
      <>
      <ActionIcon onClick={openModal} variant="default">
            <IconPigMoney size="1.1rem" />
        </ActionIcon>
      </>
    );
  };

  



//  function DonateModalCrowdFund(_props: any) {
//     // console.log(_props)
//     const openModal = () => modals.openConfirmModal({
//         title: `${_props?.title}`,
//         children: (
//         <Text size="sm">
//             This action is so important that you are required to confirm it with a modal. Please click
//             one of these buttons to proceed.
//         </Text>
//         ),
//         labels: { confirm: 'Confirm', cancel: 'Cancel' },
//         onCancel: () => console.log('Cancel'),
//         onConfirm: () => console.log('Confirmed'),
//     });
        
//         return (
//             <ActionIcon onClick={openModal} variant="default">
//                 <IconPigMoney size="1.1rem" />
//             </ActionIcon>
//         );
//     }
export function FeaturedGrid() {
  const theme = useMantineTheme();
  const PRIMARY_COL_HEIGHT = rem(500);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const { classes, cx } = useStyles();
  const [CFMockdata, setCFMockdata] = useState([]);
  const mockdata = () => {
    const baseURL = 'http://localhost:3000/api/mockdata'
    axios
      .get(baseURL)
      .then((response) => {
        setCFMockdata(response.data);
      })
      .catch((error)=>{
        console.log(error)
      });
  }
  mockdata();

  const items = CFMockdata.map((item: CrowdfundItems) => (
    <Card key={item.escrowAmount} h={rem(500)} withBorder padding="lg" radius="md">

            <Card.Section>
                    <Image
                    src={item.BgImage}
                    height={rem(180)}
                    alt="No way!"
                    />
            </Card.Section>

            <Space h="lg" />

            <Group position="apart">
                {/* <MantineLogo type="mark" size="2rem" /> */}
                <Badge>{item.category}</Badge>
                <DonateModalCrowdFund 
                      title={item.title}
                      BgImage={item.BgImage} 
                      description={item.description} 
                      escrowAmount={item.escrowAmount} 
                      escrowGoal={item.escrowGoal} 
                      escrowDeadline={item.escrowDeadline} 
                      escrowStatus={item.escrowStatus} 
                      escrowBackers={item.escrowBackers}
                      escrowComments={item.escrowComments}
                 />
            </Group>

            <Text fz="lg" fw={500} mt="md">
                {item.title}
            </Text>
           
            <Spoiler maxHeight={50} showLabel="Show more" hideLabel="Hide" transitionDuration={3}>
                <Text fz="sm" c="dimmed" mt={5}>
                    {item.description}
                </Text>
            </Spoiler>

            <Text c="dimmed" fz="sm" mt="md">
                Fund Progress: {' '}
                <Text
                span
                fw={500}
                sx={(theme) => ({ color: theme.colorScheme === 'dark' ? theme.white : theme.black })}
                >
                ${item.escrowAmount} / ${item.escrowGoal}
                </Text>
            </Text>

            <Progress value={(parseFloat(item.escrowAmount) / parseFloat(item.escrowGoal)) * 100} mt={5} />

            <Group position="apart" mt="md">
                <Avatar.Group spacing="sm">
                <Avatar src={faker.image.avatar()} radius="xl" />
                <Avatar src={faker.image.avatar()} radius="xl" />
                <Avatar src={faker.image.avatar()} radius="xl" />
                <Avatar radius="xl">{faker.number.int(99)}+</Avatar>
                </Avatar.Group>
                <ActionIcon variant="default">
                <IconUpload size="1.1rem" />
                </ActionIcon>
            </Group>
        </Card>
  ));



  const featuredItems = items.slice(0, 5);
  const featuredItemsCarousel = featuredItems.map((item) => (
             <Carousel.Slide key={faker.number.int()}>
                {item}
            </Carousel.Slide>
  ));

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <Carousel slideGap="md" loop align="start" withIndicators>
            {featuredItemsCarousel}
        </Carousel>
        <Grid gutter="md">
          <Grid.Col>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <ImageActionBanner />
          </Grid.Col>
          <Grid.Col span={6}>
            <Card style={{height: SECONDARY_COL_HEIGHT}} shadow="md" radius="md" className={classes.card2} padding="xl">
                <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                    <IconBuildingCommunity size={45}/>
                </Text>
                <Text fz="sm" c="dimmed" mt="sm">
                Kickstarter connects creators with backers to fund projects.
                </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card style={{height: SECONDARY_COL_HEIGHT}} shadow="md" radius="md" className={classes.card2} padding="xl">
                    <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                        <IconZoomMoney size={45}/>
                    </Text>
                    <Text fz="sm" c="dimmed" mt="sm">
                     Funds are held in escrow until the project meets its funding goal by the campaign deadline.
                    </Text>
                </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
            
  
export default function CrowdfundWrapper() {
    const useStyles = createStyles((theme) => ({
        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
        title: {
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          },
        title2: {
            fontSize: rem(34),
            fontWeight: 900,
        
            [theme.fn.smallerThan('sm')]: {
              fontSize: rem(24),
            },
          },
      }));
    
    const { classes, theme } = useStyles();
    const [CFMockdata, setCFMockdata] = useState([]);
  const mockdata = () => {
    const baseURL = 'http://localhost:3000/api/mockdata'
    axios
      .get(baseURL)
      .then((response) => {
        setCFMockdata(response.data);
      })
      .catch((error)=>{
        console.log(error)
      });
  }
  mockdata();

  const items = CFMockdata.map((item: CrowdfundItems) => (
    console.log(item),
    <Card h={rem(500)} withBorder padding="lg" radius="md">

            <Card.Section>
                    <Image
                    src={item.BgImage}
                    height={rem(180)}
                    alt="No way!"
                    />
            </Card.Section>

            <Space h="lg" />

            <Group position="apart">
                {/* <MantineLogo type="mark" size="2rem" /> */}
                <Badge>{item.category}</Badge>
                <DonateModalCrowdFund 
                      title={item.title}
                      BgImage={item.BgImage} 
                      description={item.description} 
                      escrowAmount={item.escrowAmount} 
                      escrowGoal={item.escrowGoal} 
                      escrowDeadline={item.escrowDeadline} 
                      escrowStatus={item.escrowStatus} 
                      escrowBackers={item.escrowBackers}
                      escrowComments={item.escrowComments}
                 />
            </Group>

            <Text fz="lg" fw={500} mt="md">
                {item.title}
            </Text>
           
            <Spoiler maxHeight={50} showLabel="Show more" hideLabel="Hide" transitionDuration={3}>
                <Text fz="sm" c="dimmed" mt={5}>
                    {item.description}
                </Text>
            </Spoiler>

            <Text c="dimmed" fz="sm" mt="md">
                Fund Progress: {' '}
                <Text
                span
                fw={500}
                sx={(theme) => ({ color: theme.colorScheme === 'dark' ? theme.white : theme.black })}
                >
                ${item.escrowAmount} / ${item.escrowGoal}
                </Text>
            </Text>

            <Progress value={(parseFloat(item.escrowAmount) / parseFloat(item.escrowGoal)) * 100} mt={5} />

            <Group position="apart" mt="md">
                <Avatar.Group spacing="sm">
                <Avatar src={faker.image.avatar()} radius="xl" />
                <Avatar src={faker.image.avatar()} radius="xl" />
                <Avatar src={faker.image.avatar()} radius="xl" />
                <Avatar radius="xl">{faker.number.int(99)}+</Avatar>
                </Avatar.Group>
                <ActionIcon variant="default">
                <IconUpload size="1.1rem" />
                </ActionIcon>
            </Group>
        </Card>
  ));


    return (
        <>
        <Container>
            <Title order={2} className={classes.title2} ta="center" mt="sm">
                The LimitlessFund
            </Title>
            <Space h="lg" />
            <Group position="apart">
                <Text className={classes.title}>Featured Funds</Text>
            </Group>
            <FeaturedGrid />
        </Container>
        <Space h="lg" />   
        <Container>
            <Group position="apart">
                <Text className={classes.title}>The Stats</Text>
            </Group>
            <Space h="lg" />
            <CrowdfundStats />
        </Container>
        <Space h="lg" /> 
        <Space h="lg" /> 
        <Container>
            <Group position="apart">
                <Text className={classes.title}>Upcoming Events</Text>
            </Group>
            <Space h="lg" />
            <SimpleGrid cols={3}>
                {items}
            </SimpleGrid>
        </Container>
        </>
    );
}
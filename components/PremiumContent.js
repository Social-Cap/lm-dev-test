import React from "react";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button, rem, Overlay } from '@mantine/core';
import { IconCoin, IconPlus, IconPigMoney, IconSend } from "@tabler/icons-react";
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    margin: rem(5),
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

export function FeaturesCard() {
  const [visible, setVisible] = useState(false);
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image maw={150} src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      {/* <Group position="center" mt="md"> */}
        <div>
          <Text fw={500}>Tesla Model S</Text>
          <Text fz="xs" c="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <Group position="center" mt="md">
          <Badge variant="outline">25% off</Badge>
        </Group>
        
      {/* </Group> */}

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              $168.00
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }} variant="default">
            Rent now
          </Button>
        </Group>
      </Card.Section>
      {!visible && (
        <Overlay blur={15} center>
          <Button color="red" radius="xl" onClick={() => setVisible(true)}>
            NSFW, click to reveal
          </Button>
        </Overlay>
      )}
    </Card>
  );
}

const PremiumPosts = ({ video, title, thumbnail, author }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative h-60 bg-cover bg-center bg-no-repeat">
      <FeaturesCard />
      {/* {author === author && (
        <div>
          <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat">
            <video
              className="rounded-xl h-60 w-[160px] bg-black cursor-pointer"
              type="video/mp4"
              loop
              controls={false}
              muted
              autoPlay
              src={video}
              poster={thumbnail}
            />
            <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>

              <span>{title}</span>
            </div>
            {!visible && (
              <Overlay blur={5} center>
                <Button leftIcon={<IconCoin/>} variant="default" radius="xl" onClick={() => setVisible(true)}>
                  168.00
                </Button>
              </Overlay>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PremiumPosts;

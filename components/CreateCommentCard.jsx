import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
    Textarea,
    ActionIcon,
    useMantineTheme, Space
  } from '@mantine/core';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
  
  const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },
  
    body: {
      paddingLeft: rem(54),
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
    },
  
    content: {
      '& > p:last-child': {
        marginBottom: 0,
      },
    },
  }));

  
export default function CreateCommentCard() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <>
            <Space h="md"/>
            <Textarea
                placeholder="Comment"
                autosize
                minRows={1}
                radius="xl"
                style={{overflow: "hidden"}}
                rightSection={
                <ActionIcon size={30} radius="xl" color={theme.primaryColor} variant="default">
                    {theme.dir === 'ltr' ? (
                    <IconArrowRight size="1.1rem" stroke={1.5} />
                    ) : (
                    <IconArrowLeft size="1.1rem" stroke={1.5} />
                    )}
                </ActionIcon>
                }
                icon={
                    <Avatar src={'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj'}
                    radius="xl" size={30}/>
                }
            />
        <Space h="md"/>
        </>
    );
  }
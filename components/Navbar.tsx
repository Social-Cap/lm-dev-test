import { SetStateAction, useState } from 'react';
import { Navbar, Center, Avatar, Tooltip, UnstyledButton, createStyles, Stack, rem, Space } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconLogin,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
// import { MantineLogo } from '@mantine/ds';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

function DarkLightModeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
    </ActionIcon>
  );
}

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', page: '/videohome' },
  { icon: IconGauge, label: 'Dashboard' , page: '/movie' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', page: '/profile' },
  { icon: IconCalendarStats, label: 'Releases', page: '/crowdfund' },
  { icon: IconUser, label: 'Video', page: '/video' },
  { icon: IconFingerprint, label: 'Security', page: '/livestream' },
  { icon: IconSettings, label: 'Settings', page: '/settings' },
];

export function NavbarMinimal() {
  const { user, error, isLoading } = useUser();
  // const { loginWithRedirect } = useAuth0();
  // const { logout } = useAuth0();
  const [active, setActive] = useState(null);
  const router = useRouter();

  function runBoth(index: any) {
    setActive(index)
    router.push(mockdata[index].page)
  }


  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => runBoth(index)}
    />
  ));
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Navbar height={750} width={{ base: 80 }} p="md">
          <Center>
            {/* <MantineLogo type="mark" size={30} /> */}
          </Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
            <Stack justify="center" spacing={0}>

              {!user?
                <Stack justify="center" spacing={0}>
                  <Space h="md" />
                <NavbarLink
                  icon={IconLogin} label="Login" /> 
                  
                </Stack>
              : 
                <Stack justify="center" spacing={0}>
                  <Space h="md" />
                {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" />  */}
                {/* <Avatar size='sm' radius='xl' src={user.picture} /> */}
                <NavbarLink
                  icon={IconLogout} label="Logout" />
                </Stack>
              }
              <DarkLightModeButton />
            </Stack>
          </Navbar.Section>
        </Navbar>
        </MantineProvider>
    </ColorSchemeProvider>
  );
}
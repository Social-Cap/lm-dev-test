import { createStyles, Button, Menu, Group, ActionIcon, rem } from '@mantine/core';
import { IconTrash, IconBookmark, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { IconCoin, IconPlus, IconPigMoney, IconSend } from "@tabler/icons-react";


const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export default function CurrencyButton() {
  const { classes, theme } = useStyles();
  const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];

  return (
    <Group position='right' noWrap spacing={0}>
      <Button leftIcon={<IconCoin />} variant="default">
        $13,333.55
      </Button>
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon
            variant="default"
            size={36}
          >
            <IconPlus size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconPigMoney size="1rem" stroke={1.5}/>}>
            Get Coins
          </Menu.Item>
          <Menu.Item icon={<IconSend size="1rem" stroke={1.5}/>}>
            Send Coins
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
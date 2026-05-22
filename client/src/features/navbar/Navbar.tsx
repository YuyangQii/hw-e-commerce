import { Avatar, Button, Group, Indicator, Menu, Text } from "@mantine/core";
import { IconChevronDown, IconLogout, IconSettings, IconShoppingCart } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/pages/AuthContext";
import { useCart } from "../cart/hooks/useCart";
import { SearchBar } from "./SearchBar";
import { ThemeToggler } from "./ThemeToggler";

export function Navbar() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { items } = useCart();
  const cartCount = items.length;

  function handleLogout() {
    auth?.logout();
    navigate("/login");
  }

  return (
    <Group justify="space-between" p="md" style={{ borderBottom: "1px solid #e9ecef" }}>
      <Text size="xl" fw={700} style={{ cursor: "pointer" }} onClick={function () { navigate("/"); }}>
        E-Commerce Store
      </Text>

      <SearchBar />

      <Group>
        <ThemeToggler />

        <Indicator label={cartCount} size={16} color="red" position="middle-start" disabled={cartCount === 0}>
          <Button variant="subtle" leftSection={<IconShoppingCart size={18} />} onClick={function () { navigate("/cart"); }}>
            Cart
          </Button>
        </Indicator>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="subtle" rightSection={<IconChevronDown size={16} />}>
              <Group gap="xs">
                <Avatar src="" alt="User" size="sm" />
                <Text size="sm">{auth?.user?.username ?? "User"}</Text>
              </Group>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={16} />} onClick={function () { navigate("/settings"); }}>
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}

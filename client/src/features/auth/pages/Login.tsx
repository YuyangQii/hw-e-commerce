import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, TextInput, Button, Stack } from "@mantine/core";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth?.login({ username, password });
    navigate("/");
  };

  return (
    <Container size="xs" mt="xl">
      <Title order={2} mb="md">Login</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;

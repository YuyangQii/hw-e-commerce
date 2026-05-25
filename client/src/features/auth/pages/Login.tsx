import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, TextInput, Button, Stack, Alert } from "@mantine/core";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [serverError, setServerError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const newErrors = { username: "", password: "" };
    if (!username) {
      newErrors.username = "Username is required"
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "At least 6 characters";
    }
    setErrors(newErrors);;

    try {
      await auth?.login({ username, password });
      navigate("/");
    } catch {
      setServerError("Invalid username or password");
    }
  };

  return (
    <Container size="xs" mt="xl">
      <Title order={2} mb="md">Login</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          {serverError && (
            <Alert color="red">
              {serverError}
            </Alert>
          )}
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;

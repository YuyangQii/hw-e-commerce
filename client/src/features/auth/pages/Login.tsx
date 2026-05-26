import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Title, TextInput, Button, Stack, Alert, Text } from "@mantine/core";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await auth?.login({ username, password });
      navigate("/");
    } catch {
      setServerError("Invalid username or password");
    } finally {
      setLoading(false);
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
          <Button type="submit" loading={loading} disabled={loading}>Login</Button>
          <Text size="sm" ta="center">Don't have an account? <Link to="/signup">Sign up</Link></Text>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;

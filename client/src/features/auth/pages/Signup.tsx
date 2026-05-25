import { Alert, Card, Container, Text, Title } from "@mantine/core";

const Signup = () => {
  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md" ta="center">
          Signup
        </Title>
        <Alert color="blue">
          <Text size="sm">
            Sign up is not available yet. To try the app, log in with any account from{" "}
            <a href="https://dummyjson.com/users" target="_blank" rel="noreferrer">
              dummyjson.com/users
            </a>
            . Default password is <strong>password123</strong>.
          </Text>
        </Alert>
      </Card>
    </Container>
  );
};

export default Signup;

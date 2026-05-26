import { Button, Card, Container, Stack, TextInput, Title } from "@mantine/core";

const Signup = () => {
  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md" ta="center">
          Signup
        </Title>
        <form>
          <Stack mt="md">
            <TextInput label="Username" />
            <TextInput label="Email" type="email" />
            <TextInput label="Password" type="password" />
            <Button type="submit" disabled>Sign Up</Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default Signup;

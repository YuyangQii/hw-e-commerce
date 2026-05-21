import { Badge, Box, Card, Container, Group, Image, SimpleGrid, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import HomeInfoSection from "../../../components/home/HomeInfoSection";
import { Spinner } from "../../../components/ui/Spinner";
import { fetchProducts } from "../api/productApi";

const Recommendations = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Text>{error.message}</Text>;

  return (
    <Box mb="xl">
      <Title order={2} mb="md">✨ Recommended for You</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {data?.products.slice(0, 4).map((product) => (
          <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={product.thumbnail} height={160} alt={product.title} />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500} lineClamp={1}>{product.title}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="xl" fw={700} c="blue">${product.price}</Text>
              <Badge color="red" variant="filled">-{Math.round(product.discountPercentage)}%</Badge>
            </Group>
            <Group gap={4} mt="xs">
              <Text size="sm" c="dimmed">⭐ {product.rating}</Text>
              <Text size="sm" c="dimmed">• {product.stock} in stock</Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const Home = () => {
  return (
    <Container size="xl" py="xl">
      <Box mb="xl" ta="center">
        <Title order={1} mb="md">Welcome to E-Commerce Store</Title>
        <Text size="lg" c="dimmed">Discover amazing products across all categories</Text>
      </Box>
      <Recommendations />
      <HomeInfoSection />
    </Container>
  );
};

export default Home;
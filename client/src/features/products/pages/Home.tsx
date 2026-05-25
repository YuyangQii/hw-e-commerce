import { Badge, Box, Card, Container, Group, Image, SimpleGrid, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HomeInfoSection from "../../../components/home/HomeInfoSection";
import { Spinner } from "../../../components/ui/Spinner";
import { fetchCategories, fetchProducts } from "../api/productApi";
import type { Product } from "../type";

const Categories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (isError) return null;

  return (
    <Box mb="xl">
      <Title order={2} mb="md">🗂️ Shop by Category</Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
        {(data as any[])?.slice(0, 12).map((cat) => (
          <Card
            key={cat.slug}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/products")}
          >
            <Text fw={500} ta="center">{cat.name}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const Recommendations = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (isError) return <Text>{error.message}</Text>;

  return (
    <Box mb="xl">
      <Title order={2} mb="md">✨ Recommended for You</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {data?.products.slice(0, 4).map((product: Product) => (
          <Card
            key={product.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
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
      <Categories />
      <Recommendations />
      <HomeInfoSection />
    </Container>
  );
};

export default Home;

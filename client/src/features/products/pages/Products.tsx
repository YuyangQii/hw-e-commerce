import { Badge, Box, Button, Card, Container, Flex, Group, Image, Text, Title } from '@mantine/core';
import { ProductSidebarFilters } from '../components/ProductSidebarFilters';
import { useProductFilters } from '../hooks/useProductFilters';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../../components/ui/Spinner';
import type { Product } from '../type';
import { fetchProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { filters } = useProductFilters();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <Text>{error.message}</Text>
  }
  const filteredProducts = (data?.products ?? [])
    .filter(p => !filters.category || p.category === filters.category)
    .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .filter(p => filters.rating === 0 || p.rating >= filters.rating);

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>
      <Flex gap="xl" align="flex-start">
        <Box style={{ width: 280, flexShrink: 0 }}>
          <ProductSidebarFilters />
        </Box>
        <Flex wrap="wrap" gap={20} style={{ flex: 1 }}>
          {filteredProducts.map((product: Product) => {
            const { id, title, description, price, thumbnail, discountPercentage } = product;
            const discountedPrice = (price * (1 - discountPercentage / 100));

            return (
              <Card key={id} shadow="sm" padding="lg" withBorder w={300}>
                <Card.Section>
                  <Image
                    src={thumbnail}
                    height={160}
                    alt={title}
                  />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{title}</Text>
                  <Badge color="red">-{Math.round(discountPercentage)}%</Badge>
                </Group>
                <Text fw={700} c="blue">${discountedPrice.toFixed(2)}</Text>
                <Text size="sm" c="dimmed">
                  {description}
                </Text>
                <Button color="blue" fullWidth mt="md" onClick={() => navigate(`/products/${id}`)}>
                  View Details
                </Button>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Container >
  );
};

export default Products;

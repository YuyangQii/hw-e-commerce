import { Badge, Box, Button, Card, Container, Flex, Group, Image, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../../components/ui/Spinner';
import type { Product, ProductResponse } from '../type';
import { fetchProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <Text>{error.message}</Text>
  }


  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>
      <Text size="lg">Products page - add your products here</Text>
      <Flex wrap="wrap" gap={20}>
        {data?.products.map((product: Product) => {
          const { id, title, description, price, rating, stock, thumbnail, discountPercentage } = product;
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
    </Container >
  );
};

export default Products;

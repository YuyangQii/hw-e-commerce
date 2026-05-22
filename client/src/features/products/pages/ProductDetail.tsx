import { Badge, Button, Container, Grid, Group, Image, Text, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAddCartItem } from "../../cart/hooks/useCart";
import { useProduct } from "../hooks/useProducts";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useProduct(productId);
  const addMutation = useAddCartItem();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError || !product) {
    return <Text>Product not found</Text>;
  }

  function handleAddToCart() {
    if (!product) return;
    addMutation.mutate({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      thumbnail: product.thumbnail,
    });
  }

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image src={product.thumbnail} alt={product.title} height={400} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} mb="md">{product.title}</Title>
          <Group mb="md">
            <Badge size="lg" color="pink">${product.price.toFixed(2)}</Badge>
            <Badge size="lg" color="blue">{product.category}</Badge>
          </Group>
          <Text size="lg" mb="md">{product.description}</Text>
          <Text size="md" mb="xl" c="dimmed">Stock: {product.stock} units available</Text>
          <Group>
            <Button size="lg" loading={addMutation.isPending} onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={function () { navigate("/products"); }}>
              Back to Products
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ProductDetail;

import { Button, Container, Group, Table, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useCart, useClearCart, useRemoveCartItem } from "../hooks/useCart";

function Cart() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const removeMutation = useRemoveCartItem();
  const clearMutation = useClearCart();

  if (items.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Title order={1} mb="xl">Shopping Cart</Title>
        <Text size="lg">Your cart is empty</Text>
      </Container>
    );
  }


  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Shopping Cart</Title>

      <Table striped withTableBorder mb="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Subtotal</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map(function (item) {
            return (
              <Table.Tr key={item.id}>
                <Table.Td>Product #{item.id}</Table.Td>
                <Table.Td>${item.price.toFixed(2)}</Table.Td>
                <Table.Td>{item.quantity}</Table.Td>
                <Table.Td>${(item.price * item.quantity).toFixed(2)}</Table.Td>
                <Table.Td>
                  <Button
                    color="red"
                    size="sm"
                    loading={removeMutation.isPending}
                    onClick={function () { removeMutation.mutate(item.id); }}
                  >
                    Remove
                  </Button>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      <Group justify="flex-end">
        <div style={{ border: "1px solid #dee2e6", borderRadius: 8, padding: "16px 24px", textAlign: "right" }}>
          <Text fw={700} size="xl" mb="md">Total: ${total.toFixed(2)}</Text>
          <Group>
            <Button
              variant="outline"
              color="red"
              loading={clearMutation.isPending}
              onClick={function () { clearMutation.mutate(); }}
            >
              Clear Cart
            </Button>
            <Button color="blue" onClick={function () { navigate("/products"); }}>
              Continue Shopping
            </Button>
          </Group>
        </div>
      </Group>
    </Container>
  );
}

export default Cart;

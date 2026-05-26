import {
  Box,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  RangeSlider,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/productApi';
import { useProductFilters } from '../hooks/useProductFilters';

const RATINGS = [4, 3, 2, 1];

export const ProductSidebarFilters = () => {
  const { filters, updateFilter } = useProductFilters();
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...(categories ?? []).map((c: any) => ({ value: c.slug, label: c.name })),
  ];

  return (
    <Stack gap="md">
      <Box p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <Stack gap="xl">
          <Stack gap="sm">
            <Title order={3}>Filters</Title>
          </Stack>

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Category
            </Text>
            <Select
              data={categoryOptions}
              value={filters.category}
              onChange={(val) => updateFilter('category', val ?? '')}
              searchable
              clearable
            />
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Price Range
            </Text>
            <RangeSlider
              min={0}
              max={2000}
              step={50}
              value={[filters.minPrice, filters.maxPrice]}
              onChange={([min, max]) => { updateFilter('minPrice', min); updateFilter('maxPrice', max); }}
              marks={[
                { value: 0, label: '$0' },
                { value: 2000, label: '$2000' },
              ]}
              mb="md"
            />
            <Group grow>
              <NumberInput
                label="Min"
                value={filters.minPrice}
                onChange={(val) => updateFilter('minPrice', Number(val))}
                min={0}
                max={2000}
                prefix="$"
              />
              <NumberInput
                label="Max"
                value={filters.maxPrice}
                onChange={(val) => updateFilter('maxPrice', Number(val))}
                min={0}
                max={2000}
                prefix="$"
              />
            </Group>
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Rating
            </Text>
            <Stack gap="xs">
              {RATINGS.map((rating) => (
                <Group key={rating} gap="xs" onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)} style={{ cursor: 'pointer' }}>
                  <Checkbox checked={filters.rating === rating} readOnly />
                  <Group gap={2}>
                    {[...Array(rating)].map((_, i) => (
                      <IconStarFilled key={i} size={16} color="#ffd43b" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <IconStar key={i} size={16} color="#868e96" />
                    ))}
                  </Group>
                  <Text size="sm">& up</Text>
                </Group>
              ))}
            </Stack>
          </Stack>

        </Stack>
      </Box>
    </Stack>
  );
};

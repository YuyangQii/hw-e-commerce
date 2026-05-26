import { useSearchParams } from "react-router-dom";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  
  const filters = {
    category: searchParams.get("category") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 2000,
    rating: Number(searchParams.get("rating")) || 0,
  };

  const updateFilter = (key: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, String(value));
    setSearchParams(newParams);
  };

  return { filters, updateFilter }
};

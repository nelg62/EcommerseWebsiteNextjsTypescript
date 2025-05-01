import { useProduct } from "@/context/ProductContext";

type SortOption = "price-asc" | "price-desc" | "title-asc" | "title-desc";

const SortDropdown = () => {
  const { setSortOption } = useProduct();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold text-gray-700 dark:text-white">
        Sort by:
      </label>
      <select
        onChange={handleSortChange}
        className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default SortDropdown;

"use client";

import { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";

const CategoryDropdown = () => {
  const { setCategory } = useProduct();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value === "All" ? null : value);
  };

  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold text-gray-700 dark:text-white">
        Category:
      </label>
      <select
        onChange={handleChange}
        className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;

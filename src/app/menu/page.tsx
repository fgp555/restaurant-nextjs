// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import "./menus.scss";
// import { ChipButtonsCategories } from "@/components/ChipButtonsCategories/ChipButtonsCategories";

// interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

// export default function MenusPage() {
//   const [menus, setMenus] = useState<MenuItem[]>([]);

//   const loadAllMenus = async () => {
//     try {
//       const res = await api.get<MenuItem[]>("/menu");
//       setMenus(res.data);
//     } catch (err) {
//       console.error("Error al cargar menú:", err);
//     }
//   };

//   useEffect(() => {
//     loadAllMenus();
//   }, []);

//   const handleCategorySelect = async (id: number | null) => {
//     if (id === null) {
//       loadAllMenus();
//     } else {
//       try {
//         const res = await api.get(`/category/${id}`);
//         setMenus(res.data.menus); // los menus vienen con la categoría
//       } catch (err) {
//         console.error("Error al filtrar categoría:", err);
//       }
//     }
//   };

//   return (
//     <div className="menus-page">
//       <ChipButtonsCategories onSelect={handleCategorySelect} />

//       <h1>Menú</h1>
//       <div className="menus-list">
//         {menus.map((item) => (
//           <div key={item.id} className="menu-card">
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//             <strong>S/ {item.price}</strong>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import ChipsMenu from '../../components/ChipsMenu/ChipsMenu';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { categoriesMenu } from '../../utils/categoriesMenu';
import { products } from '@/utils/products';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Nuestro Menú</h1>
      <ChipsMenu chips={categoriesMenu} onSelect={setSelectedCategory} />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}

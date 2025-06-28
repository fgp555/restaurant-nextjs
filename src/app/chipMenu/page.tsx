'use client';

import { useState } from 'react';
import { Chip } from '../chip/page';

const categories = [
  'Todo', 'Entradas', 'Platos Principales', 'Postres', 'Bebidas',
  'Vegano', 'Sin TACC', 'Promos', 'Desayuno', 'Cenas', 'Pastas'
];

export const ChipMenu = () => {
  const [selected, setSelected] = useState('Todo');

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="flex gap-2 px-4 py-2 w-max">
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            selected={selected === cat}
            onClick={() => setSelected(cat)}
          />
        ))}
      </div>
    </div>
  );
};

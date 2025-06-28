'use client'

import { useState } from 'react'

interface Chip {
  id: string
  label: string
}

interface ChipsMenuProps {
  chips: Chip[]
  onSelect?: (chipId: string) => void
}

export default function ChipsMenu({ chips, onSelect }: ChipsMenuProps) {
  const [selected, setSelected] = useState(chips[0]?.id)

  const handleClick = (id: string) => {
    setSelected(id)
    onSelect?.(id)
  }

  return (
    <div className="flex items-center space-x-2 overflow-x-auto px-4 py-2 scrollbar-hide">
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => handleClick(chip.id)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
            ${chip.id === selected
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}

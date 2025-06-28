type ChipProps = {
  label: string;
  selected?: boolean;
  onClick: () => void;
};

export const Chip = ({ label, selected = false, onClick }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-1 rounded-full border transition-all
        ${selected ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
      `}
    >
      {label}
    </button>
  );
};

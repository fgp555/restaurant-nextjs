interface ProductCardProps {
  title: string;
  image: string;
  price: string;
}

export function ProductCard({ title, image, price }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-64">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-2" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-red-700 font-bold mt-1">{price}</p>
    </div>
  );
}

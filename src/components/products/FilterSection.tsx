interface FilterSectionProps {
  title: string;
  items: Array<{ id: string; name: string; count: number }>;
  activeValue: string;
  onChange: (value: string) => void;
}

export default function FilterSection({ title, items, activeValue, onChange }: FilterSectionProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex items-center justify-between w-full text-sm ${
              activeValue === item.id ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <span>{item.name}</span>
            <span className="text-gray-400">({item.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
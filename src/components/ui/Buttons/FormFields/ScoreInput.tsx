export const ScoreInput: React.FC<{
  label: string;
  icon: React.ReactNode;
  value: number | undefined;
  onChange: (value: number) => void;
}> = ({ label, icon, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-white font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              value === score
                ? 'bg-violet-500 border-violet-400 text-white'
                : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-400'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
};
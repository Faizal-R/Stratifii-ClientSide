const EnhancedScoreInput: React.FC<{
  label: string;
  icon: React.ReactNode;
  value?: number;
  onChange: (value: number) => void;
}> = ({ label, icon, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-white text-sm font-medium">{label}</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
              value === score
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 scale-105'
                : 'bg-gray-700 text-gray-400 hover:bg-violet-900/30 hover:text-violet-300 hover:scale-105'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};
export default EnhancedScoreInput;
export const Toggle = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <button
        onClick={onChange}
        className={`w-10 h-6 flex items-center rounded-full p-1 ${
          checked ? "bg-violet-950" : "bg-violet-950"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transform transition ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </button>
    </div>
  );
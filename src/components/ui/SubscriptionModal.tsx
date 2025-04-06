import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { ISubscription } from "@/types/ISubscription"
import { toast } from "sonner";

type SubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSave: (plan: ISubscription) => void;
  existingPlan?: ISubscription;
  isEditMode?: boolean;
};

export default function SubscriptionModal({
  isOpen,
  onClose,
  handleSave,
  existingPlan,
  isEditMode,
}: SubscriptionModalProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string | number>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState<string>("");

  useEffect(() => {
    if (isEditMode && existingPlan) {
      setName(existingPlan.name || "");
      setPrice(existingPlan.price || "");
      setFeatures(existingPlan.features || []);
    } else {
      setName("");
      setPrice("");
      setFeatures([]);
    }
  }, [existingPlan, isEditMode,onClose]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      if (features.length <= 9) {
        setFeatures([...features, newFeature]);
        setNewFeature("");
      } else {
        toast("Maximum of 10 features are allowed.");
        return;
      }
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddFeature();
  };

  const onSave = () => {
    if (isEditMode) {
      handleSave({ ...existingPlan, name, price: Number(price), features });
    } else {
      handleSave({ name, price: Number(price), features });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Subscription Plan" : "Create Subscription Plan"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isEditMode}
              className={`w-full ${
                isEditMode ? "bg-gray-100 text-gray-600" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (INR)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="overflow-y-scroll max-h-60">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e)=> setFeatures(features.map((f, i) => i === index ? e.target.value : f))}
                    className="w-full bg-gray-100"
                  />
                  <button
                    onClick={() => handleRemoveFeature(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add new feature"
                />
                <button
                  onClick={handleAddFeature}
                  className="p-2 text-violet-600 hover:bg-violet-50 rounded-md"
                  disabled={!newFeature.trim()}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onSave}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-md"
          >
            {isEditMode ? "Save Changes" : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

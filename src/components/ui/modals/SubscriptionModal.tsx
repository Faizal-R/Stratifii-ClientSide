import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { ISubscription, ISubscriptionFeatures } from "@/types/ISubscription";
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
  const [isActive, setIsActive] = useState<boolean>(true);
  const [features, setFeatures] = useState<ISubscriptionFeatures>({
    candidateSlotPerMonth: 0,
    finalInterviewAccess: false,
    interviewRecordingAccess: false,
    feedbackDownloadAccess: false,
    jobPostLimitPerMonth: 0,
    companySpecificQuestionAccess: false,
  });

  useEffect(() => {
    if (isEditMode && existingPlan) {
      setName(existingPlan.name);
      setPrice(existingPlan.price);
      setIsActive(existingPlan.isActive);
      setFeatures(existingPlan.features);
    } else {
      setName("");
      setPrice("");
      setIsActive(true);
      setFeatures({
        candidateSlotPerMonth: 0,
        finalInterviewAccess: false,
        interviewRecordingAccess: false,
        feedbackDownloadAccess: false,
        jobPostLimitPerMonth: 0,
        companySpecificQuestionAccess: false,
      });
    }
  }, [existingPlan, isEditMode, onClose]);

  if (!isOpen) return null;

  const handleFeatureChange = (
    key: keyof ISubscriptionFeatures,
    value: number | boolean
  ) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    if (!name || !price) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (features.candidateSlotPerMonth <= 0 || features.jobPostLimitPerMonth <= 0) {
      toast.error("Please enter valid numbers for slots and limits");
      return;
    }

    const plan: ISubscription = {
      name,
      price: Number(price),
      isActive,
      features,
    };

    handleSave(isEditMode ? { ...plan, _id: existingPlan?._id } : plan);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-xl  border-violet-900  dark:bg-neutral-900 rounded-2xl p-8  animate-fadeIn overflow-y-auto max-h-[90vh] bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90  border border-violet-500/20 shadow-2xl shadow-violet-500/10">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl text-violet-200 font-semibold mb-6 text-center">
          {isEditMode ? "Edit Subscription Plan" : "Create Subscription Plan"}
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Plan Name *" value={name} onChange={setName} disabled={isEditMode} />
            <Input label="Price (INR) *" type="number" value={price} onChange={setPrice} />
          </div>

          <Toggle label="Active Plan" checked={isActive} onChange={() => setIsActive(!isActive)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Candidate Slot Per Month *" type="number" value={features.candidateSlotPerMonth} onChange={(v) => handleFeatureChange("candidateSlotPerMonth", +v)} />
            <Input label="Job Post Limit Per Month *" type="number" value={features.jobPostLimitPerMonth} onChange={(v) => handleFeatureChange("jobPostLimitPerMonth", +v)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Toggle label="Final Interview Access" checked={features.finalInterviewAccess} onChange={() => handleFeatureChange("finalInterviewAccess", !features.finalInterviewAccess)} />
            <Toggle label="Interview Recording Access" checked={features.interviewRecordingAccess} onChange={() => handleFeatureChange("interviewRecordingAccess", !features.interviewRecordingAccess)} />
            <Toggle label="Feedback Download Access" checked={features.feedbackDownloadAccess} onChange={() => handleFeatureChange("feedbackDownloadAccess", !features.feedbackDownloadAccess)} />
            <Toggle label="Company Specific Questions Access" checked={features.companySpecificQuestionAccess} onChange={() => handleFeatureChange("companySpecificQuestionAccess", !features.companySpecificQuestionAccess)} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 border-2 border-violet-900 bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90  rounded-lg text-gray-300 hover:bg-black
            -100">
              Cancel
            </button>
            <button onClick={onSave} className="px-4 py-2 border-2 border-violet-900 bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90  text-white rounded-lg hover:bg-gray-800 transition">
              {isEditMode ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  type?: string;
  value: any;
  onChange: (val: any) => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border rounded-lg w-full outline-none ${disabled ? " bg-black/80 border-2 border-violet-800 text-gray-600" : " bg-black/80 border-2 border-violet-800 text-gray-400"}`}
    />
  </div>
);

const Toggle = ({
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
      className={`w-10 h-6 flex items-center rounded-full p-1 ${checked ? "bg-violet-950" : "bg-violet-950"}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full transform transition ${checked ? "translate-x-4" : ""}`} />
    </button>
  </div>
);

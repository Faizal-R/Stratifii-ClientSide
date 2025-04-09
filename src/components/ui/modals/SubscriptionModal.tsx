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
    minimumCandidatesPerJob: 15,
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
        minimumCandidatesPerJob: 15,
        finalInterviewAccess: false,
        interviewRecordingAccess: false,
        feedbackDownloadAccess: false,
        jobPostLimitPerMonth: 0,
        companySpecificQuestionAccess: false,
      });
    }
  }, [existingPlan, isEditMode, onClose]);

  if (!isOpen) return null;

  const handleFeatureChange = (key: keyof ISubscriptionFeatures, value: number | boolean) => {
    setFeatures((prev: ISubscriptionFeatures) => ({
      ...prev,
      [key]: value as ISubscriptionFeatures[keyof ISubscriptionFeatures],
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
    console.log(plan)

    handleSave(plan);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Subscription Plan" : "Create Subscription Plan"}
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isEditMode}
                className={`w-full rounded-md border ${
                  isEditMode ? "bg-gray-100 text-gray-600" : ""
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (INR) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-md border"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Plan Active
            </label>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Plan Features</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate Slots per Month *
                </label>
                <input
                  type="number"
                  value={features.candidateSlotPerMonth}
                  onChange={(e) => handleFeatureChange('candidateSlotPerMonth', parseInt(e.target.value))}
                  className="w-full rounded-md border"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Candidates per Job
                </label>
                <input
                  type="number"
                  value={features.minimumCandidatesPerJob}
                  onChange={(e) => handleFeatureChange('minimumCandidatesPerJob', parseInt(e.target.value))}
                  className="w-full rounded-md border"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Post Limit per Month *
                </label>
                <input
                  type="number"
                  value={features.jobPostLimitPerMonth}
                  onChange={(e) => handleFeatureChange('jobPostLimitPerMonth', parseInt(e.target.value))}
                  className="w-full rounded-md border"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="finalInterviewAccess"
                  checked={features.finalInterviewAccess}
                  onChange={(e) => handleFeatureChange('finalInterviewAccess', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="finalInterviewAccess" className="text-sm font-medium text-gray-700">
                  Final Interview Access
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="interviewRecordingAccess"
                  checked={features.interviewRecordingAccess}
                  onChange={(e) => handleFeatureChange('interviewRecordingAccess', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="interviewRecordingAccess" className="text-sm font-medium text-gray-700">
                  Interview Recording Access
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="feedbackDownloadAccess"
                  checked={features.feedbackDownloadAccess}
                  onChange={(e) => handleFeatureChange('feedbackDownloadAccess', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="feedbackDownloadAccess" className="text-sm font-medium text-gray-700">
                  Feedback Download Access
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="companySpecificQuestionAccess"
                  checked={features.companySpecificQuestionAccess}
                  onChange={(e) => handleFeatureChange('companySpecificQuestionAccess', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="companySpecificQuestionAccess" className="text-sm font-medium text-gray-700">
                  Company Specific Question Access
                </label>
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
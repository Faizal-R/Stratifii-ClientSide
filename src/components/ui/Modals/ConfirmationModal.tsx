import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RiseLoader } from "react-spinners";
import { Toggle } from "../FormFields/ToggleInput";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  // New props for reason functionality
  reasonOptions?: { value: string; label: string }[];
  onConfirmWithReason?: (reason: string, isPermanentBan?: boolean) => void;
  reasonLabel?: string;
  reasonPlaceholder?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  reasonOptions,
  onConfirmWithReason,
  reasonLabel = "Reason",
  reasonPlaceholder = "Select a reason...",
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [isPermanentBan, setIsPermanentBan] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (reasonOptions && onConfirmWithReason) {
      setIsCompleting(true);
      const finalReason =
        selectedReason === "other" ? customReason : selectedReason;
      await onConfirmWithReason(finalReason, isPermanentBan);
      setIsCompleting(false);
    } else {
      onConfirm();
      onClose();
    }
    // onClose();
  };

  const handleClose = () => {
    setSelectedReason("");
    setCustomReason("");
    setIsDropdownOpen(false);
    onClose();
  };

  const handleReasonSelect = (value: string) => {
    setSelectedReason(value);
    setIsDropdownOpen(false);
    if (value !== "other") {
      setCustomReason("");
    }
  };

  const isConfirmDisabled =
    reasonOptions &&
    (!selectedReason || (selectedReason === "other" && !customReason.trim()));

  const getSelectedReasonLabel = () => {
    if (!selectedReason) return reasonPlaceholder;
    const option = reasonOptions?.find((opt) => opt.value === selectedReason);
    return option?.label || reasonPlaceholder;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md">
        <div className="bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10">
          <div className="relative p-6">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-violet-600/5 rounded-xl blur-xl" />

            {/* Content Container */}
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                  {title}
                </h3>
              </div>

              {/* Content */}
              <p className="text-violet-200/70 mb-6">{description}</p>

              {/* Reason Select Field */}
              {reasonOptions && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-violet-200/90 mb-2">
                    {reasonLabel}
                  </label>

                  {/* Custom Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-3 py-2 bg-violet-950/30 border border-violet-500/30 rounded-lg text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 flex items-center justify-between mb-3"
                    >
                      <span
                        className={
                          selectedReason
                            ? "text-violet-200"
                            : "text-violet-400/50"
                        }
                      >
                        {getSelectedReasonLabel()}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-violet-400 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Options */}
                    {isDropdownOpen && (
                      <div className="absolute h-[180px] overflow-y-auto top-full left-0 right-0 mt-1 bg-violet-950/95 border border-violet-500/30 rounded-lg shadow-xl z-10 backdrop-blur-sm ">
                        {reasonOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleReasonSelect(option.value)}
                            className="w-full px-3 py-2 text-left text-violet-200 hover:bg-violet-600/20 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Custom Input Field for "Other" */}
                  {selectedReason === "other" && (
                    <div className="mb-3 ">
                      <input
                        type="text"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Please specify the reason..."
                        className="w-full px-3 py-2 bg-violet-950/30 border border-violet-500/30 rounded-lg text-violet-200 placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                        autoFocus
                      />
                    </div>
                  )}
              <Toggle
               
                label="Permanent Ban"
                checked={isPermanentBan}
                onChange={() => setIsPermanentBan(!isPermanentBan)}
              />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 justify-end mt-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg text-violet-200/70 hover:text-violet-100 hover:bg-violet-500/10 border border-violet-500/20 transition-all duration-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isConfirmDisabled}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    isConfirmDisabled
                      ? "bg-violet-600/10 text-violet-200/50 border-violet-500/20 cursor-not-allowed"
                      : "bg-violet-600/20 text-violet-200 hover:bg-violet-600/30 border-violet-500/30 hover:border-violet-500/50"
                  }`}
                >
                  {isCompleting ? (
                    <RiseLoader size={11} color="#ffff" />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

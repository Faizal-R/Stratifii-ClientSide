import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
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
                <button
                  onClick={onClose}
                  className="p-1 text-violet-300/70 hover:text-violet-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <p className="text-violet-200/70 mb-6">{description}</p>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-violet-200/70 hover:text-violet-100 hover:bg-violet-500/10 border border-violet-500/20 transition-all duration-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-violet-600/20 text-violet-200 hover:bg-violet-600/30 border border-violet-500/30 hover:border-violet-500/50 transition-all duration-200"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

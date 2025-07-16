import React from 'react';
import { X, AlertTriangle, Eye, Monitor, FileText, CheckCircle } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose, onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-black via-black to-violet-950 rounded-2xl p-8 max-w-2xl w-full border border-violet-500/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-red-500/20 p-2 rounded-full mr-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Interview Rules & Guidelines
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Rules Content */}
        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Warning
            </h3>
            <p className="text-gray-300">
              Any malpractice or violation of these rules will result in immediate disqualification from the interview process.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Monitor className="h-5 w-5 text-violet-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Browser Restrictions</h4>
                <p className="text-gray-400 text-sm">
                  Do not open any other tabs, windows, or applications during the interview.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Eye className="h-5 w-5 text-violet-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Full Screen Mode</h4>
                <p className="text-gray-400 text-sm">
                  Stay in full-screen mode throughout the interview. Exiting may trigger disqualification.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-violet-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">No External Resources</h4>
                <p className="text-gray-400 text-sm">
                  Do not use any external websites, documentation, or reference materials.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-violet-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Answer Submission</h4>
                <p className="text-gray-400 text-sm">
                  Each question has a 90-second timer. Submit your answer before time expires.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
            <h3 className="text-violet-400 font-semibold mb-2">Interview Format</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• 25 multiple-choice questions</li>
              <li>• 90 seconds per question</li>
              <li>• No going back to previous questions</li>
              <li>• Results shown only at the end</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
          >
            I Agree & Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
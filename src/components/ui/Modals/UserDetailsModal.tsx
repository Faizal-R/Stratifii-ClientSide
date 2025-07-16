import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ICompany } from '@/validations/CompanySchema';
import { IInterviewer } from '@/types/IInterviewer';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ICompany | IInterviewer;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;
  const isCompany = "companyName" in user;

const details = isCompany
  ? [
      { label: "Name", value: user.companyName },
      { label: "Email", value: user.email },
      { label: "Website", value: user.companyWebsite },
      { label: "Registration Number", value: user.registrationCertificateNumber },
      { label: "LinkedIn Profile", value: user.linkedInProfile || "Not provided" },
      { label: "Phone", value: user.phone },
      { label: "Company Type", value: user.companyType },
    ]
  : [
      { label: "Name", value: user.name },
      { label: "Email", value: user.email },
      { label: "Current Position", value: user.position || "Not provided" },
      { label: "LinkedIn Profile", value: user.linkedinProfile || "Not provided" },
      { label: "Phone", value: user.phone || "Not provided" },
      { label: "Experience", value: user.experience || "Not provided" },
      { label: "Expertise", value: user.expertise.length > 0 ? user.expertise : "Not provided" },
      { label: "Professional Summary", value: user.professionalSummary || "Not provided" },
      { label: "Resume", value: user.resume || "Not provided" }, // <-- NEW FIELD
    ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isCompany ? "Company Details" : "Interviewer Details"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {details.map((detail) => (
            <div key={detail.label} className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">{detail.label}</dt>
              <dd className="text-sm text-gray-900 col-span-2">
{detail.label === "Website" || detail.label === "LinkedIn Profile" ? (
  detail.value !== "Not provided" ? (
    <Link
      href={typeof detail.value === "string" ? detail.value : ""}
      target="_blank"
      className="text-blue-600 hover:text-blue-800 hover:underline"
    >
      {detail.value}
    </Link>
  ) : (
    detail.value
  )
) : detail.label === "Resume" ? (
  detail.value !== "Not provided" ? (
    <a
      href={`https://docs.google.com/viewer?url=${encodeURIComponent(detail.value as string)}&embedded=true`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-violet-700 text-white text-xs px-3 py-1 rounded-full hover:bg-violet-800 transition"
    >
      View
    </a>
  ) : (
    "Not provided"
  )
) : (
  detail.value
)}


              </dd>
            </div>
          ))}

          {/* Handle Languages separately */}
       {!isCompany && (user as IInterviewer).languages.length > 0 && (
  <div className="grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-500">Languages</dt>
    <dd className="text-sm text-gray-900 col-span-2">
      <ul>
        {(user as IInterviewer).languages.map((lang, index) => (
          <li key={index} className="flex gap-1">
            <span className="font-medium">{lang.language}:</span>
            <span>{lang.level}</span>
          </li>
        ))}
      </ul>
    </dd>
  </div>
)}

        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;

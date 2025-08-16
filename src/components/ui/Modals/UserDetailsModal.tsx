import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { ICompany } from "@/validations/CompanySchema";
import { IInterviewer } from "@/types/IInterviewer";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ICompany | IInterviewerProfile;
  isCompany: boolean;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
  isCompany,
}) => {
  if (!isOpen) return null;

  let details: { label: string; value: string | number }[] = [];
  if (isCompany) {
    const companyUser = user as ICompany;

    details = [
      { label: "Name", value: companyUser.name },
      { label: "Email", value: companyUser.email },
      { label: "Website", value: companyUser.companyWebsite || "Not provided" },
      {
        label: "Registration Number",
        value: companyUser.registrationCertificateNumber || "Not provided",
      },
      {
        label: "LinkedIn Profile",
        value: companyUser.linkedInProfile || "Not provided",
      },
      { label: "Phone", value: companyUser.phone || "Not provided" },
      {
        label: "Company Type",
        value: companyUser.companyType || "Not provided",
      },
      {
        label: "Description",
        value: companyUser.description || "Not provided",
      },
    ];
  } else {
    const interviewerUser = user as IInterviewerProfile;

    details = [
      { label: "Name", value: interviewerUser.name },
      { label: "Email", value: interviewerUser.email },
      {
        label: "Current Position",
        value: interviewerUser.position || "Not provided",
      },
      {
        label: "LinkedIn Profile",
        value: interviewerUser.linkedinProfile || "Not provided",
      },
      { label: "Phone", value: interviewerUser.phone || "Not provided" },
      {
        label: "Experience",
        value: interviewerUser.experience || "Not provided",
      },
      {
        label: "Expertise",
        value:
          Array.isArray(interviewerUser.expertise) &&
          interviewerUser.expertise.length > 0
            ? interviewerUser.expertise
                .map(
                  (exp) =>
                    `${exp.skill} (${exp.proficiencyLevel}${
                      exp.yearsOfExperience
                        ? `, ${exp.yearsOfExperience} yrs`
                        : ""
                    })`
                )
                .join(", ")
            : "Not provided",
      },

      {
        label: "Resume",
        value: (interviewerUser.resume as string) || "Not provided",
      },
    ];
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isCompany ? "Company Details" : "Interviewer Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {details.map((detail) => (
            <div key={detail.label} className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">
                {detail.label}
              </dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {detail.label === "Website" ||
                detail.label === "LinkedIn Profile" ? (
                  detail.value !== "Not provided" ? (
                    <Link
                      href={
                        typeof detail.value === "string" ? detail.value : ""
                      }
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
                      href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                        detail.value as string
                      )}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-violet-700 text-white text-xs px-3 py-1 rounded-full hover:bg-violet-800 transition"
                    >
                      View
                    </a>
                  ) : (
                    "Not provided"
                  )
                ) : detail.label === "Expertise" &&
                  Array.isArray(detail.value) ? (
                  <ul className="list-disc pl-5">
                    {detail.value.map((exp, i) => (
                      <li key={i}>
                        {exp.skill} ({exp.proficiencyLevel}
                        {exp.yearsOfExperience
                          ? `, ${exp.yearsOfExperience} yrs`
                          : ""}
                        )
                      </li>
                    ))}
                  </ul>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
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

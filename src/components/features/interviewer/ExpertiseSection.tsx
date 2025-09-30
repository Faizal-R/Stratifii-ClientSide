import React from "react";
import { Briefcase, Star, Calendar, Plus, X, Code } from "lucide-react";
import { ISkillExpertise } from "@/validations/InterviewerSchema";


interface ExpertiseSectionProps {
  expertise: ISkillExpertise[];

  isEditing: boolean;
  handleAddExpertise: () => void;
  handleExpertiseChange: (
    index: number,
    field: keyof ISkillExpertise,
    value: string | string[] | number
  ) => void;
  handleRemoveExpertise: (index: number) => void;
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  expertise,
  isEditing,
  handleAddExpertise,
  handleExpertiseChange,
  handleRemoveExpertise,
}) => {
  const proficiencyLevels = {
    beginner: {
      stars: 2,
      color: "from-blue-400 to-cyan-400",
      label: "Beginner",
    },
    intermediate: {
      stars: 3,
      color: "from-cyan-400 to-teal-400",
      label: "Intermediate",
    },
    advanced: {
      stars: 4,
      color: "from-teal-400 to-violet-400",
      label: "Advanced",
    },
    expert: {
      stars: 5,
      color: "from-violet-400 to-purple-400",
      label: "Expert",
    },
  };

  const sourceColors = {
    professional: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    academic: "bg-green-500/20 text-green-300 border-green-500/30",
    personal: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    certification: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };

  const sourceIcons = {
    professional: "💼",
    academic: "🎓",
    personal: "👤",
    certification: "📜",
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-800/50 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Briefcase className="text-violet-400" size={24} />
          </div>
          Technical Expertise
        </h2>
        {isEditing && (
          <button
            onClick={handleAddExpertise}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-400 rounded-xl border border-violet-500/30 hover:from-violet-600/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105"
          >
            <Plus size={18} />
            Add Skill
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(expertise || []).map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-violet-950/30 p-6 rounded-2xl border border-gray-700/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10"
          >
            {isEditing ? (
              <div className="space-y-4">
                {/* Skill Input */}
                <div className="relative">
                  <Code
                    className="absolute left-3 top-3 text-violet-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Skill (e.g., React, Python)"
                    value={item.skill}
                    onChange={(e) =>
                      handleExpertiseChange(index, "skill", e.target.value)
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-gray-600/50 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Proficiency and Years */}
                <div className="flex gap-3">
                  <select
                    value={item.proficiencyLevel}
                    onChange={(e) =>
                      handleExpertiseChange(
                        index,
                        "proficiencyLevel",
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-gray-600/50 text-white focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Years"
                    value={item.yearsOfExperience || ""}
                    min={0}
                    max={50}
                    onChange={(e) =>
                      handleExpertiseChange(
                        index,
                        "yearsOfExperience",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-20 px-3 py-3 rounded-xl bg-black/40 border border-gray-600/50 text-white text-center focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Source Selection */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(sourceColors).map(([source, colorClass]) => (
                    <button
                      key={source}
                      onClick={() => {
                        const current = item.skillSource || [];
                        const updated = current.includes(
                          source as
                            | "professional"
                            | "academic"
                            | "personal"
                            | "certification"
                        )
                          ? current.filter((s) => s !== source)
                          : [...current, source];
                        handleExpertiseChange(index, "skillSource", updated);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        item.skillSource?.includes(
                          source as
                            | "professional"
                            | "academic"
                            | "personal"
                            | "certification"
                        )
                          ? colorClass
                          : "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:border-gray-500/50"
                      }`}
                    >
                      <span>
                        {sourceIcons[source as keyof typeof sourceIcons]}
                      </span>
                      {source}
                    </button>
                  ))}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveExpertise(index)}
                  className="absolute -top-2 -right-2 p-2 bg-red-500/20 text-red-400 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all duration-200 hover:scale-110"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Skill Header */}
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{item.skill}</h3>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} className="text-violet-400" />
                  <span className="text-sm">
                    {item.yearsOfExperience || 0} years experience
                  </span>
                </div>

                {/* Proficiency Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Proficiency</span>
                    <span className="text-sm font-semibold text-white">
                      {
                        proficiencyLevels[
                          item.proficiencyLevel as keyof typeof proficiencyLevels
                        ]?.label
                      }
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        proficiencyLevels[
                          item.proficiencyLevel as keyof typeof proficiencyLevels
                        ]?.color
                      } transition-all duration-1000 ease-out`}
                      style={{
                        width: `${
                          (proficiencyLevels[
                            item.proficiencyLevel as keyof typeof proficiencyLevels
                          ]?.stars || 1) * 20
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Sources */}
                <div className="space-y-2">
                  <span className="text-sm text-gray-400">Sources</span>
                  <div className="flex flex-wrap gap-2">
                    {(item.skillSource || []).map((source, sourceIndex) => (
                      <span
                        key={sourceIndex}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium border ${
                          sourceColors[source as keyof typeof sourceColors]
                        }`}
                      >
                        <span>
                          {sourceIcons[source as keyof typeof sourceIcons]}
                        </span>
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {/* {(expertise.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4">
              <Briefcase size={48} className="text-violet-400/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No expertise added yet</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm">
              Start building your professional profile by adding your technical skills and expertise.
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ExpertiseSection;

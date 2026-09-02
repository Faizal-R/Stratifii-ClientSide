import React from "react";
import { Plus, X, Code2, Sparkles, Award } from "lucide-react";
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

const proficiencyBadgeStyles: Record<string, { label: string; badge: string; progress: string }> = {
  beginner: {
    label: "Beginner",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    progress: "bg-blue-500",
  },
  intermediate: {
    label: "Intermediate",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    progress: "bg-cyan-500",
  },
  advanced: {
    label: "Advanced",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    progress: "bg-violet-500",
  },
  expert: {
    label: "Expert",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    progress: "bg-emerald-500",
  },
};

const sourceIcons: Record<string, string> = {
  professional: "💼 Prof",
  academic: "🎓 Acad",
  personal: "👤 Self",
  certification: "📜 Cert",
};

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  expertise,
  isEditing,
  handleAddExpertise,
  handleExpertiseChange,
  handleRemoveExpertise,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="text-violet-400" size={18} />
          <h3 className="text-base font-extrabold text-white">Technical Skills & Expertise</h3>
          <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-bold">
            {expertise?.length || 0} Listed
          </span>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={handleAddExpertise}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-xs font-bold rounded-xl border border-violet-500/30 transition-all"
          >
            <Plus size={14} />
            Add Skill
          </button>
        )}
      </div>

      {/* Grid of Compact Skill Pills/Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(expertise || []).map((item, index) => {
          const levelInfo = proficiencyBadgeStyles[item.proficiencyLevel] || proficiencyBadgeStyles.intermediate;

          return (
            <div
              key={index}
              className="relative bg-zinc-900/90 border border-zinc-800/90 p-3.5 rounded-2xl transition-all hover:border-violet-500/30 space-y-2.5"
            >
              {isEditing ? (
                /* Edit Mode: Compact Form */
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      placeholder="Skill name (e.g. React)"
                      value={item.skill}
                      onChange={(e) => handleExpertiseChange(index, "skill", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExpertise(index)}
                      className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-all shrink-0"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={item.proficiencyLevel}
                      onChange={(e) => handleExpertiseChange(index, "proficiencyLevel", e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Yrs"
                      value={item.yearsOfExperience || ""}
                      min={0}
                      max={50}
                      onChange={(e) => handleExpertiseChange(index, "yearsOfExperience", parseInt(e.target.value) || 0)}
                      className="w-14 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-center text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              ) : (
                /* Display Mode: Super Sleek Compact Skill Badge Card */
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-white truncate">{item.skill || "Skill"}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${levelInfo.badge}`}>
                      {levelInfo.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold">
                    <span>Experience</span>
                    <span className="text-white font-bold">{item.yearsOfExperience || 0} Yrs</span>
                  </div>

                  {/* Micro Progress Line */}
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${levelInfo.progress} transition-all`}
                      style={{
                        width:
                          item.proficiencyLevel === "expert"
                            ? "100%"
                            : item.proficiencyLevel === "advanced"
                            ? "75%"
                            : item.proficiencyLevel === "intermediate"
                            ? "50%"
                            : "25%",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(!expertise || expertise.length === 0) && (
        <div className="p-6 text-center border border-zinc-800/80 rounded-2xl text-xs text-zinc-500 italic">
          No skills listed yet. Click "Edit Profile" above to add your technical stack.
        </div>
      )}
    </div>
  );
};

export default ExpertiseSection;

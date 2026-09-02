import React, { useEffect } from "react";
import { User, Mail, CheckCircle2, Award, CalendarCheck, Sparkles, ChevronRight } from "lucide-react";
import { useGetMockQualifiedCandidates } from "@/hooks/api/useJob";

const CandidateList: React.FC<any> = ({
  selectedJob,
  selectedCandidate,
  onCandidateSelect,
}) => {
  const [mockQualifiedCandidates, setMockQualifiedCandidates] = React.useState([]);

  const { mockQualifiedCandidatesByJob } = useGetMockQualifiedCandidates();

  const getScoreBadge = (score?: number) => {
    if (!score) return "text-zinc-400 bg-zinc-800 border-zinc-700";
    if (score >= 85) return "text-emerald-400 bg-emerald-950/80 border-emerald-500/40";
    if (score >= 70) return "text-amber-400 bg-amber-950/80 border-amber-500/40";
    return "text-red-400 bg-red-950/80 border-red-500/40";
  };

  useEffect(() => {
    if (!selectedJob) return;

    const getMockQualifiedCandidates = async () => {
      const res = await mockQualifiedCandidatesByJob(selectedJob._id!);
      if (res.success) {
        setMockQualifiedCandidates(res.data);
      }
    };

    getMockQualifiedCandidates();
  }, [selectedJob, mockQualifiedCandidatesByJob]);

  return (
    <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 shadow-2xl space-y-5">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <User className="text-violet-400" size={20} />
            Candidate Pipeline
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            AI-qualified candidates for <span className="text-violet-300 font-bold">{selectedJob?.position || "Selected Position"}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-violet-950/80 text-violet-300 text-xs font-bold px-3 py-1 rounded-full border border-violet-800/50">
            {mockQualifiedCandidates.length} Total
          </span>
        </div>
      </div>

      {/* Candidate List Container */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {mockQualifiedCandidates.length === 0 ? (
          <div className="text-center py-12 border border-zinc-900 rounded-2xl p-6">
            <User className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No Qualified Candidates Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Candidates must take and pass their AI mock evaluation interview to qualify for live interviewer scheduling.
            </p>
          </div>
        ) : (
          mockQualifiedCandidates.map((dc: any) => {
            const isSelected = selectedCandidate?._id === dc._id;
            const candidateInfo = dc.candidate;

            return (
              <div
                key={dc._id}
                onClick={() => onCandidateSelect(dc)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-violet-500 bg-gradient-to-r from-violet-950/70 to-zinc-950 shadow-lg shadow-violet-600/20"
                    : "border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidateInfo?.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={candidateInfo?.name}
                      className="w-10 h-10 rounded-xl border border-zinc-700 object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-white">{candidateInfo?.name}</h4>
                        {dc.isQualifiedForFinal && (
                          <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={10} /> AI Qualified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Mail size={12} className="text-zinc-500" />
                        {candidateInfo?.email}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`text-xs font-black px-2.5 py-1 rounded-xl border inline-flex items-center gap-1 ${getScoreBadge(dc.mockScore)}`}>
                      <Sparkles size={12} /> {dc.mockScore || 85}% Score
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default CandidateList;
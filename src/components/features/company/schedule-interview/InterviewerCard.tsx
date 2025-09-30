import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  MapPin,
  Mail,
  Calendar,
  Clock,
  Award,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Buttons/button";
import { Badge } from "@/components/ui/badge";
import { IJob } from "@/types/IJob";
import { IInterviewer } from "@/types/IInterviewer";
import {  IInterviewSlot } from "@/types/ISlotTypes";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { useGetMatchedInterviewersByJobDescription } from "@/hooks/api/useJob";
import { toast } from "sonner";
import { errorToast } from "@/utils/customToast";

interface InterviewerCardProps {
  interviewer: IInterviewerProfile;
  selectedJob?: IJob;
//   onBookSlot: (interviewer: IInterviewer, slot: IInterviewSlot) => void;
}

export const InterviewerCard: React.FC<InterviewerCardProps> = ({
  interviewer,
  selectedJob,
//   onBookSlot,
}) => {
  const isSlotAvailable = (slot: IInterviewSlot) => 
    slot.isAvailable && slot.status === "available";

  const getSkillMatch = (skill: string) => {
    return selectedJob?.requiredSkills.includes(skill);
  };

  const getTopSkills = () => {
    return interviewer.expertise
      .sort((a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0))
      .slice(0, 5);
  };

  const getMatchedSkillsCount = () => {
    if (!selectedJob) return 0;
    return interviewer.expertise.filter(exp => 
      selectedJob.requiredSkills.includes(exp.skill)
    ).length;
  };

   const [interviewers, setInterviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const { getMatchedInterviewersByJobDescription } =
    useGetMatchedInterviewersByJobDescription();

  useEffect(() => {
    if (!selectedJob) return;
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchMatchedInterviewers = async () => {
      setLoading(true);
      const res = await getMatchedInterviewersByJobDescription(
        selectedJob._id!
      );
      if (res.success) {
        setInterviewers(res.data);
        console.log(res.data);
      } else {
        errorToast(res.message || "Failed to fetch interviewers")
      }
      setLoading(false);
    };
    fetchMatchedInterviewers();
  }, [selectedJob]);

  return (
    <div className="talent-card talent-animate-in">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <img
              src={interviewer.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${interviewer.name}`}
              alt={interviewer.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            {interviewer.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-success-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {interviewer.name}
                </h3>
                <p className="talent-gradient-text font-semibold text-lg">
                  {interviewer.position}
                </p>
              </div>
              
              {interviewer.rating && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-warning/20 border border-warning/30">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="text-sm font-semibold text-warning-foreground">
                    {interviewer.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{interviewer.experience} years experience</span>
              </div>
             
            </div>

            {selectedJob && (
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">
                  {getMatchedSkillsCount()}/{selectedJob.requiredSkills.length} skills matched
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Top Expertise
          </h4>
          <div className="flex flex-wrap gap-2">
            {getTopSkills().map((expertise) => (
              <Badge
                key={expertise.skill}
                variant="outline"
                className={
                  getSkillMatch(expertise.skill)
                    ? "talent-skill-matched"
                    : "talent-skill-default"
                }
              >
                {expertise.skill}
                {expertise.yearsOfExperience && (
                  <span className="ml-1 text-xs opacity-80">
                    ({expertise.yearsOfExperience}y)
                  </span>
                )}
                {getSkillMatch(expertise.skill) && (
                  <CheckCircle className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{interviewer.email}</span>
          </div>
        </div>

        {/* Available Slots */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {/* Available Slots ({interviewer.availableSlots.filter(isSlotAvailable).length}) */}
          </h4>
          
          {19 <0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <Calendar className="h-6 w-6 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No available slots</p>
            </div>
          ) : (
            // <div className="space-y-2 max-h-48 overflow-y-auto talent-scrollbar">
            //   {interviewer.availableSlots.map((slot) => {
            //     const available = isSlotAvailable(slot);
            //     const startTime = new Date(slot.startTime);
                
            //     return (
            //       <div
            //         key={slot._id}
            //         className={`p-3 rounded-lg border transition-all ${
            //           available
            //             ? "border-success/40 bg-success/10 hover:bg-success/20"
            //             : "border-border bg-muted/50"
            //         }`}
            //       >
            //         <div className="flex items-center justify-between">
            //           <div className="flex items-center gap-3">
            //             <div className="flex items-center gap-1.5">
            //               <Calendar className="h-3.5 w-3.5 text-primary" />
            //               <span className="font-medium text-xs">
            //                 {startTime.toLocaleDateString()}
            //               </span>
            //             </div>
            //             <div className="flex items-center gap-1.5">
            //               <Clock className="h-3.5 w-3.5 text-primary" />
            //               <span className="text-xs text-muted-foreground">
            //                 {startTime.toLocaleTimeString([], {
            //                   hour: "2-digit",
            //                   minute: "2-digit",
            //                 })}
            //               </span>
            //             </div>
            //             <Badge variant="secondary" className="text-xs py-0.5 px-2">
            //               {slot.duration}m
            //             </Badge>
            //           </div>
                      
            //           {available ? (
            //             <Button
            //               onClick={() => onBookSlot(interviewer, slot)}
            //               size="sm"
            //               className="talent-button-success h-7 px-3 text-xs"
            //             >
            //               Book
            //             </Button>
            //           ) : (
            //             <Badge variant="secondary" className="opacity-60 text-xs py-0.5 px-2">
            //               {slot.status}
            //             </Badge>
            //           )}
            //         </div>
                    
            //         {slot.meetingLink && (
            //           <div className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded border">
            //             <span className="font-medium">Meeting:</span> {slot.meetingLink}
            //           </div>
            //         )}
            //       </div>
            //     );
            //   })}
            // </div>
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
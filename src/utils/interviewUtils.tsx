import { Ban, Calendar, CheckCircle, Clock, Play, XCircle } from 'lucide-react';
import { JSX } from 'react';


export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    mock_pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    mock_started: "bg-blue-100 text-blue-800 border-blue-200",
    mock_completed: "bg-green-100 text-green-800 border-green-200",
    mock_failed: "bg-red-100 text-red-800 border-red-200",
    shortlisted: "bg-purple-100 text-purple-800 border-purple-200",
    final_scheduled: "bg-indigo-100 text-indigo-800 border-indigo-200",
    final_completed: "bg-gray-100 text-gray-800 border-gray-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

export const getStatusIcon = (status: string) => {
  const icons: Record<string, JSX.Element> = {
    mock_pending: <Clock className="w-4 h-4" />,
    mock_started: <Play className="w-4 h-4" />,
    mock_completed: <CheckCircle className="w-4 h-4" />,
    mock_failed: <Ban className="w-4 h-4" />,
    shortlisted: <CheckCircle className="w-4 h-4" />,
    final_scheduled: <Calendar className="w-4 h-4" />,
    final_completed: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
  };
  return icons[status] || <Clock className="w-4 h-4" />;
};


export const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

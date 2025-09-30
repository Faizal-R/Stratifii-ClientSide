import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, FileText, X, Hash, Clock } from "lucide-react";
import { IMessage, Note } from "@/types/IInterviewRoom";
import { useSocketStore } from "@/features/socket/Socket";

interface ChatPanelProps {
  messages: IMessage[];
  notes: Note[];
  onSendMessage: (text: string) => void;
  onSaveNote: (content: string) => void;
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  notes,
  onSendMessage,
  onSaveNote,
  onClose,
}) => {
  const { socket } = useSocketStore();
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "notes">("chat");
  const [noteContent, setNoteContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (notes.length > 0) {
      const latestNote = notes[notes.length - 1];
      if (latestNote.author === "remote") {
        setNoteContent(latestNote.content);
      }
    }
  }, [notes]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleSaveNote = () => {
    onSaveNote(noteContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNoteKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      handleSaveNote();
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-xl shadow-2xl z-40 flex flex-col border-l border-white/10">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-violet-900/20">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === "chat"
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
            {messages.length > 0 && (
              <span className="bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {messages.length > 99 ? "99+" : messages.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === "notes"
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Notes</span>
            {notes.length > 0 && (
              <span className="bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notes.length}
              </span>
            )}
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === "chat" ? (
          <>
            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4"
              style={{ maxHeight: "calc(100vh - 180px)" }}
            >
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 text-sm mt-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <p className="mb-2">No messages yet</p>
                  <p className="text-xs text-gray-500">
                    Start the conversation!
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message?.sender === socket.id
                        ? "justify-end"
                        : "justify-start"
                    } animate-fade-in`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-lg ${
                        message.sender === socket.id
                          ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                          : "bg-white/10 backdrop-blur-sm text-white border border-white/10"
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                      <div
                        className={`flex items-center space-x-1 mt-2 text-xs ${
                          message?.sender === socket.id
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-black/20 to-black/40">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Send a message to everyone..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  />
                  <Hash className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Enhanced Notes Editor */}
            <div className="flex-1 p-4">
              <div className="h-full relative">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  onKeyDown={handleNoteKeyDown}
                  placeholder="Take notes during the meeting... (Ctrl+S to save)"
                  className="w-full h-full resize-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 custom-scrollbar"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  {noteContent.length} characters
                </div>
              </div>
            </div>

            {/* Enhanced Notes Footer */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-black/20 to-black/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <FileText className="w-4 h-4" />
                  <span>Notes are shared with all participants</span>
                </div>
                <button
                  onClick={handleSaveNote}
                  disabled={!noteContent.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white text-sm rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Save Note
                </button>
              </div>

              {/* Saved notes count */}
              {notes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-gray-400 text-center">
                    {notes.length} note{notes.length !== 1 ? "s" : ""} saved
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

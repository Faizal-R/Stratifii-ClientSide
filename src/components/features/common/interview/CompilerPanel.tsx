"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Code, Play, X, Maximize2, Minimize2, Terminal } from "lucide-react";
import { InterviewService } from "@/services/InterviewService";
import { RiseLoader, SyncLoader } from "react-spinners";
import { languages } from "@/constants/dummyData";
import { useSocketStore } from "@/features/socket/Socket";
interface CompilerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const CompilerPanel: React.FC<CompilerPanelProps> = ({
  isOpen,
  onClose,
  roomId,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [code, setCode] = useState(`// Write your interview code here...
`);
  const { socket } = useSocketStore();
  const [isLoading, setIsLoading] = useState(false);

  const [output, setOutput] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(63);

  async function compileCode() {
    setIsLoading(true);
    try {
      const res = await InterviewService.compileAndRunCode(
        code,
        selectedLanguage
      );
      console.log(res);
      if (res.stdout) {
        setOutput(res.stdout);
      } else {
        setOutput(res.compile_output || res.stderr || "No output");
      }
      setActiveTab("output");
    } catch (error) {
      console.error("Error compiling code:", error);
      setOutput("Error compiling code");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCodeChange = (newValue: string | undefined) => {
    setCode(newValue || "");
    console.log(newValue)
    socket.emit("code:changes", {
      roomId,
      code: newValue || "",
    });
  };
  useEffect(() => {
    socket.on("receive:code:update", (newCode:string) => {
      console.log("Received code update:", newCode);
      setCode(newCode || "");
    });
    return () => {
      socket.off("receive:code:update");
    };
  }, [socket]);

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-500 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${isMaximized ? "w-full" : "w-[600px]"}`}
    >
      {/* Backdrop blur when maximized */}
      {isMaximized && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      )}

      <div
        className={`h-full bg-gradient-to-br from-gray-900 via-gray-800 to-violet-900/50 border-r border-violet-500/20 shadow-2xl relative ${
          isMaximized ? "rounded-none" : "rounded-r-2xl"
        }`}
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-900/50 to-purple-900/50 border-b border-violet-500/20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-violet-600/20 border border-violet-500/30">
              <Code className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Code Editor</h2>
              <p className="text-violet-300 text-sm">Interview Workspace</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              title={isMaximized ? "Minimize" : "Maximize"}
            >
              {isMaximized ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 border border-transparent transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Language Selector & Tabs */}
        <div className="flex items-center justify-between p-3 bg-black/30 border-b border-violet-500/10">
          <div className="flex items-center space-x-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(Number(e.target.value))}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-violet-500/30 focus:border-violet-400 focus:outline-none text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {activeTab === "editor" && (
              <button
                onClick={compileCode}
                className=" bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-1.5 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 min-w-[70px]"
              >
                <div className="flex items-center space-x-2">
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {/* Keep the text in place even when loading */}
                  <span className="font-medium">
                    {isLoading ? "Compiling" : "Compile"}
                  </span>
                </div>
              </button>
            )}
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "editor"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                activeTab === "output"
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Output</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="h-[calc(100%-140px)]">
          {activeTab === "editor" ? (
            <div className="h-full relative">
              <Editor
                height="100%"
                language={
                  languages
                    .find((l) => l.id === selectedLanguage)
                    ?.name.toLowerCase() || "javascript"
                }
                value={code}
                onChange={(value) => handleCodeChange(value)}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                  fontFamily:
                    '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  cursorStyle: "line",
                  wordWrap: "on",
                  folding: true,
                  lineNumbersMinChars: 3,
                  glyphMargin: false,
                  renderLineHighlight: "all",
                  selectOnLineNumbers: true,
                  smoothScrolling: true,
                }}
              />

              {/* Run Button */}
            </div>
          ) : (
            <div className="h-full bg-gray-900 p-4">
              <div className="h-full bg-black rounded-lg p-4 font-mono text-green-400 text-sm overflow-auto">
                <div className="mb-2 text-gray-400">
                  $ Running{" "}
                  {languages.find((l) => l.id === selectedLanguage)?.name}{" "}
                  code...
                </div>
                <div className="text-green-300">
                  Output will appear here when you run your code :
                </div>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompilerPanel;

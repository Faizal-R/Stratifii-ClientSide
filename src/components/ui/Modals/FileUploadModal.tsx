"use client";
import { Upload, X, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

interface FileUploadModalProps {
  setIsModalOpen: (state: boolean) => void;
  onComplete: (files: File[]) => void;

}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  setIsModalOpen,
  onComplete,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf"
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">
      <div className="bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 max-w-md w-full p-6">
      
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-violet-300 font-semibold">
            Upload Resume
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-violet-900 rounded-lg p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-violet-600 text-violet-200 px-4 py-2 rounded-md hover:bg-violet-700 transition-colors inline-block"
              >
                Select PDF Files
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Upload Candidates Resumes here to get started.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              ( Only PDF files are allowed)
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-violet-300">
              Uploaded Resumes ({files.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1 text-violet-300">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="group flex justify-between items-center border p-2 rounded-md text-sm relative border-violet-900 bg-violet-800/20 hover:bg-violet-950/30 transition-colors"
                >
                  <span className="truncate w-[130px]" title={file.name}>
                    {file.name}
                  </span>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        const fileURL = URL.createObjectURL(file);
                        window.open(fileURL, "_blank");
                      }}
                      className="text-violet-600 hover:text-violet-800"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Done Button */}
        <div className="mt-4 flex justify-end hover:cursor-pointer">
          <button
            onClick={() => onComplete(files)}
            className="border border-violet-900 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;

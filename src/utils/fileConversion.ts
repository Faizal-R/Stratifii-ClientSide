export const convertBlobUrlToFile = async (
  blobUrl: string | null
): Promise<File | null> => {
  
  if (!blobUrl) return null;

  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    return new File([blob], "converted-image.jpg", {
      type: blob.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Error converting blob URL to file:", error);
    return null;
  }
};

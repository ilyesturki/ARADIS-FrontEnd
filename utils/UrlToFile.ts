export const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string
): Promise<File> => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const blob = new Blob([buffer], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

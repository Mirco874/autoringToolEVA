import { saveAs } from "file-saver";
export const exportJsonFS = (jsonContent) => {
  const date = new Date();
  const fileName = date.toDateString().replace(/\s/g, '');;
  const jsonString=JSON.stringify(jsonContent);
  const blob = new Blob([jsonString], { type: "text/plain; charset=utf-8" });
  saveAs(blob, `${fileName}.json`);
};

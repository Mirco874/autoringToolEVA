import { useState } from "react";

export const useChapter = (initialChapters=[]) => {

  const [chapters, setChapters] = useState(initialChapters);

  const onAddChapter = (content) => {
    setChapters([...chapters, { content:content}]);
  };

  return{chapters,onAddChapter}

};

// const initialElements = {
//     chapters: [],
//     questions: [{ type: "multiple", question: {} }],
//   };

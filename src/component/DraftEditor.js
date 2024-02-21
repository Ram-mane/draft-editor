
import React from "react";
import "./DraftEditor.css";
import { Editor, EditorState, RichUtils ,convertFromRaw,convertToRaw} from "draft-js";

const DraftEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const handleChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    console.log("curr content "+content)
    const rawContentState = JSON.stringify(
      convertToRaw(content)
    );
    localStorage.setItem("content", rawContentState);
    console.log("Saved content:", rawContentState);
  };

  const data = localStorage.getItem("content");
  const data1 = convertFromRaw(data)
  console.log("data", data);

  return (
    <div className="myDraftEditor">
      <Editor
        editorState={editorState}
        onChange={handleChange}
        placeholder={"Enter your text here"}
      />
      <button onClick={handleSave}>Save</button>
      <div>
        {data1}
      </div>
    </div>
  );
};

export default DraftEditor;

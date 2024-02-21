import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './MyEditor.css'

const NewEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleBeforeInput = (chars, editorState) => {
  const currentBlock = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey());

  // Concatenate the current block text and the input characters
  const textSoFar = currentBlock.getText() + chars;

  if (textSoFar === '#' && currentBlock.getText() === '') {
    // Toggle the block type to 'header-one'
    const newState = RichUtils.toggleBlockType(editorState, 'header-one');

    // Update the editor state
    setEditorState(newState);

    // Indicate that the input was handled
    return 'handled';
  } else if (textSoFar === '*' && currentBlock.getText() === '') {
    // Toggle the inline style to 'BOLD'
    const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');

    // Update the editor state
    setEditorState(newState);

    // Indicate that the input was handled
    return 'handled';
  } else if (textSoFar === '**' && currentBlock.getText() === '') {
    // Toggle the block type to 'header-one'
    const newState = RichUtils.toggleBlockType(editorState, 'UNDERLINE');

    // Update the editor state
    setEditorState(newState);

    // Indicate that the input was handled
    return 'handled';
  }

  // Return 'not-handled' for other inputs
  return 'not-handled';
};


  

  return (
    <div className='myEditor'> 
      
      <div>
        <Editor
          editorState={editorState}
          handleBeforeInput={handleBeforeInput}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default NewEditor;

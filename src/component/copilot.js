import React, { useState } from 'react';
import { Editor, EditorState, Modifier, SelectionState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './MyEditor.css';


const CopilotEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleBeforeInput = (chars) => {
        const selection = editorState.getSelection();

        if (chars === ' ' && selection.getStartOffset() > 0) {
            const contentState = editorState.getCurrentContent();
            const block = contentState.getBlockForKey(selection.getStartKey());
            const charBefore = block.getText().charAt(selection.getStartOffset() - 1);

            switch (charBefore) {
                case '#':
                    setEditorState(handleHashHeading(contentState, selection));
                    break;
                case '*':
                    setEditorState(handleStarBold());
                    break;
                case '**':
                    setEditorState(handleDoubleStarRed());
                    break;
                case '***':
                    setEditorState(handleTripleStarUnderline(contentState, selection));
                    break;
                default:
                    break;
            }
        }

        return 'not-handled';
    };

    const handleReturn = () => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();

        const newContentState = Modifier.splitBlock(contentState, selection);

        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'split-block'
        );

        setEditorState(EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter()));

        return 'handled';
    };

    const handleChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleHashHeading = (contentState, selection) => {
        const newContentState = Modifier.replaceText(
            contentState,
            new SelectionState({
                anchorKey: selection.getStartKey(),
                anchorOffset: selection.getStartOffset() - 1,
                focusKey: selection.getStartKey(),
                focusOffset: selection.getStartOffset(),
            }),
            ''
        );

        return EditorState.push(
            editorState,
            Modifier.setBlockType(newContentState, selection, 'BOLD'),
            'insert-characters'
        );
    };

    const handleStarBold = () => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();

        const newContentState = Modifier.replaceText(
            contentState,
            new SelectionState({
                anchorKey: selection.getStartKey(),
                anchorOffset: selection.getStartOffset() - 1,
                focusKey: selection.getFocusKey(),
                focusOffset: selection.getStartOffset(),
            }),
            ''
        );

        const newEditorState = EditorState.push(
            editorState,
            RichUtils.toggleInlineStyle(
                EditorState.createWithContent(newContentState),
                'BOLD'
            ),
            'insert-characters'
        );

        setEditorState(newEditorState);
    };
    const handleDoubleStarRed = () => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();

        const newContentState = Modifier.replaceText(
            contentState,
            new SelectionState({
                anchorKey: selection.getStartKey(),
                anchorOffset: selection.getStartOffset() - 2,
                focusKey: selection.getStartKey(),
                focusOffset: selection.getStartOffset(),
            }),
            ''
        );

        const newEditorState = EditorState.push(
            editorState,
            RichUtils.toggleInlineStyle(
                EditorState.createWithContent(newContentState),
                'RED'
            ),
            'insert-characters'
        );

        return newEditorState;
    };

    const handleTripleStarUnderline = (contentState, selection) => {
        const newContentState = Modifier.replaceText(
            contentState,
            new SelectionState({
                anchorKey: selection.getStartKey(),
                anchorOffset: selection.getStartOffset() - 3,
                focusKey: selection.getStartKey(),
                focusOffset: selection.getStartOffset(),
            }),
            ''
        );

        return EditorState.push(
            editorState,
            RichUtils.toggleInlineStyle(
                Modifier.setInlineStyle(newContentState, selection, 'UNDERLINE'),
                'UNDERLINE'
            ),
            'insert-characters'
        );
    };
    // Rest of the code...

    return (
        <div className="myEditor">
            <Editor
                editorState={editorState}
                handleBeforeInput={handleBeforeInput}
                handleReturn={handleReturn}
                onChange={handleChange}
            />
        </div>
    );
};

export default CopilotEditor;


import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Question } from '../../models';
import { fileUploadService } from '../../services/fileUploadService';

interface RdwEditorProps {
  initRowData: Question;
  updateFormFieldValue: (...event: any[]) => void;
}

export default function RdwEditor({ updateFormFieldValue, initRowData }: RdwEditorProps) {
  const initState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initState);

  useEffect(() => {
    // Use [id] to response to data change caused by parent
    // otherwise, data change caused by self will cause pointer go to head (data => html => data, pointer information lost)
    // Use an object containing (id, title) to *guarantee* the data is newest
    const { contentBlocks, entityMap } = convertFromHTML(initRowData.title);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const newState = EditorState.createWithContent(contentState);
    setEditorState(newState);
  }, [initRowData.id]);

  function onEditorStateChange(state: EditorState): void {
    setEditorState(state);
    const rawHtml = draftToHtml(convertToRaw(state.getCurrentContent()));
    return updateFormFieldValue(rawHtml);
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{
        border: 'solid 1px lightgrey',
        padding: '5px',
      }}
      toolbar={{
        image: { uploadCallback: fileUploadService.uploadFile1 },
      }}
      localization={{
        locale: 'zh',
      }}
    />
  );
}

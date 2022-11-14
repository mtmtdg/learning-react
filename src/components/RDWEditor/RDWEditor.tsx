import { useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import prettier from 'prettier';
import htmlParser from 'prettier/parser-html';
import { fileUploadService } from '../../services/fileUploadService';

interface RDWEditorProps {}

export default function RDWEditor(props: RDWEditorProps) {
  const initState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initState);

  const rawHtml = useMemo(() => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  return (
    <>
      <h1>Editor</h1>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
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

      <h1>Value</h1>
      <div style={{ whiteSpace: 'pre-line' }}>
        {prettier.format(rawHtml, { parser: 'html', plugins: [htmlParser] })}
      </div>

      <h1>Result</h1>
      <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
    </>
  );
}

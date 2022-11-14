import { useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

interface RDWEditorProps {}

export default function RDWEditor(props: RDWEditorProps) {
  const initState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initState);

  const raw = useMemo(() => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        editorStyle={{
          border: 'solid 1px lightgrey',
          padding: '5px',
        }}
        localization={{
          locale: 'zh',
        }}
      />
      <div>{JSON.stringify(raw)}</div>
    </>
  );
}

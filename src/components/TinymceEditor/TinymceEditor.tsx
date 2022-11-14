import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

import { useMemo, useRef, useState } from 'react';

interface TinymceEditorProps {}

export default function TinymceEditor(props: TinymceEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [rawHtml, setRawHtml] = useState<string>();

  const fetchLatestContent = (e: any) => {
    editorRef.current && setRawHtml(editorRef.current?.getContent());
  };

  return (
    <>
      <h1>Editor</h1>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={fetchLatestContent}
      />

      <h1>Value</h1>
      <div style={{ whiteSpace: 'pre-line' }}>{rawHtml}</div>

      <h1>Result</h1>
      {editorRef.current && <div dangerouslySetInnerHTML={{ __html: rawHtml! }}></div>}
    </>
  );
}

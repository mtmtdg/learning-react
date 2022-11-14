// https://www.tiny.cloud/docs/configure/localization/
// https://www.tiny.cloud/docs/configure/localization/#usingthecommunitylanguagepacks
// download language package, unzip to public/tinymce/langs

// API content: https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/#toolbar
// button list:  https://www.tiny.cloud/docs/tinymce/6/available-toolbar-buttons/
// defaultValues: https://www.tiny.cloud/docs/tinymce/6/quickbars/
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

import { useRef, useState } from 'react';
import { fileUploadService } from '../../services/fileUploadService';

interface TinymceEditorProps {}

export default function TinymceEditor(props: TinymceEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [rawHtml, setRawHtml] = useState<string>('');

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
        init={{
          plugins: ['image'],
          file_picker_types: 'image',
          images_upload_handler: fileUploadService.tinyMCEUploadFile,
          language: 'zh-Hans',
        }}
      />

      <h1>Value</h1>
      <div style={{ whiteSpace: 'pre-line' }}>{rawHtml}</div>

      <h1>Result</h1>
      {editorRef.current && <div dangerouslySetInnerHTML={{ __html: rawHtml! }}></div>}
    </>
  );
}

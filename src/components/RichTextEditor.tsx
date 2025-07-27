import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your blog content with markdown...\n\n# Main Header\n## Sub Header\n### Smaller Header\n\n**Bold text** and *italic text*\n\n[Link text](https://example.com)\n\n- Bullet point\n- Another point",
  height = 400
}) => {
  return (
    <div className="w-full">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        data-color-mode="light"
        height={height}
        preview="edit"
        hideToolbar={false}
        textareaProps={{
          placeholder,
          style: {
            fontSize: 14,
            lineHeight: 1.6,
          }
        }}
        previewOptions={{
          rehypePlugins: [],
        }}
      />
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p><strong>Markdown Guide:</strong></p>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <code># Header 1</code> → Large header<br/>
            <code>## Header 2</code> → Medium header<br/>
            <code>### Header 3</code> → Small header
          </div>
          <div>
            <code>**Bold**</code> → <strong>Bold text</strong><br/>
            <code>*Italic*</code> → <em>Italic text</em><br/>
            <code>[Link](URL)</code> → Clickable link
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
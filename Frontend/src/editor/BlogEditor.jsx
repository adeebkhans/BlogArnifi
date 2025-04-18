import React, { useEffect } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from './MenuBar';

const coreExtensions = [StarterKit];

const BlogEditor = ({
  content,
  onChange,
  placeholder = 'Type here...',
  extensions = [],
  className = '',
  editorClassName = '',
  menuBarPosition = 'top',
  height = '400px'
}) => {
  const editor = useEditor({
    extensions: [
      ...coreExtensions,
      Placeholder.configure({ 
        placeholder,
        // Show placeholder even when editor is not focused
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      ...extensions
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-full cursor-text outline-none', // Ensure full height
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div 
      style={{ height }} 
      className={`bg-white border border-gray-300 rounded flex flex-col ${className}`}
    >
      {menuBarPosition === 'top' && <MenuBar editor={editor} />}

      <div className="h-full overflow-hidden">
        <div 
          className={`editor-content-wrapper h-full p-3 overflow-y-auto ${
            !editor ? 'rounded' : 
            menuBarPosition === 'top' ? 'rounded-b' : 'rounded-t'
          }`}
          onClick={() => editor?.commands.focus()}
          style={{ cursor: 'text' }} // Show text cursor
        >
          <EditorContent
            editor={editor}
            className={`h-full prose max-w-none focus:outline-none ${editorClassName}`}
          />
        </div>
      </div>

      {menuBarPosition === 'bottom' && <MenuBar editor={editor} />}

      {/* Add global styles for placeholder and editor */}
      <style jsx global>{`
        .ProseMirror p.is-empty:first-child::before {
          content: attr(data-placeholder);
          color: #999;
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror {
          min-height: 100%;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;
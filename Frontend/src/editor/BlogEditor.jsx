import React, { useEffect } from 'react'; 
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from './MenuBar';

// Core Tiptap extensions for editor functionality
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
  // Initialize the editor with the provided extensions and configurations
  const editor = useEditor({
    extensions: [
      ...coreExtensions,
      Placeholder.configure({ 
        placeholder,
        showOnlyWhenEditable: true,  // Only show placeholder when editor is editable
        showOnlyCurrent: false,      // Show the placeholder for the entire content
      }),
      ...extensions
    ],
    content: content || '',         // Set initial content or default to empty string
    onUpdate: ({ editor }) => {
      // Trigger the onChange callback with the HTML content on every update
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-full cursor-text outline-none', // Ensure full height and text cursor
      },
    },
  });

  // Update editor content when the content prop changes
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
      {/* Render menu bar at the top or bottom depending on the configuration */}
      {menuBarPosition === 'top' && <MenuBar editor={editor} />}

      <div className="h-full overflow-hidden">
        {/* Editor content area, focused on making the editor interactable */}
        <div 
          className={`editor-content-wrapper h-full p-3 overflow-y-auto ${
            !editor ? 'rounded' : 
            menuBarPosition === 'top' ? 'rounded-b' : 'rounded-t'
          }`}
          onClick={() => editor?.commands.focus()}  // Focus the editor on click
          style={{ cursor: 'text' }} // Ensure text cursor is visible
        >
          <EditorContent
            editor={editor}
            className={`h-full prose max-w-none focus:outline-none ${editorClassName}`}
          />
        </div>
      </div>

      {/* Render menu bar at the bottom if configured */}
      {menuBarPosition === 'bottom' && <MenuBar editor={editor} />}

      {/* Global styling for placeholder and editor behavior */}
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

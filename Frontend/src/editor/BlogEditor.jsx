import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";

import ToolbarPlugin from "./ToolbarPlugin"; // custom menu bar
import "./editor.css"; // you can style this

const theme = {
  // Customize classNames if you want
  paragraph: "editor-paragraph",
};

const BlogEditor = ({ content, onChange }) => {
  const initialConfig = {
    namespace: "BlogEditor",
    theme,
    onError: (error) => {
      console.error("Lexical error:", error);
    },
    editorState: () => {
      if (content) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(content, "text/html");
        return (editor) => {
          editor.update(() => {
            const root = editor.getRootElement();
            if (dom.body.innerHTML) {
              root.innerHTML = dom.body.innerHTML;
            }
          });
        };
      }
    },
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-md">
        <ToolbarPlugin />
        <div className="relative"> {/* Added a relative positioning container */}
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="p-3 min-h-[300px] focus:outline-none" />
            }
            placeholder={
              <div className="p-3 text-gray-400 absolute top-0 left-0 pointer-events-none">
                Write your blog content here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              const htmlString = $generateHtmlFromNodes(editor, null);
              onChange?.(htmlString);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
};

export default BlogEditor;
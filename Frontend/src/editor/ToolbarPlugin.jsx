import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  $getRoot,
} from "lexical";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaListUl,
  FaListOl,
  FaHeading,
} from "react-icons/fa";
import { $wrapNodes } from "@lexical/selection";
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const createHeading = (level) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(`h${level}`));
      }
    });
  };

  return (
    <div className="flex gap-2 p-2 border-b bg-gray-100 rounded-t">
      <button onClick={() => applyFormat("bold")}>
        <FaBold />
      </button>
      <button onClick={() => applyFormat("italic")}>
        <FaItalic />
      </button>
      <button onClick={() => applyFormat("underline")}>
        <FaUnderline />
      </button>
      <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
        <FaUndo />
      </button>
      <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        <FaRedo />
      </button>
      <button onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <FaListUl />
      </button>
      <button onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <FaListOl />
      </button>
      <button onClick={() => createHeading(1)}>
        <FaHeading /> <span className="text-xs ml-1">H1</span>
      </button>
      <button onClick={() => createHeading(2)}>
        <FaHeading /> <span className="text-xs ml-1">H2</span>
      </button>
    </div>
  );
};

export default ToolbarPlugin;
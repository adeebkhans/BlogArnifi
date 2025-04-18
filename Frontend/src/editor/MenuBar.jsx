import React from 'react';
import {
  FaBold, FaItalic, FaStrikethrough, FaHeading, FaListUl, FaListOl,
  FaQuoteLeft, FaRulerHorizontal, FaUndo, FaRedo
} from 'react-icons/fa'; // Using FontAwesome icons from react-icons

// Helper function to generate button classes (optional but cleaner)
const getButtonClass = (isActive = false) => {
  const baseClass = "p-2 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeClass = "bg-gray-300 text-black"; // Style for active buttons
  return `${baseClass} ${isActive ? activeClass : ''}`;
};


const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  // Define button groups for better visual structure (optional)
  const buttonGroups = [
    // Group 1: Basic Formatting
    [
      { action: () => editor.chain().focus().toggleBold().run(), icon: FaBold, name: 'bold', disabled: !editor.can().chain().focus().toggleBold().run() },
      { action: () => editor.chain().focus().toggleItalic().run(), icon: FaItalic, name: 'italic', disabled: !editor.can().chain().focus().toggleItalic().run() },
      { action: () => editor.chain().focus().toggleStrike().run(), icon: FaStrikethrough, name: 'strike', disabled: !editor.can().chain().focus().toggleStrike().run() },
    ],
    // Group 2: Headings (Example: H1, H2, H3)
    [
      { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), icon: () => <><FaHeading /><span className='text-xs'>1</span></>, name: 'heading', level: 1 },
      { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), icon: () => <><FaHeading /><span className='text-xs'>2</span></>, name: 'heading', level: 2 },
      { action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), icon: () => <><FaHeading /><span className='text-xs'>3</span></>, name: 'heading', level: 3 },
    ],
    // Group 3: Lists
    [
      { action: () => editor.chain().focus().toggleBulletList().run(), icon: FaListUl, name: 'bulletList' },
      { action: () => editor.chain().focus().toggleOrderedList().run(), icon: FaListOl, name: 'orderedList' },
    ],
    // Group 4: Block Elements
    [
       { action: () => editor.chain().focus().toggleBlockquote().run(), icon: FaQuoteLeft, name: 'blockquote' },
       { action: () => editor.chain().focus().setHorizontalRule().run(), icon: FaRulerHorizontal, name: 'horizontalRule' }, // Name added for consistency
    ],
     // Group 5: History
    [
       { action: () => editor.chain().focus().undo().run(), icon: FaUndo, name: 'undo', disabled: !editor.can().undo() },
       { action: () => editor.chain().focus().redo().run(), icon: FaRedo, name: 'redo', disabled: !editor.can().redo() },
    ]
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-300 p-2 mb-2 bg-gray-50 rounded-t">
      {buttonGroups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 && <div className="h-5 w-px bg-gray-300 mx-1"></div>} {/* Separator */}
          {group.map((button) => {
            const IconComponent = button.icon;
            // Check active state, considering heading levels
            const isActive = button.level
              ? editor.isActive(button.name, { level: button.level })
              : editor.isActive(button.name);

            return (
              <button
                key={button.name + (button.level || '')}
                type="button"
                onClick={button.action}
                disabled={button.disabled}
                className={getButtonClass(isActive)}
                title={button.name.charAt(0).toUpperCase() + button.name.slice(1)} // Basic tooltip
              >
                <IconComponent size="1em"/> {/* Render the icon component */}
              </button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuBar;


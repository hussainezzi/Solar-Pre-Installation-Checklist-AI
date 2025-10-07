
import React, { useState } from 'react';
import type { ChecklistItem } from '../types';

interface PreInstallationChecklistProps {
  items: ChecklistItem[];
  setItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  isLoading: boolean;
  aiActive: boolean;
}

const PreInstallationChecklist: React.FC<PreInstallationChecklistProps> = ({ items, setItems, isLoading, aiActive }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleToggle = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim() === '') return;
    const newItem: ChecklistItem = {
      id: Date.now(),
      text: newItemText.trim(),
      completed: false,
    };
    setItems(prev => [...prev, newItem]);
    setNewItemText('');
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Generating checklist...</div>;
  }

  return (
    <div className="space-y-4">
      {!aiActive && (
        <form onSubmit={handleAddItem} className="flex gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add a new checklist item"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm"
          />
          <button type="submit" className="bg-[#0056b3] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
            Add
          </button>
        </form>
      )}

      {items.length === 0 && (
         <p className="text-gray-500 italic text-center py-4">
           {aiActive ? "No checklist items generated." : "No checklist items added yet."}
        </p>
      )}

      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center bg-gray-50 p-3 rounded-md shadow-sm">
            <input
              type="checkbox"
              id={`item-${item.id}`}
              checked={item.completed}
              onChange={() => handleToggle(item.id)}
              className="h-5 w-5 rounded border-gray-300 text-[#0056b3] focus:ring-[#0056b3]"
            />
            <label
              htmlFor={`item-${item.id}`}
              className={`ml-3 block text-sm font-medium text-gray-700 ${item.completed ? 'line-through text-gray-500' : ''}`}
            >
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreInstallationChecklist;

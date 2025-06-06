import React from 'react';
import { Color } from '../types';
import ColorCard from './ColorCard';

interface ColorCollectionProps {
  colors: Color[];
  selectedColor: Color | null;
  onColorSelect: (color: Color) => void;
}

const ColorCollection: React.FC<ColorCollectionProps> = ({ 
  colors, 
  selectedColor, 
  onColorSelect 
}) => {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Color Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {colors.map((color) => (
          <ColorCard
            key={color.id}
            color={color}
            isSelected={selectedColor?.id === color.id}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200">
        <h3 className="font-semibold text-gray-800 mb-1 text-sm">How to Use:</h3>
        <ol className="text-xs text-gray-600 space-y-0.5">
          <li>1. Click a color to select it</li>
          <li>2. Click a wall in the room</li>
          <li>3. See the color applied instantly</li>
          <li>4. Try different combinations!</li>
        </ol>
      </div>
    </div>
  );
};

export default ColorCollection;
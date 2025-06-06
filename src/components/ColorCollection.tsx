import React from 'react';
import { Color } from '../types';
import ColorCard from './ColorCard';
import { Palette } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-fit">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <Palette className="w-6 h-6" />
          <div>
            <h2 className="text-2xl font-bold">Color Collection</h2>
            <p className="text-purple-100">Click any color to select it</p>
          </div>
        </div>
      </div>

      {/* Color Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
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
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">How to Use:</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Click a color to select it</li>
            <li>2. Click a wall in the room</li>
            <li>3. See the color applied instantly</li>
            <li>4. Try different combinations!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ColorCollection;
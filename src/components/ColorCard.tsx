import React from 'react';
import { Color } from '../types';
import { Check } from 'lucide-react';

interface ColorCardProps {
  color: Color;
  isSelected: boolean;
  onClick: () => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-1 shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200">
        <div 
          className="h-16 w-full relative"
          style={{ backgroundColor: color.hex }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-0.5 shadow-md">
                <Check className="w-3 h-3 text-blue-600" />
              </div>
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className={`font-medium text-xs mb-0.5 transition-colors duration-200 ${
            isSelected ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
          }`}>
            {color.name}
          </h3>
          <p className="text-[10px] text-gray-600 font-mono">
            {color.code}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
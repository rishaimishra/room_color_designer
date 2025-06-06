import React, { useState } from 'react';
import { RoomColors, WallType } from '../types';
import { Palette, RotateCcw } from 'lucide-react';

interface RoomVisualizerProps {
  roomColors: RoomColors;
  selectedColorName: string;
  onWallColorChange: (wallType: WallType, color: string) => void;
  selectedColor: string;
}

const RoomVisualizer: React.FC<RoomVisualizerProps> = ({ 
  roomColors, 
  selectedColorName, 
  onWallColorChange,
  selectedColor 
}) => {
  const [selectedWall, setSelectedWall] = useState<WallType | null>(null);
  const [hoveredWall, setHoveredWall] = useState<WallType | null>(null);

  const handleWallClick = (wallType: WallType) => {
    setSelectedWall(wallType);
    if (selectedColor) {
      onWallColorChange(wallType, selectedColor);
    }
  };

  const getWallStyle = (wallType: WallType) => {
    const isSelected = selectedWall === wallType;
    const isHovered = hoveredWall === wallType;
    
    return {
      cursor: 'pointer',
      stroke: isSelected ? '#3B82F6' : isHovered ? '#60A5FA' : '#E5E7EB',
      strokeWidth: isSelected ? '4' : isHovered ? '3' : '2',
      filter: isHovered ? 'brightness(1.05)' : 'none',
      transition: 'all 0.3s ease'
    };
  };

  const wallNames = {
    ceiling: 'Ceiling',
    frontWall: 'Front Wall',
    sideWall: 'Side Wall'
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Palette className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">Room Preview</h2>
              <p className="text-blue-100">
                Selected: <span className="font-semibold">{selectedColorName}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedWall(null)}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>
      </div>

      {/* Room Visualization */}
      <div className="p-8">
        <div className="relative w-full mx-auto" style={{ maxWidth: '800px' }}>
          <svg 
            viewBox="0 0 800 600" 
            className="w-full h-auto drop-shadow-2xl"
            style={{ minHeight: '400px' }}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#F3F4F6', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#E5E7EB', stopOpacity: 1}} />
              </linearGradient>
              
              <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgba(0,0,0,0.1)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgba(0,0,0,0)', stopOpacity: 1}} />
              </linearGradient>

              <linearGradient id="lightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgba(255,255,255,0.3)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgba(255,255,255,0)', stopOpacity: 1}} />
              </linearGradient>

              <filter id="dropShadow">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Floor */}
            <path 
              d="M 100 500 L 700 500 L 760 560 L 40 560 Z" 
              fill="url(#floorGradient)" 
              stroke="#D1D5DB" 
              strokeWidth="2"
            />
            
            {/* Ceiling */}
            <path 
              d="M 100 100 L 700 100 L 760 40 L 40 40 Z" 
              fill={roomColors.ceiling}
              {...getWallStyle('ceiling')}
              onMouseEnter={() => setHoveredWall('ceiling')}
              onMouseLeave={() => setHoveredWall(null)}
              onClick={() => handleWallClick('ceiling')}
            />
            
            {/* Front Wall */}
            <rect 
              x="100" 
              y="100" 
              width="600" 
              height="400" 
              fill={roomColors.frontWall}
              {...getWallStyle('frontWall')}
              onMouseEnter={() => setHoveredWall('frontWall')}
              onMouseLeave={() => setHoveredWall(null)}
              onClick={() => handleWallClick('frontWall')}
            />
            
            {/* Side Wall (Right) */}
            <path 
              d="M 700 100 L 760 40 L 760 560 L 700 500 Z" 
              fill={roomColors.sideWall}
              {...getWallStyle('sideWall')}
              onMouseEnter={() => setHoveredWall('sideWall')}
              onMouseLeave={() => setHoveredWall(null)}
              onClick={() => handleWallClick('sideWall')}
            />

            {/* Large Window */}
            <rect 
              x="150" 
              y="150" 
              width="200" 
              height="150" 
              fill="#F0F9FF" 
              stroke="#3B82F6" 
              strokeWidth="4"
              rx="8"
              filter="url(#dropShadow)"
            />
            <line x1="250" y1="150" x2="250" y2="300" stroke="#3B82F6" strokeWidth="3"/>
            <line x1="150" y1="225" x2="350" y2="225" stroke="#3B82F6" strokeWidth="3"/>
            
            {/* Window Curtains */}
            <rect x="130" y="140" width="30" height="170" fill="#E0E7FF" rx="4"/>
            <rect x="360" y="140" width="30" height="170" fill="#E0E7FF" rx="4"/>

            {/* Large Sofa */}
            <rect 
              x="400" 
              y="350" 
              width="250" 
              height="80" 
              fill="#8B5CF6" 
              rx="15"
              filter="url(#dropShadow)"
            />
            <rect 
              x="380" 
              y="330" 
              width="290" 
              height="30" 
              fill="#7C3AED" 
              rx="8"
            />
            
            {/* Sofa Pillows */}
            <circle cx="450" cy="370" r="20" fill="#A78BFA"/>
            <circle cx="520" cy="370" r="20" fill="#C4B5FD"/>
            <circle cx="590" cy="370" r="20" fill="#A78BFA"/>

            {/* Coffee Table */}
            <ellipse 
              cx="500" 
              cy="450" 
              rx="80" 
              ry="30" 
              fill="#92400E"
              filter="url(#dropShadow)"
            />
            <ellipse cx="500" cy="445" rx="75" ry="25" fill="#A16207"/>

            {/* Side Table */}
            <rect x="150" y="400" width="60" height="60" fill="#92400E" rx="8" filter="url(#dropShadow)"/>
            <rect x="155" y="395" width="50" height="50" fill="#A16207" rx="6"/>

            {/* Picture Frames */}
            <rect 
              x="450" 
              y="180" 
              width="100" 
              height="80" 
              fill="#F9FAFB" 
              stroke="#6B7280" 
              strokeWidth="4"
              rx="4"
              filter="url(#dropShadow)"
            />
            <rect 
              x="580" 
              y="200" 
              width="80" 
              height="60" 
              fill="#F9FAFB" 
              stroke="#6B7280" 
              strokeWidth="4"
              rx="4"
              filter="url(#dropShadow)"
            />

            {/* Large Plant */}
            <ellipse cx="650" cy="480" rx="30" ry="15" fill="#92400E"/>
            <path d="M 650 480 Q 635 450 625 420 Q 650 440 665 410 Q 655 440 675 450 Q 650 460 680 470" fill="#10B981"/>
            <path d="M 650 480 Q 620 460 610 430 Q 640 450 670 420 Q 660 450 690 460" fill="#059669"/>

            {/* Floor Lamp */}
            <line x1="200" y1="400" x2="200" y2="320" stroke="#6B7280" strokeWidth="6"/>
            <ellipse cx="200" cy="310" rx="40" ry="15" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
            <circle cx="200" cy="460" r="15" fill="#6B7280"/>

            {/* Ceiling Light */}
            <circle cx="400" cy="80" r="25" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3"/>
            <circle cx="400" cy="80" r="15" fill="#FBBF24"/>

            {/* Rug */}
            <ellipse cx="500" cy="470" rx="120" ry="40" fill="#DC2626" opacity="0.8"/>
            <ellipse cx="500" cy="470" rx="100" ry="30" fill="#EF4444" opacity="0.6"/>

            {/* Wall Art Details */}
            <rect x="460" y="190" width="80" height="60" fill="#E5E7EB"/>
            <rect x="590" y="210" width="60" height="40" fill="#E5E7EB"/>

            {/* Lighting Effects */}
            <rect 
              x="100" 
              y="100" 
              width="600" 
              height="400" 
              fill="url(#lightGradient)" 
              opacity="0.4"
              pointerEvents="none"
            />

            {/* Ambient Shadows */}
            <rect 
              x="100" 
              y="100" 
              width="600" 
              height="400" 
              fill="url(#shadowGradient)" 
              opacity="0.2"
              pointerEvents="none"
            />
          </svg>
        </div>
      </div>

      {/* Wall Selection Info */}
      <div className="px-8 pb-8 space-y-4">
        {selectedWall && (
          <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-lg font-semibold text-blue-800">
              Selected: {wallNames[selectedWall]}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Click a color from the collection to apply it to this wall
            </p>
          </div>
        )}
        
        {hoveredWall && !selectedWall && (
          <div className="text-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <p className="text-lg font-semibold text-gray-700">
              Hover: {wallNames[hoveredWall]}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Click to select this wall
            </p>
          </div>
        )}
        
        {/* Current Wall Colors */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div 
              className="w-12 h-12 rounded-lg mx-auto mb-2 border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: roomColors.ceiling }}
            ></div>
            <span className="text-sm font-medium text-gray-700">Ceiling</span>
            <p className="text-xs text-gray-500 mt-1">{roomColors.ceiling}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div 
              className="w-12 h-12 rounded-lg mx-auto mb-2 border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: roomColors.frontWall }}
            ></div>
            <span className="text-sm font-medium text-gray-700">Front Wall</span>
            <p className="text-xs text-gray-500 mt-1">{roomColors.frontWall}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div 
              className="w-12 h-12 rounded-lg mx-auto mb-2 border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: roomColors.sideWall }}
            ></div>
            <span className="text-sm font-medium text-gray-700">Side Wall</span>
            <p className="text-xs text-gray-500 mt-1">{roomColors.sideWall}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomVisualizer;
import React, { useState, useCallback } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import SearchInput from './components/SearchInput';
import ColorCollection from './components/ColorCollection';
import RoomVisualizer from './components/RoomVisualizer';
import { Color, RoomColors, WallType } from './types';
import { findColorByCode, getRelatedColors } from './data/colorCollection';

function App() {
  const [searchResults, setSearchResults] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultRoomColors: RoomColors = {
    ceiling: '#FFFFFF',
    frontWall: '#F8F9FA',
    sideWall: '#FEF3C7'
  };

  const [roomColors, setRoomColors] = useState<RoomColors>(defaultRoomColors);

  const handleSearch = useCallback(async (code: string) => {
    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundColor = findColorByCode(code);
    
    if (foundColor) {
      const related = getRelatedColors(foundColor);
      const allColors = [foundColor, ...related];
      setSearchResults(allColors);
      setSelectedColor(foundColor);
    } else {
      setSearchResults([]);
      setSelectedColor(null);
    }
    
    setIsLoading(false);
  }, []);

  const handleColorSelect = useCallback((color: Color) => {
    setSelectedColor(color);
  }, []);

  const handleWallColorChange = useCallback((wallType: WallType, color: string) => {
    setRoomColors(prev => ({
      ...prev,
      [wallType]: color
    }));
  }, []);

  const handleReset = () => {
    setSearchResults([]);
    setSelectedColor(null);
    setRoomColors(defaultRoomColors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Room Color Designer
              </h1>
            </div>
            
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Search Bar - Made more compact */}
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Color Search</h2>
              {isLoading && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Searching...</span>
                </div>
              )}
            </div>
            <SearchInput onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Room Visualizer - Full width */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <RoomVisualizer
              roomColors={roomColors}
              selectedColorName={selectedColor?.name || 'Default'}
              onWallColorChange={handleWallColorChange}
              selectedColor={selectedColor?.hex || '#F3F4F6'}
            />
          </div>
          
          {/* Color Collection - Below Room Visualizer */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Color Collection</h2>
            <ColorCollection
              colors={searchResults}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2 text-lg">© 2025 Room Color Designer. Transform your space with perfect colors.</p>
            <p className="text-sm">Professional room visualization and color design tool</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
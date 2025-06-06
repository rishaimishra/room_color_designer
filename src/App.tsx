import React, { useState, useCallback } from 'react';
import { Palette, Heart, ArrowLeft, Home } from 'lucide-react';
import SearchInput from './components/SearchInput';
import ColorCollection from './components/ColorCollection';
import RoomVisualizer from './components/RoomVisualizer';
import { Color, RoomColors, WallType } from './types';
import { findColorByCode, getRelatedColors } from './data/colorCollection';

function App() {
  const [searchResults, setSearchResults] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const defaultRoomColors: RoomColors = {
    ceiling: '#FFFFFF',
    frontWall: '#F8F9FA',
    sideWall: '#FEF3C7'
  };

  const [roomColors, setRoomColors] = useState<RoomColors>(defaultRoomColors);

  const handleSearch = useCallback(async (code: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
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
    setHasSearched(false);
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
            
            {hasSearched && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>New Search</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!hasSearched ? (
          /* Welcome Screen */
          <div className="text-center max-w-4xl mx-auto py-12">
            <div className="mb-12">
              <div className="inline-flex p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 shadow-xl">
                <Palette className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Design Your Perfect Room
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                Enter a color code to explore beautiful shades and see how they transform your living space. 
                Click on walls to apply different colors and create your ideal room design.
              </p>
            </div>

            <div className="mb-16">
              <SearchInput onSearch={handleSearch} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Search Colors</h3>
                <p className="text-gray-600">Enter any color code to find matching shades and variations</p>
              </div>
              
              <div className="text-center p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Visualize</h3>
                <p className="text-gray-600">See how colors look on walls in a realistic room setting</p>
              </div>
              
              <div className="text-center p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Design & Apply</h3>
                <p className="text-gray-600">Click walls and colors to create your perfect room design</p>
              </div>
            </div>
          </div>
        ) : (
          /* Single Page Layout */
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Color Search</h2>
                {isLoading && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Searching...</span>
                  </div>
                )}
              </div>
              <SearchInput onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Room Visualizer - Takes up 2 columns */}
                <div className="xl:col-span-2">
                  <RoomVisualizer
                    roomColors={roomColors}
                    selectedColorName={selectedColor?.name || 'Default'}
                    onWallColorChange={handleWallColorChange}
                    selectedColor={selectedColor?.hex || '#F3F4F6'}
                  />
                </div>
                
                {/* Color Collection - Takes up 1 column */}
                <div className="xl:col-span-1">
                  <ColorCollection
                    colors={searchResults}
                    selectedColor={selectedColor}
                    onColorSelect={handleColorSelect}
                  />
                </div>
              </div>
            ) : !isLoading && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-8xl mb-6">🎨</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Color Not Found</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  We couldn't find a color with that code. Try searching for 9770, 8801, or 7701.
                </p>
              </div>
            )}
          </div>
        )}
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
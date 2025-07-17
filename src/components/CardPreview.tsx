
import React, { forwardRef } from 'react';

interface CardData {
  name: string;
  image: string | null;
  hp: number;
  type: string;
  move1: {
    name: string;
    damage: string;
    description: string;
  };
  move2: {
    name: string;
    damage: string;
    description: string;
  };
}

interface CardPreviewProps {
  cardData: CardData;
}

const typeColors: { [key: string]: string } = {
  Normal: 'bg-gray-400',
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-400',
  Grass: 'bg-green-500',
  Ice: 'bg-cyan-300',
  Fighting: 'bg-red-700',
  Poison: 'bg-purple-500',
  Ground: 'bg-yellow-600',
  Flying: 'bg-indigo-400',
  Psychic: 'bg-pink-500',
  Bug: 'bg-green-400',
  Rock: 'bg-yellow-800',
  Ghost: 'bg-purple-700',
  Dragon: 'bg-indigo-700',
  Dark: 'bg-gray-800',
  Steel: 'bg-gray-500',
  Fairy: 'bg-pink-300'
};

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ cardData }, ref) => {
    const typeColor = typeColors[cardData.type] || 'bg-gray-400';

    return (
      <div className="flex justify-center">
        <div
          ref={ref}
          className="w-80 h-[440px] bg-gradient-to-b from-yellow-200 via-white to-yellow-100 rounded-2xl shadow-2xl border-4 border-yellow-400 relative overflow-hidden"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {/* Header */}
          <div className="relative p-4 pb-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {cardData.name || 'Your Pokémon'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">HP</span>
                  <span className="text-lg font-bold text-red-600">{cardData.hp}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${typeColor}`}>
                {cardData.type}
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="mx-4 mb-3">
            <div className="h-44 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg border-2 border-blue-200 overflow-hidden relative">
              {cardData.image ? (
                <img
                  src={cardData.image}
                  alt={cardData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📸</span>
                    </div>
                    <p className="text-sm">Upload an image</p>
                  </div>
                </div>
              )}
              
              {/* Decorative elements */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Moves Section */}
          <div className="px-4 space-y-2">
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-gray-800">
                  {cardData.move1.name || 'Move 1'}
                </span>
                <span className="font-bold text-sm text-red-600">
                  {cardData.move1.damage}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-tight">
                {cardData.move1.description || 'A basic attack move.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-gray-800">
                  {cardData.move2.name || 'Move 2'}
                </span>
                <span className="font-bold text-sm text-red-600">
                  {cardData.move2.damage}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-tight">
                {cardData.move2.description || 'A more powerful attack move.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center text-xs text-gray-500">
            <span>Custom Card</span>
            <span>★ Rare</span>
          </div>

          {/* Decorative border effects */}
          <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300 pointer-events-none"></div>
        </div>
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';

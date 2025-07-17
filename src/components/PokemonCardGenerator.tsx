
import React, { useState, useRef } from 'react';
import { ImageUpload } from './ImageUpload';
import { CardForm } from './CardForm';
import { CardPreview } from './CardPreview';
import { downloadCard } from '../utils/cardGenerator';
import { Button } from '@/components/ui/button';
import { Download, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

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

export const PokemonCardGenerator = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: '',
    image: null,
    hp: 100,
    type: 'Normal',
    move1: {
      name: '',
      damage: '20',
      description: 'A basic attack move.'
    },
    move2: {
      name: '',
      damage: '40',
      description: 'A more powerful attack move.'
    }
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (imageUrl: string) => {
    setCardData(prev => ({ ...prev, image: imageUrl }));
    toast.success('Image uploaded successfully!');
  };

  const handleFormChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCardData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CardData],
          [child]: value
        }
      }));
    } else {
      setCardData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleDownload = async () => {
    if (!cardData.image || !cardData.name) {
      toast.error('Please upload an image and enter a Pokémon name first!');
      return;
    }

    try {
      await downloadCard(cardData, cardRef.current);
      toast.success('Card downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download card. Please try again.');
    }
  };

  const generateRandomStats = () => {
    const types = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Fighting', 'Dark', 'Steel'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomHp = Math.floor(Math.random() * 100) + 50;
    
    setCardData(prev => ({
      ...prev,
      type: randomType,
      hp: randomHp,
      move1: {
        ...prev.move1,
        damage: String(Math.floor(Math.random() * 30) + 10)
      },
      move2: {
        ...prev.move2,
        damage: String(Math.floor(Math.random() * 50) + 30)
      }
    }));
    
    toast.success('Random stats generated!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500 mb-4">
            Pokémon Card Creator
          </h1>
          
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                Upload Your Image
              </h2>
              <ImageUpload onImageUpload={handleImageUpload} currentImage={cardData.image} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                 Customize Your Pokémon
              </h2>
              <CardForm cardData={cardData} onChange={handleFormChange} />
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                 Card Preview
              </h2>
              <CardPreview ref={cardRef} cardData={cardData} />
              
              <div className="mt-6">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Your Pokémon Card
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

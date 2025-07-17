
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

interface CardData {
  name: string;
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

interface CardFormProps {
  cardData: CardData;
  onChange: (field: string, value: any) => void;
}

const pokemonTypes = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

export const CardForm: React.FC<CardFormProps> = ({ cardData, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Pokémon Name *
          </Label>
          <Input
            id="name"
            value={cardData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Enter Pokémon name..."
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">
              Type
            </Label>
            <Select value={cardData.type} onValueChange={(value) => onChange('type', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pokemonTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              HP: {cardData.hp}
            </Label>
            <div className="mt-2">
              <Slider
                value={[cardData.hp]}
                onValueChange={(value) => onChange('hp', value[0])}
                max={200}
                min={10}
                step={10}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Moves */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Moves
        </h3>
        
        {/* Move 1 */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-gray-700">Move 1</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-600">Move Name</Label>
              <Input
                value={cardData.move1.name}
                onChange={(e) => onChange('move1.name', e.target.value)}
                placeholder="Quick Attack"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-600">Damage</Label>
              <Input
                value={cardData.move1.damage}
                onChange={(e) => onChange('move1.damage', e.target.value)}
                placeholder="20"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-600">Description</Label>
            <Textarea
              value={cardData.move1.description}
              onChange={(e) => onChange('move1.description', e.target.value)}
              placeholder="A swift attack that rarely misses."
              className="mt-1 h-20"
            />
          </div>
        </div>

        {/* Move 2 */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-gray-700">Move 2</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-600">Move Name</Label>
              <Input
                value={cardData.move2.name}
                onChange={(e) => onChange('move2.name', e.target.value)}
                placeholder="Power Strike"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-600">Damage</Label>
              <Input
                value={cardData.move2.damage}
                onChange={(e) => onChange('move2.damage', e.target.value)}
                placeholder="40"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-600">Description</Label>
            <Textarea
              value={cardData.move2.description}
              onChange={(e) => onChange('move2.description', e.target.value)}
              placeholder="A powerful attack that deals massive damage."
              className="mt-1 h-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

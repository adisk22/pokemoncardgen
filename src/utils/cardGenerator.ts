
import html2canvas from 'html2canvas';

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

export const downloadCard = async (cardData: CardData, cardElement: HTMLElement | null) => {
  if (!cardElement) {
    throw new Error('Card element not found');
  }

  try {
    // Generate canvas from the card element
    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: cardElement.offsetWidth,
      height: cardElement.offsetHeight,
    });

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to generate image');
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cardData.name || 'pokemon-card'}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);

  } catch (error) {
    console.error('Error generating card:', error);
    throw new Error('Failed to generate card image');
  }
};

export const generateCardCanvas = async (cardData: CardData): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Set canvas size (trading card proportions)
  canvas.width = 320;
  canvas.height = 440;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#fef3c7');
  gradient.addColorStop(0.5, '#ffffff');
  gradient.addColorStop(1, '#fef3c7');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  // Add text and other elements
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(cardData.name || 'Your Pokémon', 20, 40);

  // HP
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#dc2626';
  ctx.fillText(`HP ${cardData.hp}`, canvas.width - 80, 40);

  // Type
  ctx.font = '12px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(canvas.width - 100, 50, 80, 20);
  ctx.fillStyle = '#1f2937';
  ctx.fillText(cardData.type, canvas.width - 95, 63);

  return canvas;
};

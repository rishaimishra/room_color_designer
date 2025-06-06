import { Color } from '../types';

export const colorCollection: Color[] = [
  // Green Collection - Pale Peppermint Series
  {
    id: '9770',
    name: 'Pale Peppermint-N',
    code: '9770',
    hex: '#C8E6C9',
    category: 'green',
    relatedColors: ['9771', '9772', '9773', '9774', '9775', '9776']
  },
  {
    id: '9771',
    name: 'Fresh Celery-N',
    code: '9771',
    hex: '#A5D6A7',
    category: 'green',
    relatedColors: ['9770', '9772', '9773', '9774', '9775', '9776']
  },
  {
    id: '9772',
    name: 'Palm Meadow-N',
    code: '9772',
    hex: '#81C784',
    category: 'green',
    relatedColors: ['9770', '9771', '9773', '9774', '9775', '9776']
  },
  {
    id: '9773',
    name: 'Matcha Muffin-N',
    code: '9773',
    hex: '#66BB6A',
    category: 'green',
    relatedColors: ['9770', '9771', '9772', '9774', '9775', '9776']
  },
  {
    id: '9774',
    name: 'Lush Tree Tops-N',
    code: '9774',
    hex: '#4CAF50',
    category: 'green',
    relatedColors: ['9770', '9771', '9772', '9773', '9775', '9776']
  },
  {
    id: '9775',
    name: 'Tulsi-N',
    code: '9775',
    hex: '#43A047',
    category: 'green',
    relatedColors: ['9770', '9771', '9772', '9773', '9774', '9776']
  },
  {
    id: '9776',
    name: 'Turtle Cove-N',
    code: '9776',
    hex: '#388E3C',
    category: 'green',
    relatedColors: ['9770', '9771', '9772', '9773', '9774', '9775']
  },
  
  // Blue Collection
  {
    id: '8801',
    name: 'Cloud Nine-N',
    code: '8801',
    hex: '#E3F2FD',
    category: 'blue',
    relatedColors: ['8802', '8803', '8804', '8805', '8806']
  },
  {
    id: '8802',
    name: 'Sky Whisper-N',
    code: '8802',
    hex: '#BBDEFB',
    category: 'blue',
    relatedColors: ['8801', '8803', '8804', '8805', '8806']
  },
  {
    id: '8803',
    name: 'Ocean Breeze-N',
    code: '8803',
    hex: '#90CAF9',
    category: 'blue',
    relatedColors: ['8801', '8802', '8804', '8805', '8806']
  },
  {
    id: '8804',
    name: 'Coastal Blue-N',
    code: '8804',
    hex: '#64B5F6',
    category: 'blue',
    relatedColors: ['8801', '8802', '8803', '8805', '8806']
  },
  {
    id: '8805',
    name: 'Deep Waters-N',
    code: '8805',
    hex: '#42A5F5',
    category: 'blue',
    relatedColors: ['8801', '8802', '8803', '8804', '8806']
  },
  {
    id: '8806',
    name: 'Navy Dreams-N',
    code: '8806',
    hex: '#2196F3',
    category: 'blue',
    relatedColors: ['8801', '8802', '8803', '8804', '8805']
  },

  // Warm Collection
  {
    id: '7701',
    name: 'Sunset Glow-N',
    code: '7701',
    hex: '#FFF3E0',
    category: 'orange',
    relatedColors: ['7702', '7703', '7704', '7705']
  },
  {
    id: '7702',
    name: 'Peach Sorbet-N',
    code: '7702',
    hex: '#FFE0B2',
    category: 'orange',
    relatedColors: ['7701', '7703', '7704', '7705']
  },
  {
    id: '7703',
    name: 'Warm Amber-N',
    code: '7703',
    hex: '#FFCC80',
    category: 'orange',
    relatedColors: ['7701', '7702', '7704', '7705']
  },
  {
    id: '7704',
    name: 'Burnt Orange-N',
    code: '7704',
    hex: '#FFB74D',
    category: 'orange',
    relatedColors: ['7701', '7702', '7703', '7705']
  },
  {
    id: '7705',
    name: 'Copper Glow-N',
    code: '7705',
    hex: '#FFA726',
    category: 'orange',
    relatedColors: ['7701', '7702', '7703', '7704']
  }
];

export const findColorByCode = (code: string): Color | undefined => {
  return colorCollection.find(color => color.code === code);
};

export const getRelatedColors = (color: Color): Color[] => {
  if (!color.relatedColors) return [];
  return color.relatedColors.map(code => findColorByCode(code)).filter(Boolean) as Color[];
};
import all from '../assets/icons/all.svg';
import beverages from '../assets/icons/beverages.svg';
import bread from '../assets/icons/bread.svg';
import dairy from '../assets/icons/dairy.svg';
import meat from '../assets/icons/meat.svg';
import other from '../assets/icons/other.svg';
import pasta from '../assets/icons/pasta.svg';
import spieces from '../assets/icons/spieces.svg';
import sweets from '../assets/icons/sweets.svg';
import vegetables from '../assets/icons/vegetables.svg';

export const units = [
  {
    translationKey: 'GLOBAL.UNIT.PIECE',
    name: 'piece',
  },
  {
    translationKey: 'GLOBAL.UNIT.LITER',
    name: 'liter',
  },
  {
    translationKey: 'GLOBAL.UNIT.KILOGRAM',
    name: 'kilogram',
  },
];

export const categories = [
  {
    id: 'all',
    translationKey: 'INVENTORY.CATEGORIES.ALL',
    name: 'all',
    icon: all,
  },
  {
    id: 'beverages',
    translationKey: 'INVENTORY.CATEGORIES.BEVERAGES',
    name: 'beverages',
    icon: beverages,
  },
  {
    id: 'baking',
    translationKey: 'INVENTORY.CATEGORIES.BAKING',
    name: 'baking',
    icon: bread,
  },
  {
    id: 'dairy',
    translationKey: 'INVENTORY.CATEGORIES.DAIRY',
    name: 'dairy',
    icon: dairy,
  },
  {
    id: 'meatFishesSeafood',
    translationKey: 'INVENTORY.CATEGORIES.MEAT_FISHES_SEAFOOD',
    name: 'meatFishesSeafood',
    icon: meat,
  },
  {
    id: 'pasta',
    translationKey: 'INVENTORY.CATEGORIES.PASTA',
    name: 'pasta',
    icon: pasta,
  },
  {
    id: 'spices',
    translationKey: 'INVENTORY.CATEGORIES.SPICES',
    name: 'spices',
    icon: spieces,
  },
  {
    id: 'sweetsAndSnacks',
    translationKey: 'INVENTORY.CATEGORIES.SWEETS_AND_SNACKS',
    name: 'sweetsAndSnacks',
    icon: sweets,
  },
  {
    id: 'vegetablesAndFruits',
    translationKey: 'INVENTORY.CATEGORIES.VEGETABLES_AND_FRUITS',
    name: 'vegetablesAndFruits',
    icon: vegetables,
  },
  {
    id: 'others',
    translationKey: 'INVENTORY.CATEGORIES.OTHERS',
    name: 'others',
    icon: other,
  },
];

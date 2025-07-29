export interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  images: string[];
  distance: number;
}

export const NAMES: string[] = ['Emma', 'Alex', 'Sophia', 'Liam', 'Noah', 'Olivia', 'Mason', 'Elijah', 'Ava', 'Lucas'];
export const AGE: number | undefined = undefined;
export const INTERESTS: string[] = [
  'Adventure seeker 🌟',
  'Coffee enthusiast ☕',
  'Dog lover 🐕',
  'Artist 🎨',
  'Yoga instructor 🧘‍♀️',
  'Musician 🎸',
  'Foodie 🍕',
  'Travel blogger ✈️',
  'Beach lover 🏖️',
  'Fitness enthusiast 💪',
  'Book lover 📚',
  'Wine enthusiast 🍷',
  'Tech entrepreneur 💻',
  'Weekend warrior 🏔️',
];
export const BIOS: string[] = [
  'Love hiking and photography',
  'Always up for good conversation',
  'Spreading good vibes',
  'Always exploring new places',
  'Living life to the fullest',
  'Love outdoor activities and cooking',
  'Always ready for new adventures',
  'Love good movies',
];
export const DISTANCE: number | undefined = undefined;

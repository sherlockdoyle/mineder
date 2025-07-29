import { motion } from 'framer-motion';
import { Heart, Star, X } from 'lucide-react';
import { FC } from 'react';
import { SwipeAction } from './ProfileCard';

interface ActionButtonsProps {
  swipeAction: SwipeAction | undefined;
  onSwipe: (action: SwipeAction) => void;
}
const ActionButtons: FC<ActionButtonsProps> = ({ swipeAction, onSwipe }) => (
  <div className='fixed bottom-8 left-1/2 -translate-x-1/2 transform'>
    <div className='flex items-center space-x-6'>
      <motion.div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-200 bg-white opacity-50 shadow-lg'>
        <X className='h-8 w-8 text-red-500' />
      </motion.div>

      <motion.div
        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-lg transition-all hover:scale-110 hover:bg-blue-600 hover:shadow-xl active:scale-90'
        animate={{ scale: swipeAction === 'superlike' ? [1, 1.3, 1] : 1 }}
        onClick={() => onSwipe('superlike')}
      >
        <Star className='h-6 w-6 fill-current text-white' />
      </motion.div>

      <motion.div
        className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-green-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-green-300 hover:shadow-xl active:scale-90'
        animate={{ scale: swipeAction === 'like' ? [1, 1.3, 1] : 1 }}
        onClick={() => onSwipe('like')}
      >
        <Heart className='h-8 w-8 fill-current text-green-500' />
      </motion.div>
    </div>
  </div>
);
export default ActionButtons;

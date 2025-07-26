"use client";

import React, { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import { users as initialUsers } from '@/lib/users';
import { Button } from '@/components/ui/button';
import { SWIPE_LEFT_ENABLED, SWIPE_RIGHT_ENABLED, SWIPE_UP_ENABLED } from '@/config';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { X, Heart, Star } from 'lucide-react';

export default function Home() {
  const [users, setUsers] = useState(initialUsers);
  const [swiped, setSwiped] = useState<number[]>([]);

  const removeUser = (index: number, dir: number) => {
    setSwiped([...swiped, index]);
  };

  const swipe = (index: number, dir: number) => {
    if (dir === 1 && SWIPE_RIGHT_ENABLED) {
      removeUser(index, dir);
    } else if (dir === -1 && SWIPE_LEFT_ENABLED) {
      removeUser(index, dir);
    } else if (dir === 0 && SWIPE_UP_ENABLED) {
      removeUser(index, dir);
    }
  };

  const bind = useDrag(({ args: [index], down, movement: [mx, my], direction: [xDir], velocity: [vx, vy] }) => {
    const trigger = Math.max(vx, vy) > 0.2;
    if (!down && trigger) {
      const dir = xDir < 0 ? -1 : 1;
      if (Math.abs(mx) > Math.abs(my)) {
        swipe(index, dir);
      } else {
        swipe(index, 0);
      }
    }
  });

  const activeUsers = users.filter((_, i) => !swiped.includes(i));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 overflow-hidden">
      <div className="relative w-full max-w-sm h-[500px] md:max-w-md lg:max-w-lg">
        <AnimatePresence>
          {activeUsers.map((user, index) => (
            <motion.div
              key={index}
              className="absolute w-full h-full"
              style={{ zIndex: activeUsers.length - index }}
              initial={{ scale: 1 - (activeUsers.length - 1 - index) * 0.1, y: (activeUsers.length - 1 - index) * -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ x: 500, opacity: 0, transition: { duration: 0.5 } }}
              drag
              {...bind(index)}
              custom={index}
            >
              <ProfileCard user={user} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex space-x-4 mt-8">
        {SWIPE_LEFT_ENABLED && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-20 w-20 bg-white shadow-lg"
              onClick={() => swipe(activeUsers.length - 1, -1)}
            >
              <X className="h-10 w-10 text-red-500" />
            </Button>
          </motion.div>
        )}
        {SWIPE_UP_ENABLED && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-20 w-20 bg-white shadow-lg"
              onClick={() => swipe(activeUsers.length - 1, 0)}
            >
              <Star className="h-10 w-10 text-yellow-500" />
            </Button>
          </motion.div>
        )}
        {SWIPE_RIGHT_ENABLED && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-20 w-20 bg-white shadow-lg"
              onClick={() => swipe(activeUsers.length - 1, 1)}
            >
              <Heart className="h-10 w-10 text-green-500" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

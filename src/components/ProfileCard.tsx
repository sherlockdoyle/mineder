import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface ProfileCardProps {
  user: {
    name: string;
    age: number;
    image: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Card className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-96 w-full">
          <Image
            src={user.image}
            alt={user.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <CardTitle className="text-2xl font-bold">{user.name}, {user.age}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

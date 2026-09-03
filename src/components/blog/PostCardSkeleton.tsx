import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => (
  <Card className="h-full overflow-hidden">
    <AspectRatio ratio={16 / 9}>
      <Skeleton className="h-full w-full rounded-none" />
    </AspectRatio>
    <CardContent className="space-y-3 p-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
  </Card>
);

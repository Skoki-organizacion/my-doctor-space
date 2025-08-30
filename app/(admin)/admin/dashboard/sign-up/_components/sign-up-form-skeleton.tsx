import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignUpFormSkeleton() {
  return (
    <Card className="w-full sm:max-w-[550px]">
      <CardHeader>
        <div className="flex items-center gap-2 w-full justify-center mb-6">
          <Skeleton className="h-6 w-[200px] rounded-md" />
        </div>
        <Skeleton className="h-4 w-[400px] rounded-md" />
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-[60px] rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}

          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

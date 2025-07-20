import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/30 rounded-full p-4 w-fit mx-auto mb-4">
            <ShieldX className="size-12 text-destructive" />
          </div>

          <CardTitle className="text-xl">Access Restricted</CardTitle>
          <CardDescription className="max-w-sm mx-auto">
            You are not an administrator and do not have permission to access
            this route. Please log in with an administrator account or contact
            support if you believe this is an error.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={"/"}>
            <Button className="w-full">
              <ArrowLeft className="size-4" />
              <span>Back to home</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

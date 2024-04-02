import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlatformNotFound() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-36">
            <h2 className="text-3xl font-semibold">Channel is not found!</h2>
            <Button variant="link" asChild>
                <Link href="/">Home</Link>
            </Button>
        </div>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h2 className="text-3xl font-semibold">Page not found!</h2>
            <Button variant="link" asChild>
                <Link href="/">
                    Home
                </Link>
            </Button>
        </div>
    );
}

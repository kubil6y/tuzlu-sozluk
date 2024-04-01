import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { titleFont } from "@/components/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

type FormWrapperProps = {
    children: React.ReactNode;
    label: string;
    backButtonText: string;
    backButtonHref: string;
};

export const FormWrapper = ({
    label,
    children,
    backButtonText,
    backButtonHref,
}: FormWrapperProps) => {
    return (
        <Card className="w-[360px]">
            <CardHeader className="flex flex-col items-center justify-center">
                <Link href="/"
                    className={cn(
                        titleFont.className,
                        "text-4xl uppercase flex items-center justify-center cursor-pointer"
                    )}
                >
                    TUZLU
                    <span>
                        <Icons.logo className="size-10 mx-2" />
                    </span>
                    SOZLUK
                </Link>
                <h2 className="pt-4">{label}</h2>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
                <Button asChild variant="link" className="font-normal w-full">
                    <Link href={backButtonHref}>{backButtonText}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

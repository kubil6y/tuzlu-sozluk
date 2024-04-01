import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

export const VoteButtons = () => {
    return (
        <div className="flex items-center space-x-5">
            <Button variant="outline" size="smIcon">
                <ChevronUpIcon className="size-5" />
            </Button>
            <Button variant="outline" size="smIcon">
                <ChevronDownIcon className="size-5" />
            </Button>
        </div>
    )
}

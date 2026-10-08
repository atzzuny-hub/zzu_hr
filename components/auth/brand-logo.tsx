import { Network } from "lucide-react";


export function BrandLogo(){
    return(
        <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded bg-primary text-primary-foreground">
                <Network className="size-4" aria-hidden="true"/>
            </span>
            <span className="text-lg font-bold">zzuny_flex</span>
        </div>
    )
}
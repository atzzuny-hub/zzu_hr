import { BrandLogo } from "./brand-logo";


export function BrandAside(){
    return(
        <div className="flex flex-1 flex-col">
            <BrandLogo />

            <div className="flex flex-1 items-center justify-center py-12">
                <OrgChartGraphic />
            </div>

            <p className="text-[28px] font-bold leading-tight">
                구성원, 근무, 휴가를
                <br />
                한곳에서 관리해요.
            </p>
        </div>

    )
}

function OrgChartGraphic(){
    return(
        <svg
            viewBox="0 0 360 230"
            className="w-full max-w-[360px] text-white/30"
            aria-hidden="true"
            >
            <path
                d="M180 44 V72 M50 72 H310 M50 72 V100 M180 72 V100 M310 72 V100 M180 138 V162 M124 162 H236 M124 162 V186 M236 162 V186"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
            />
            <Node x={133} y={6} />
            <Node x={3} y={100} />
            <Node x={133} y={100} />
            <Node x={263} y={100} />
            <Node x={77} y={186} />
            <Node x={189} y={186} active />
        </svg>
    )
}

function Node({ x, y, active = false }: { x: number; y: number; active?: boolean }) {
  return (
    <g className={active ? "text-white" : undefined}>
      <rect
        x={x}
        y={y}
        width={94}
        height={38}
        rx={8}
        className={active ? "fill-primary" : undefined}
        fill={active ? undefined : "none"}
        stroke={active ? "none" : "currentColor"}
        strokeWidth={1.5}
      />
      <circle cx={x + 20} cy={y + 19} r={7} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <line x1={x + 34} y1={y + 19} x2={x + 78} y2={y + 19} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}
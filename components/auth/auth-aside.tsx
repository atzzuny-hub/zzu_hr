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


const STEPS = [
    { title: "계정 만들기", description: "이름과 업무용 이메일로 가입" },
    { title: "메일 인증", description: "받은 메일의 링크를 누르면 끝나요" },
    { title: "회사 정보 등록", description: "회사명과 사업자등록번호 입력" },
    { title: "승인 후 구성원 초대", description: "승인되면 구성원을 등록하고 초대해요" },
] as const

type StepsAsideProps = {
    current: 1 | 2 | 3 | 4;
};

export function StepsAside({ current }: StepsAsideProps){
    return(
        <div className="flex flex-1 flex-col">
            <BrandLogo />

            <div className="flex flex-1 flex-col justify-center py-12">
                <p className="text-[28px] font-bold leading-tight">
                    가입하면
                    <br />
                    이렇게 진행돼요
                </p>

                <ol className="mt-10 flex flex-col">
                    {STEPS.map((step, index) => {
                        const number = index + 1
                        const isCurrent = number === current
                        const isLast = index === STEPS.length - 1

                        return (
                            <li
                                key={step.title}
                                aria-current={isCurrent ? "step" : undefined}
                                className="flex gap-4"
                            >
                                <div className="flex flex-col items-center">
                                    <span
                                        className={
                                            isCurrent
                                                ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                                                : "flex size-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-sm font-semibold text-white/70"
                                        }
                                    >
                                        {number}
                                    </span>
                                    {!isLast && (
                                        <span
                                            className="my-1 w-px flex-1 bg-white/20"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>

                                <div className={isLast ? undefined : "pb-8"}>
                                    <p
                                        className={
                                            isCurrent
                                                ? "font-semibold text-white"
                                                : "font-medium text-white/70"
                                        }
                                    >
                                        {step.title}
                                    </p>
                                    <p className="mt-0.5 text-sm text-white/60">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}
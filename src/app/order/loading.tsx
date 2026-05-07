import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <Skeleton style={{ height: 56, width: "50%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "70%" }} className="mb-[40px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-[24px]"
              style={{ background: "rgba(255,255,255,0.03)", borderRadius: 20 }}
            >
              <div className="flex items-center gap-[14px] mb-[18px]">
                <Skeleton style={{ height: 48, width: 48 }} rounded="full" />
                <Skeleton style={{ height: 22, width: 160 }} />
              </div>
              <Skeleton style={{ height: 12, width: "100%" }} className="mb-[8px]" />
              <Skeleton style={{ height: 12, width: "80%" }} className="mb-[20px]" />
              <div className="flex flex-wrap gap-[10px]">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} style={{ height: 40, width: 110 }} rounded="full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

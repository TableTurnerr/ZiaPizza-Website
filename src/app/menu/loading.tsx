import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-7xl mx-auto">
        <Skeleton style={{ height: 14, width: 140 }} className="mb-[20px]" />
        <Skeleton style={{ height: 56, width: "60%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "85%" }} className="mb-[8px]" />
        <Skeleton style={{ height: 14, width: "70%" }} className="mb-[40px]" />

        <div className="flex gap-[12px] overflow-hidden mb-[40px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} style={{ height: 40, width: 110, flex: "0 0 auto" }} rounded="full" />
          ))}
        </div>

        {Array.from({ length: 2 }).map((_, s) => (
          <div key={s} className="mb-[60px]">
            <Skeleton style={{ height: 32, width: 220 }} className="mb-[24px]" rounded="lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-[16px]"
                  style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}
                >
                  <Skeleton style={{ height: 180, width: "100%" }} className="mb-[16px]" rounded="lg" />
                  <Skeleton style={{ height: 18, width: "70%" }} className="mb-[10px]" />
                  <Skeleton style={{ height: 12, width: "100%" }} className="mb-[6px]" />
                  <Skeleton style={{ height: 12, width: "85%" }} className="mb-[16px]" />
                  <div className="flex justify-between items-center">
                    <Skeleton style={{ height: 20, width: 60 }} />
                    <Skeleton style={{ height: 36, width: 100 }} rounded="full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageSkeletonShell>
  );
}

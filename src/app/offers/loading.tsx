import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-6xl mx-auto">
        <Skeleton style={{ height: 56, width: "40%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "70%" }} className="mb-[40px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 20 }}>
              <Skeleton style={{ height: 200, width: "100%", borderRadius: 0 }} />
              <div className="p-[18px]">
                <Skeleton style={{ height: 22, width: "80%" }} className="mb-[10px]" />
                <SkeletonText lines={2} className="mb-[16px]" />
                <Skeleton style={{ height: 40, width: 130 }} rounded="full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

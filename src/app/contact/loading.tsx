import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-4xl mx-auto">
        <Skeleton style={{ height: 56, width: "40%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "70%" }} className="mb-[40px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div className="p-[24px]" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mb-[18px]">
                <Skeleton style={{ height: 12, width: 90 }} className="mb-[8px]" />
                <Skeleton style={{ height: 44, width: "100%" }} rounded="md" />
              </div>
            ))}
            <Skeleton style={{ height: 120, width: "100%" }} className="mb-[18px]" rounded="md" />
            <Skeleton style={{ height: 48, width: 160 }} rounded="full" />
          </div>
          <div className="p-[24px]" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}>
            <Skeleton style={{ height: 24, width: "60%" }} className="mb-[16px]" />
            <SkeletonText lines={4} className="mb-[24px]" />
            <Skeleton style={{ height: 220, width: "100%" }} rounded="lg" />
          </div>
        </div>
      </div>
    </PageSkeletonShell>
  );
}

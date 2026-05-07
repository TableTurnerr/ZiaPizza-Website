import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <Skeleton style={{ height: 60, width: "55%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "75%" }} className="mb-[40px]" />
        <Skeleton style={{ height: 320, width: "100%" }} className="mb-[40px]" rounded="2xl" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-[20px]" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}>
              <Skeleton style={{ height: 56, width: 56 }} className="mb-[14px]" rounded="full" />
              <Skeleton style={{ height: 18, width: "70%" }} className="mb-[10px]" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

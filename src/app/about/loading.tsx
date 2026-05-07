import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-4xl mx-auto">
        <Skeleton style={{ height: 60, width: "65%" }} className="mb-[20px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "80%" }} className="mb-[40px]" />
        <Skeleton style={{ height: 380, width: "100%" }} className="mb-[40px]" rounded="xl" />
        <SkeletonText lines={4} className="mb-[28px]" />
        <SkeletonText lines={5} className="mb-[28px]" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px] mt-[40px]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-[20px]" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}>
              <Skeleton style={{ height: 48, width: 48 }} className="mb-[14px]" rounded="full" />
              <Skeleton style={{ height: 18, width: "70%" }} className="mb-[10px]" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

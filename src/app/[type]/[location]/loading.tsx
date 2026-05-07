import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-6xl mx-auto">
        <Skeleton style={{ height: 14, width: 200 }} className="mb-[20px]" />
        <Skeleton style={{ height: 60, width: "65%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "80%" }} className="mb-[40px]" />
        <Skeleton style={{ height: 360, width: "100%" }} className="mb-[40px]" rounded="2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[40px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-[20px]" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}>
              <Skeleton style={{ height: 22, width: "60%" }} className="mb-[14px]" />
              <SkeletonText lines={3} />
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

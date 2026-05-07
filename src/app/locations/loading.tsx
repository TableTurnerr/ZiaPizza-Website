import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-6xl mx-auto">
        <Skeleton style={{ height: 56, width: "45%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "70%" }} className="mb-[40px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", borderRadius: 20 }}
            >
              <Skeleton style={{ height: 240, width: "100%", borderRadius: 0 }} />
              <div className="p-[24px]">
                <Skeleton style={{ height: 26, width: "55%" }} className="mb-[14px]" />
                <SkeletonText lines={3} className="mb-[20px]" />
                <div className="flex gap-[10px]">
                  <Skeleton style={{ height: 40, width: 130 }} rounded="full" />
                  <Skeleton style={{ height: 40, width: 130 }} rounded="full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

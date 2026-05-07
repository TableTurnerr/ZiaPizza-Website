import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <Skeleton style={{ height: 12, width: 100 }} className="mb-[20px]" />
        <Skeleton style={{ height: 56, width: "55%" }} className="mb-[12px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "75%" }} className="mb-[40px]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-[16px]"
              style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18 }}
            >
              <Skeleton style={{ height: 200, width: "100%" }} className="mb-[16px]" rounded="lg" />
              <Skeleton style={{ height: 12, width: 120 }} className="mb-[10px]" />
              <Skeleton style={{ height: 22, width: "85%" }} className="mb-[10px]" rounded="md" />
              <Skeleton style={{ height: 12, width: "100%" }} className="mb-[6px]" />
              <Skeleton style={{ height: 12, width: "60%" }} />
            </div>
          ))}
        </div>
      </div>
    </PageSkeletonShell>
  );
}

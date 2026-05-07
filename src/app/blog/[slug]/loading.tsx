import PageSkeletonShell from "@/components/PageSkeletonShell";
import Skeleton, { SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <PageSkeletonShell>
      <article className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-3xl mx-auto">
        <Skeleton style={{ height: 12, width: 160 }} className="mb-[20px]" />
        <Skeleton style={{ height: 12, width: 100 }} className="mb-[14px]" />
        <Skeleton style={{ height: 60, width: "90%" }} className="mb-[16px]" rounded="lg" />
        <Skeleton style={{ height: 14, width: "60%" }} className="mb-[28px]" />
        <Skeleton style={{ height: 360, width: "100%" }} className="mb-[32px]" rounded="xl" />
        <SkeletonText lines={4} className="mb-[20px]" />
        <SkeletonText lines={5} className="mb-[20px]" />
        <SkeletonText lines={3} />
      </article>
    </PageSkeletonShell>
  );
}

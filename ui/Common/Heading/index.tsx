
import Image from "next/image";

export default function Heading({ title }: { title: string }) {
  return (
    <div className="flex items-center flex-col justify-between mt-8 mb-8">
      <h1 className="text-4xl font-bold text-fuchsia-900">{title}</h1>
      <Image
        className="h-auto"
        src="/images/head.png"
        width={200}
        height={50}
        alt=""
        priority
      />
    </div>
  );
}

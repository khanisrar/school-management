// app/showSchool/page.tsx
import dynamic from "next/dynamic";

const SchoolList = dynamic(() => import("./schoolList"), {
  ssr: false,
});

export default function ShowSchool() {
  return <SchoolList />;
}

// app/showSchool/page.tsx
import dynamic from "next/dynamic";

const SchoolList = dynamic(() => import("./schoolList"), {
  ssr: false,
  loading: () => <div>Loading schools...</div>,
});

export default function ShowSchoolPage() {
  return <SchoolList />;
}

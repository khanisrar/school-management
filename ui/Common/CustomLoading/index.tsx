
import Image from "next/image";

export default function CustomLoading() {
    return (
        <main>
            <Image className="" src="/images/Loading-icon.svg" width={100} height={100} alt="Loading-Image" priority/>
        </main>
    ) 
    
}

import { OSProvider } from "@/context/OSContext";
import { DesktopEnv } from "@/components/DesktopEnv";

export default function Home() {
  return (
    <OSProvider>
      <DesktopEnv />
    </OSProvider>
  );
}

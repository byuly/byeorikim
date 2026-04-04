import { useState, useCallback } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import { useAppStore } from "./store/useAppStore";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [bootKey, setBootKey] = useState(0);
  const openApp = useAppStore((s) => s.openApp);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    openApp("about");
    openApp("terminal");
  }, [openApp]);

  const handleRestart = useCallback(() => {
    setBooted(false);
    setBootKey((k) => k + 1);
  }, []);

  return (
    <>
      {!booted && (
        <BootScreen key={bootKey} onComplete={handleBootComplete} />
      )}
      <Desktop onRestart={handleRestart} />
    </>
  );
}

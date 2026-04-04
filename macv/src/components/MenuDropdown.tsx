import { motion, AnimatePresence } from "framer-motion";

export interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  disabled?: boolean;
  breakAfter?: boolean;
  checked?: boolean;
}

interface MenuDropdownProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuDropdown({
  items,
  isOpen,
  onClose,
}: MenuDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.97 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="absolute top-full left-0 mt-px min-w-[220px] py-1 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-2xl rounded-lg shadow-[0_6px_30px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(0,0,0,0.1)] z-[200] text-[13px]"
        >
          {items.map((item, i) => (
            <div key={i}>
              <button
                className={`w-full text-left px-3 py-[3px] flex items-center justify-between gap-6
                  ${
                    item.disabled
                      ? "text-black/30 dark:text-white/30 cursor-default"
                      : "text-black/85 dark:text-white/85 hover:bg-blue-500 hover:text-white rounded-[4px] mx-1 !w-[calc(100%-8px)]"
                  }`}
                onClick={() => {
                  if (item.disabled) return;
                  item.action?.();
                  onClose();
                }}
                disabled={item.disabled}
              >
                <span className="flex items-center gap-2">
                  {item.checked !== undefined && (
                    <span className="w-3 text-center">
                      {item.checked ? "✓" : ""}
                    </span>
                  )}
                  {item.label}
                </span>
                {item.shortcut && (
                  <span className="text-black/35 dark:text-white/35 text-[11px]">
                    {item.shortcut}
                  </span>
                )}
              </button>
              {item.breakAfter && (
                <div className="my-1 mx-2 h-px bg-black/10 dark:bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

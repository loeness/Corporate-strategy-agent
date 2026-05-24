import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useRegion, regionConfig, type Region } from "../contexts/RegionContext";

export function RegionSelector() {
  const { currentRegion, setCurrentRegion, setTargetRegion, setIsLoading } = useRegion();
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionChange = async (region: Region) => {
    if (region === currentRegion) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    // ★ 点击瞬间立即将目标地区写入 targetRegion，Loading 弹窗将读取此值
    setTargetRegion(region);
    setIsLoading(true);

    // 模拟数据加载延迟（实际项目中替换为 API 调用）
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentRegion(region);
    setTargetRegion(null); // 切换完成，清除目标状态
    setIsLoading(false);
  };

  const regions = Object.entries(regionConfig) as [Region, typeof regionConfig[Region]][];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/50 hover:shadow-lg transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Globe className="size-5 text-amber-600" />
        </motion.div>
        <span className="font-medium text-amber-900">{regionConfig[currentRegion].label}</span>
        <ChevronDown className={`size-4 text-amber-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="absolute top-full right-0 mt-3 w-72 rounded-2xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/30 shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
            >
              <div className="p-3">
                <div className="px-3 py-2 text-xs font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Globe className="size-4" />
                  选择国家/地区
                </div>
                {regions.map(([key, config]) => {
                  const isSelected = key === currentRegion;
                  return (
                    <motion.button
                      key={key}
                      onClick={() => handleRegionChange(key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1 ${
                        isSelected
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg"
                          : "hover:bg-amber-100/50 text-amber-900"
                      }`}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`size-2.5 rounded-full ${
                            isSelected ? "bg-white shadow-lg" : "bg-amber-400"
                          }`}
                          animate={isSelected ? {
                            scale: [1, 1.3, 1],
                          } : {}}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                        <div className="text-left">
                          <div className="text-sm font-medium">{config.label}</div>
                          <div className={`text-xs ${isSelected ? "text-white/80" : "text-amber-600"}`}>
                            {config.currency} · {config.language.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring" }}
                        >
                          <Check className="size-5 font-bold" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="border-t border-amber-200 p-4 bg-gradient-to-r from-amber-50 to-rose-50">
                <p className="text-xs text-amber-700 flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  切换后将重新加载所有数据模块
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

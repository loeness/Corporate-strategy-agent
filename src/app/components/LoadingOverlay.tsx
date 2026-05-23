import { motion } from "motion/react";
import { Loader2, Globe } from "lucide-react";
import { useRegion, regionConfig } from "../contexts/RegionContext";

export function LoadingOverlay() {
  const { isLoading, currentRegion } = useRegion();

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-amber-900/40 via-rose-900/40 to-purple-900/40 backdrop-blur-md z-[100] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl shadow-2xl p-10 max-w-lg border border-amber-200/50"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex p-5 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-400/30 mb-6 relative"
          >
            <Loader2 className="size-10 text-amber-700 animate-spin" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-400/30"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h3 className="text-2xl font-medium text-amber-900 mb-3 flex items-center justify-center gap-2">
            <Globe className="size-6" />
            即将切换到「{regionConfig[currentRegion].label}」
          </h3>
          <p className="text-amber-700/80 mb-6">
            正在为您重新生成定制化战略报告
          </p>

          <div className="space-y-3">
            {[
              { label: "贵金属价格实时追踪", delay: 0 },
              { label: "竞品市场动态分析", delay: 0.1 },
              { label: "政策法规情报更新", delay: 0.2 },
              { label: "社交媒体趋势洞察", delay: 0.3 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-amber-200/30"
              >
                <motion.div
                  className="size-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item.delay,
                  }}
                />
                <span className="text-sm text-amber-800">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { Zap, Shield, AlertTriangle, Sparkles } from "lucide-react";

export type StrategyMode = "innovation" | "stable" | "rescue";

interface StrategyModeSelectorProps {
  selectedMode: StrategyMode;
  onModeChange: (mode: StrategyMode) => void;
}

const modes = [
  {
    id: "innovation" as StrategyMode,
    label: "创新突破",
    icon: Zap,
    description: "探索市场机遇与突破性增长",
    gradient: "from-amber-400 via-yellow-500 to-amber-600",
    glowColor: "rgba(251, 191, 36, 0.5)",
    bgPattern: "from-amber-500/10 via-yellow-500/5 to-amber-600/10",
  },
  {
    id: "stable" as StrategyMode,
    label: "稳健运营",
    icon: Shield,
    description: "优化运营效率与风险控制",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glowColor: "rgba(52, 211, 153, 0.5)",
    bgPattern: "from-emerald-500/10 via-teal-500/5 to-cyan-600/10",
  },
  {
    id: "rescue" as StrategyMode,
    label: "战略转型",
    icon: AlertTriangle,
    description: "应对危机与战略重构",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    glowColor: "rgba(251, 113, 133, 0.5)",
    bgPattern: "from-rose-500/10 via-pink-500/5 to-fuchsia-600/10",
  },
];

export function StrategyModeSelector({ selectedMode, onModeChange }: StrategyModeSelectorProps) {
  return (
    <div className="relative">
      {/* 背景光晕效果 */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/20 via-rose-200/20 to-amber-200/20 blur-3xl -z-10 rounded-3xl" />

      <div className="flex gap-4 p-2 rounded-3xl bg-white/40 backdrop-blur-xl border border-amber-200/50 shadow-xl">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = selectedMode === mode.id;

          return (
            <motion.button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className="relative flex-1 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`relative p-6 rounded-2xl overflow-hidden transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-white via-amber-50/50 to-rose-50/50 shadow-2xl"
                    : "bg-white/60 hover:bg-white/80 shadow-md"
                }`}
                animate={{
                  boxShadow: isActive
                    ? `0 20px 60px -15px ${mode.glowColor}`
                    : "0 4px 15px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* 激活状态的动态背景 */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${mode.bgPattern} opacity-50`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      />

                      {/* 流动光效 */}
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        animate={{
                          background: [
                            `radial-gradient(circle at 0% 0%, ${mode.glowColor} 0%, transparent 50%)`,
                            `radial-gradient(circle at 100% 100%, ${mode.glowColor} 0%, transparent 50%)`,
                            `radial-gradient(circle at 0% 0%, ${mode.glowColor} 0%, transparent 50%)`,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* 闪烁粒子 */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute size-1 rounded-full bg-amber-400"
                          style={{
                            left: `${20 + i * 12}%`,
                            top: `${30 + (i % 3) * 20}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* 内容 */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${mode.gradient} relative overflow-hidden`}
                      animate={{
                        rotate: isActive ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="size-6 text-white relative z-10" />
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white"
                          animate={{
                            scale: [0, 2],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>

                    <div className="flex-1 text-left">
                      <motion.div
                        className={`flex items-center gap-2 mb-1 transition-colors ${
                          isActive ? "text-amber-900 font-semibold" : "text-amber-800 font-medium"
                        }`}
                        animate={{
                          scale: isActive ? [1, 1.02, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                        }}
                      >
                        {mode.label}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                          >
                            <Sparkles className="size-4 text-amber-600" />
                          </motion.div>
                        )}
                      </motion.div>
                      <div className={`text-xs transition-colors ${
                        isActive ? "text-amber-700" : "text-amber-600/70"
                      }`}>
                        {mode.description}
                      </div>
                    </div>
                  </div>

                  {/* 激活指示器 */}
                  {isActive && (
                    <motion.div
                      className={`h-1 rounded-full bg-gradient-to-r ${mode.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </div>

                {/* 边框光晕 */}
                {isActive && (
                  <motion.div
                    className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${mode.gradient} -z-10 blur-sm`}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

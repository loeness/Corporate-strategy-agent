import { motion } from "motion/react";
import { TrendingUp, Shield, Users, Link2, Target, ChevronRight } from "lucide-react";
import type { StrategyMode } from "./StrategyModeSelector";

interface FrameworkOverviewProps {
  mode: StrategyMode;
  onFrameworkClick: (framework: string) => void;
}

const frameworkIcons = {
  pestle: Target,
  porter: Shield,
  "strategic-group": Users,
  "value-chain": Link2,
  swot: TrendingUp,
};

const frameworksByMode = {
  innovation: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 87,
      trend: "up",
      insight: "政策与技术双轮驱动，可持续发展成主旋律",
      keyMetrics: { opportunities: 8, threats: 2 }
    },
    {
      id: "porter",
      name: "波特五力",
      score: 73,
      trend: "up",
      insight: "新进入者威胁提升，替代品压力显著",
      keyMetrics: { intensity: "高", pressure: "中" }
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 82,
      trend: "up",
      insight: "创新科技群组年增长40%，市场分化明显",
      keyMetrics: { groups: 4, growth: "+40%" }
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 79,
      trend: "neutral",
      insight: "设计与体验环节创新价值最高",
      keyMetrics: { efficiency: "85%", optimization: 6 }
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 75,
      trend: "up",
      insight: "机会大于威胁，需快速响应市场变化",
      keyMetrics: { opportunities: 8, threats: 5 }
    },
  ],
  stable: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 78,
      trend: "neutral",
      insight: "宏观环境稳定，政策可预测性高",
      keyMetrics: { opportunities: 4, threats: 3 }
    },
    {
      id: "porter",
      name: "波特五力",
      score: 71,
      trend: "neutral",
      insight: "竞争格局稳固，客户忠诚度维持高位",
      keyMetrics: { intensity: "中", pressure: "低" }
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 76,
      trend: "neutral",
      insight: "市场定位清晰，同群组竞争有序",
      keyMetrics: { groups: 4, growth: "+8%" }
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 82,
      trend: "up",
      insight: "采购与生产效率持续优化",
      keyMetrics: { efficiency: "92%", optimization: 4 }
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 80,
      trend: "up",
      insight: "优势明显，规模效应与品牌资产突出",
      keyMetrics: { opportunities: 5, threats: 3 }
    },
  ],
  rescue: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 52,
      trend: "down",
      insight: "外部压力集中，监管与经济风险并存",
      keyMetrics: { opportunities: 2, threats: 7 }
    },
    {
      id: "porter",
      name: "波特五力",
      score: 48,
      trend: "down",
      insight: "多重竞争压力，市场份额流失加速",
      keyMetrics: { intensity: "极高", pressure: "高" }
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 45,
      trend: "down",
      insight: "群组增长乏力，竞争地位削弱",
      keyMetrics: { groups: 4, growth: "-12%" }
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 50,
      trend: "down",
      insight: "成本失控与库存积压需紧急处理",
      keyMetrics: { efficiency: "68%", optimization: 8 }
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 42,
      trend: "down",
      insight: "威胁严峻，优势受侵蚀需快速止血",
      keyMetrics: { opportunities: 3, threats: 9 }
    },
  ],
};

export function FrameworkOverview({ mode, onFrameworkClick }: FrameworkOverviewProps) {
  const frameworks = frameworksByMode[mode];

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-600 bg-emerald-500/10";
    if (score >= 60) return "text-amber-600 bg-amber-500/10";
    return "text-rose-600 bg-rose-500/10";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↗";
    if (trend === "down") return "↘";
    return "→";
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        <h2 className="text-xl font-semibold text-amber-900">战略框架分析</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework, index) => {
          const Icon = frameworkIcons[framework.id as keyof typeof frameworkIcons];

          return (
            <motion.button
              key={framework.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              onClick={() => onFrameworkClick(framework.id)}
              className="relative p-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-2xl transition-all text-left group overflow-hidden"
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 size-32 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl -z-10" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 shadow-lg"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="size-6 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${getScoreColor(framework.score)}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {framework.score}
                    </motion.span>
                    <span className="text-xl">
                      {getTrendIcon(framework.trend)}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {framework.name}
                </h3>

                <p className="text-sm text-amber-700/80 mb-4 line-clamp-2 leading-relaxed">
                  {framework.insight}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-amber-200/50">
                  <div className="flex gap-4 text-xs text-amber-700 font-medium">
                    {Object.entries(framework.keyMetrics).map(([key, value]) => (
                      <span key={key} className="flex items-center gap-1">
                        {key}: <span className="text-amber-900 font-semibold">{value}</span>
                      </span>
                    ))}
                  </div>
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <ChevronRight className="size-5 text-amber-600" />
                  </motion.div>
                </div>
              </div>

              {/* 悬浮边框 */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-50 blur-sm -z-10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

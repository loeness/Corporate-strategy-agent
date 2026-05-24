import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import type { StrategyMode } from "./StrategyModeSelector";
import { getStrategyData } from "../data/strategyData";

interface DailyBriefProps {
  mode: StrategyMode;
  onInsightClick: (insight: any) => void;
}

// 从 strategyData.ts 提取简报数据
function getBriefData(mode: StrategyMode) {
  const data = getStrategyData(mode);
  const { opportunities, risks, recommendedActions, watchList, decisionSummary, marketPriorities } = data;

  switch (mode) {
    case "innovation":
      return {
        title: "创新突破态势 — 每日跨市场运营决策简报",
        insights: [
          {
            label: "P0 机会数",
            value: `${opportunities.filter(o => o.priority === "P0").length} 个`,
            trend: "up",
            change: `${opportunities.length} 项机会已识别`,
          },
          {
            label: "市场覆盖",
            value: `${marketPriorities.length} 个市场`,
            trend: "up",
            change: `${marketPriorities[0]?.market || "日本"}市场 ${marketPriorities[0]?.priority || "P0"} 级优先`,
          },
          {
            label: "今日建议动作",
            value: `${recommendedActions.length} 项`,
            trend: "up",
            change: `${recommendedActions.length} 项待执行`,
          },
        ],
        summary: `${decisionSummary[0]}`,
      };
    case "stable":
      return {
        title: "稳定运营概况 — 每日跨市场运营决策简报",
        insights: [
          {
            label: "风险监控项",
            value: `${risks.length} 个`,
            trend: "down",
            change: `${risks.filter(r => r.priority === "P0").length} 个 P0 风险`,
          },
          {
            label: "后续观察清单",
            value: `${watchList.length} 项`,
            trend: "neutral",
            change: `持续监控各市场`,
          },
          {
            label: "建议动作",
            value: `${recommendedActions.length} 项`,
            trend: "up",
            change: `${recommendedActions.filter(a => a.deadline.includes("本周")).length} 项紧急`,
          },
        ],
        summary: `${decisionSummary[0]}`,
      };
    case "rescue":
      return {
        title: "战略转型分析 — 每日跨市场运营决策简报",
        insights: [
          {
            label: "P0 风险点",
            value: `${risks.filter(r => r.priority === "P0").length} 个需关注`,
            trend: "down",
            change: `${risks.filter(r => r.responsibility === "总部").length} 个总部级`,
          },
          {
            label: "竞争压力",
            value: "CTF全球扩张",
            trend: "down",
            change: `多市场竞品升级`,
          },
          {
            label: "转型动作",
            value: `${recommendedActions.length} 项`,
            trend: "up",
            change: `产品/渠道/供应链`,
          },
        ],
        summary: risks.map(r => `${r.market}: ${r.risk}`).slice(0, 3).join(" "),
      };
    default:
      return {
        title: "每日跨市场运营决策简报",
        insights: [],
        summary: "",
      };
  }
}

export function DailyBrief({ mode, onInsightClick }: DailyBriefProps) {
  const data = getBriefData(mode);
  const today = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="size-5 text-emerald-600" />;
    if (trend === "down") return <TrendingDown className="size-5 text-rose-600" />;
    return <Minus className="size-5 text-amber-600" />;
  };

  return (
    <div className="space-y-8">
      {/* 日报标题区 */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/30 via-rose-200/30 to-amber-200/30 blur-3xl -z-10" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-rose-50/30 border border-amber-200/50 shadow-2xl backdrop-blur-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 animate-pulse" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-800 via-amber-600 to-rose-700 bg-clip-text text-transparent">
                  {data.title}
                </h1>
              </div>
              <div className="flex items-center gap-4 text-amber-700">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5" />
                  <span className="text-lg font-medium">{today}</span>
                </div>
                <div className="size-1 rounded-full bg-amber-400" />
                <span className="text-sm">策略报告数据驱动</span>
              </div>
            </div>
            <motion.div
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 shadow-lg"
            >
              <Calendar className="size-8 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 关键指标面板 */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <h2 className="text-xl font-semibold text-amber-900">核心战略指标</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {data.insights.map((insight: any, index: number) => (
            <motion.button
              key={insight.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              onClick={() => onInsightClick(insight)}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-200/40 to-rose-200/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white via-amber-50/40 to-white border border-amber-200/60 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 size-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl -z-10" />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-medium text-amber-800 group-hover:text-amber-900 transition-colors">
                    {insight.label}
                  </span>
                  <motion.div
                    animate={{
                      y: insight.trend === "up" ? [-2, 2, -2] : insight.trend === "down" ? [2, -2, 2] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {getTrendIcon(insight.trend)}
                  </motion.div>
                </div>
                <motion.div
                  className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-700 via-amber-600 to-rose-600 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {insight.value}
                </motion.div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-600">{insight.change}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

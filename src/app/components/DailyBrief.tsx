import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus, Calendar, ExternalLink } from "lucide-react";
import type { StrategyMode } from "./StrategyModeSelector";
import { opportunities, risks, keyChanges, recommendedActions, watchList, decisionSummary, marketPriorities } from "../data/strategyData";

interface DailyBriefProps {
  mode: StrategyMode;
  onInsightClick: (insight: any) => void;
}

// 从策略报告中提取简报数据
const briefData = {
  innovation: {
    title: "创新突破态势 — 每日跨市场运营决策简报",
    insights: [
      {
        label: "P0 机会数",
        value: `${opportunities.filter(o => o.priority === "P0").length} 个`,
        trend: "up",
        change: `${opportunities.length} 项机会已识别`,
      },
      {
        label: "重点市场",
        value: `${marketPriorities.filter(m => m.priority === "P1").length} 个 P1 市场`,
        trend: "up",
        change: `日/美/中 优先处理`,
      },
      {
        label: "今日建议动作",
        value: `${recommendedActions.length} 项`,
        trend: "up",
        change: `${recommendedActions.filter(a => a.deadline.includes("24小时") || a.deadline.includes("本周")).length} 项紧急`,
      },
    ],
    summary: `${decisionSummary[0]} ${decisionSummary[1]}`,
  },
  stable: {
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
        change: "跨 4 个市场",
      },
      {
        label: "证据完整性",
        value: "85% A 级证据",
        trend: "up",
        change: "20 条可追溯来源",
      },
    ],
    summary: `${decisionSummary[2]} ${decisionSummary[3]}`,
  },
  rescue: {
    title: "危机应对分析 — 每日跨市场运营决策简报",
    insights: [
      {
        label: "P0 风险点",
        value: `${risks.filter(r => r.priority === "P0").length} 个需关注`,
        trend: "down",
        change: `${risks.filter(r => r.responsibility === "总部").length} 个总部级`,
      },
      {
        label: "竞争压力",
        value: "Chow Tai Fook 全球扩张",
        trend: "down",
        change: "4 个市场受影响",
      },
      {
        label: "合规告警",
        value: "OFAC SDN 更新",
        trend: "down",
        change: "全球范围审查",
      },
    ],
    summary: risks.map(r => `${r.market}: ${r.risk}`).slice(0, 3).join(" "),
  },
};

export function DailyBrief({ mode, onInsightClick }: DailyBriefProps) {
  const data = briefData[mode];
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
          {data.insights.map((insight, index) => (
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
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  insight.trend === "up"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : insight.trend === "down"
                    ? "bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}>
                  {insight.change}
                </div>
                <div className="mt-4 pt-4 border-t border-amber-200/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      点击查看关联分析
                    </span>
                    <ExternalLink className="size-4 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/50 transition-all duration-300"
                  animate={{
                    borderColor: ["rgba(251, 191, 36, 0)", "rgba(251, 191, 36, 0.3)", "rgba(251, 191, 36, 0)"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.button>
          ))}
        </div>

        {/* 简报摘要 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-6 rounded-2xl border border-amber-200/40 bg-gradient-to-r from-amber-50/50 to-rose-50/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="size-2 rounded-full bg-amber-400" />
            <span className="text-sm font-medium text-amber-800">策略简报摘要</span>
          </div>
          <p className="text-amber-700 leading-relaxed">{data.summary}</p>
        </motion.div>
      </div>
    </div>
  );
}

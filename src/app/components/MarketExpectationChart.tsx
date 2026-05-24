import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import type { StrategyMode } from "./StrategyModeSelector";
import { getStrategyData, type MarketPriority } from "../data/strategyData";

interface MarketExpectationChartProps {
  mode: StrategyMode;
}

const colorMap: Record<string, string> = {
  日本: "#d4af37",
  美国: "#cd7f32",
  中国: "#e6a8d7",
  韩国: "#50c878",
  新加坡: "#b87333",
  马来西亚: "#ff6b6b",
  泰国: "#4ecdc4",
  越南: "#ffe66d",
};

// 基于市场优先级数据构建图表数据
function buildMarketChartData(marketPriorities: MarketPriority[]) {
  return marketPriorities.map((m) => {
    const value = m.priority === "P0" ? [32, 28, 25, 15, 12, 10, 8, 5][m.rank - 1] || 8 : m.priority === "P1" ? [22, 18, 15, 12, 10, 8, 5, 3][m.rank - 1] || 5 : 5;

    const trendMap: Record<string, string> = {
      P0: "up",
      P1: m.rank <= 3 ? "up" : "neutral",
      P2: m.rank <= 5 ? "neutral" : "down",
    };

    const recommendationMap: Record<string, string> = {
      P0: "加大投入",
      P1: m.rank <= 3 ? "加大投入" : "保持关注",
      P2: m.rank <= 5 ? "保持关注" : "适度观望",
    };

    return {
      region: m.market,
      value,
      trend: trendMap[m.priority] || "neutral",
      change: m.priority === "P0" ? `P0 优先` : m.priority === "P1" ? `P1 第${m.rank}位` : `P2 第${m.rank}位`,
      recommendation: recommendationMap[m.priority] || "观察",
      color: colorMap[m.market] || "#d4af37",
      description: m.judgment.slice(0, 40) + "...",
    };
  });
}

function buildMarketDataByMode(mode: StrategyMode) {
  const data = getStrategyData(mode);
  const { marketPriorities } = data;
  const baseData = buildMarketChartData(marketPriorities);

  switch (mode) {
    case "innovation":
      return baseData;
    case "stable":
      return baseData;
    case "rescue":
      return baseData.map((d) => {
        const mp = marketPriorities.find((m) => m.market === d.region);
        return {
          ...d,
          trend: mp?.priority === "P0" ? "neutral" : "down",
          change: mp?.priority === "P0" ? "需守住" : "关注风险",
        };
      });
    default:
      return baseData;
  }
}

export function MarketExpectationChart({ mode }: MarketExpectationChartProps) {
  const data = buildMarketDataByMode(mode);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const d = payload[0].payload;
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-amber-200 shadow-xl">
          <div className="font-semibold text-amber-900 mb-2">{d.region}</div>
          <div className="text-2xl font-bold text-amber-800 mb-2">{d.value}%</div>
          <div className="text-xs text-amber-700 mb-2">{d.description}</div>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            d.trend === "up"
              ? "bg-emerald-100 text-emerald-700"
              : d.trend === "down"
              ? "bg-rose-100 text-rose-700"
              : "bg-amber-100 text-amber-700"
          }`}>
            {d.change}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/20 via-rose-200/20 to-amber-200/20 blur-3xl -z-10" />
      <div className="p-8 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-rose-50/30 border border-amber-200/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Target className="size-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold text-amber-900">市场优先级与资源配比</h2>
            <p className="text-sm text-amber-600">基于每日跨市场运营策略报告</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 饼图 */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="region"
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.region} fill={entry.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value: string) => (
                    <span className="text-sm text-amber-800">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 市场列表 */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <motion.div
                key={item.region}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-xl border border-amber-200/30 bg-white/60 hover:bg-white/90 transition-colors"
              >
                <div className="flex-shrink-0 size-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-amber-900">{item.region}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.trend === "up"
                        ? "bg-emerald-100 text-emerald-700"
                        : item.trend === "down"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.change}
                    </span>
                  </div>
                  <p className="text-xs text-amber-600">{item.recommendation} · {item.description}</p>
                </div>
                <span className="text-lg font-bold text-amber-800">{item.value}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

/**
 * 战略框架评分与洞察 — 基于 data extratcor 实际采集数据推导
 * 数据源：collected.db / raw JSON（美国市场，2026-05-23，177 条记录）
 * 评分逻辑：信号密度 × 置信度 × 业务影响加权
 */
const frameworksByMode = {
  innovation: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 72,
      trend: "up",
      insight: "社会趋势（雕塑银饰/有意义的奢侈）+ 技术（实验室培育钻石 CAGR 13.42%）驱动创新窗口",
      keyMetrics: { 机会信号: 13, 威胁信号: 4 },
    },
    {
      id: "porter",
      name: "波特五力",
      score: 68,
      trend: "up",
      insight: "实验室培育钻石 DTC 品牌进入威胁提升，替代品（培育钻 vs 天然钻）压力显著",
      keyMetrics: { 竞争强度: "中高", 替代压力: "高" },
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 75,
      trend: "up",
      insight: "市场呈四层分化：奢侈品群组稳固 / 培育钻群组快速增长 / 可持续群组新兴 / 传统中端受挤压",
      keyMetrics: { 群组数: 4, 培育钻增长: "+13.4%" },
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 65,
      trend: "neutral",
      insight: "设计端（趋势信号密集）和营销端（社交/ESG 叙事）为最高价值环节，合规端为瓶颈",
      keyMetrics: { 趋势信号: "30条", 合规缺口: "需补" },
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 70,
      trend: "up",
      insight: "机会（银饰/培育钻/男士/色彩宝石）> 威胁（合规风险/培育钻蚕食/K型分化），需快速行动",
      keyMetrics: { 机会: 8, 威胁: 6 },
    },
  ],
  stable: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 65,
      trend: "neutral",
      insight: "外部环境总体稳定：金价高位但可预测，Amazon 费率微调，合规要求常规升级",
      keyMetrics: { 机会信号: 6, 威胁信号: 5 },
    },
    {
      id: "porter",
      name: "波特五力",
      score: 62,
      trend: "neutral",
      insight: "现有竞争格局稳固：Richemont/Cartier FY2026 增长强劲，Tiffany/Pandora 策略透明",
      keyMetrics: { 竞争强度: "中", 替代压力: "中" },
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 68,
      trend: "neutral",
      insight: "所处群组定位清晰，培育钻群组为最值得关注的相邻群组",
      keyMetrics: { 群组数: 4, 市场增速: "~5%" },
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 70,
      trend: "up",
      insight: "采购端（金价 $145/g 需监控）+ 分销端（Amazon FBA 费率微调 +$0.08）为当前优化重点",
      keyMetrics: { 金价: "$145/g", FBA涨幅: "+0.5%" },
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 67,
      trend: "neutral",
      insight: "优势（趋势感知强、数据驱动决策）vs 劣势（仅覆盖美国市场、数据置信度不均）",
      keyMetrics: { 机会: 5, 威胁: 4 },
    },
  ],
  rescue: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 48,
      trend: "down",
      insight: "外部压力集中：Amazon 珠宝合规收紧（下架风险）、OFAC 制裁审查、培育钻替代加速",
      keyMetrics: { 机会信号: 3, 威胁信号: 8 },
    },
    {
      id: "porter",
      name: "波特五力",
      score: 42,
      trend: "down",
      insight: "五重压力叠加：培育钻替代 + Amazon 合规壁垒 + 买方信息透明 + 金价高位挤压",
      keyMetrics: { 竞争强度: "高", 替代压力: "极高" },
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 45,
      trend: "down",
      insight: "传统中端群组受「K 型」市场挤压最重，需评估向培育钻群组或可持续群组迁移的可行性",
      keyMetrics: { 群组数: 4, 中端萎缩: "显著" },
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 52,
      trend: "down",
      insight: "合规成本上升（材料文档/铅测试/贵金属验证）+ 低毛利 SKU 受 FBA 费率挤压需紧急处理",
      keyMetrics: { 合规项: "3项必补", 利润率压力: "明确" },
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 44,
      trend: "down",
      insight: "威胁（合规下架/培育钻蚕食/K型分化）严峻，优势（趋势感知）需快速转化为行动",
      keyMetrics: { 机会: 3, 威胁: 8 },
    },
  ],
};

export function FrameworkOverview({ mode, onFrameworkClick }: FrameworkOverviewProps) {
  const frameworks = frameworksByMode[mode];

  const getScoreColor = (score: number) => {
    if (score >= 68) return "text-emerald-600 bg-emerald-500/10";
    if (score >= 55) return "text-amber-600 bg-amber-500/10";
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
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-amber-900">战略框架分析</h2>
          <span className="text-xs text-amber-500 bg-amber-100 px-2 py-0.5 rounded-full">
            基于实际采集数据
          </span>
        </div>
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

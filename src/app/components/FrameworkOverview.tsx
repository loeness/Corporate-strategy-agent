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
 * 战略框架评分与洞察 — 严格基于三个 md 数据源文件
 * 数据源：
 *   innovation → innovation_breakthrough_strategy_report.md
 *   stable     → steady_operations_strategy_report.md
 *   rescue     → strategic_transformation_strategy_report.md
 * 评分逻辑：信号密度 × 置信度 × 业务影响加权
 */
const frameworksByMode = {
  innovation: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 74,
      trend: "up",
      insight: "社会趋势（中性化/可持续/侘寂美学）+ 技术（培育钻石独立品类/AR试戴）+ 多市场政策合规压力并存，创新窗口与社会需求高度共振",
      keyMetrics: { 机会信号: 11, 威胁信号: 10 },
    },
    {
      id: "porter",
      name: "波特五力",
      score: 66,
      trend: "up",
      insight: "培育钻石DTC品牌进入威胁 + 替代品压力显著 + CTF东南亚扩张加剧竞争，新材质品类可形成差异化壁垒",
      keyMetrics: { 竞争强度: "中高", 替代压力: "高" },
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 73,
      trend: "up",
      insight: "四层群组分化明确：奢侈品群组稳固 / 培育钻群组年增12.6% / 可持续群组新兴 / 传统中端受挤压，第二皮肤品类可开辟新群组",
      keyMetrics: { 群组数: 4, 培育钻增长: "+13.4%" },
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 67,
      trend: "up",
      insight: "设计端（8条跨市场趋势信号密集）和营销端（社交/KOL/直播叙事）为高价值环节，日本过敏合规和Amazon合规为关键瓶颈",
      keyMetrics: { 趋势信号: "8条", 合规缺口: "日美需补" },
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 72,
      trend: "up",
      insight: "机会（11条跨市场创新机会 > 10条风险）：培育钻/银饰/模块化/IP联名/第二皮肤多方向可试，须防范价格倒挂和合规风险",
      keyMetrics: { 机会: 11, 威胁: 10 },
    },
  ],
  stable: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 63,
      trend: "neutral",
      insight: "外部环境以运营压力为主：金价高位$145/g但可预测，多市场Amazon费率上调0.4%，OFAC SDN全域合规需建立系统化筛查",
      keyMetrics: { 机会信号: 12, 威胁信号: 9 },
    },
    {
      id: "porter",
      name: "波特五力",
      score: 60,
      trend: "neutral",
      insight: "现有竞争格局总体稳固但CTF东南亚扩张构成区域威胁，平台规则（Coupang/Amazon）提高进入壁垒的同时也增加运营成本",
      keyMetrics: { 竞争强度: "中", 替代压力: "中" },
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 65,
      trend: "neutral",
      insight: "所处群组定位清晰，培育钻群组为最值得关注的相邻群组（CAGR 13.42%），新加坡GST豁免打开投资贵金属新群组",
      keyMetrics: { 群组数: 4, 市场增速: "~5%" },
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 72,
      trend: "up",
      insight: "采购端（金价$145/g动态监控）+ 分销端（多市场FBA费率微调 + 日本贴标合规截止3月31日）为当前优化重点，包装优化可降本$0.3-0.5/单",
      keyMetrics: { 金价: "$145/g", FBA涨幅: "+0.5%" },
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 65,
      trend: "neutral",
      insight: "优势（趋势感知强、数据驱动）vs 劣势（竞品价格透明化压力、部分市场数据置信度不均），机会（12条）略多于威胁（9条）",
      keyMetrics: { 机会: 12, 威胁: 9 },
    },
  ],
  rescue: [
    {
      id: "pestle",
      name: "PESTLE 分析",
      score: 46,
      trend: "down",
      insight: "结构性压力集中：CTF全球品牌升级+品类扩展（家居线）、Amazon合规收紧、OFAC全域制裁审查、培育钻独立品类重塑消费价值",
      keyMetrics: { 机会信号: 12, 威胁信号: 9 },
    },
    {
      id: "porter",
      name: "波特五力",
      score: 40,
      trend: "down",
      insight: "五重压力叠加：CTF全球化竞争 + 培育钻替代加速 + Amazon合规壁垒 + 买方信息透明 + 金价高位挤压利润，需总部层面战略应对",
      keyMetrics: { 竞争强度: "高", 替代压力: "极高" },
    },
    {
      id: "strategic-group",
      name: "战略群组",
      score: 43,
      trend: "down",
      insight: "传统中端群组受K型市场挤压最重，需评估向培育钻群组（年增12.6%）或可持续群组迁移的可行性，CTF正占据高端中国珠宝心智份额",
      keyMetrics: { 群组数: 4, 中端萎缩: "显著" },
    },
    {
      id: "value-chain",
      name: "价值链分析",
      score: 50,
      trend: "down",
      insight: "合规成本上升（材料文档/铅测试/贵金属验证）+ 多市场FBA费率上调 + 关税Section 122波动，须建立跨市场电商运营中台统一管理",
      keyMetrics: { 合规项: "3项必补", 利润率压力: "明确" },
    },
    {
      id: "swot",
      name: "SWOT 矩阵",
      score: 42,
      trend: "down",
      insight: "威胁（CTF全球化/合规下架/培育钻蚕食/K型分化/关税波动）严峻且紧迫，机会（12条）存在但需要战略级资源投入方能兑现",
      keyMetrics: { 机会: 12, 威胁: 9 },
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

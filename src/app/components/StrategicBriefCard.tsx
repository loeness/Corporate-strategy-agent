import { motion } from "motion/react";
import { FileText, Calendar, MapPin, Target } from "lucide-react";
import { useRegion, regionConfig } from "../contexts/RegionContext";
import type { StrategyMode } from "./StrategyModeSelector";
import { getStrategyData } from "../data/strategyData";

interface StrategicBriefCardProps {
  mode: StrategyMode;
}

const modeLabels = {
  stable: "稳健运营模式",
  innovation: "创新突破模式",
  rescue: "战略拯救模式",
};

// 基于策略报告构建简报
function buildBrief(mode: StrategyMode, region: string) {
  const data = getStrategyData(mode);
  const { decisionSummary, marketPriorities, keyChanges, opportunities, risks, recommendedActions } = data;

  const mp = marketPriorities.find((m) => m.market === region);
  const isGlobal = region === "全球" || region === "global";

  if (isGlobal) {
    const p0Markets = marketPriorities.filter((m) => m.priority === "P0").map((m) => m.market);
    return {
      title: "全球跨市场战略简报",
      summary: decisionSummary,
      keyInsights: [
        {
          label: "P0 优先市场",
          value: `${p0Markets.length} 个市场`,
          description: p0Markets.join("、") + " — 综合得分最高，需优先配置资源。",
        },
        {
          label: "跨市场关键变化",
          value: `${keyChanges.length} 项`,
          description: `涵盖${[...new Set(keyChanges.map(k => k.category))].join("、")}等维度。${keyChanges[0]?.change || ""}`,
        },
        {
          label: "竞争格局",
          value: "Chow Tai Fook 全球扩张",
          description: keyChanges.find(k => k.id === "K-07")?.businessImpact || keyChanges[0]?.businessImpact || "",
        },
      ],
      recommendations: recommendedActions.slice(0, 3).map((a) => a.action),
    };
  }

  const regionMp = mp || marketPriorities[0];
  const regionRisks = risks.filter((r) => r.market === region);
  const regionOpps = opportunities.filter((o) => o.market === region);
  const regionChanges = keyChanges.filter((k) => k.market === region);

  return {
    title: `${region}市场战略简报`,
    summary: [regionMp.judgment],
    keyInsights: [
      {
        label: "市场优先级",
        value: `${regionMp.priority} / 排名第${regionMp.rank}`,
        description: regionMp.judgment,
      },
      {
        label: "关键变化",
        value: `${regionChanges.length} 项`,
        description: regionChanges.length > 0 ? regionChanges[0].change : "暂无关键变化记录",
      },
      {
        label: "机会风险比",
        value: `${regionOpps.length} : ${regionRisks.length}`,
        description: regionOpps.length > 0 ? regionOpps[0].opportunity.slice(0, 80) + "..." : "暂无机会记录",
      },
    ],
    recommendations:
      mode === "rescue"
        ? regionRisks.slice(0, 3).map((r) => `应对：${r.risk}`)
        : regionOpps.slice(0, 3).map((o) => o.opportunity.slice(0, 60) + "..."),
  };
}

export function StrategicBriefCard({ mode }: StrategicBriefCardProps) {
  const { currentRegion } = useRegion();
  const config = regionConfig[currentRegion];

  const regionLabel =
    currentRegion === "global" ? "全球" : (config as any)?.label || currentRegion;
  const brief = buildBrief(mode, regionLabel);

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/20 via-rose-200/20 to-amber-200/20 blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-rose-50/30 border border-amber-200/50 shadow-2xl backdrop-blur-sm"
      >
        {/* 标题区 */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FileText className="size-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900">{brief.title}</h2>
                <p className="text-sm text-amber-600">{modeLabels[mode]}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-amber-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span>{new Date().toLocaleDateString("zh-CN")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                <span>{regionLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="size-4" />
                <span>数据来源：策略报告</span>
              </div>
            </div>
          </div>
        </div>

        {/* 摘要 */}
        <div className="p-5 mb-6 rounded-2xl bg-gradient-to-r from-amber-100/40 to-rose-100/40 border border-amber-200/30 space-y-2">
          {brief.summary.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="flex-shrink-0 size-5 rounded-full bg-amber-200 text-amber-700 text-xs flex items-center justify-center mt-0.5">{i+1}</span>
              <p className="text-amber-800 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* 关键洞察 — 数字展示 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {brief.keyInsights.map((insight, idx) => (
            <motion.div
              key={insight.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-xl bg-white/70 border border-amber-200/30"
            >
              <div className="text-xs text-amber-500 mb-1">{insight.label}</div>
              <div className="text-2xl font-bold text-amber-800 mb-2">{insight.value}</div>
              <div className="text-xs text-amber-600 leading-relaxed">{insight.description}</div>
            </motion.div>
          ))}
        </div>

        {/* 建议 */}
        {brief.recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-2 rounded-full bg-amber-400" />
              <span className="text-sm font-medium text-amber-800">建议行动</span>
            </div>
            <div className="space-y-2">
              {brief.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/60 border border-amber-200/20"
                >
                  <span className="flex-shrink-0 size-5 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-amber-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { X, Link2, ChevronRight } from "lucide-react";

interface InsightDetailModalProps {
  insight: any;
  onClose: () => void;
  onFrameworkClick: (framework: string) => void;
}

// 简报项与战略框架的关联映射
const insightFrameworkMapping: Record<string, any> = {
  // 创新突破模式
  "新兴市场机会": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 95, keyPoint: "社会趋势：Z世代消费崛起", reason: "年轻消费者偏好个性化定制，市场机会点集中" },
      { id: "porter", name: "波特五力", relevance: 88, keyPoint: "新进入者威胁提升", reason: "市场进入壁垒降低，为创新者提供机会" },
      { id: "strategic-group", name: "战略群组", relevance: 92, keyPoint: "创新科技群组快速崛起", reason: "科技驱动品牌年增长率超40%" },
    ],
    dataSources: 18,
    summary: "基于 PESTLE 社会维度分析、波特五力新进入者分析和战略群组创新群组评估，综合识别出 8 个具有突破潜力的市场机会点。"
  },
  "技术创新指数": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 98, keyPoint: "技术突破：区块链溯源", reason: "数字溯源技术成熟度提升，消费者信任度大幅提高" },
      { id: "value-chain", name: "价值链分析", relevance: 94, keyPoint: "AI辅助设计", reason: "生成式AI工具缩短设计周期60%" },
      { id: "swot", name: "SWOT 分析", relevance: 90, keyPoint: "机会：技术赋能", reason: "新技术可重构竞争优势，开辟蓝海市场" },
    ],
    dataSources: 25,
    summary: "综合 PESTLE 技术维度、价值链创新环节和 SWOT 技术机会评估，技术创新指数达到 87/100，投资回报率持续提升。"
  },
  "竞争差异化": {
    frameworks: [
      { id: "porter", name: "波特五力", relevance: 91, keyPoint: "行业竞争强度分析", reason: "创新成为差异化关键" },
      { id: "strategic-group", name: "战略群组", relevance: 95, keyPoint: "创新科技群组定位", reason: "与传统群组形成明显差异" },
      { id: "swot", name: "SWOT 分析", relevance: 87, keyPoint: "优势：品牌积淀", reason: "创新可强化现有优势" },
    ],
    dataSources: 16,
    summary: "基于波特五力竞争分析、战略群组差异化定位和 SWOT 优势评估，竞争差异化优势扩大 5%。"
  },

  // 稳定运营模式
  "运营效率": {
    frameworks: [
      { id: "value-chain", name: "价值链分析", relevance: 96, keyPoint: "生产效率与采购优化", reason: "产能利用率稳定在85%，成本下降2%" },
      { id: "pestle", name: "PESTLE 分析", relevance: 82, keyPoint: "经济与技术环境稳定", reason: "宏观环境利于运营优化" },
      { id: "swot", name: "SWOT 分析", relevance: 88, keyPoint: "优势：规模效应", reason: "成本结构优于行业平均" },
    ],
    dataSources: 22,
    summary: "综合价值链效率分析、宏观环境评估和规模优势评估，运营效率达到 92%，同比提升 2%。"
  },
  "成本控制": {
    frameworks: [
      { id: "value-chain", name: "价值链分析", relevance: 94, keyPoint: "采购优化与物流优化", reason: "集中采购规模效应显现，库存周转率提升" },
      { id: "porter", name: "波特五力", relevance: 78, keyPoint: "供应商关系稳固", reason: "长期合作关系降低采购成本" },
    ],
    dataSources: 15,
    summary: "基于价值链成本环节和供应商议价分析，成本控制措施有效，正在持续优化中。"
  },
  "风险指标": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 85, keyPoint: "政策与经济稳定性", reason: "宏观风险可控" },
      { id: "porter", name: "波特五力", relevance: 80, keyPoint: "竞争格局稳定", reason: "行业竞争有序" },
      { id: "swot", name: "SWOT 分析", relevance: 88, keyPoint: "威胁评估", reason: "外部威胁较低" },
    ],
    dataSources: 19,
    summary: "综合 PESTLE 风险评估、波特竞争分析和 SWOT 威胁评估，整体风险指标为低风险，下降 3 点。"
  },

  // 拯救者模式
  "关键风险点": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 93, keyPoint: "监管与经济压力", reason: "外部环境存在多重压力点" },
      { id: "porter", name: "波特五力", relevance: 96, keyPoint: "多重竞争压力", reason: "价格战侵蚀利润，客户流失加速" },
      { id: "swot", name: "SWOT 分析", relevance: 98, keyPoint: "生存威胁", reason: "现金流与市场双重压力" },
    ],
    dataSources: 28,
    summary: "基于 PESTLE 外部风险、波特竞争压力和 SWOT 威胁评估，识别 5 个需关注的关键风险点，较上期减少 2 个。"
  },
  "应对措施进展": {
    frameworks: [
      { id: "value-chain", name: "价值链分析", relevance: 92, keyPoint: "成本削减与效率提升", reason: "紧急优化措施正在实施" },
      { id: "strategic-group", name: "战略群组", relevance: 86, keyPoint: "战略转型方向", reason: "向更健康的群组迁移" },
      { id: "swot", name: "SWOT 分析", relevance: 88, keyPoint: "改革窗口期", reason: "危机倒逼转型，快速试错" },
    ],
    dataSources: 24,
    summary: "综合价值链优化进度、战略转型路径和改革机会评估，应对措施完成度达 68%，提升 15%。"
  },
  "恢复健康度": {
    frameworks: [
      { id: "porter", name: "波特五力", relevance: 84, keyPoint: "竞争态势变化", reason: "部分压力得到缓解" },
      { id: "value-chain", name: "价值链分析", relevance: 90, keyPoint: "运营效率改善", reason: "成本控制见效" },
      { id: "swot", name: "SWOT 分析", relevance: 88, keyPoint: "优势重建", reason: "核心能力正在恢复" },
    ],
    dataSources: 21,
    summary: "基于竞争态势监测、运营效率追踪和优势重建评估，恢复健康度改善中，提升 8 点。"
  },
};

export function InsightDetailModal({ insight, onClose, onFrameworkClick }: InsightDetailModalProps) {
  if (!insight) return null;

  const mappingData = insightFrameworkMapping[insight.label];
  if (!mappingData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-border p-6 flex items-start justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Link2 className="size-5 text-primary" />
                <h2 className="text-foreground">{insight.label}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{insight.value}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                  {mappingData.frameworks.length} 个关联框架
                </span>
                <span className="px-2.5 py-1 rounded-full bg-muted text-foreground">
                  {mappingData.dataSources} 条数据源
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="size-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
            {/* Summary */}
            <div className="mb-6 p-5 rounded-xl bg-muted/30 border border-border">
              <h3 className="text-foreground/90 mb-3 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary"></div>
                分析概要
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {mappingData.summary}
              </p>
            </div>

            {/* Frameworks */}
            <div>
              <h3 className="text-foreground/90 mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary"></div>
                关联的战略框架
              </h3>
              <div className="space-y-3">
                {mappingData.frameworks.map((framework: any, index: number) => (
                  <motion.button
                    key={framework.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      onClose();
                      onFrameworkClick(framework.id);
                    }}
                    className="w-full p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all text-left group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-foreground group-hover:text-primary transition-colors">
                            {framework.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-xs bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700">
                            相关性 {framework.relevance}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          关键点：{framework.keyPoint}
                        </p>
                        <p className="text-xs text-foreground/70">
                          {framework.reason}
                        </p>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
                    </div>

                    <div className="pt-3 border-t border-border">
                      <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        点击查看完整框架分析 →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

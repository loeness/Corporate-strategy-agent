import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Building2, Tag } from "lucide-react";

interface DataSourceModalProps {
  dataPoint: any;
  onClose: () => void;
}

// 模拟数据源详情
const mockDataSources = [
  {
    id: 1,
    title: "Global Luxury Jewelry Market Analysis 2026",
    source: "McKinsey & Company",
    date: "2026-05-15",
    type: "研究报告",
    summary: "深度分析全球奢侈珠宝市场趋势，重点关注可持续发展、数字化转型和消费者行为变化。报告基于对50+国家、1000+消费者的调研数据。",
    keyFindings: [
      "Z世代消费者占市场增量的42%，对品牌故事和可持续性高度敏感",
      "可持续珠宝认证使品牌溢价能力提升15-20%",
      "数字化渠道贡献38%的销售额，同比增长25%"
    ],
    relevance: 95,
    url: "#"
  },
  {
    id: 2,
    title: "Blockchain Technology in Jewelry Supply Chain",
    source: "Deloitte Insights",
    date: "2026-05-10",
    type: "技术白皮书",
    summary: "探讨区块链技术在珠宝供应链溯源中的应用案例，包括技术架构、实施成本和商业价值。覆盖15个实际应用案例。",
    keyFindings: [
      "区块链溯源系统平均实施成本为150-300万美元",
      "消费者信任度提升42%，愿意为溯源产品支付8-12%溢价",
      "假货率降低65%，供应链透明度提高3倍"
    ],
    relevance: 92,
    url: "#"
  },
  {
    id: 3,
    title: "Sustainable Jewelry Consumer Behavior Study",
    source: "Bain & Company",
    date: "2026-05-08",
    type: "消费者调研",
    summary: "针对18-45岁消费者的可持续珠宝购买行为研究，样本量3500+，覆盖北美、欧洲、亚太市场。",
    keyFindings: [
      "67%的年轻消费者表示会优先选择环保认证品牌",
      "可持续材料的接受度从2024年的52%提升至2026年的78%",
      "品牌透明度是影响购买决策的第二大因素（仅次于价格）"
    ],
    relevance: 88,
    url: "#"
  },
  {
    id: 4,
    title: "Lab-Grown Diamond Market Penetration Report",
    source: "Gartner",
    date: "2026-05-05",
    type: "市场数据",
    summary: "实验室培育钻石市场渗透率分析，包括价格趋势、消费者认知和市场预测。基于全球50+零售商的销售数据。",
    keyFindings: [
      "培育钻石在订婚戒指市场份额达18%，年增长率35%",
      "价格比天然钻石低40-60%，质量差异逐渐缩小",
      "25-35岁消费者是主要购买群体，占比达62%"
    ],
    relevance: 90,
    url: "#"
  },
  {
    id: 5,
    title: "Digital Transformation ROI in Luxury Retail",
    source: "Forrester Research",
    date: "2026-05-01",
    type: "投资回报分析",
    summary: "奢侈品零售行业数字化转型投资回报率研究，涵盖AR/VR、AI、大数据等技术应用。",
    keyFindings: [
      "AR虚拟试戴功能使在线转化率提升35%，退货率下降28%",
      "AI推荐系统提升客户终身价值30%",
      "数字化投资平均18-24个月收回成本"
    ],
    relevance: 85,
    url: "#"
  },
];

export function DataSourceModal({ dataPoint, onClose }: DataSourceModalProps) {
  if (!dataPoint) return null;

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
          className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-border p-6 flex items-start justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-foreground">{dataPoint.label || dataPoint.name || dataPoint.dimension}</h2>
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs">
                  {dataPoint.sources} 条数据源
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{dataPoint.details}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="size-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            <div className="space-y-4">
              {mockDataSources.map((source, index) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-border rounded-xl p-5 bg-card hover:border-foreground/20 hover:shadow-md transition-all group"
                >
                  {/* Source Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">
                        {source.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="size-4" />
                          {source.source}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="size-4" />
                          {new Date(source.date).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Tag className="size-4" />
                          {source.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">相关性</div>
                        <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700">
                          {source.relevance}%
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                        <ExternalLink className="size-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                    {source.summary}
                  </p>

                  {/* Key Findings */}
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground mb-2">关键发现</div>
                    {source.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <div className="size-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <p className="text-foreground/70 leading-relaxed">{finding}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                以上数据源经过相关性评分排序，展示与「{dataPoint.label || dataPoint.name || dataPoint.dimension}」最相关的前 {mockDataSources.length} 条信息
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

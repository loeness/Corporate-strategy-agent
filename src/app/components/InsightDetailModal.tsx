import { motion, AnimatePresence } from "motion/react";
import { X, Link2, ChevronRight } from "lucide-react";

interface InsightDetailModalProps {
  insight: any;
  onClose: () => void;
  onFrameworkClick: (framework: string) => void;
}

// 简报项与战略框架的关联映射（基于 collected.db 实际数据）
const insightFrameworkMapping: Record<string, any> = {
  // 创新突破模式
  "P0 机会数": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 92, keyPoint: "社会趋势：雕塑银饰 + 有意义的奢侈", reason: "多源确认 2026 主流趋势，消费者从产品目录转向价值观叙事" },
      { id: "porter", name: "波特五力", relevance: 88, keyPoint: "替代品威胁：培育钻石 CAGR 13.42%", reason: "实验室培育钻石 $335.4 亿市场重新定义「有价值的珠宝」" },
      { id: "swot", name: "SWOT 分析", relevance: 90, keyPoint: "机会：四大创新方向强证据支撑", reason: "银饰/培育钻/男士珠宝/色彩宝石均有多源确认" },
    ],
    dataSources: 10,
    summary: "基于 PESTLE 社会趋势分析、波特五力替代品威胁评估和 SWOT 机会矩阵，从 collected.db 306 条市场趋势中识别出 10 个 P0 级创新机会，覆盖银饰/培育钻/男士珠宝/色彩宝石四大方向。"
  },
  "市场覆盖": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 85, keyPoint: "8 个市场宏观环境差异", reason: "US/CN/JP/KR/SG/MY/TH/VN 各市场政策、经济、社会维度差异显著" },
      { id: "strategic-group", name: "战略群组", relevance: 90, keyPoint: "四层群组分化", reason: "奢侈品群组稳固 / 培育钻群组快速增长 / 可持续群组新兴 / 传统中端受挤压" },
      { id: "value-chain", name: "价值链分析", relevance: 82, keyPoint: "分销渠道覆盖不均", reason: "电商维度 CN 200 条 vs US 61 条，东南亚电商数据丰富但需本地化落地" },
    ],
    dataSources: 8,
    summary: "基于 PESTLE 宏观环境、战略群组市场分层和价值链分销分析，8 个市场数据采集完成度：CN 1,288 条 / JP 1,166 条 / US 818 条 / KR 903 条 / VN 684 条 / SG 595 条 / MY 590 条 / TH 584 条。"
  },
  "今日建议动作": {
    frameworks: [
      { id: "value-chain", name: "价值链分析", relevance: 93, keyPoint: "从合规到营销的全链路行动", reason: "OFAC 审查（合规端）→ 产品开发（设计端）→ 社交内容（营销端）" },
      { id: "swot", name: "SWOT 分析", relevance: 88, keyPoint: "优势转化行动", reason: "趋势感知能力需快速转化为产品开发和营销执行力" },
      { id: "pestle", name: "PESTLE 分析", relevance: 80, keyPoint: "合规与技术窗口", reason: "Amazon 珠宝合规收紧创造准入壁垒窗口" },
    ],
    dataSources: 8,
    summary: "基于价值链全链路分析、SWOT 优势转化和 PESTLE 合规窗口评估，8 项建议动作中 3 项为 24 小时内紧急（OFAC 审查/合规核查/Coupang 转换），5 项为本周至本月内执行。"
  },

  // 稳定运营模式
  "风险监控项": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 90, keyPoint: "政策合规与宏观风险", reason: "OFAC SDN 全市场更新 / Amazon 珠宝合规收紧 / Walmart 珠宝政策更新" },
      { id: "porter", name: "波特五力", relevance: 85, keyPoint: "竞争威胁评估", reason: "CTF 全球扩张 / 培育钻石蚕食 / Cartier 涨价 / Laopu Gold 品牌化" },
      { id: "swot", name: "SWOT 分析", relevance: 88, keyPoint: "威胁与劣势监控", reason: "11 项风险中 6 项 P0 级（OFAC/Amazon 合规/CTF 扩张/Coupang/Cartier/Poh Kong）" },
    ],
    dataSources: 11,
    summary: "基于 PESTLE 政策合规维度、波特五力竞争威胁和 SWOT 风险矩阵，从 collected.db 全维度数据中识别出 11 项风险（6 项 P0 / 5 项 P1），覆盖合规/竞争/价格/市场结构/平台政策五大类别。"
  },
  "后续观察清单": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 82, keyPoint: "宏观环境持续监测", reason: "金价 $145/g 单日波动超 2% 触发定价评估 / 日本关税调整 / 各国平台政策变化" },
      { id: "value-chain", name: "价值链分析", relevance: 88, keyPoint: "全链路监控点", reason: "采购端（金价）→ 合规端（Amazon/Walmart）→ 渠道端（Coupang）→ 竞争端（CTF 门店客流）" },
      { id: "swot", name: "SWOT 分析", relevance: 85, keyPoint: "机会窗口监控", reason: "男士珠宝搜索量 / 培育钻石搜索量 / 竞品促销价格带变化均设触发阈值" },
    ],
    dataSources: 8,
    summary: "基于 PESTLE 宏观监测、价值链全链路触发条件和 SWOT 机会窗口，8 项观察清单覆盖 US/CN/KR/JP/东南亚，每项设明确触发条件（如金价波动 >2%、搜索量增长 >20%），自动升级为行动项。"
  },
  "证据完整性": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 88, keyPoint: "数据源可信度分层", reason: "Primary API（conf=1.0）423 条 vs Tavily Search（conf=0.7）4,251 条" },
      { id: "value-chain", name: "价值链分析", relevance: 85, keyPoint: "信息流质量评估", reason: "竞品维度 60%+ 噪音率 / 地缘政治有效信号稀疏 / social_media 全部为 Tavily" },
      { id: "swot", name: "SWOT 分析", relevance: 90, keyPoint: "数据优势与劣势", reason: "价格/FX/OFAC 全 Primary API（优势）vs 竞品噪音率高/东南亚 Tavily 覆盖不足（劣势）" },
    ],
    dataSources: 30,
    summary: "基于 PESTLE 数据源可信度、价值链信息流和 SWOT 数据基础评估，collected.db 共 4,674 条记录。A 级证据 30 条（价格/FX/OFAC/Richemont/Pandora），B 级证据来自 Tavily。竞品噪音率 60%+、地缘政治噪音率高为当前数据质量最大瓶颈。"
  },

  // 拯救者模式
  "P0 风险点": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 95, keyPoint: "OFAC 制裁 + Amazon 合规双重压力", reason: "OFAC SDN 全市场拉取（conf=1.0）需 24 小时内审查 / Amazon 珠宝合规未完成即下架" },
      { id: "porter", name: "波特五力", relevance: 92, keyPoint: "CTF 东南亚扩张 + 培育钻石替代", reason: "CTF 新加坡/曼谷/杭州三线扩张 / 培育钻石 $335.4 亿侵蚀天然钻价格体系" },
      { id: "swot", name: "SWOT 分析", relevance: 90, keyPoint: "K 型分化 + 金价高位双重挤压", reason: "中端产品线需求萎缩（ucfs.net）+ 金价 $145/g 压利润" },
    ],
    dataSources: 6,
    summary: "基于 PESTLE 监管风险、波特五力竞争替代压力和 SWOT 生存威胁评估，11 项风险中 6 项为 P0 级（OFAC/Amazon 合规/CTF 扩张/Coupang/Cartier 涨价/Poh Kong），需总部级响应。"
  },
  "竞争压力": {
    frameworks: [
      { id: "porter", name: "波特五力", relevance: 96, keyPoint: "培育钻石替代加速 (CAGR 13.42%)", reason: "培育钻石 DTC 品牌通过社交媒体直触消费者，传统渠道优势被削弱" },
      { id: "strategic-group", name: "战略群组", relevance: 90, keyPoint: "传统中端群组双向挤压", reason: "高端群组（Cartier/Tiffany）稳固 + 培育钻群组快速增长 + K 型消费分化" },
      { id: "swot", name: "SWOT 分析", relevance: 85, keyPoint: "竞争劣势：噪音率 60%+", reason: "竞品情报 2,936 条中仅 25 条 Primary API 为有效信号，决策信息基础薄弱" },
    ],
    dataSources: 7,
    summary: "基于波特五力竞争结构分析、战略群组定位和 SWOT 劣势评估，培育钻石替代 + CTF 全球扩张 + 本土品牌高端化三重竞争压力叠加，中端市场面临结构性挤压。"
  },
  "合规告警": {
    frameworks: [
      { id: "pestle", name: "PESTLE 分析", relevance: 98, keyPoint: "全球合规压力集中爆发", reason: "OFAC SDN（8 市场）/ Amazon 珠宝合规（US）/ Walmart 政策（US）/ 日本 71 条合规记录" },
      { id: "value-chain", name: "价值链分析", relevance: 92, keyPoint: "合规端为当前最大瓶颈", reason: "Amazon 材料文档+铅测试+贵金属验证 / FBA Prep 服务终止 / 日本关税+进口规则变动" },
      { id: "porter", name: "波特五力", relevance: 78, keyPoint: "合规壁垒提高进入门槛", reason: "不合规竞品退出释放市场份额，但短期合规成本显著上升" },
    ],
    dataSources: 5,
    summary: "基于 PESTLE 监管维度、价值链合规环节和波特五力进入壁垒分析，OFAC 审查（24h 内）+ Amazon 合规（本周内）+ Coupang 转型（本周内）为当前最高优先级合规事项，延误将直接导致下架/冻结/流量损失。"
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

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { StrategyMode } from "./StrategyModeSelector";

interface StrategyFrameworkProps {
  mode: StrategyMode;
}

type Framework = "pestle" | "porter" | "strategic-group" | "value-chain" | "swot";

interface FrameworkData {
  id: Framework;
  name: string;
  summary: string;
  keyPoints: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    sources: number;
  }>;
}

const frameworksByMode: Record<StrategyMode, Record<Framework, FrameworkData>> = {
  innovation: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary: "宏观环境呈现创新友好态势，可持续发展政策与数字化转型为主要驱动力",
      keyPoints: [
        { title: "政策利好：可持续珠宝认证", description: "多国推出绿色珠宝标准，为创新产品提供市场准入优势", impact: "high", sources: 12 },
        { title: "技术突破：区块链溯源", description: "数字溯源技术成熟度提升，消费者信任度大幅提高", impact: "high", sources: 8 },
        { title: "社会趋势：Z世代消费崛起", description: "年轻消费者偏好个性化定制，对品牌故事敏感", impact: "medium", sources: 15 },
        { title: "环境压力：碳中和要求", description: "供应链碳排放披露成为行业标准，需要创新解决方案", impact: "medium", sources: 9 },
      ]
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary: "竞争格局变化为创新者创造机会，新技术降低部分进入壁垒",
      keyPoints: [
        { title: "新进入者威胁提升", description: "DTC品牌和科技公司入局，传统渠道优势被削弱", impact: "high", sources: 10 },
        { title: "替代品压力：实验室钻石", description: "培育钻石市场份额快速增长，价格优势明显", impact: "high", sources: 14 },
        { title: "供应商议价能力分化", description: "传统供应商受限，科技供应商话语权增强", impact: "medium", sources: 7 },
        { title: "买方议价能力增强", description: "信息透明度提高，消费者比价能力提升", impact: "medium", sources: 11 },
      ]
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary: "市场呈现分层趋势，创新型群组增长最快",
      keyPoints: [
        { title: "奢侈品群组：稳定高端", description: "传统奢侈品牌保持定位，强调传承与工艺", impact: "low", sources: 6 },
        { title: "创新科技群组：快速崛起", description: "科技驱动品牌年增长率超40%，用户粘性高", impact: "high", sources: 13 },
        { title: "可持续群组：新兴赛道", description: "环保理念品牌获得资本青睐，品牌溢价能力强", impact: "high", sources: 9 },
        { title: "快时尚群组：面临挑战", description: "性价比品牌受替代品冲击，市场份额下滑", impact: "medium", sources: 8 },
      ]
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary: "创新机会集中在设计与客户体验环节",
      keyPoints: [
        { title: "AI辅助设计", description: "生成式AI工具缩短设计周期，降低创意成本", impact: "high", sources: 11 },
        { title: "虚拟试戴技术", description: "AR/VR技术提升线上转化率，减少退货率", impact: "high", sources: 9 },
        { title: "智能制造", description: "3D打印与自动化提高生产灵活性", impact: "medium", sources: 7 },
        { title: "数据驱动营销", description: "精准推荐算法提升客户终身价值", impact: "medium", sources: 10 },
      ]
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary: "机会大于威胁，需要快速响应市场变化",
      keyPoints: [
        { title: "优势：品牌积淀", description: "成熟供应链与品牌认知度提供创新基础", impact: "high", sources: 8 },
        { title: "劣势：组织敏捷性", description: "传统决策流程可能延缓创新响应速度", impact: "medium", sources: 6 },
        { title: "机会：技术赋能", description: "新技术可重构竞争优势，开辟蓝海市场", impact: "high", sources: 15 },
        { title: "威胁：颠覆性竞争", description: "跨界竞争者可能重新定义行业规则", impact: "high", sources: 12 },
      ]
    },
  },
  stable: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary: "宏观环境总体稳定，需关注监管变化与成本波动",
      keyPoints: [
        { title: "政策稳定性", description: "主要市场政策环境平稳，合规要求可预测", impact: "medium", sources: 10 },
        { title: "经济周期位置", description: "全球经济温和增长，消费者信心指数稳定", impact: "medium", sources: 12 },
        { title: "供应链成本", description: "原材料价格波动在可控范围内", impact: "medium", sources: 9 },
        { title: "劳动力市场", description: "技能劳动力供给充足，人力成本可控", impact: "low", sources: 7 },
      ]
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary: "竞争格局相对稳定，重点维护现有优势",
      keyPoints: [
        { title: "行业竞争强度", description: "主要玩家策略保守，价格战风险较低", impact: "medium", sources: 11 },
        { title: "客户忠诚度", description: "现有客户群体稳定，复购率维持高位", impact: "low", sources: 8 },
        { title: "供应商关系", description: "长期合作关系稳固，价格协商空间有限", impact: "low", sources: 6 },
        { title: "渠道掌控力", description: "全渠道布局完整，销售网络稳定", impact: "low", sources: 9 },
      ]
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary: "所处群组增长平稳，市场定位清晰",
      keyPoints: [
        { title: "同群组竞争", description: "核心竞争对手策略透明，竞争有序", impact: "medium", sources: 10 },
        { title: "市场份额", description: "现有份额稳定，增长主要来自市场自然扩张", impact: "medium", sources: 8 },
        { title: "跨群组流动性低", description: "品牌定位明确，不易受其他群组影响", impact: "low", sources: 5 },
        { title: "进入壁垒", description: "规模经济与品牌优势构成有效护城河", impact: "low", sources: 7 },
      ]
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary: "优化重点在于提升效率和成本控制",
      keyPoints: [
        { title: "采购优化", description: "集中采购规模效应显现，成本下降2%", impact: "medium", sources: 9 },
        { title: "生产效率", description: "产能利用率稳定在85%，良品率提升", impact: "medium", sources: 7 },
        { title: "物流优化", description: "仓储周转率提高，库存成本降低", impact: "medium", sources: 8 },
        { title: "售后服务", description: "标准化流程提升客户满意度", impact: "low", sources: 6 },
      ]
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary: "优势明显，需保持战略定力",
      keyPoints: [
        { title: "优势：规模效应", description: "成本结构优于行业平均，盈利能力稳健", impact: "high", sources: 10 },
        { title: "优势：品牌资产", description: "品牌认知度高，客户信任度稳固", impact: "high", sources: 9 },
        { title: "劣势：创新速度", description: "稳定运营可能牺牲部分创新机会", impact: "low", sources: 6 },
        { title: "机会：渠道下沉", description: "低线市场存在稳健增长空间", impact: "medium", sources: 8 },
      ]
    },
  },
  rescue: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary: "外部环境存在压力点，需要识别关键风险并制定应对策略",
      keyPoints: [
        { title: "监管风险", description: "新规可能增加合规成本，需提前布局", impact: "high", sources: 11 },
        { title: "经济下行压力", description: "消费者支出谨慎，奢侈品类受影响", impact: "high", sources: 13 },
        { title: "供应链脆弱性", description: "地缘政治风险影响原材料稳定供应", impact: "high", sources: 10 },
        { title: "技术变革风险", description: "未能跟上数字化趋势，客户流失加速", impact: "medium", sources: 8 },
      ]
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary: "多重竞争压力需要紧急应对，重构竞争优势",
      keyPoints: [
        { title: "竞争加剧", description: "价格战侵蚀利润，市场份额流失", impact: "high", sources: 14 },
        { title: "客户流失", description: "品牌忠诚度下降，获客成本上升", impact: "high", sources: 12 },
        { title: "供应商压力", description: "议价能力减弱，账期收紧", impact: "high", sources: 9 },
        { title: "替代品冲击", description: "低价替代品抢占市场，差异化不足", impact: "medium", sources: 10 },
      ]
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary: "现有定位面临挑战，需考虑战略转型",
      keyPoints: [
        { title: "群组增长乏力", description: "所在细分市场萎缩，需寻找新增长点", impact: "high", sources: 11 },
        { title: "竞争地位削弱", description: "群组内排名下滑，话语权减弱", impact: "high", sources: 9 },
        { title: "转型机会", description: "向更健康的群组迁移需要资源重配", impact: "medium", sources: 8 },
        { title: "差异化缺失", description: "同质化竞争陷入困境，需重塑定位", impact: "high", sources: 10 },
      ]
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary: "多个环节存在效率问题，需快速优化止血",
      keyPoints: [
        { title: "成本失控", description: "运营成本高企，利润空间压缩", impact: "high", sources: 12 },
        { title: "库存积压", description: "周转率下降，现金流紧张", impact: "high", sources: 10 },
        { title: "渠道效能低", description: "部分渠道ROI为负，需裁撤整合", impact: "high", sources: 8 },
        { title: "组织冗余", description: "人效低下，需组织精简", impact: "medium", sources: 7 },
      ]
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary: "威胁严峻，需要果断行动扭转局面",
      keyPoints: [
        { title: "优势受侵蚀", description: "传统优势不再奏效，需重新定义", impact: "high", sources: 10 },
        { title: "劣势放大", description: "组织僵化、成本高企等问题凸显", impact: "high", sources: 11 },
        { title: "机会窗口期", description: "危机倒逼改革，可快速试错转型", impact: "medium", sources: 8 },
        { title: "生存威胁", description: "现金流、市场份额双重压力", impact: "high", sources: 13 },
      ]
    },
  },
};

export function StrategyFramework({ mode }: StrategyFrameworkProps) {
  const [selectedFramework, setSelectedFramework] = useState<Framework>("pestle");
  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);

  const frameworks = frameworksByMode[mode];
  const currentData = frameworks[selectedFramework];

  const getImpactColor = (impact: string) => {
    if (impact === "high") return "text-rose-600 bg-rose-500/10";
    if (impact === "medium") return "text-amber-600 bg-amber-500/10";
    return "text-emerald-600 bg-emerald-500/10";
  };

  return (
    <div className="space-y-6">
      {/* Framework Tabs */}
      <div className="flex gap-2 p-1.5 bg-muted/50 rounded-xl border border-border">
        {Object.values(frameworks).map((framework) => (
          <button
            key={framework.id}
            onClick={() => {
              setSelectedFramework(framework.id);
              setExpandedPoint(null);
            }}
            className={`flex-1 px-4 py-2.5 rounded-lg transition-all ${
              selectedFramework === framework.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {framework.name}
          </button>
        ))}
      </div>

      {/* Framework Content */}
      <motion.div
        key={selectedFramework}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Summary */}
        <div className="mb-6 p-5 rounded-xl bg-accent/30 border border-border">
          <h3 className="text-foreground/80 mb-2">综合评估</h3>
          <p className="text-foreground/70">{currentData.summary}</p>
        </div>

        {/* Key Points */}
        <div className="space-y-3">
          {currentData.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-border rounded-xl bg-card overflow-hidden"
            >
              <button
                onClick={() => setExpandedPoint(expandedPoint === index ? null : index)}
                className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className={`px-2.5 py-1 rounded-lg text-xs ${getImpactColor(point.impact)}`}>
                    {point.impact === "high" ? "高影响" : point.impact === "medium" ? "中影响" : "低影响"}
                  </span>
                  <div className="text-left">
                    <h4 className="text-foreground mb-1">{point.title}</h4>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">数据源</div>
                    <div className="text-foreground">{point.sources} 条</div>
                  </div>
                  <ChevronRight
                    className={`size-5 text-muted-foreground transition-transform ${
                      expandedPoint === index ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>

              {expandedPoint === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border bg-muted/20"
                >
                  <div className="p-5 text-sm text-muted-foreground">
                    点击可查看 {point.sources} 条相关数据源详情
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

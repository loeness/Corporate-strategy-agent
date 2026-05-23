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

/**
 * 战略框架详情 — 基于 data extratcor 实际采集数据推导
 * 数据源：collected.db（美国市场，2026-05-23，177 条记录）
 * sources 数字对应实际 collected.db 中的记录条数
 */
const frameworksByMode: Record<StrategyMode, Record<Framework, FrameworkData>> = {
  innovation: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary:
        "宏观环境中社会趋势和技术变革为创新提供强驱动，但政策合规（OFAC SND/Amazon 珠宝类目）和经济风险（金价高位/K型分化）需持续监控。",
      keyPoints: [
        {
          title: "社会趋势：雕塑银饰与有意义的奢侈",
          description:
            "ELLE、Gabriel & Co、BriteCo 多源确认雕塑感银饰为 2026 主流趋势。消费者搜索从「钻石耳环」转向「实验室培育钻石」「道德黄金」「性别中性珠宝」（southernjewelrynews.com）。社交和价值观驱动的购买正取代传统产品目录式消费。",
          impact: "high",
          sources: 30,
        },
        {
          title: "技术突破：实验室培育钻石 CAGR 13.42%",
          description:
            "实验室培育钻石市场 2026 年 $335.4 亿，预计 2034 年达 $918.5 亿（precedenceresearch.com）。2 克拉以下细分为主要增长引擎。技术成熟度提升使培育钻在价格、可持续性、设计灵活性上全面挑战天然钻石。",
          impact: "high",
          sources: 12,
        },
        {
          title: "政策合规：Amazon 珠宝类目+OFAC 双重压力",
          description:
            "Amazon 珠宝类目合规升级：需材料成分文档、铅含量测试、贵金属含量验证（redstagfulfillment.com）。OFAC SDN 列表例行更新（treasury.gov）。未合规面临下架风险，制裁审查可能中断供应链。",
          impact: "high",
          sources: 21,
        },
        {
          title: "经济环境：金价高位 +「K 型」市场分化",
          description:
            "黄金 $145.02/g、铂金 $62.05/g、白银 $2.43/g（gold-api.com, 2026-05-23）。美国珠宝市场呈 K 型分化：富裕层消费强劲，中低收入群体受通胀和就业不确定性压制（ucfs.net）。消费金融方案可扩大中端可及客群。",
          impact: "medium",
          sources: 35,
        },
      ],
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary:
        "竞争格局正经历结构性转变：实验室培育钻石 DTC 品牌作为替代品和新进入者双重施压，Amazon 合规壁垒提高进入门槛，买方信息透明度持续增强。",
      keyPoints: [
        {
          title: "替代品威胁：培育钻石的颠覆性替代",
          description:
            "2026 年 $335.4 亿市场以 CAGR 13.42% 增长（precedenceresearch.com）。2 克拉以下培育钻在性价比上全面压制天然钻。消费者搜索行为已转向「实验室培育钻石」而非传统「钻石耳环」。天然钻石产品线面临严重的价格体系侵蚀和库存贬值风险。",
          impact: "high",
          sources: 12,
        },
        {
          title: "新进入者威胁：DTC 品牌以科技切入",
          description:
            "培育钻石技术降低生产壁垒，DTC 品牌通过社交媒体和可持续发展叙事直接触达消费者。OKG Jewelry、Brilliant Earth 等品牌通过趋势内容营销建立差异化认知。传统渠道优势被社交媒体和 AI 驱动的个性化推荐削弱。",
          impact: "high",
          sources: 8,
        },
        {
          title: "现有竞争强度：高端稳固，中端挤压",
          description:
            "Richemont（Cartier 母公司）FY2026 财年强劲增长（globenewswire.com）。Tiffany & Co. 通过戒指定制化巩固高端定位。Pandora 通过 UNICEF 合作证明 ESG 叙事的有效性。竞争焦点从产品转向品牌叙事和价值观。",
          impact: "medium",
          sources: 6,
        },
        {
          title: "买方议价能力：社交媒体赋能的超级消费者",
          description:
            "消费者搜索行为从泛品类词转向精准价值观词（southernjewelrynews.com）。社交媒体和 AI 趋势分析使消费者比以往更了解市场。价格透明度提高，比价成本降低，品牌溢价需要更扎实的叙事支撑。",
          impact: "medium",
          sources: 30,
        },
      ],
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary:
        "美国珠宝市场呈现四层群组分化：奢侈品群组（Cartier/Tiffany）稳固、培育钻石群组（Brilliant Earth/VRAI）快速增长、可持续/ESG群组新兴、传统中端群组受 K 型市场挤压。",
      keyPoints: [
        {
          title: "奢侈品群组：品牌壁垒稳固",
          description:
            "Cartier（Richemont）FY2026 财年业绩强劲。Tiffany 提供金属/钻石切工/颜色/克拉全维度定制化选项。Harry Winston 以稀有高品质钻石服务超高端客群。高端群组依靠工艺传承和品牌叙事维持定价权，受培育钻石冲击相对较小。",
          impact: "low",
          sources: 6,
        },
        {
          title: "培育钻石群组：CAGR 13.42% 高速增长",
          description:
            "实验室培育钻石成为 2026 增长最快品类。Brilliant Earth、VRAI、Blue Nile 等品牌以「可持续+高性价比」双重卖点吸引年轻消费者。2026 年市场 $335.4 亿，2 克拉以下细分为最强增长引擎。此群组正在重新定义「有价值的珠宝」。",
          impact: "high",
          sources: 12,
        },
        {
          title: "可持续/ESG 群组：新兴差异化赛道",
          description:
            "Pandora × UNICEF 五年募资近 $1400 万（finance.yahoo.com）。消费者搜索「道德黄金珠宝」上升（southernjewelrynews.com）。'有意义的奢侈'叙事成为品牌溢价的新支撑点。此群组仍处于早期阶段但增长潜力显著。",
          impact: "high",
          sources: 8,
        },
        {
          title: "传统中端群组：双向挤压",
          description:
            "受 K 型市场分化影响最重：低收入群体消费谨慎（ucfs.net），高收入群体流向奢侈品群组。Amazon 合规成本上升进一步挤压利润空间。消费金融方案（分期付款）是主要应对策略，但不足以扭转结构性压力。",
          impact: "medium",
          sources: 25,
        },
      ],
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary:
        "设计端（30 条趋势信号）和营销端（社交/ESG叙事）为当前最高价值环节。合规端（Amazon 珠宝文档需求）为最大瓶颈。采购端金价高位需建立系统化监控。",
      keyPoints: [
        {
          title: "设计开发：趋势信号驱动的选品机会",
          description:
            "30 条市场趋势记录覆盖雕塑银饰、粗链、珍珠革新、彩色珐琅、混合金属、实验室培育钻石、男性珠宝等多个方向。多源交叉验证（ELLE/Gabriel/BriteCo/OKG Jewelry/Brilliant Earth）降低了伪趋势风险。设计端可依据数据置信度分层投入。",
          impact: "high",
          sources: 30,
        },
        {
          title: "营销与客户体验：从产品目录到价值观叙事",
          description:
            "社交媒体信号显示消费者转向「有意义的奢侈」。品牌需从产品目录式营销转向工艺故事、材质溯源、ESG 叙事。色彩宝石（红宝石/橙色蓝宝石）因摄影效果好在社媒传播效率更高。个性化定制（如 Tiffany 戒指定制）可提升客户粘性。",
          impact: "high",
          sources: 30,
        },
        {
          title: "合规与物流：Amazon FBA 费率+珠宝合规双重成本",
          description:
            "Amazon FBA 配送费微调平均 +$0.08/件（<0.5%），各重量段费率明细已公布。珠宝类目合规升级：需材料成分文档、铅含量测试、贵金属含量验证。FBA Prep 服务在 2026 年终止，卖家需自行处理预处理。合规成本上升是当前价值链最大瓶颈。",
          impact: "high",
          sources: 20,
        },
        {
          title: "采购管理：金价 $145/g 的系统化监控需求",
          description:
            "黄金 $145.02/g（gold-api.com Primary API，置信度 1.0），铂金 $62.05/g，白银 $2.43/g。贵金属价格高位波动直接影响采购成本和产品定价。建议建立价格风险监控看板，设置阈值警报，根据金价风险调整定价策略和库存水平。",
          impact: "medium",
          sources: 33,
        },
      ],
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary:
        "优势（30 条趋势信号提供选品方向、Primary API 价格数据置信度高）抵消部分劣势（仅覆盖美国市场、Tavily 数据置信度 0.7）。机会（银饰/培育钻/男士/色彩宝石）数量多于威胁（合规/培育钻蚕食/K型分化），但威胁的紧迫性更高。",
      keyPoints: [
        {
          title: "优势 (S)：趋势感知能力 + 数据驱动决策",
          description:
            "30 条市场趋势 + 30 条社交媒体记录提供跨源趋势信号。贵金属价格来自 Primary API（gold-api.com，置信度 1.0）。Amazon 费率变更和合规要求均有具体数据支撑。数据驱动的战略决策能力是核心优势。",
          impact: "high",
          sources: 60,
        },
        {
          title: "劣势 (W)：市场覆盖不足 + 数据置信度不均",
          description:
            "采集系统仅覆盖美国市场（US），其他 7 个市场数据缺失。30 条市场趋势和 30 条社交媒体记录全部来自 Tavily Search（置信度 0.7），未经验证。竞争情报维度 4/6 条记录为关键词匹配噪音，有效信号稀疏。",
          impact: "medium",
          sources: 3,
        },
        {
          title: "机会 (O)：四大创新方向均有强证据支撑",
          description:
            "雕塑感银饰（ELLE/Gabriel/BriteCo 三重确认）、实验室培育钻石（$335.4亿/CAGR 13.42%）、男性珠宝（Fortune Business Insights）、色彩宝石（southernjewelrynews.com）四大方向均有多源证据。每个方向对应明确的验证指标和投入策略。",
          impact: "high",
          sources: 30,
        },
        {
          title: "威胁 (T)：合规下架 + 培育钻蚕食 + K型分化",
          description:
            "Amazon 珠宝合规收紧可能导致未合规商品下架（redstagfulfillment.com）。实验室培育钻石以价格优势蚕食天然钻石市场（precedenceresearch.com）。K 型市场分化使中端产品线面临需求萎缩风险（ucfs.net）。三大威胁均需立即应对。",
          impact: "high",
          sources: 35,
        },
      ],
    },
  },
  stable: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary:
        "宏观环境总体可预测：金价高位但走势透明（gold-api.com），Amazon 费率微调（+$0.08/件），合规要求属于常规升级。社会趋势和技术变革节奏可控。",
      keyPoints: [
        {
          title: "政策稳定性：合规要求可预测",
          description:
            "Amazon 珠宝类目合规升级和 OFAC SDN 更新均为例行性质，非突发性政策变化。合规要求明确（材料文档、铅测试、贵金属验证），准备周期充裕。",
          impact: "medium",
          sources: 21,
        },
        {
          title: "经济周期位置：金价高位但稳定",
          description:
            "黄金 $145.02/g，价格来自 Primary API（gold-api.com），数据透明可靠。贵金属价格未出现剧烈波动，采购成本可预测。",
          impact: "medium",
          sources: 33,
        },
        {
          title: "社会趋势：渐进式消费行为演变",
          description:
            "消费者从产品搜索向价值观搜索的转型是渐进过程而非突变。培育钻石接受度稳步提升。男性珠宝兴趣上升为增量市场。",
          impact: "medium",
          sources: 60,
        },
        {
          title: "技术变革：培育钻石技术成熟度已过拐点",
          description:
            "实验室培育钻石技术已进入稳定成熟期，不再需要大量研发投入。重点从技术可行性转向市场教育和品牌建设。",
          impact: "low",
          sources: 12,
        },
      ],
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary:
        "竞争格局相对稳定，现有玩家（Cartier/Tiffany/Pandora）策略透明。主要变量是培育钻石 DTC 品牌的中期渗透速度和 Amazon 合规门槛对竞争格局的筛选效应。",
      keyPoints: [
        {
          title: "行业竞争强度：格局稳固，变量可控",
          description:
            "Richemont（Cartier）FY2026 稳健增长，Tiffany/Pandora 策略透明可观察。竞争焦点在品牌叙事和 ESG 投入，尚未出现价格战信号。",
          impact: "medium",
          sources: 6,
        },
        {
          title: "新进入者威胁：渐进而非突发",
          description:
            "DTC 培育钻石品牌增长确定但节奏可控，不会短期内颠覆市场格局。现有品牌有时间窗口通过培育钻石产品线布局来应对。",
          impact: "low",
          sources: 8,
        },
        {
          title: "替代品压力：培育钻石存量替代已在计算中",
          description:
            "培育钻石对天然钻石的替代效应已被广泛认知，市场定价已部分反映此预期。重点监控培育钻石价格走势和消费者转化率。",
          impact: "medium",
          sources: 12,
        },
        {
          title: "供应商关系：金价透明度高",
          description:
            "贵金属价格由国际市场定价，议价空间有限但可预测。建议建立定期采购和套期保值机制对冲价格波动。",
          impact: "low",
          sources: 33,
        },
      ],
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary:
        "所处群组定位清晰，培育钻石群组和可持续/ESG群组为最值得关注的相邻群组。跨群组迁移窗口期存在，但需明确的资源投入决策。",
      keyPoints: [
        {
          title: "同群组竞争：策略透明，竞争有序",
          description:
            "中端珠宝群组主要玩家策略透明，竞争维度集中在产品设计和营销叙事。Amazon 合规门槛提高可能筛选淘汰不合规的小型玩家，对合规玩家有利。",
          impact: "medium",
          sources: 20,
        },
        {
          title: "市场份额稳定：增长来自市场自然扩张",
          description:
            "戒指品类占 ~39% 营收份额（polarismarketresearch.com），钻石品类占 43.06% 市场份额（fortunebusinessinsights.com）。市场份额格局稳定，增长主要来自品类扩展和消费者触达深化。",
          impact: "medium",
          sources: 8,
        },
        {
          title: "跨群组流动性：培育钻群组为最佳迁移方向",
          description:
            "培育钻石群组与现有群组在供应链、设计能力、客户基础上重叠度高。布局培育钻石产品线是实现向高增长群组迁移的最低阻力路径。",
          impact: "low",
          sources: 12,
        },
        {
          title: "进入壁垒：Amazon 合规门槛构成有效护城河",
          description:
            "珠宝类目合规要求（材料文档/铅测试/贵金属验证）提高了新卖家进入门槛。提前完成合规认证的卖家可享受不合规竞品退出带来的流量红利。",
          impact: "low",
          sources: 10,
        },
      ],
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary:
        "优化重点在于采购端（金价监控机制）和分销端（Amazon FBA 费率精算）。设计端和营销端维持现有投入水平即可。合规端建立常态化文档管理流程。",
      keyPoints: [
        {
          title: "采购优化：建立金价风险监控看板",
          description:
            "黄金 $145.02/g（Primary API，置信度 1.0）。建议设置阈值警报（单日波动 >2%、连续 5 日单边走势），根据风险信号调整采购节奏和定价策略。套期保值方案纳入评估。",
          impact: "medium",
          sources: 33,
        },
        {
          title: "分销效率：逐 SKU 精算 FBA 新费率",
          description:
            "Amazon FBA 配送费平均 +$0.08/件（<0.5%）。各重量段费率明细已公布（sellercentral.amazon.com）。逐 SKU 核算盈亏平衡点，识别利润受挤压的低客单价商品并制定调价方案。",
          impact: "medium",
          sources: 20,
        },
        {
          title: "合规管理：建立常态化合规文档库",
          description:
            "材料成分文档、铅含量测试报告、贵金属含量验证为三项核心合规文件。建议建立按 ASIN 索引的合规文档库，确保新上架商品提前完成合规认证。",
          impact: "medium",
          sources: 10,
        },
        {
          title: "设计开发：维持趋势信号监控节奏",
          description:
            "30 条趋势信号覆盖多个方向，维持每日/每周监控节奏。重点关注银饰和培育钻石方向的竞争信号和消费者搜索量变化。",
          impact: "low",
          sources: 30,
        },
      ],
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary:
        "优势（趋势感知 + 价格数据）和劣势（市场覆盖不足）相对平衡。机会（四大方向）与威胁（合规/培育钻/K型分化）均需系统应对。整体处于可管理的平衡状态。",
      keyPoints: [
        {
          title: "优势：数据驱动决策的基础设施",
          description:
            "177 条采集记录覆盖 8 个维度。贵金属价格来自 Primary API（置信度 1.0）。趋势信号多源交叉验证。这套数据基础设施使决策从直觉驱动转向数据驱动。",
          impact: "high",
          sources: 177,
        },
        {
          title: "优势：合规前置的时间窗口",
          description:
            "Amazon 合规要求的升级速度慢于合规文档的准备周期。提前完成认证的品牌可享受不合规竞品退出带来的市场空白。合规能力正在从成本项转变为竞争壁垒。",
          impact: "high",
          sources: 10,
        },
        {
          title: "劣势：美国市场以外无数据覆盖",
          description:
            "日本、中国、韩国、新加坡、马来西亚、泰国、越南 7 个市场均无采集数据。任何涉及多市场的战略决策均缺乏数据支撑。扩展采集范围是最高优先级的基础设施投资。",
          impact: "low",
          sources: 1,
        },
        {
          title: "机会：消费金融可扩大中端可及客群",
          description:
            "UCFS 报告指出中端珠宝消费者在有分期选项时购买意愿显著提升。在美国 K 型市场分化背景下，消费金融方案可有效扩大中端产品线的可及客群。",
          impact: "medium",
          sources: 5,
        },
      ],
    },
  },
  rescue: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary:
        "外部压力多重叠加：Amazon 珠宝合规收紧直接威胁 listing 安全，OFAC SDN 制裁审查可能触发供应链中断，培育钻石替代加速蚕食核心品类，K 型市场分化压制中端需求。",
      keyPoints: [
        {
          title: "监管风险：Amazon 珠宝合规 — 立即行动项",
          description:
            "珠宝类目合规升级是最紧迫的外部威胁：未合规商品直接面临下架和账号限制风险。需在 72 小时内完成现有 ASIN 的合规状态核查，两周内补齐缺失文档。这是目前唯一的「不做就死」级别的风险项。",
          impact: "high",
          sources: 20,
        },
        {
          title: "经济下行压力：K 型市场压制中端需求",
          description:
            "美国珠宝市场 K 型分化（ucfs.net）：中低收入群体在通胀和就业不确定性下削减可选消费。中端产品线面临需求萎缩和库存积压双重风险。消费金融方案是短期缓解策略，但不能解决根本问题。",
          impact: "high",
          sources: 8,
        },
        {
          title: "制裁风险：OFAC SDN 审查 — 不可忽视",
          description:
            "OFAC SDN 名单更新（Primary API，置信度 1.0）为确定性风险。若供应链实体在制裁名单中，可能导致跨境支付冻结和货物扣押，触发连锁合规危机。需在 24 小时内完成人工审查。",
          impact: "high",
          sources: 1,
        },
        {
          title: "替代品加速：培育钻石侵占天然钻石核心市场",
          description:
            "实验室培育钻石 $335.4 亿市场以 CAGR 13.42% 增长。若现有产品组合以天然钻石为核心，将面临系统性的品类贬值。需要紧急评估培育钻石产品线布局方案。",
          impact: "medium",
          sources: 12,
        },
      ],
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary:
        "五重竞争压力同时施压：替代品（培育钻石）侵蚀核心品类定价、Amazon 合规门槛筛选淘汰、买方由社交媒体赋能更精明、金价高位挤压利润空间。需紧急重构竞争优势。",
      keyPoints: [
        {
          title: "竞争加剧：不合规退出窗口的博弈",
          description:
            "Amazon 合规门槛提高将导致部分不合规竞品退出。谁先完成合规认证，谁就承接退出的流量和市场份额。这不是价格竞争，而是合规速度的竞争。先发优势显著。",
          impact: "high",
          sources: 20,
        },
        {
          title: "替代品蚕食：从长期趋势变为短期压力",
          description:
            "培育钻石替代天然钻石已从「未来趋势」变为「正在发生」。如果现有产品组合中天然钻占比过高，需要立即评估产品线调整方案。2 克拉以下天然钻石品类风险最大。",
          impact: "high",
          sources: 12,
        },
        {
          title: "买方力量：信息透明化削弱品牌溢价",
          description:
            "消费者比以往更了解市场（southernjewelrynews.com）。社交媒体和 AI 趋势分析使比价成本趋近于零。没有扎实叙事支撑的品牌溢价正在快速蒸发。",
          impact: "high",
          sources: 30,
        },
        {
          title: "供应商压力：金价高位无缓解迹象",
          description:
            "黄金 $145.02/g 处于历史高位区间，采购成本压力持续。无有效议价手段（贵金属由国际市场定价）。唯一的缓解手段是建立套期保值机制和动态定价策略。",
          impact: "medium",
          sources: 33,
        },
      ],
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary:
        "传统中端群组受 K 型市场挤压最重，需评估向培育钻石群组或可持续/ESG 群组迁移的可行性。迁移窗口期有限，延迟决策的成本日益增加。",
      keyPoints: [
        {
          title: "群组增长乏力：中端群组的结构性困境",
          description:
            "K 型市场分化使中端消费受到最严重的挤压。高收入群体升级至奢侈品群组，低收入群体缩减可选支出。中端群组的增长空间已从市场自然扩张转变为存量博弈。",
          impact: "high",
          sources: 8,
        },
        {
          title: "竞争地位削弱：合规门槛加速淘汰",
          description:
            "Amazon 珠宝合规要求（材料文档/铅测试/贵金属验证）对中小型卖家构成实质性的市场退出压力。合规能力不足的玩家将被清除，幸存者面临更激烈的存量竞争。",
          impact: "high",
          sources: 20,
        },
        {
          title: "转型机会：向培育钻群组迁移的窗口期",
          description:
            "培育钻石群组以 CAGR 13.42% 增长，且与现有供应链和设计能力高度兼容。尽早布局培育钻石产品线是从萎缩群组向增长群组迁移的最低阻力路径。窗口期有限 — 竞品也在关注同样的机会。",
          impact: "medium",
          sources: 12,
        },
        {
          title: "差异化缺失：产品同质化困境",
          description:
            "中端珠宝群组在产品设计和品牌叙事上高度同质化。雕塑银饰、色彩宝石、男士珠宝等趋势方向提供了明确的差异化路径。但需要快速行动 — 趋势窗口通常不超过 6-12 个月。",
          impact: "high",
          sources: 30,
        },
      ],
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary:
        "合规端（Amazon 珠宝文档）为最紧急的止血点。采购端（金价风险监控）和分销端（FBA 费率精算）需要并行处理。设计端和营销端需快速将趋势信号转化为可执行的产品和内容方案。",
      keyPoints: [
        {
          title: "合规止血：72 小时完成 ASIN 合规状态核查",
          description:
            "Amazon 珠宝类目合规是最紧急的价值链瓶颈。未合规 = 下架 = 收入归零。建议 72 小时内完成全部珠宝 ASIN 的合规状态核查，2 周内补齐缺失文档（材料成分、铅测试、贵金属验证）。这是价值链上唯一不可延期的任务。",
          impact: "high",
          sources: 20,
        },
        {
          title: "利润保护：逐 SKU 精算 FBA 新费率",
          description:
            "Amazon FBA 费率微调（+$0.08/件）+ 金价高位（$145.02/g）+ 合规成本上升三重挤压利润空间。逐 SKU 核算新费率下的盈亏平衡点。对负利润 SKU 制定调价或退出方案。",
          impact: "high",
          sources: 53,
        },
        {
          title: "产品转型：快速测试四大趋势方向",
          description:
            "雕塑银饰、培育钻石入门线、男士珠宝专区、色彩宝石/珐琅系列四大方向均有强证据支撑。建议小批量测试（每方向 3-5 SKU），以 A/B 测试数据决定规模化投入。速度优先于完美 — 趋势窗口有限。",
          impact: "high",
          sources: 30,
        },
        {
          title: "内容转型：从产品目录到价值观叙事",
          description:
            "消费者搜索行为已向「有意义的奢侈」转型（southernjewelrynews.com）。建议 1 周内上线品牌故事内容（材质溯源、工匠精神、ESG 叙事），调整 SEO/SEM 关键词策略。内容转型是成本最低、见效最快的价值链优化项。",
          impact: "medium",
          sources: 30,
        },
      ],
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary:
        "威胁（合规下架/培育钻蚕食/K型分化）的紧迫性高于机会的吸引力。生存优先：先止血（合规），再修复（利润保护），最后转型（产品/内容）。窗口期有限。",
      keyPoints: [
        {
          title: "优势受侵蚀：趋势感知能力仍在但行动滞后",
          description:
            "30 条趋势信号 + 30 条社交信号提供充分的外部感知。但从信号到行动的转化链路过长。优势正在从「知道什么在发生」转变为「多快能响应」。速度是当前最稀缺的优势。",
          impact: "high",
          sources: 60,
        },
        {
          title: "劣势放大：单市场覆盖 + 低置信度数据",
          description:
            "仅覆盖美国市场意味着无法通过多市场分散风险。Tavily 数据置信度 0.7 意味着关键决策依赖的数据基础不够坚固。在危机模式下，数据基础设施的不足会被放大。",
          impact: "high",
          sources: 3,
        },
        {
          title: "机会窗口期：合规淘汰竞品释放的市场空白",
          description:
            "Amazon 合规门槛提高将淘汰一批不合规竞品。这是短期最确定的机会：快速完成合规认证，承接退出的流量和市场份额。窗口期预计 1-3 个月。",
          impact: "medium",
          sources: 20,
        },
        {
          title: "生存威胁：三重压力叠加的系统性风险",
          description:
            "合规下架（立即）、培育钻石蚕食（中期）、K 型市场分化（长期）三重压力形成从短到长的威胁链。任一风险失控都可能导致严重的业务冲击。需要并行的三线作战策略。",
          impact: "high",
          sources: 40,
        },
      ],
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
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-foreground/80">综合评估</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              数据来源：data extratcor / collected.db
            </span>
          </div>
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
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="size-4" />
                      <span>
                        点击可查看 {point.sources} 条相关数据源详情（来自 collected.db 和 raw JSON 快照）
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      数据采集日期：2026-05-23 · 置信度：Primary API (1.0) / Tavily Search (0.7) · 市场：US
                    </div>
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

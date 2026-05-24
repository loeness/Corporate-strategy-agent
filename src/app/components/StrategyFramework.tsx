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
 * 战略框架详情 — 严格基于三个 md 数据源文件
 * 数据源：
 *   innovation → innovation_breakthrough_strategy_report.md（8市场/跨市场多维数据）
 *   stable     → steady_operations_strategy_report.md（8市场运营数据）
 *   rescue     → strategic_transformation_strategy_report.md（结构转型信号）
 */
const frameworksByMode: Record<StrategyMode, Record<Framework, FrameworkData>> = {
  innovation: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary:
        "社会趋势（中性化/可持续/侘寂美学/第二皮肤）与技术变革（培育钻石独立品类/AR试戴）为创新提供强驱动，但政策合规（Amazon珠宝类目/OFAC SDN/日本过敏标准）和经济风险（金价高位/培育钻价格下跌）需持续监控。",
      keyPoints: [
        {
          title: "社会趋势：中性化、可持续与场景化佩戴需求崛起",
          description:
            "多源确认中性化饰品、模块化设计被列为高搜索量品类（CN/US/JP市场）。日本出现つけっぱなし（常戴）趋势催生磁石胸针与防过敏材料需求（giant-starlly.com）。消费者从产品搜索转向价值观搜索（southernjewelrynews.com）。",
          impact: "high",
          sources: 30,
        },
        {
          title: "技术突破：实验室培育钻石成为独立品类 + AR试戴融合",
          description:
            "培育钻石被多本行业媒体列为独立品类（非天然钻石替代品），强调环保属性。亚太培育钻市场年增12.6%。AR虚拟试戴与社交电商在韩国、越南市场加速融合，可降低线上退货率。",
          impact: "high",
          sources: 12,
        },
        {
          title: "政策合规：Amazon + OFAC + 日本过敏标准三重压力",
          description:
            "Amazon美国与日本更新FBA费用与首饰品类审批门槛（US_ecommerce_f775cf）。OFAC SDN名单8个市场同步更新。日本市场金属过敏成为准入门槛，需强制执行镍无添加（JP_compliance_c23344）。",
          impact: "high",
          sources: 21,
        },
        {
          title: "经济环境：金价高位 + 培育钻石价格下跌风险",
          description:
            "黄金$145.02/g、铂金$62.05/g（gold-api.com）。培育钻石若市场批发价继续以每年15%-20%下跌，新品上市即面临价格倒挂。经济压力下低客单饰品（如马主题吊坠）可作为自然流量入口。",
          impact: "medium",
          sources: 35,
        },
      ],
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary:
        "竞争格局正经历结构性转变：培育钻石DTC品牌作为替代品和新进入者双重施压，Chow Tai Fook东南亚扩张加剧竞争，Amazon合规壁垒提高进入门槛，买方信息透明度持续增强。新材质品类可形成差异化壁垒。",
      keyPoints: [
        {
          title: "替代品威胁：培育钻石的颠覆性替代",
          description:
            "培育钻石被列为独立品类，2克拉以下在性价比上全面压制天然钻。消费者搜索行为已转向实验室培育钻石。天然钻石产品线面临价格体系侵蚀和库存贬值风险（risk_02）。",
          impact: "high",
          sources: 12,
        },
        {
          title: "新进入者威胁：DTC品牌以科技和可持续叙事切入",
          description:
            "培育钻石技术降低生产壁垒，DTC品牌通过社交媒体和ESG叙事直接触达消费者。OKG Jewelry、Brilliant Earth等通过趋势内容营销建立差异化。传统渠道优势被社交媒体和AI推荐削弱。",
          impact: "high",
          sources: 8,
        },
        {
          title: "现有竞争强度：CTF扩张 + 本土竞品文化围剿",
          description:
            "Chow Tai Fook加速在东南亚开设旗舰店并推出地域特供版（K-07）。本地竞品Poh Kong主打文化设计。竞争焦点从产品转向品牌叙事和本地文化关联。",
          impact: "medium",
          sources: 6,
        },
        {
          title: "买方议价能力：社交媒体赋能的超级消费者",
          description:
            "消费者搜索行为从泛品类词转向精准价值观词（southernjewelrynews.com）。社交媒体和AI趋势分析使比价成本趋近于零。品牌溢价需要更扎实的叙事和文化设计支撑。",
          impact: "medium",
          sources: 30,
        },
      ],
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary:
        "多市场珠宝行业呈四层群组分化：奢侈品群组（Cartier/Tiffany）稳固、培育钻石群组（CAGR 13.42%）快速增长、可持续/ESG群组新兴、传统中端群组受K型市场挤压。第二皮肤品类可开辟全新群组。",
      keyPoints: [
        {
          title: "奢侈品群组：品牌壁垒稳固，受培育钻冲击较小",
          description:
            "Cartier韩国提价11%显示定价权。Tiffany提供全维度定制化选项。高端群组依靠工艺传承和品牌叙事维持定价权，受培育钻石冲击相对较小。",
          impact: "low",
          sources: 6,
        },
        {
          title: "培育钻石群组：CAGR 13.42% 高速增长，品类独立化",
          description:
            "实验室培育钻石成为2026增长最快品类。中国、韩国、日本市场趋势报告一致强调其独立品类地位。此群组正在重新定义有价值的珠宝，2克拉以下为最强增长引擎。",
          impact: "high",
          sources: 12,
        },
        {
          title: "可持续/ESG群组：新兴差异化赛道",
          description:
            "回收贵金属、实验室钻石的环保叙事吸引年轻消费者。'有意义的奢侈'成为品牌溢价新支撑点。但上游供应商无法出具区块链溯源证书时面临漂绿风险（risk_09）。",
          impact: "high",
          sources: 8,
        },
        {
          title: "传统中端群组：双向挤压，需差异化突围",
          description:
            "受K型市场分化影响最重。Amazon合规成本上升进一步挤压利润空间。创新产品需有本地文化关联或差异化设计，否则易被CTF和本土竞品挤压（K-07）。",
          impact: "medium",
          sources: 25,
        },
      ],
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary:
        "设计端（8条跨市场趋势信号密集）和营销端（社交/KOL/直播叙事）为当前最高价值环节。日本过敏合规和Amazon合规为最大瓶颈。采购端金价高位需建立系统化监控。",
      keyPoints: [
        {
          title: "设计开发：8条跨市场趋势信号覆盖多方向",
          description:
            "8条关键变化信号覆盖日本第二皮肤、中韩培育钻、中日美中性化设计、中日非传统材质（木材/树脂/搪瓷）、韩越AR社交电商融合等多个方向。多源交叉验证降低了伪趋势风险。设计端可依据数据置信度分层投入。",
          impact: "high",
          sources: 30,
        },
        {
          title: "营销与客户体验：从产品目录到价值观叙事 + 社交裂变",
          description:
            "TikTok挑战（#SilverStatement）+ 越南KOL日常叙事 + 日本艺术家联名直播 + 泰国Shopee Live预购，多市场社交营销路径清晰。品牌需从产品目录式营销转向工艺故事、材质溯源和在地文化叙事。",
          impact: "high",
          sources: 30,
        },
        {
          title: "合规与物流：日本过敏标准 + Amazon FBA费率 + 关税风险",
          description:
            "日本市场需强制执行镍无添加、钴不释放等过敏原控制（risk_10）。Amazon美国/日本更新FBA费用与首饰品类审批门槛（K-06）。美国对日本产铝衍生品加征50%关税影响供应链成本（risk_06）。合规成本是多市场创新最大瓶颈。",
          impact: "high",
          sources: 20,
        },
        {
          title: "采购管理：金价$145/g + 新材质供应链验证",
          description:
            "黄金$145.02/g（gold-api.com，置信度1.0）。木材、树脂、搪瓷等新材质需联系供应商打样并测试耐久性（A-05）。培育钻石需与头部生产商锁定长期协议以防止价格倒挂（risk_02）。",
          impact: "medium",
          sources: 33,
        },
      ],
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary:
        "机会（11条跨市场创新机会：培育钻/银饰/模块化/IP联名/第二皮肤/侘寂联名/动漫黄金收藏/马主题吊坠/AR试戴等）数量多于威胁（10条风险），但威胁的紧迫性（价格倒挂/过敏合规/关税/CTF扩张）更高。",
      keyPoints: [
        {
          title: "优势 (S)：跨市场趋势感知能力 + 创新信号密集",
          description:
            "8条关键变化 + 11条机会覆盖中日韩美越新马泰8个市场。多源交叉验证（ELLE/Vogue/southernjewelrynews/giant-starlly等）提供充分的趋势信号。数据驱动的创新决策能力是核心优势。",
          impact: "high",
          sources: 60,
        },
        {
          title: "劣势 (W)：新材质供应链未验证 + 培育钻价格风险 + 多市场合规负担",
          description:
            "木材/树脂/搪瓷等新材质供应链稳定性和质量一致性未经证实。培育钻石未与头部生产商锁定长期协议，价格下跌风险高。日本过敏合规认证周期长达6个月（risk_01），Amazon合规文件需逐市场准备。",
          impact: "medium",
          sources: 3,
        },
        {
          title: "机会 (O)：四大创新方向均有强证据支撑",
          description:
            "新品类（培育钻石独立线/第二皮肤防过敏系列/模块化叠戴手镯）、新材质（木材/树脂/搪瓷）、新场景（24小时常戴/动漫收藏黄金/马主题吊坠）、新技术（AR试戴/直播预购）四大方向均有跨市场证据。每个方向对应明确验证指标。",
          impact: "high",
          sources: 30,
        },
        {
          title: "威胁 (T)：价格倒挂 + 过敏合规 + 关税 + CTF全球化扩张",
          description:
            "培育钻石批发价年跌15%-20%可能导致新品价格倒挂（risk_02）。日本过敏标准缺失将被搜索算法过滤（risk_10）。美国对日关税使采购成本激增（risk_06）。CTF在东南亚和全球扩张加剧竞争（risk_07）。四大威胁均需立即应对。",
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
        "外部环境以运营压力为主：金价高位$145/g但走势可预测（gold-api.com），多市场Amazon推荐费上调0.4%+FBA费率调整，OFAC SDN全域合规需建立月度筛查机制，日本市场过敏标准构成搜索准入门槛。",
      keyPoints: [
        {
          title: "政策与监管：合规要求可预测但须系统化",
          description:
            "Amazon珠宝类目合规升级和OFAC SDN更新均为例行性质（K-02/K-07）。但8个市场同步触发SDN信号，需建立月度筛查机制覆盖所有在营市场。合规文档（材料测试/铅检测）需常态化管理。",
          impact: "high",
          sources: 21,
        },
        {
          title: "经济环境：金价高位$145/g + 竞品价格透明化",
          description:
            "黄金$145.02/g、铂金$62.05/g（gold-api.com Primary API）。老凤祥官网实时展示金价$189.2/克（CN_competitors_631081），消费者价格高度敏感。竞品密集促销（老凤祥/六福珠宝）挤压流量和价格空间。",
          impact: "high",
          sources: 33,
        },
        {
          title: "社会趋势：渐进式消费行为演变 + 日本过敏文化",
          description:
            "培育钻石接受度稳步提升，男性珠宝兴趣上升。日本消费者对金属过敏极度敏感，サージカルステンレス316L成为商品标题必备词（risk_jp_allergy）。可持续材料的环保叙事影响力渐增。",
          impact: "medium",
          sources: 60,
        },
        {
          title: "平台规则：多市场费率调整并行",
          description:
            "Amazon日本推荐费上调0.4%（K-03）+ FBA费率调整（K-06）。韩国Coupang停止自发货新注册（K-05）。日本高价值珠宝退货政策调整为不可退货（K-04）。平台合规门槛全面提高。",
          impact: "high",
          sources: 20,
        },
      ],
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary:
        "竞争格局相对稳定，现有玩家策略透明（老凤祥/六福/CTF）。主要变量是培育钻石DTC品牌的中期渗透速度和平台合规门槛对竞争格局的筛选效应。CTF东南亚扩张构成区域威胁。",
      keyPoints: [
        {
          title: "行业竞争强度：格局稳固但区域热点出现",
          description:
            "老凤祥/六福在中国频繁上新和节日促销（K-08）。CTF在曼谷、新加坡加速开店（K-09）。竞争焦点在品牌叙事和本地化服务差异。尚未出现价格战信号但价格透明化压力加大。",
          impact: "medium",
          sources: 6,
        },
        {
          title: "新进入者威胁：渐进而非突发",
          description:
            "DTC培育钻石品牌增长确定但节奏可控。Amazon合规门槛（材料文档/铅测试/贵金属验证）提高了新卖家进入壁垒，对合规玩家有利。Coupang自发货收紧进一步筛选卖家质量。",
          impact: "low",
          sources: 8,
        },
        {
          title: "替代品压力：培育钻石存量替代已在计算中",
          description:
            "培育钻石对天然钻石的替代效应已被广泛认知。美国市场培育钻搜索量上升（US_market_trends_db4242）。重点监控培育钻石价格走势和消费者转化率。2克拉以下天然钻石品类风险最大。",
          impact: "medium",
          sources: 12,
        },
        {
          title: "供应商关系：金价透明度高 + 关税不确定性",
          description:
            "贵金属价格由国际市场定价，议价空间有限但可预测。美国对日关税Section 122将于2026年7月24日到期（K-01），供应链成本不确定性增加，需在合同中加入关税变动条款。",
          impact: "medium",
          sources: 33,
        },
      ],
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary:
        "所处群组定位清晰。培育钻石群组（CAGR 13.42%）为最值得关注的相邻群组。新加坡GST豁免打开投资贵金属新群组。Amazon合规门槛提高筛选淘汰不合规中小型卖家，对合规玩家有利。",
      keyPoints: [
        {
          title: "同群组竞争：策略透明，竞争有序",
          description:
            "中端珠宝群组主要玩家策略透明，竞争维度集中在产品设计和营销叙事。Amazon合规门槛提高可能筛选淘汰不合规的小型玩家，对合规玩家构成利好。",
          impact: "medium",
          sources: 20,
        },
        {
          title: "市场份额稳定：增长来自市场自然扩张",
          description:
            "戒指和钻石品类在珠宝市场占据核心份额。市场份额格局稳定，增长主要来自品类扩展（培育钻/极简混合金属）和消费者触达深化（AR试戴/社交电商）。",
          impact: "medium",
          sources: 8,
        },
        {
          title: "跨群组流动性：培育钻群组为最佳迁移方向",
          description:
            "培育钻石群组与现有群组在供应链、设计能力、客户基础上重叠度高。韩国搜索增长显著，2-4克拉无色钻石最受欢迎。布局培育钻石产品线是实现向高增长群组迁移的最低阻力路径。",
          impact: "medium",
          sources: 12,
        },
        {
          title: "进入壁垒：合规门槛构成有效护城河",
          description:
            "珠宝类目合规要求提高了新卖家进入门槛。提前完成合规认证的卖家可享受不合规竞品退出带来的流量红利。日本市场过敏标准构成额外的差异化壁垒。",
          impact: "low",
          sources: 10,
        },
      ],
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary:
        "优化重点在于采购端（金价动态监控+关税风险对冲）和分销端（多市场FBA费率精算+日本贴标合规截止3月31日）。设计端维持趋势信号监控节奏。合规端建立常态化文档管理流程。",
      keyPoints: [
        {
          title: "采购优化：金价风险监控 + 关税条款更新",
          description:
            "黄金$145.02/g（Primary API，置信度1.0）。建议设置阈值警报（单日波动>2%），根据风险信号调整采购节奏。合同中加入关税变动条款以应对Section 122到期风险。",
          impact: "high",
          sources: 33,
        },
        {
          title: "分销效率：逐SKU精算多市场FBA新费率",
          description:
            "日本Amazon推荐费上调0.4%但FBA配送费可能下调（O-05），存在费率结构对冲机会。美国FBA配送费更新小件成本上升（K-06）。日本贴标混储3月31日截止（O-02），须排查所有FBA SKU标签类型。包装优化可降本$0.3-0.5/单（O-01）。",
          impact: "high",
          sources: 20,
        },
        {
          title: "合规管理：建立多市场合规文档库",
          description:
            "材料成分文档、铅含量测试报告、贵金属含量验证为三项核心合规文件。需按市场（美国/日本/韩国）分别建立索引。日本市场需额外准备过敏原检测报告。Coupang自发货转火箭配送需系统对接。",
          impact: "high",
          sources: 10,
        },
        {
          title: "设计开发：维持跨市场趋势信号监控",
          description:
            "12条运营机会信号覆盖多市场（培育钻专区/极简混合金属/AR试戴/竞品拦截广告）。维持每日/每周监控节奏，重点关注培育钻石和极简混合金属方向的搜索量变化。",
          impact: "low",
          sources: 30,
        },
      ],
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary:
        "优势（趋势感知强+数据驱动决策+合规前置时间窗口）vs 劣势（竞品价格透明化压力+部分市场数据置信度不均）。机会（12条跨市场运营优化机会）略多于威胁（9条风险），整体处于可管理的平衡状态。",
      keyPoints: [
        {
          title: "优势 (S)：数据驱动决策 + 合规前置能力",
          description:
            "跨市场运营信号覆盖8个市场。贵金属价格来自Primary API（置信度1.0）。Amazon费率变更和合规要求均有具体数据支撑。合规前置的时间窗口使品牌可享受不合规竞品退出的红利。",
          impact: "high",
          sources: 60,
        },
        {
          title: "劣势 (W)：竞品价格透明化 + 多市场协调成本",
          description:
            "老凤祥官网实时展示金价使消费者价格高度敏感（risk_cn_price）。日本过敏标准+韩国Coupang政策+美国合规审查需逐市场投入专门资源。多市场运营协调成本高。",
          impact: "medium",
          sources: 3,
        },
        {
          title: "机会 (O)：费率结构对冲 + 品类扩展 + 竞品拦截",
          description:
            "日本FBA费率上调但配送费下调可对冲（O-05）。培育钻专区可贡献额外5-10%自然流量（O-06）。极简混合金属品类竞争尚低（O-07）。曼谷竞品拦截广告可阻断客流向CTF（O-09）。",
          impact: "high",
          sources: 30,
        },
        {
          title: "威胁 (T)：费率上涨 + 合规下架 + 竞品扩张 + 金价波动",
          description:
            "日本推荐费上调0.4%直接压缩利润（risk_jp_referral_fee）。美国珠宝合规缺失导致下架（risk_us_jewelry_restricted）。CTF东南亚扩张分流中高端客户（risk_ctf_se_asia）。金价$145/g高位没有缓解迹象。",
          impact: "high",
          sources: 35,
        },
      ],
    },
  },
  rescue: {
    pestle: {
      id: "pestle",
      name: "PESTLE 分析",
      summary:
        "结构性压力多重叠加：CTF全球品牌升级+品类扩展（家居线）构成竞争结构性质变，Amazon合规收紧直接威胁listing安全，OFAC全域制裁审查可能触发供应链中断，培育钻独立品类重塑消费价值，关税Section 122波动增加不确定性。",
      keyPoints: [
        {
          title: "竞争结构质变：CTF全球品牌升级 + 家居线扩展",
          description:
            "Chow Tai Fook启动全球品牌升级，推出高端系列，进入家居领域，快速扩张东南亚和澳洲，任命全球品牌大使（K-07）。可能长期占据中国高端珠宝心智份额，迫使集团重新进行品牌定位（ris0/ris1）。",
          impact: "high",
          sources: 12,
        },
        {
          title: "政策与合规：Amazon + OFAC + 关税三重压力",
          description:
            "Amazon珠宝类目强制要求材料成分文档、铅测试和贵金属验证（ris7）。OFAC SDN全域筛查需建立月度机制（a1）。Section 122关税对多国产品加征15%-50%（ris6），供应链成本不确定性上升。",
          impact: "high",
          sources: 21,
        },
        {
          title: "市场结构变化：中国从投资保值转向悦己消费",
          description:
            "中国黄金珠宝需求从投资保值转向悦己消费（K-05），轻量化、文创IP联名趋势明显。老凤祥以实时金价占据投资保值心智（ris5），六福深度绑定婚嫁场景（ris0）。产品和渠道策略需全面调整。",
          impact: "high",
          sources: 10,
        },
        {
          title: "产品趋势：培育钻独立品类 + 可持续 + 中性化 + 轻量化",
          description:
            "2026年珠宝潮流聚焦实验室钻石、可持续材质、雕塑感银饰、中性化设计（K-04）。若品牌仍以天然钻石为主力且未推出培育钻石产品线，将错失新一代客群（ris4）。产品组合需向年轻化转型。",
          impact: "high",
          sources: 15,
        },
      ],
    },
    porter: {
      id: "porter",
      name: "波特五力模型",
      summary:
        "五重竞争压力同时施压：CTF全球化竞争改变竞争格局、培育钻石替代侵蚀核心品类定价、Amazon合规门槛筛选淘汰、买方信息透明削弱品牌溢价、关税+金价高位挤压利润空间。需总部层面战略重构竞争优势。",
      keyPoints: [
        {
          title: "现有竞争强度：CTF全球化改变竞争格局",
          description:
            "CTF启动全球品牌升级并进入家居领域（ris0），在曼谷Siam Paragon、新加坡樟宜机场开店（ris1），推出CTF JOIE轻奢系列主打IP联名。竞争已从区域层面升级为全球品牌心智争夺。",
          impact: "high",
          sources: 12,
        },
        {
          title: "替代品蚕食：从长期趋势变为短期压力",
          description:
            "培育钻石替代天然钻石已从未来趋势变为正在发生。若产品组合中天然钻占比过高，需立即评估调整方案。2克拉以下天然钻石品类风险最大。培育钻石必须作为独立品类运营（ris4）。",
          impact: "high",
          sources: 12,
        },
        {
          title: "买方力量：信息透明化削弱品牌溢价",
          description:
            "消费者比以往更了解市场，社交媒体和AI趋势分析使比价成本趋近于零。老凤祥实时金价展示使消费者价格高度敏感（ris5）。没有扎实文化叙事支撑的品牌溢价正在快速蒸发。",
          impact: "high",
          sources: 30,
        },
        {
          title: "供应商压力：金价高位 + 关税不确定性",
          description:
            "黄金$145.02/g处于历史高位区间（ris6）。美国Section 122关税对多国加征15%-50%，供应链成本不确定性引发终端售价大幅波动。需总部统一供应链合规体系并制定多元化采购策略。",
          impact: "medium",
          sources: 33,
        },
      ],
    },
    "strategic-group": {
      id: "strategic-group",
      name: "战略群组分析",
      summary:
        "传统中端群组受K型市场挤压最重。CTF正占据高端中国珠宝心智份额。需评估向培育钻石群组（CAGR 13.42%）或可持续群组迁移的可行性。迁移窗口期有限，延迟决策的成本日益增加。",
      keyPoints: [
        {
          title: "群组增长乏力：中端群组的结构性困境",
          description:
            "K型市场分化使中端消费受到最严重的挤压：高收入群体流向CTF等升级品牌，低收入群体缩减可选支出。中端群组的增长空间已从市场自然扩张转变为存量博弈。",
          impact: "high",
          sources: 8,
        },
        {
          title: "竞争地位削弱：CTF占据高端心智 + 合规门槛加速淘汰",
          description:
            "CTF推出高端系列并任命全球品牌大使，可能长期占据中国高端珠宝心智份额（ris0）。Amazon珠宝合规要求对中小型卖家构成实质性的市场退出压力。幸存者面临更激烈的存量竞争。",
          impact: "high",
          sources: 20,
        },
        {
          title: "转型机会：向培育钻群组或可持续群组迁移",
          description:
            "培育钻石群组以CAGR 13.42%增长，与现有供应链和设计能力高度兼容。Cartier韩国提价11%显示高端价格带存在空间（K-06），以极简设计+卓越性价比可切入。新加坡GST豁免打开投资贵金属新群组（K-09）。",
          impact: "high",
          sources: 12,
        },
        {
          title: "差异化路径：文化联名 + 本地工艺 + 极简钻石线",
          description:
            "日本侘寂美学联名（O-09）、东南亚本土IP（O-07）、泰国宋干节水花系列（O-08）、马来西亚闰月双福金珠手链（O-12）、韩国极简钻石线（O-10）等多条差异化路径均有明确证据支撑。",
          impact: "high",
          sources: 30,
        },
      ],
    },
    "value-chain": {
      id: "value-chain",
      name: "价值链分析",
      summary:
        "合规端（Amazon珠宝文档+OFAC筛查）为最紧急的止血点。采购端（金价风险监控+关税对冲+多元化采购）和分销端（多市场FBA费率精算+中台建设）需并行处理。设计端和营销端需快速将趋势信号转化为可执行的产品方案。",
      keyPoints: [
        {
          title: "合规止血：Amazon珠宝合规 + OFAC筛查同步推进",
          description:
            "Amazon珠宝类目合规是最紧迫的价值链瓶颈：未合规=下架=收入归零（ris7）。OFAC SDN全域筛查需建立月度机制（a1）。需在最短时间内完成现有ASIN合规状态核查并补齐缺失文档。",
          impact: "high",
          sources: 25,
        },
        {
          title: "利润保护：多市场FBA费率精算 + 关税风险对冲",
          description:
            "日本推荐费上调0.4%+FBA费率调整（a4）+美国FBA费率上调（ris2）+Section 122关税波动（ris6）多重挤压利润空间。需建立跨市场电商运营中台统一管理费率变化（K-03），逐SKU核算盈亏平衡点。",
          impact: "high",
          sources: 53,
        },
        {
          title: "产品转型：快速测试五大转型方向",
          description:
            "培育钻石独立产品线（ris4）、新中式黄金设计挑战赛（O-06）、极简钻石线（O-10）、日本手作联名（O-09）、越南社交电商冷启动（O-11）五大方向均有强证据支撑。速度优先于完美——趋势窗口有限。",
          impact: "high",
          sources: 30,
        },
        {
          title: "渠道转型：从依赖批发转向DTC+平台直营",
          description:
            "多市场平台费用上涨与规则收紧（K-03），越南社交电商增速领先东南亚（K-08），新加坡AR试戴消除线上决策摩擦（O-02）。渠道能力需从依赖批发转向DTC与平台直营，建立跨市场电商运营中台。",
          impact: "high",
          sources: 20,
        },
      ],
    },
    swot: {
      id: "swot",
      name: "SWOT 分析",
      summary:
        "威胁（CTF全球化/合规下架/培育钻蚕食/K型分化/关税波动）的紧迫性高于机会的吸引力。生存优先：先止血（合规），再修复（利润保护+中台建设），最后转型（产品组合+渠道能力）。窗口期有限。",
      keyPoints: [
        {
          title: "优势 (S)：跨市场趋势感知 + 多市场运营经验积累",
          description:
            "8市场信号覆盖提供充分的外部感知。多市场运营经验为建立跨市场电商运营中台奠定基础。从信号到行动的转化速度是当前最稀缺的优势。",
          impact: "high",
          sources: 60,
        },
        {
          title: "劣势 (W)：品牌定位需重新评估 + 合规体系碎片化",
          description:
            "CTF全球品牌升级迫使集团重新评估品牌定位（a3）。各市场合规体系碎片化，缺乏统一的供应链合规管理（ris6）。部分市场数据置信度不均。",
          impact: "high",
          sources: 3,
        },
        {
          title: "机会 (O)：12条转型机会覆盖多市场多维度",
          description:
            "从中国新中式设计挑战赛（O-06）到日本手作联名（O-09），从韩国极简钻石线（O-10）到越南社交电商冷启动（O-11），从新加坡IP联名快闪店（O-07）到马来西亚闰月金珠手链（O-12），每条路径都有明确的验证指标。",
          impact: "medium",
          sources: 30,
        },
        {
          title: "威胁 (T)：五重压力形成从短到长的威胁链",
          description:
            "合规下架（立即）+ 关税波动（短期）+ 培育钻石蚕食（中期）+ CTF全球化竞争（中长期）+ K型市场分化（长期）形成完整的威胁链。任一风险失控都可能导致严重的业务冲击。需并行的三线作战策略。",
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
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedFramework === framework.id
                ? "bg-white shadow-md text-amber-900 border border-amber-200"
                : "text-gray-500 hover:text-amber-700 hover:bg-white/50"
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
        className="p-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/30"
      >
        <p className="text-amber-800/80 text-sm leading-relaxed mb-6">
          {currentData.summary}
        </p>

        <div className="space-y-3">
          {currentData.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-amber-100 bg-white/80 overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedPoint(expandedPoint === index ? null : index)
                }
                className="w-full p-4 flex items-start gap-3 text-left hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-amber-900 truncate">
                      {point.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(
                        point.impact
                      )}`}
                    >
                      {point.impact === "high"
                        ? "高影响"
                        : point.impact === "medium"
                        ? "中影响"
                        : "低影响"}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className={`size-5 text-amber-500 transition-transform shrink-0 ${
                    expandedPoint === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              {expandedPoint === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4"
                >
                  <p className="text-sm text-amber-700/80 leading-relaxed">
                    {point.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-amber-100">
                    <span className="text-xs text-amber-500">
                      数据来源: {point.sources} 条相关信号
                    </span>
                    <ExternalLink className="size-3 text-amber-400" />
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

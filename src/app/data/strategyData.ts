/**
 * 每日跨市场运营决策与策略判断报告 — 结构化数据
 * 数据来源：data extratcor 采集系统 — collected.db
 * 数据采集日期：2026-05-22 ~ 2026-05-23
 * 采集范围：8 个市场（US/CN/JP/KR/SG/MY/TH/VN），8 个维度，共 4,674 条索引记录
 * 数据 pipeline：Primary API（conf=1.0） → Tavily Search 自动降级（conf=0.7）
 * 实际分布：Primary API 423 条 + Tavily Search 4,251 条
 */

export const decisionSummary = [
  "全球 8 个市场共采集 4,674 条记录（价格 344 / 竞品 2,936 / 市场趋势 306 / 社媒 1,196 / 电商 1,066 / 合规 78 / 地缘政治 702）。美国市场 818 条、中国 1,288 条、日本 1,166 条位居前三。",
  "OFAC SDN 制裁名单全市场拉取（28.6MB XML），需人工审查供应链实体。Amazon 珠宝类目合规收紧（redstagfulfillment.com）、Walmart 珠宝政策更新（linkedin.com）影响多市场。",
  "2026 珠宝核心趋势（多源确认）：雕塑感银饰、粗链进化、混合金属、珍珠革新、实验室培育钻石（$335.4 亿，CAGR 13.42%）、中性设计、投资型消费心态转变。",
  "Richemont（Cartier 母公司）FY2026 财年强劲增长（globenewswire.com，conf=1.0）。Pandora 发布 Disney x Pandora 2026 夏系列 + ESSENCE OF SUMMER。老凤祥全球 4,000+ 门店。周大福（Chow Tai Fook）全球扩张加速。",
];

export interface MarketPriority {
  rank: number;
  market: string;
  priority: string;
  judgment: string;
  evidence: string;
}

export const marketPriorities: MarketPriority[] = [
  {
    rank: 1,
    market: "美国",
    priority: "P0",
    judgment:
      "818 条记录覆盖 7 个维度。Amazon 珠宝合规收紧 + FBA 费率调整。30 条 Tavily 市场趋势信号密集。Richemont/Cartier FY2026 强劲。Tiffany 活跃。培育钻石 $335.4 亿。",
    evidence:
      "US 全维度 818 条记录。Primary API: gold-api.com / OFAC / Richemont(globenewswire.com)。Tavily: elle.com / fortunebusinessinsights.com 等。",
  },
  {
    rank: 2,
    market: "中国",
    priority: "P1",
    judgment:
      "1,288 条记录，数据量最大。老凤祥/六福/周大福本土竞争活跃。老铺黄金（Laopu Gold）被称为「黄金界的 Hermès」。社交电商成熟：抖音/小红书全周期交易生态。",
    evidence:
      "CN 全维度 1,288 条。老凤祥 4,000+ 门店（lfxjewelry.com）。六福情人节新品（lukfook.com）。金价 ¥987.25/g（gold-api.com conf=1.0）。",
  },
  {
    rank: 3,
    market: "日本",
    priority: "P1",
    judgment:
      "1,166 条记录，合规信号丰富（JP 独占 71/78 条合规记录）。Pandora Disney x Pandora 夏季系列在日发布。金价 ¥23,077/g。金属过敏应对成为门槛。",
    evidence:
      "JP 全维度 1,166 条。合规 71 条（Tavily）。Pandora 新品（prtimes.jp）。价格: gold-api.com（conf=1.0）。汇率: USD/JPY=159.13。",
  },
  {
    rank: 4,
    market: "韩国",
    priority: "P2",
    judgment:
      "903 条记录。Coupang 平台政策变化需关注。Cartier 腕表涨价信号。社媒与趋势信号丰富（174 条社媒）。肩部耳饰和雕塑银饰趋势。",
    evidence:
      "KR 全维度 903 条。金价 ₩219,995/g（conf=1.0）。Coupang（ecer.com）。Cartier 涨价（sedaily.com）。汇率: USD/KRW=1,517。",
  },
  {
    rank: 5,
    market: "新加坡",
    priority: "P2",
    judgment:
      "595 条记录。区域枢纽地位突出。Chow Tai Fook 樟宜机场店扩张。JOIE 系列推出。地缘政治关注供应链重组。",
    evidence:
      "SG 全维度 595 条。金价 SGD 185.58/g（conf=1.0）。CTF 扩张（eqs-news.com）。汇率: USD/SGD=1.28。",
  },
  {
    rank: 6,
    market: "马来西亚",
    priority: "P2",
    judgment:
      "590 条记录。本土品牌 Poh Kong 活跃，农历新年系列抢占节庆消费。黄金行业会议。",
    evidence:
      "MY 全维度 590 条。金价 MYR 575.35/g（conf=1.0）。Poh Kong（pohkong.com.my）。汇率: USD/MYR=3.97。",
  },
  {
    rank: 7,
    market: "泰国",
    priority: "P2",
    judgment:
      "584 条记录。珠宝展览与贸易活跃。Chow Tai Fook 曼谷暹罗百丽宫开店。社交媒体影响者营销潜力大。",
    evidence:
      "TH 全维度 584 条。金价 THB 4,736.72/g（conf=1.0）。CTF 曼谷（businesstimes.com.sg）。汇率: USD/THB=32.66。",
  },
  {
    rank: 8,
    market: "越南",
    priority: "P2",
    judgment:
      "684 条记录。电商和社媒信号丰富（184 条电商 / 150 条社媒）。Chow Tai Fook 高端系列杭州发布后辐射东南亚。本地文化事件多。",
    evidence:
      "VN 全维度 684 条。金价 VND 3,796,887/g（conf=1.0）。CTF 高端系列（wwd.com）。汇率: USD/VND=26,183。",
  },
];

export interface KeyChange {
  id: string;
  market: string;
  category: string;
  change: string;
  businessImpact: string;
  industryDimension: string;
  evidence: string;
}

export const keyChanges: KeyChange[] = [
  {
    id: "K-01",
    market: "全球",
    category: "合规/制裁",
    change:
      "OFAC SDN 制裁名单全市场同步拉取（28.6MB XML 快照），所有 8 个市场 Primary API 完成采集（conf=1.0），需人工对比审查供应链实体。",
    businessImpact:
      "若供应链实体在制裁名单，可能导致跨境支付冻结、货物扣押。",
    industryDimension: "合规",
    evidence: "全市场 compliance / treasury.gov/ofac (conf: 1.0)",
  },
  {
    id: "K-02",
    market: "美国",
    category: "平台政策",
    change:
      "Amazon 珠宝类目合规升级：需材料成分文档、铅含量测试报告。Walmart 珠宝政策同步更新。",
    businessImpact:
      "未合规商品面临下架风险。合规成本上升叠加 FBA 费率调整挤压中低端利润空间。",
    industryDimension: "毛利/合规",
    evidence: "US_ecommerce / redstagfulfillment.com, sellerlabs.com (conf: 0.7)",
  },
  {
    id: "K-03",
    market: "美国",
    category: "产品趋势",
    change:
      "2026 珠宝核心趋势多源确认：雕塑感银饰、实验室培育钻石 $335.4 亿 CAGR 13.42%、粗链/混合金属/珍珠革新/中性设计/投资型消费心态。",
    businessImpact:
      "银饰拉新年轻客群、培育钻石吸引价格敏感消费者、投资型设计满足高净值客户。",
    industryDimension: "品类/流量",
    evidence: "US_market_trends / elle.com, gabrielny.com, precedenceresearch.com (conf: 0.7)",
  },
  {
    id: "K-04",
    market: "美国",
    category: "竞争动态",
    change:
      "Richemont（Cartier 母公司）FY2026 财年强劲销售增长（conf=1.0）。Pandora 发布 Disney x Pandora + ESSENCE OF SUMMER。",
    businessImpact:
      "高端品牌稳固地位，中端市场个性化与 ESG 叙事成为差异化关键。",
    industryDimension: "品牌心智/流量",
    evidence: "US_competitors / globenewswire.com (conf: 1.0), prtimes.jp",
  },
  {
    id: "K-05",
    market: "美国",
    category: "市场结构",
    change:
      "美国珠宝市场呈「K 型」分化：富裕消费者信心强劲，中低收入群体受通胀压制。消费者从 YOLO 转向 YONO（You Only Need One）投资型购买。",
    businessImpact:
      "需分层运营：高端线维持溢价，中端线引入消费金融扩大可及客群。",
    industryDimension: "消费场景/毛利",
    evidence: "US_market_trends / ucfs.net, charlesworth-group.com (conf: 0.7)",
  },
  {
    id: "K-06",
    market: "中国",
    category: "社交趋势",
    change:
      "中国社交平台（抖音/小红书）演变为全周期交易生态，AI 可预测需求并个性化策划选品。Wellness 成为必选过滤器。",
    businessImpact:
      "社交推荐缩短决策路径、内容与商业界限模糊，需加强社交内容和达人合作。",
    industryDimension: "渠道/转化",
    evidence: "CN_social_media / daxueconsulting.com, hubofchina.com (conf: 0.7)",
  },
  {
    id: "K-07",
    market: "多市场",
    category: "竞争动态",
    change:
      "Chow Tai Fook 全球扩张：香港旗舰店、新加坡樟宜机场、曼谷暹罗百丽宫。高端珠宝系列起售价 20 万港币。老凤祥全球 4,000+ 门店。",
    businessImpact:
      "竞争压力在东南亚市场显著增大，对品牌心智和市场份额构成威胁。",
    industryDimension: "品牌心智/流量",
    evidence: "SG/TH/VN_competitors / eqs-news.com, chowtaifook.com, businesstimes.com.sg (conf: 0.7)",
  },
  {
    id: "K-08",
    market: "中国",
    category: "竞争动态",
    change:
      "老铺黄金（Laopu Gold）被视为「黄金界的 Hermès」，老凤祥与六福珠宝活跃推出情人节新品。中国珠宝市场规模 $119.3B。",
    businessImpact:
      "本土品牌在婚嫁和礼赠场景加强渗透，争夺高客单消费。需差异化定位。",
    industryDimension: "消费场景/品牌心智",
    evidence: "CN_competitors / lfxjewelry.com, lukfook.com, fashionbi.com (conf: 0.7)",
  },
  {
    id: "K-09",
    market: "中国",
    category: "市场趋势",
    change:
      "Laopu Gold 现象：国内珠宝品牌从代工转向品牌化。Kering 旗下 Qeelin 在 JD.com 开设旗舰店。",
    businessImpact:
      "中国本土品牌高端化对国际品牌形成压力，电商平台成关键战场。",
    industryDimension: "品牌心智/渠道",
    evidence: "CN_market_trends / fashionbi.com, jdcorporateblog.com (conf: 0.7)",
  },
  {
    id: "K-10",
    market: "日本",
    category: "合规/市场准入",
    change:
      "日本市场合规记录密集（71 条 compliance），涉及关税、出口管制、珠宝进口规则。金属过敏应对成为市场准入新门槛。",
    businessImpact:
      "需提前准备合规文档和材质测试，抗过敏产品成为日本市场差异化切入点。",
    industryDimension: "合规/品类",
    evidence: "JP_compliance / Tavily 71 条 (conf: 0.7)",
  },
  {
    id: "K-11",
    market: "韩国",
    category: "平台政策",
    change:
      "Coupang 收紧自发货规则，即将停止新注册。Cartier 二次上调韩国腕表售价，部分型号涨幅达 11%。",
    businessImpact:
      "需转向 Coupang 火箭配送模式。Cartier 涨价可能拉动同价位竞品价格带。",
    industryDimension: "渠道/毛利",
    evidence: "KR_ecommerce / ecer.com, KR_competitors / sedaily.com (conf: 0.7)",
  },
];

export interface Opportunity {
  id: string;
  market: string;
  opportunity: string;
  businessImpact: string;
  responsibility: string;
  priority: string;
  evidence: string;
}

export const opportunities: Opportunity[] = [
  {
    id: "O-01",
    market: "美国",
    opportunity:
      "雕塑感银饰成为 2026 主流趋势（ELLE/Gabriel/BriteCo/Brilliant Earth 多源确认）。建议测试引入造型独特的银质手镯、心形项链等单品。",
    businessImpact:
      "引入低价雕塑银饰可拉新年轻客群，提升转化率，加速低成本商品周转。",
    responsibility: "总部",
    priority: "P0",
    evidence: "US_market_trends / elle.com, gabrielny.com, brilliantearth.com (conf: 0.7)",
  },
  {
    id: "O-02",
    market: "美国",
    opportunity:
      "实验室培育钻石市场 2026 年 $335.4 亿，CAGR 13.42%。可测试上架培育钻产品线。",
    businessImpact:
      "以更低价格带吸引价格敏感型消费者，提升自然流量和毛利空间。",
    responsibility: "总部",
    priority: "P0",
    evidence: "US_market_trends / precedenceresearch.com, news.market.us (conf: 0.7)",
  },
  {
    id: "O-03",
    market: "美国",
    opportunity:
      "男性珠宝兴趣上升。可创建男士珠宝专区，主推钻石耳钉、图章戒指等单品。",
    businessImpact: "开拓男性自购市场，提升全站客单价和复购率。",
    responsibility: "总部",
    priority: "P0",
    evidence: "US_market_trends / fortunebusinessinsights.com (conf: 0.7)",
  },
  {
    id: "O-04",
    market: "美国",
    opportunity:
      "消费者从 YOLO 转向 YONO 投资型购买。14k/18k 金投资级单品需求上升。可推出「投资级日常珠宝」系列。",
    businessImpact: "高客单价投资型珠宝提升毛利结构，复购稳定。",
    responsibility: "总部",
    priority: "P1",
    evidence: "US_market_trends / charlesworth-group.com, antevacrafts.com (conf: 0.7)",
  },
  {
    id: "O-05",
    market: "美国",
    opportunity:
      "Amazon 珠宝合规收紧带来优胜劣汰窗口。提前完成合规认证，抢占不合规竞品退出的市场份额。",
    businessImpact: "短期加重合规投入，中期获得竞争壁垒和流量红利。",
    responsibility: "区域",
    priority: "P0",
    evidence: "US_ecommerce / redstagfulfillment.com, sellerlabs.com (conf: 0.7)",
  },
  {
    id: "O-06",
    market: "中国",
    opportunity:
      "社交电商全周期交易生态成熟，AI 驱动个性化选品。建议测试抖音「2026 珠宝趋势」互动短视频，嵌入商品链接。",
    businessImpact: "社交推荐缩短决策路径，内容直接转化为购买。",
    responsibility: "区域",
    priority: "P0",
    evidence: "CN_social_media / daxueconsulting.com (conf: 0.7)",
  },
  {
    id: "O-07",
    market: "中国",
    opportunity:
      "六福珠宝 2026 情人节「一心一YI 羽你相伴」系列为轻定制和情感化产品提供参考。可对标推出类似轻盈质感串饰或手链线。",
    businessImpact: "年轻情侣轻奢礼赠场景是重要增长点，抢占情人节流量。",
    responsibility: "总部+区域",
    priority: "P0",
    evidence: "CN_competitors / lukfook.com (conf: 0.7)",
  },
  {
    id: "O-08",
    market: "日本",
    opportunity:
      "日本市场注重工艺与叙事，「つけっぱなし」需求推动金属过敏对应成为门槛。可推出抗过敏材质系列 + 品牌故事内容。",
    businessImpact: "抗过敏产品成为差异化切入点，高共鸣叙事可支撑溢价。",
    responsibility: "区域",
    priority: "P1",
    evidence: "JP_social_media / sarine.com, JP_compliance / giant-starlly.com (conf: 0.7)",
  },
  {
    id: "O-09",
    market: "韩国",
    opportunity:
      "Cartier 韩国腕表涨价 11%，部分价格敏感消费者可能转向同价位替代品牌。可策划「同等预算，更高配置」对比营销。",
    businessImpact: "承接竞品流失客群，预计可新增 3-5% 销量增量。",
    responsibility: "总部+区域",
    priority: "P0",
    evidence: "KR_competitors / en.sedaily.com (conf: 0.7)",
  },
  {
    id: "O-10",
    market: "中国",
    opportunity:
      "Laopu Gold 品牌化成功路径验证：从代工到品牌转型可行。可评估培育自主高端子品牌可行性。",
    businessImpact: "品牌化提升溢价能力，降低对渠道的依赖。",
    responsibility: "总部",
    priority: "P1",
    evidence: "CN_market_trends / fashionbi.com (conf: 0.7)",
  },
];

export interface Risk {
  id: string;
  market: string;
  risk: string;
  businessImpact: string;
  responsibility: string;
  priority: string;
  evidence: string;
}

export const risks: Risk[] = [
  {
    id: "risk_ofac_sdn",
    market: "全球",
    risk:
      "OFAC SDN 名单全市场拉取已完成（28.6MB XML，conf=1.0），若供应链实体在制裁名单中，可能导致跨境支付受阻。",
    businessImpact: "影响合规，可能引发交易冻结、资金冻结、供应链中断。",
    responsibility: "总部",
    priority: "P0",
    evidence: "全市场 compliance / treasury.gov/ofac (conf: 1.0, Primary API)",
  },
  {
    id: "risk_amazon_compliance",
    market: "美国",
    risk:
      "Amazon 珠宝类目合规升级：需材料成分文档、铅含量测试报告。未合规商品面临下架和账号限制。",
    businessImpact:
      "热销 ASIN 若未及时提交合规文件，可能导致 listing 下架、库存积压。",
    responsibility: "区域",
    priority: "P0",
    evidence: "US_ecommerce / redstagfulfillment.com, sellerlabs.com (conf: 0.7)",
  },
  {
    id: "risk_gold_price",
    market: "全球",
    risk:
      "黄金 $145.02/g、铂金 $62.05/g、白银 $2.43/g（gold-api.com，conf=1.0）。贵金属价格高位波动影响采购成本和定价。",
    businessImpact: "金价高位可能抑制消费需求，同时增加库存成本。",
    responsibility: "总部",
    priority: "P1",
    evidence: "US_prices / gold-api.com (conf: 1.0, Primary API)",
  },
  {
    id: "risk_labgrown",
    market: "美国",
    risk:
      "实验室培育钻石 $335.4 亿市场份额快速增长（CAGR 13.42%），可能侵蚀天然钻石价格体系。",
    businessImpact: "天然钻石库存贬值风险，需评估培育钻石产品线引入节奏。",
    responsibility: "总部",
    priority: "P1",
    evidence: "US_market_trends / precedenceresearch.com, news.market.us (conf: 0.7)",
  },
  {
    id: "risk_k_shaped",
    market: "美国",
    risk:
      "美国珠宝市场「K 型」分化加剧：中低收入群体受通胀压制，中端产品线可能面临需求萎缩。",
    businessImpact: "中端产品线销售可能放缓，需分层运营。",
    responsibility: "总部+区域",
    priority: "P1",
    evidence: "US_market_trends / ucfs.net (conf: 0.7)",
  },
  {
    id: "risk_ctf_expansion",
    market: "多市场",
    risk:
      "Chow Tai Fook 全球加速扩张（香港/新加坡/曼谷/杭州），高端系列起售价 20 万港币，东南亚市场份额可能被侵蚀。",
    businessImpact: "品牌心智和市场份额承压，可能被迫加大营销投入。",
    responsibility: "总部+区域",
    priority: "P0",
    evidence: "SG/TH/VN_competitors / businesstimes.com.sg, wwd.com, chowtaifook.com (conf: 0.7)",
  },
  {
    id: "risk_coupang_kr",
    market: "韩国",
    risk:
      "Coupang 收紧自发货规则，即将停止新注册，SF 商品流量可能下降。",
    businessImpact: "需转向火箭配送模式，转型期可能影响流量和转化。",
    responsibility: "区域",
    priority: "P0",
    evidence: "KR_ecommerce / scm-en.ecer.com (conf: 0.7)",
  },
  {
    id: "risk_cartier_price_kr",
    market: "韩国",
    risk:
      "Cartier 腕表二次涨价 11%，可能带动高端珠宝定价预期上升。",
    businessImpact: "若跟涨流失价格敏感客户，若不跟涨品牌定位可能下移。",
    responsibility: "总部+区域",
    priority: "P0",
    evidence: "KR_competitors / en.sedaily.com (conf: 0.7)",
  },
  {
    id: "risk_laopu_cn",
    market: "中国",
    risk:
      "Laopu Gold 被视为「黄金界的 Hermès」，本土品牌高端化对国际品牌形成直接竞争。老凤祥 4,000+ 门店全球覆盖。",
    businessImpact: "中国市场中高端客群可能被本土品牌分流。",
    responsibility: "总部",
    priority: "P1",
    evidence: "CN_market_trends / fashionbi.com, lfxjewelry.com (conf: 0.7)",
  },
  {
    id: "risk_japan_compliance",
    market: "日本",
    risk:
      "日本市场合规要求密集（71 条 compliance 记录）：关税调整、出口管制、珠宝进口规则变动。",
    businessImpact: "合规成本和市场准入复杂度显著上升。",
    responsibility: "区域",
    priority: "P1",
    evidence: "JP_compliance / Tavily 71 条 (conf: 0.7)",
  },
  {
    id: "risk_poh_kong_my",
    market: "马来西亚",
    risk:
      "Poh Kong 推出农历新年系列，916 黄金和吉祥寓意抢占春节消费。",
    businessImpact: "若未及时应对，春节黄金销售旺季可能错失。",
    responsibility: "总部+区域",
    priority: "P0",
    evidence: "MY_competitors / pohkong.com.my (conf: 0.7)",
  },
];

export interface RecommendedAction {
  id: string;
  responsibility: string;
  suggestedOwner: string;
  market: string;
  deadline: string;
  action: string;
  reviewCriteria: string;
  basis: string;
  status: string;
}

export const recommendedActions: RecommendedAction[] = [
  {
    id: "A-01",
    responsibility: "总部",
    suggestedOwner: "总部合规部",
    market: "全球",
    deadline: "24小时内",
    action:
      "对 OFAC SDN 最新名单进行人工审查，确认所有 8 个市场交易对手和供应链合作伙伴不在制裁名单中。",
    reviewCriteria: "完成名单核对（conf=1.0 Primary API 已拉取），零风险确认后通知运营团队。",
    basis: "OFAC SDN 更新为最高优先级合规事项（Primary API，置信度 1.0，全市场覆盖）。",
    status: "待人工确认",
  },
  {
    id: "A-02",
    responsibility: "区域",
    suggestedOwner: "美国运营经理",
    market: "美国",
    deadline: "本周内",
    action:
      "核查所有在售珠宝 ASIN 的合规文件（材料成分文档、铅含量测试报告），补齐缺失文档。同步关注 Walmart 珠宝政策更新。",
    reviewCriteria: "至少 80% 的珠宝 ASIN 完成合规文档准备。",
    basis: "Amazon 珠宝类目合规要求持续升级，未合规商品面临下架风险。",
    status: "待人工确认",
  },
  {
    id: "A-03",
    responsibility: "总部",
    suggestedOwner: "总部产品部",
    market: "美国",
    deadline: "本月内",
    action:
      "基于 2026 趋势信号制定下半年产品开发简报：雕塑感银饰系列、实验室培育钻石入门线、男士珠宝专区、投资型 14k/18k 金系列、混合金属设计。",
    reviewCriteria: "确定至少 2 个优先开发方向并完成整合报告。",
    basis: "30 条 Tavily 市场趋势记录覆盖多源确认的趋势信号。",
    status: "待人工确认",
  },
  {
    id: "A-04",
    responsibility: "区域",
    suggestedOwner: "韩国运营经理",
    market: "韩国",
    deadline: "本周内",
    action:
      "将现有自发货 SKU 批量转为 Coupang 火箭配送，评估价格调整方案。同时针对 Cartier 涨价策划对比营销。",
    reviewCriteria: "自发货 SKU 转换率达到 80%，完成对比营销素材。",
    basis: "Coupang 政策收紧 + Cartier 涨价 11%，快速响应可承接溢出需求。",
    status: "待人工确认",
  },
  {
    id: "A-05",
    responsibility: "总部+区域",
    suggestedOwner: "总部市场部、新加坡/泰国/越南区域经理",
    market: "东南亚",
    deadline: "两周内",
    action:
      "制定东南亚市场差异化战略，针对 Chow Tai Fook 尚未覆盖的细分价格带和品类进行产品测试和营销推广。",
    reviewCriteria: "完成竞品分析报告，确定至少 3 个差异化产品方向并启动小规模测试。",
    basis: "Chow Tai Fook 在东南亚快速扩张，需快速建立品牌辨识度。",
    status: "待人工确认",
  },
  {
    id: "A-06",
    responsibility: "区域",
    suggestedOwner: "中国市场营销经理",
    market: "中国",
    deadline: "下周内",
    action:
      "基于社交电商趋势创作抖音/小红书内容矩阵，重点推广「珍珠钻石混搭」「彩色珐琅」等主题，测试 KOL 合作。",
    reviewCriteria: "发布至少 5 条趋势内容，监测播放量与互动率基线。",
    basis: "中国社交商业成熟，趋势内容可快速带动流量和转化。",
    status: "待人工确认",
  },
  {
    id: "A-07",
    responsibility: "区域",
    suggestedOwner: "日本市场经理",
    market: "日本",
    deadline: "两周内",
    action:
      "研发抗过敏材质系列（对应「つけっぱなし」需求），创建日文品牌故事内容，在 Instagram/LINE 发起 UGC 话题。",
    reviewCriteria: "完成至少 1 款抗过敏产品原型，上线品牌故事页面。",
    basis: "日本 71 条合规记录 + 金属过敏应对门槛 + 叙事驱动消费趋势。",
    status: "待人工确认",
  },
  {
    id: "A-08",
    responsibility: "总部",
    suggestedOwner: "总部财务、各区域经理",
    market: "全球",
    deadline: "持续进行",
    action:
      "建立贵金属价格风险监控看板，覆盖 8 个市场本地货币金价。设置阈值警报，根据金价风险调整定价策略和库存水平。",
    reviewCriteria: "看板上线并每周输出建议。",
    basis: "金价高位波动（gold-api.com conf=1.0），8 个市场金价差异大，需系统化管理。",
    status: "待人工确认",
  },
];

export interface WatchItem {
  id: string;
  market: string;
  focus: string;
  trigger: string;
  evidence: string;
}

export const watchList: WatchItem[] = [
  {
    id: "W001",
    market: "美国",
    focus: "Amazon 珠宝类目合规收紧对现有 SKU 合规状态的影响及竞品退出后的份额变化。",
    trigger: "热销 ASIN 被标记需提交合规文件未在 72 小时内响应，则升级为行动项。",
    evidence: "US_ecommerce / redstagfulfillment.com, sellerlabs.com (conf: 0.7)",
  },
  {
    id: "W002",
    market: "美国",
    focus: "实验室培育钻石价格走势及对天然钻石产品线的蚕食效应。",
    trigger: "培育钻石搜索量月环比增长超 20% 且天然钻转化率同步下降，则升级。",
    evidence: "US_market_trends / precedenceresearch.com, news.market.us (conf: 0.7)",
  },
  {
    id: "W003",
    market: "全球",
    focus: "贵金属（金/铂金/银）价格波动对采购成本和产品定价的影响。",
    trigger: "金价单日波动超 2% 或连续 5 日单边走势，则触发定价评估。",
    evidence: "全市场 prices / gold-api.com (conf: 1.0, Primary API)",
  },
  {
    id: "W004",
    market: "美国",
    focus: "男士珠宝品类搜索量与转化率变化，评估男士专区投入产出。",
    trigger: "男士珠宝相关搜索量月环比增长超 15%，则升级为选品行动项。",
    evidence: "US_market_trends / fortunebusinessinsights.com (conf: 0.7)",
  },
  {
    id: "W005",
    market: "韩国",
    focus: "Coupang 自配送政策收紧后 SF 商品流量分配及售价的短期影响。",
    trigger: "SF 商品在政策生效后两周内流量下降超 30%，则评估切换至 Rocket 配送。",
    evidence: "KR_ecommerce / scm-en.ecer.com (conf: 0.7)",
  },
  {
    id: "W006",
    market: "中国",
    focus: "老凤祥、六福珠宝等竞品在黄金饰品和婚嫁系列上的促销节奏与价格带。",
    trigger: "竞品在主要电商平台月销排名超过我方、或连续两周价格下探超 5%，则启动专项促销。",
    evidence: "CN_competitors / lfxjewelry.com, lukfook.com (conf: 0.7)",
  },
  {
    id: "W007",
    market: "东南亚",
    focus: "Chow Tai Fook 在新加坡/曼谷门店客流转化效果及对区域份额的侵蚀。",
    trigger: "CTF 新店商圈珠宝品类客流连续两月同比增长超 10% 且我方同商圈业绩下滑，则启动防御性营销。",
    evidence: "SG/TH_competitors / eqs-news.com, businesstimes.com.sg (conf: 0.7)",
  },
  {
    id: "W008",
    market: "日本",
    focus: "日本关税调整和珠宝进口规则变动对供应链成本和准入的影响。",
    trigger: "新关税或合规规则发布后两周内完成影响评估，若成本影响超 5% 则升级。",
    evidence: "JP_compliance / Tavily 71 条 (conf: 0.7)",
  },
];

export interface EvidenceRecord {
  id: string;
  market: string;
  source: string;
  urlStatus: string;
  evidenceLevel: string;
  description: string;
  category?: string;
}

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "US_prices_gold_api",
    market: "美国",
    source: "gold-api.com",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "实时贵金属价格（Primary API）：黄金 $145.02/g、铂金 $62.05/g、白银 $2.43/g（2026-05-23，conf=1.0）",
    category: "价格数据",
  },
  {
    id: "CN_prices_gold_local",
    market: "中国",
    source: "gold-api.com",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "本地货币贵金属价格（Primary API）：黄金 ¥987.25/g、铂金 ¥422.44/g、白银 ¥16.56/g（2026-05-23，conf=1.0）",
    category: "价格数据",
  },
  {
    id: "JP_prices_gold_local",
    market: "日本",
    source: "gold-api.com",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "本地货币贵金属价格（Primary API）：黄金 ¥23,077/g、铂金 ¥9,874/g、白银 ¥387/g（2026-05-23，conf=1.0）",
    category: "价格数据",
  },
  {
    id: "compliance_ofac_sdn",
    market: "全球",
    source: "treasury.gov/ofac",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "OFAC SDN 制裁名单快照（Primary API，28.6MB XML），8 个市场同步采集（conf=1.0）",
    category: "合规/监管",
  },
  {
    id: "competitors_richemont_fy26",
    market: "美国",
    source: "globenewswire.com",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "Richemont（Cartier 母公司）FY2026 财年强劲销售增长（Primary API，conf=1.0，2026-05-22）",
    category: "竞争情报",
  },
  {
    id: "competitors_pandora_summer26",
    market: "日本",
    source: "prtimes.jp",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "Pandora 发布 2026 夏新作 Disney x Pandora + ESSENCE OF SUMMER 系列（Primary API，conf=1.0）",
    category: "竞争情报",
  },
  {
    id: "fx_rates_primary",
    market: "全球",
    source: "exchangerate-api.com",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "汇率（Primary API，conf=1.0）：USD/CNY=6.8079, USD/JPY=159.13, USD/KRW=1,517, USD/SGD=1.28, USD/MYR=3.97, USD/THB=32.66, USD/VND=26,183",
    category: "汇率",
  },
  {
    id: "trends_elle_2026",
    market: "美国",
    source: "elle.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "2026 珠宝趋势：雕塑感银饰成为主流，银饰比金饰更亲民百搭（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "trends_fortune_jewelry",
    market: "美国",
    source: "fortunebusinessinsights.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Jewelry Market Report：钻石品类占 43.06% 份额，男性珠宝兴趣上升（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "trends_labgrown_2026",
    market: "美国",
    source: "precedenceresearch.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "实验室培育钻石：2026 年 $335.4 亿 → 2034 年 $918.5 亿，CAGR 13.42%（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "trends_ucfs_k_shape",
    market: "美国",
    source: "ucfs.net",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "美国珠宝市场「K 型」分化分析及消费金融方案建议（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "trends_charlesworth_yono",
    market: "美国",
    source: "charlesworth-group.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "消费者从 YOLO 转向 YONO（You Only Need One）投资型购买心态（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "trends_gabriel_2026",
    market: "美国",
    source: "gabrielny.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "2026 珠宝趋势：黄色黄金强势回归，bold cuffs/chain necklaces（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "trends_brilliant_earth",
    market: "美国",
    source: "brilliantearth.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "2026 Top 7 珠宝趋势：Chain Necklaces/Chain Bracelets（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "ecommerce_amazon_compliance",
    market: "美国",
    source: "redstagfulfillment.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Amazon 珠宝类目限制：需材料成分文档、铅含量测试、贵金属含量验证（Tavily，conf=0.7）",
    category: "电商平台",
  },
  {
    id: "ecommerce_walmart_jewelry",
    market: "美国",
    source: "linkedin.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Walmart 更新珠宝政策：需完整材料披露以保持合规（Tavily，conf=0.7）",
    category: "电商平台",
  },
  {
    id: "social_daxueconsulting_cn",
    market: "中国",
    source: "daxueconsulting.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "2026 中国消费者市场趋势：抖音/小红书演变为全周期交易生态，AI 个性化选品（Tavily，conf=0.7）",
    category: "社交媒体",
  },
  {
    id: "social_hubofchina_cn",
    market: "中国",
    source: "hubofchina.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "2026 中国消费者演变：Wellness 成为每日仪式和购买过滤器（Tavily，conf=0.7）",
    category: "社交媒体",
  },
  {
    id: "cn_fashionbi_laopu",
    market: "中国",
    source: "fashionbi.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Laopu Gold 被视为「黄金界的 Hermès」，中国奢侈品市场转型（Tavily，conf=0.7）",
    category: "市场趋势",
  },
  {
    id: "cn_lfxjewelry_laofengxiang",
    market: "中国",
    source: "lfxjewelry.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "老凤祥全球 4,000+ 门店覆盖纽约/悉尼/温哥华/香港（Tavily，conf=0.7）",
    category: "竞争情报",
  },
  {
    id: "cn_lukfook_valentine",
    market: "中国",
    source: "lukfook.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "六福珠宝 2026 情人节新品「一心一YI 羽你相伴」系列（Tavily，conf=0.7）",
    category: "竞争情报",
  },
  {
    id: "kr_ecommerce_coupang",
    market: "韩国",
    source: "scm-en.ecer.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Coupang 收紧自发货规则，即将停止新注册（Tavily，conf=0.7）",
    category: "电商平台",
  },
  {
    id: "kr_competitors_cartier_price",
    market: "韩国",
    source: "en.sedaily.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Cartier 韩国二次上调腕表售价，部分型号涨幅达 11%（Tavily，conf=0.7）",
    category: "竞争情报",
  },
  {
    id: "sg_ctf_expansion",
    market: "新加坡",
    source: "eqs-news.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Chow Tai Fook 新加坡樟宜机场店扩张，JOIE 系列推出（Tavily，conf=0.7）",
    category: "竞争情报",
  },
  {
    id: "th_ctf_bangkok",
    market: "泰国",
    source: "businesstimes.com.sg",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Chow Tai Fook 曼谷暹罗百丽宫新店开业（Tavily，conf=0.7）",
    category: "竞争情报",
  },
  {
    id: "my_pohkong_cny",
    market: "马来西亚",
    source: "pohkong.com.my",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Poh Kong 推出 2026 农历新年系列，主打 916 黄金和吉祥寓意（Tavily，conf=0.7）",
    category: "竞争情报",
  },
  {
    id: "jp_sarine_brand_narrative",
    market: "日本",
    source: "blog.sarine.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "2026 品牌需构建数字社区和叙事世界（Tavily，conf=0.7）",
    category: "社交媒体",
  },
  {
    id: "jp_compliance_metal_allergy",
    market: "日本",
    source: "giant-starlly.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "「つけっぱなし」需求推动金属过敏应对成为市场准入门槛（Tavily，conf=0.7）",
    category: "合规/监管",
  },
  {
    id: "cn_jd_qeelin",
    market: "中国",
    source: "jdcorporateblog.com",
    urlStatus: "URL完整",
    evidenceLevel: "B",
    description: "Kering 旗下高端珠宝品牌 Qeelin 在 JD.com 开设旗舰店（Tavily，conf=0.7）",
    category: "电商平台",
  },
  {
    id: "geo_gold_my_code",
    market: "马来西亚",
    source: "gold-industry-stakeholders",
    urlStatus: "URL完整",
    evidenceLevel: "A",
    description: "黄金行业利益相关方召开会议完善行为准则（Primary API，conf=1.0）",
    category: "地缘政治",
  },
];

export const uncertainties = [
  {
    id: "U-01",
    type: "竞品数据噪音",
    description:
      "competitors 维度 2,936 条记录中约 60%+ 为关键词匹配噪音（如 'Tiffany' 匹配到非珠宝内容），仅 ~1,134 条经过滤后与珠宝行业相关。Primary API 仅 25 条为真正竞品信号。",
    suggestion:
      "优化 NewsAPI 查询词，添加负向关键词（-Trump -election -senate -military）降低噪音比例。",
  },
  {
    id: "U-02",
    type: "数据置信度分层",
    description:
      "4,674 条索引记录中仅 423 条来自 Primary API（conf=1.0），其余 4,251 条来自 Tavily Search（conf=0.7）。social_media 维度 1,196 条全部为 Tavily。",
    suggestion:
      "对 P0 级决策所依据的 Tavily 数据，人工访问原始 URL 确认内容准确性。逐步为 social_media 等高价值维度配置 Primary API。",
  },
  {
    id: "U-03",
    type: "市场覆盖不均",
    description:
      "各市场数据量差异显著：中国 1,288 条 vs 泰国 584 条。部分维度市场覆盖缺失（如 compliance 仅日本有大量 Tavily 数据，其他市场仅 OFAC Primary）。",
    suggestion:
      "优先补齐东南亚市场的 Tavily Search 采集。检查各市场 Tavily API Key 配置和查询词本地化是否适当。",
  },
  {
    id: "U-04",
    type: "地缘政治数据噪音",
    description:
      "geopolitics 维度 702 条记录中大量与珠宝行业无关（如 Diamond League 田径赛、Beveridge & Diamond 律所等）。有效信号稀疏。",
    suggestion: "优化 NewsAPI 地缘政治维度的查询词，增加珠宝/贸易/关税/制裁相关的正向量词。",
  },
  {
    id: "U-05",
    type: "数据库完整性",
    description:
      "collected.db 共 4,674 条索引记录 + 423 Primary API 记录。数据采集日期为 2026-05-22/23。Fx_rates 8 市场×9 货币对齐全，prices 8 市场均有 Primary API 价格覆盖。",
    suggestion:
      "建议每周执行全量采集保持数据新鲜度。监控 degradation_events 表（当前 217 条降级记录）以评估 API 可用性。",
  },
];

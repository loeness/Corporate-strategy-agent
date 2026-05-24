/**
 * 每日跨市场运营决策与策略判断报告 — 三模式结构化数据
 * 数据来源（严格对应）：
 *   - data/innovation_breakthrough_strategy_report.md → 创新突破
 *   - data/steady_operations_strategy_report.md → 稳健运营
 *   - data/strategic_transformation_strategy_report.md → 战略转型
 *
 * 最后更新：2026-05-24，基于最新采集数据
 */

import type { StrategyMode } from "../components/StrategyModeSelector";

// ============================
// Interfaces
// ============================

export interface MarketPriority {
  rank: number;
  market: string;
  priority: string;
  judgment: string;
  evidence: string;
}

export interface KeyChange {
  id: string;
  market: string;
  category: string;
  change: string;
  businessImpact: string;
  industryDimension: string;
  evidence: string;
}

export interface Opportunity {
  id: string;
  market: string;
  opportunity: string;
  businessImpact: string;
  responsibility: string;
  priority: string;
  evidence: string;
}

export interface Risk {
  id: string;
  market: string;
  risk: string;
  businessImpact: string;
  responsibility: string;
  priority: string;
  evidence: string;
}

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

export interface WatchItem {
  id: string;
  market: string;
  focus: string;
  trigger: string;
  evidence: string;
}

export interface EvidenceRecord {
  id: string;
  market: string;
  source: string;
  urlStatus: string;
  evidenceLevel: string;
  description: string;
  category?: string;
}

export interface StrategyDataSet {
  decisionSummary: string[];
  marketPriorities: MarketPriority[];
  keyChanges: KeyChange[];
  opportunities: Opportunity[];
  risks: Risk[];
  recommendedActions: RecommendedAction[];
  watchList: WatchItem[];
  evidenceRecords: EvidenceRecord[];
  uncertainties: { id: string; type: string; description: string; suggestion: string }[];
}

// ============================
// Shared evidence records
// ============================

const sharedEvidenceRecords: EvidenceRecord[] = [
  {
    id: "US_prices_gold_api", market: "美国", source: "gold-api.com", urlStatus: "URL完整", evidenceLevel: "A",
    description: "实时贵金属价格：黄金 $145.02/g、铂金 $62.05/g、白银 $2.43/g（conf=1.0）",
    category: "价格数据",
  },
  {
    id: "CN_prices_gold_local", market: "中国", source: "gold-api.com", urlStatus: "URL完整", evidenceLevel: "A",
    description: "本地贵金属价格：黄金 ¥987.25/g（conf=1.0）",
    category: "价格数据",
  },
  {
    id: "compliance_ofac_sdn", market: "全球", source: "treasury.gov/ofac", urlStatus: "URL完整", evidenceLevel: "A",
    description: "OFAC SDN制裁名单快照，8个市场同步采集（conf=1.0）",
    category: "合规/监管",
  },
  {
    id: "fx_rates_primary", market: "全球", source: "exchangerate-api.com", urlStatus: "URL完整", evidenceLevel: "A",
    description: "汇率：USD/CNY=6.81, USD/JPY=159.13, USD/KRW=1517, USD/SGD=1.28（conf=1.0）",
    category: "汇率",
  },
  {
    id: "trends_labgrown_2026", market: "美国", source: "precedenceresearch.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "实验室培育钻石：$335.4亿→$918.5亿，CAGR 13.42%",
    category: "市场趋势",
  },
  {
    id: "sg_ctf_expansion", market: "新加坡", source: "eqs-news.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "Chow Tai Fook新加坡樟宜机场店扩张，JOIE系列推出",
    category: "竞争情报",
  },
  {
    id: "th_ctf_bangkok", market: "泰国", source: "businesstimes.com.sg", urlStatus: "URL完整", evidenceLevel: "B",
    description: "Chow Tai Fook曼谷暹罗百丽宫新店开业",
    category: "竞争情报",
  },
  {
    id: "kr_ecommerce_coupang", market: "韩国", source: "scm-en.ecer.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "Coupang收紧自发货规则，即将停止新注册",
    category: "电商平台",
  },
  {
    id: "kr_competitors_cartier_price", market: "韩国", source: "en.sedaily.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "Cartier韩国二次上调腕表售价，部分型号涨幅达11%",
    category: "竞争情报",
  },
  {
    id: "cn_lfxjewelry_laofengxiang", market: "中国", source: "lfxjewelry.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "老凤祥全球4,000+门店，实时金价展示",
    category: "竞争情报",
  },
  {
    id: "cn_lukfook_valentine", market: "中国", source: "lukfook.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "六福珠宝2026情人节新品系列",
    category: "竞争情报",
  },
  {
    id: "jp_compliance_metal_allergy", market: "日本", source: "giant-starlly.com", urlStatus: "URL完整", evidenceLevel: "B",
    description: "金属过敏应对成为日本市场准入门槛",
    category: "合规/监管",
  },
];

// ============================
// Shared uncertainties
// ============================

const sharedUncertainties = [
  { id: "U-01", type: "培育钻石价格风险", description: "培育钻石市场批发价可能继续以每年15%-20%下跌，新品上市即面临价格倒挂。", suggestion: "需人工核实培育钻石未来12个月的供需缺口及定价走势。" },
  { id: "U-02", type: "AR技术落地风险", description: "内部缺乏珠宝3D建模与实时渲染的技术积累，可能导致模型色彩偏差、尺寸比例失真。", suggestion: "需人工评估现有技术团队能否在三个月内产出符合珠宝级精度的AR素材。" },
  { id: "U-03", type: "新材料供应链验证", description: "树脂、木材等新材质饰品的供应链稳定性和质量一致性未经验证。", suggestion: "联系供应商打样并测试耐久性与过敏性，建立新材料准入标准。" },
  { id: "U-04", type: "日本第二皮肤趋势持续性", description: "日本つけっぱなし趋势的持续性与竞争响应速度不确定。", suggestion: "持续监控相关搜索词点击率和竞品跟进情况。" },
  { id: "U-05", type: "越南KOL匹配度", description: "越南社交电商试点中KOL选择的匹配度与转化率需实际测试。", suggestion: "先小规模签约5-10名微观KOL进行测试。" },
];

// =============================================================================
// MODE: innovation (创新突破)
// =============================================================================

const InnovationDS = [
  "多市场涌现培育钻石、可持续材料与中性设计趋势，试点新品线可形成新增长曲线，但需绑定转化率与品牌调性验证指标。",
  "日本市场呈现'日常佩戴第二皮肤'与磁石胸针等场景化创新，启发产品研发与内容测试，但供应链与材料合规须前置确认。",
  "AR虚拟试戴与社交电商在韩国、越南等市场具备技术融合潜力，建议分区域进行A/B测试与创作者合作，避免一次性重投入。",
  "平台费用与合规收紧（Amazon、Coupang）抬高试错成本，但差异化内容与新材质品类在严格市场中反易获搜索红利，应调整渠道选品策略。",
];

const InnovationMP: MarketPriority[] = [
  { rank: 1, market: "日本", priority: "P0", judgment: "信号密度与创新信号质量最高，拥有具体的场景化消费者洞察可转化为MVP试点，且平台政策变化带来渠道优化窗口。", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1 / giant-starlly.com" },
  { rank: 2, market: "中国", priority: "P0", judgment: "培育钻石与中性设计趋势信号强烈，年轻客群集中且社交电商生态成熟，适合启动新品类内容实验与数字化互动试点。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { rank: 3, market: "韩国", priority: "P1", judgment: "K-pop影响力与穿戴极简主义创新潜力突出，但AR技术落地与本土平台政策（Coupang）变化需先完成合规与可行性验证。", evidence: "KR_market_trends_4a9015dc1e2b8a79a4a48b00 / jewelersmutual.com" },
  { rank: 4, market: "美国", priority: "P1", judgment: "成熟市场中可持续材料与新材质搜索量上升，但品牌调性偏移风险较高；Amazon政策变化要求提前做好合规准备。", evidence: "US_market_trends_db4242a39347fb39f01725ac / news.market.us" },
  { rank: 5, market: "越南", priority: "P2", judgment: "影响者营销成本低且社交电商生态快速成长，适合作为低成本内容实验场，但供应链与质量管控能力尚待评估。", evidence: "VN_social_media_abaa83b3e76f05fb7685caf8 / campaignasia.com" },
  { rank: 6, market: "新加坡", priority: "P2", judgment: "作为高消费力市场可测试可持续材料叙事与价格敏感度，但本土市场较小，适合作为区域新品首发地。", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d / branvas.com" },
  { rank: 7, market: "马来西亚", priority: "P2", judgment: "黄金消费文化浓厚，可试探轻量化与中性设计需求，但本地竞品（Poh Kong）文化贴合度高，创新扩散速度可能较慢。", evidence: "MY_competitors_7ee2bc857b5536d2f0f6ae1f / pohkong.com.my" },
  { rank: 8, market: "泰国", priority: "P2", judgment: "曼谷珠宝展与Chow Tai Fook加速扩张表明市场竞争加剧，可作为新材质与设计语言的输出窗口。", evidence: "TH_social_media_a056ab124865a1df14850ed4 / bkkgems.com" },
];

const InnovationKC: KeyChange[] = [
  { id: "K-01", market: "日本", category: "产品/设计", change: "日本市场出现つけっぱなし（佩戴即可）饰品趋势，磁石胸针与防过敏材料成为搜索门槛。", businessImpact: "启发新场景品类；影响材料采购标准与listing关键词策略，带来产品形态创新。", industryDimension: "品类、渠道、转化", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1" },
  { id: "K-02", market: "中国、日本、韩国", category: "产品/品类", change: "培育钻石被多本行业媒体列为独立品类而非天然钻石替代品，强调其环保属性与价格逻辑。", businessImpact: "影响品类架构、毛利结构与品牌心智；若作为独立线推出可开辟新客群。", industryDimension: "品类、毛利/价格、品牌心智", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554, KR_market_trends_cc8793128029abb09c2f608e" },
  { id: "K-03", market: "中国、美国、日本", category: "产品/设计", change: "中性化饰品与模块化设计在多份趋势报告中列为高搜索量品类，强调纹理、形态而非传统性别符号。", businessImpact: "可能扩大客群基数，影响产品开发与视觉营销方向。", industryDimension: "品类、品牌心智、流量", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554, JP_market_trends_dbc009b36910499b7bbd7abc" },
  { id: "K-04", market: "中国、日本", category: "产品/材料", change: "木材、树脂、搪瓷等非传统材质在时尚媒体中列为2026重要方向，强调色彩与雕塑感。", businessImpact: "若供应链支持，可小批量试制，影响产品设计团队与供应商开发。", industryDimension: "品类、库存", evidence: "CN_ecommerce_e82f0cff441341081f48af20, JP_market_trends_176419b81027e99ac6847984" },
  { id: "K-05", market: "韩国、越南", category: "渠道/技术", change: "社交电商与AR试戴融合加速，Coupang收紧自发货政策倒逼FBA规范化。", businessImpact: "影响渠道策略与运营模式；AR可能提升线上转化，但需技术验证。", industryDimension: "渠道、转化、流量", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1, VN_social_media_abaa83b3e76f05fb7685caf8" },
  { id: "K-06", market: "美国、新加坡", category: "平台/合规", change: "Amazon美国与日本更新FBA费用与首饰品类审批门槛，要求材料测试与合规证明。", businessImpact: "增加新品试错成本，但也提升有准备商家的进入壁垒，可借合规差异化。", industryDimension: "渠道、毛利/价格、合规", evidence: "US_ecommerce_f775cf7de217afe4b63b382b, US_ecommerce_9c47ae316bf11a1b3dbfb8a4" },
  { id: "K-07", market: "东南亚（新、马、泰、越）", category: "竞争/扩张", change: "Chow Tai Fook加速在东南亚开设旗舰店与推地域特供版，本地竞品（Poh Kong）主打文化设计。", businessImpact: "要求我方创新产品需有本地文化关联或差异化设计，否则易被挤压。", industryDimension: "品牌心智、流量", evidence: "SG_competitors_dec5022252032a6302a1ece9, MY_competitors_7ee2bc857b5536d2f0f6ae1f" },
  { id: "K-08", market: "韩国", category: "设计/美学", change: "韩国极简主义与K-pop风格珠宝被全球趋势报告强调为标杆，强调精细线条与情感表达。", businessImpact: "可作为设计语言突破的参考，输出到其他市场。", industryDimension: "品类、品牌心智", evidence: "KR_market_trends_4a9015dc1e2b8a79a4a48b00" },
];

const InnovationOP: Opportunity[] = [
  { id: "O-01", market: "中国", priority: "P0", responsibility: "区域", opportunity: "批发网站2026年趋势提到马主题饰品及可夹式吊坠的零售机会，先做出三款生肖马可拆卸吊坠（合金+冷珐琅），在电商店铺用新品专区上线。", businessImpact: "低客单饰品拉动自然流量入口，同时带动高毛利黄金品类曝光，提升整个店铺的转化漏斗效率。", evidence: "CN_ecommerce_c7f941bc1c674dbb9987285e / wholesalejewelrywebsite.com" },
  { id: "O-02", market: "新加坡", priority: "P0", responsibility: "区域", opportunity: "AR虚拟试戴和高清360°影像正在降低线上买钻阻力，选取3款培育钻石戒指，在独立站添加Web AR试戴功能。", businessImpact: "高客单钻石线上退货率每降1个百分点可直接提升毛利，延长页面停留也有助于自然搜索权重。", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d / branvas.com" },
  { id: "O-03", market: "中国", priority: "P0", responsibility: "总部+区域", opportunity: "老凤祥24K金货架高度同质化，以古法金为基底，加入中国色珐琅（如天青、胭脂）开发限量黄金手镯，通过抖音达人种草并开放预订。", businessImpact: "跳出克价竞争，用文化设计建立品牌国潮心智，从而维持高于大盘的毛利率。", evidence: "CN_competitors_6310815f7e6bd007bbddce1c / lfxjewelry.com" },
  { id: "O-04", market: "美国", priority: "P0", responsibility: "区域", opportunity: "ELLE将雕塑感银饰列为2026年核心趋势，银饰成本低、适合社交裂变。启动TikTok #SilverStatement挑战。", businessImpact: "以低成本内容拉动自然流量，吸引Gen Z关注并沉淀为品牌社交资产。", evidence: "US_market_trends_121928371ee5edc99734909e / elle.com" },
  { id: "O-05", market: "日本", priority: "P0", responsibility: "区域", opportunity: "日本手工艺术家突出侘寂美学，与本土银匠合作推出Wabi-Sabi限量系列（戒指、耳线），在乐天市场独家首发。", businessImpact: "借助在地手作故事拉升品牌高端形象，吸引愿为独特工艺支付溢价的客群。", evidence: "JP_market_trends_176419b81027e99ac6847984 / japanobjects.com" },
  { id: "O-06", market: "韩国", priority: "P0", responsibility: "区域", opportunity: "韩国趋势报告强调可持续和实验室培育钻石，快速上架3款培育钻石求婚戒指，定价为同级天然钻的一半。", businessImpact: "进入高增速品类，用性价比优势获取新婚消费者，扩大市场份额并降低天然钻石库存资金压力。", evidence: "KR_market_trends_73340e971062c5d6814b8cbf / okgjewelry.com" },
  { id: "O-07", market: "泰国", priority: "P0", responsibility: "区域", opportunity: "泰国电商报告显示直播渠道活跃，在Shopee Live开设2026趋势预购专场，以极简培育钻石项链为主打，收定金锁定生产。", businessImpact: "以C2M预售模式降低新品库存风险，同时利用直播互动提升转化效率，直接拉动泰国站GMV。", evidence: "TH_ecommerce_c3357d7b83824d37f25b4e7f / gabrielfinejewelers.com" },
  { id: "O-08", market: "新加坡", priority: "P0", responsibility: "区域", opportunity: "周大福JOIE系列借助迪士尼、chiikawa等IP联名吸引年轻客群，可试点与东南亚本土IP联名开发限量金饰挂坠。", businessImpact: "借助IP流量打破品牌老化印象，提高年轻客群复购率，并积累联名运营经验。", evidence: "SG_competitors_2f27302dc502402f047a3897 / chowtaifook.com" },
  { id: "O-09", market: "日本", priority: "P0", responsibility: "区域", opportunity: "田中贵金属以纯金高达、纯金摇马瞄准动漫收藏投资市场，可试制高人气动漫角色999金吊坠（如鬼灭之刃款）。", businessImpact: "开辟高毛利收藏黄金品类，用IP带动非珠宝客群进店，提升整体利润贡献。", evidence: "JP_competitors_fa5e5a244714fdb54983b480 / gettyimages.dk" },
  { id: "O-10", market: "美国", priority: "P0", responsibility: "总部+区域", opportunity: "蒂芙尼重点展示粗链节、混合金属叠戴趋势。推出一组含银、黄金、玫瑰金的可叠戴模块化薄手镯，允许客户自由组合。", businessImpact: "模块化设计提高连带购买率，拉升客单价，同时以差异化的叠戴方案减少纯比价行为，保护毛利。", evidence: "TH_competitors_58e0a19405da079a1deda49e / tiffany.com" },
  { id: "O-11", market: "日本", priority: "P1", responsibility: "区域", opportunity: "日本手工艺术家在Instagram上的作品引起艺术圈关注。邀请艺术家在品牌官方Instagram进行联名创作直播，并将切片投放为广告。", businessImpact: "沉淀高互动艺术粉丝并提升品牌文化厚度，为后续高端系列发布积累精准流量池。", evidence: "JP_market_trends_176419b81027e99ac6847984 / japanobjects.com" },
];

const InnovationRK: Risk[] = [
  { id: "risk_01", market: "日本", priority: "P0", responsibility: "区域", risk: "磁石胸针创新需导入新的磁石供应链，日本市场对饰品磁力安全性有严格消费品安全法规，合规认证周期和成本可能被低估。", businessImpact: "新品上市延迟导致错失季节性窗口，首批用户体验不佳引发退货。", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1" },
  { id: "risk_02", market: "中国", priority: "P0", responsibility: "总部+区域", risk: "将实验室培育钻石作为独立创新品类投入，但供应链尚未与头部生产商锁定长期协议，若市场批发价继续以每年15%-20%下跌，新品上市即面临价格倒挂。", businessImpact: "毛利快速收窄，天然钻石客单价可能被连带质疑，品牌高端形象受损。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { id: "risk_03", market: "新加坡", priority: "P0", responsibility: "区域", risk: "在线上旗舰店部署AR虚拟试戴但内部缺乏珠宝3D建模与实时渲染的技术积累，可能导致模型色彩偏差、尺寸比例失真。", businessImpact: "退货率上升侵蚀转化利润，客服压力增大，线上净推荐值（NPS）滑坡。", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d / branvas.com" },
  { id: "risk_04", market: "美国", priority: "P0", responsibility: "总部", risk: "看到Chow Tai Fook推出家居装饰线后，考虑效仿延伸至生活方式品类，但本品牌在珠宝以外的供应链资源和品牌联想均不具备基础。", businessImpact: "品牌心智被稀释，珠宝核心品类市场份额可能遭到垂直品牌侵蚀。", evidence: "US_competitors_06e562aaf6659d5524ee8d40 / eqs-news.com" },
  { id: "risk_05", market: "美国", priority: "P0", responsibility: "区域", risk: "美国站过半销量依赖亚马逊FBA，2026年履单费调整后小件珠宝的平均配送成本上升约8%-12%。", businessImpact: "渠道毛利率下降，低客单价商品面临砍SKU或提价后的流量下滑。", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / sellercentral.amazon.com" },
  { id: "risk_06", market: "日本", priority: "P0", responsibility: "总部", risk: "美国对日本产钢铁、铝衍生品加征50%关税，若品牌从日本采购K金链条或金属部件并转运至美国市场，到岸成本将激增。", businessImpact: "供应链成本失控，美国市场黄金类饰品的价格竞争力丧失。", evidence: "JP_compliance_5178d40fd6caea37a8b044ae / global-scm.com" },
  { id: "risk_07", market: "泰国", priority: "P0", responsibility: "区域", risk: "Chow Tai Fook在曼谷Siam Paragon开设旗舰店，利用其全球代言人及本地化设计直接抢夺高端客流，而本品牌在泰国仅靠经销商投放。", businessImpact: "泰国市场到店流量和转化率下降，渠道伙伴信心动摇。", evidence: "TH_competitors_2345749cf882da8aa201812a / businesstimes.com.sg" },
  { id: "risk_08", market: "中国", priority: "P0", responsibility: "总部+区域", risk: "创新资源过度向前沿材质和数字体验倾斜，导致婚嫁、春节等传统产品线迭代延迟，六福珠宝等竞品已发布紧扣节庆的IP联名系列。", businessImpact: "节庆销售高峰期间市场份额流失，品牌在婚嫁和礼赠场景的必选性降低。", evidence: "CN_competitors_87d42c7072bb21bf06f67ce9 / lukfook.com" },
  { id: "risk_09", market: "泰国", priority: "P0", responsibility: "区域", risk: "为响应可持续消费呼声而主推回收贵金属或培育钻石，但上游供应商无法出具区块链溯源证书或再生含量证明。", businessImpact: "品牌声誉受损，可能被电商平台限流或下架，环保型溢价消失。", evidence: "TH_ecommerce_c3357d7b83824d37f25b4e7f / gabrielfinejewelers.com" },
  { id: "risk_10", market: "日本", priority: "P0", responsibility: "区域", risk: "创新系列沿用国内通用材质，未针对日本市场强制执行镍无添加、钴不释放等过敏原控制，将被搜索算法过滤。", businessImpact: "日本站免费流量和付费流量效率齐降，转化率和客单价双杀，退货率上升。", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1 / giant-starlly.com" },
];

const InnovationRA: RecommendedAction[] = [
  { id: "A-01", responsibility: "总部+区域", suggestedOwner: "产品总监、日本区域经理", market: "日本", deadline: "2026年7月前", action: "开发并上线基于第二皮肤概念的防过敏金属系列（耳环、项链），不少于5个SKU。", reviewCriteria: "上线30天内自然搜索词点击率高于平均值10%，且无严重品质退货。", basis: "该趋势在乐天市场排名已验证，创新点在于磁石扣合与医用材料。", status: "待人工确认" },
  { id: "A-02", responsibility: "区域", suggestedOwner: "韩国电商运营", market: "韩国", deadline: "2026年Q3前", action: "与Coupang合作或使用第三方AR工具，对一款新品戒指进行虚拟试戴vs静态图的A/B测试。", reviewCriteria: "AR组转化率显著高于对照组（p<0.1），且退货率不上升。", basis: "VR/AR技术可降低饰品网购障碍，但需本地验证。", status: "待人工确认" },
  { id: "A-03", responsibility: "总部", suggestedOwner: "品牌经理、设计师", market: "中国、美国", deadline: "2026年8月", action: "启动中性化珠宝设计工作坊，产出至少3个概念系列，并通过DTC官网预售测试用户反响。", reviewCriteria: "预售转化率>2%且客单中位价符合中高端定位。", basis: "趋势报告多次强调，尽早占领用户心智。", status: "待人工确认" },
  { id: "A-04", responsibility: "区域", suggestedOwner: "越南市场主管", market: "越南", deadline: "2026年Q3", action: "签约5-10名微观时尚KOL，以日常叙事方式推广新材质配饰，并设置专属折扣码追踪。", reviewCriteria: "KOL内容总曝光>50万，专属码使用次数>100。", basis: "越南消费者对影响者推荐信赖度高，适合低成本冷启动。", status: "待人工确认" },
  { id: "A-05", responsibility: "总部", suggestedOwner: "供应链主管", market: "日本、中国", deadline: "2026年9月前", action: "联系3家树脂与木材饰品供应商，打样并测试耐久性与过敏性，建立新材料准入标准。", reviewCriteria: "样品通过内部拉力测试与防过敏认证，且单价可控。", basis: "为2027年春夏上架做准备。", status: "待人工确认" },
  { id: "A-06", responsibility: "总部+区域", suggestedOwner: "电商总监", market: "美国、日本", deadline: "2026年7月前", action: "梳理Amazon最新首饰合规要求，完成现有产品检测文件更新，并为新品开发设置合规预审流。", reviewCriteria: "在下一季度无因合规导致的listing下架事件。", basis: "避免因政策突击导致新品无法按时上架。", status: "待人工确认" },
];

const InnovationWL: WatchItem[] = [
  { id: "WL001", market: "中国", focus: "实验室培育钻石作为独立品类的消费者认知与内容营销策略", trigger: "当电商平台培育钻石品类搜索量环比增长超过20%，或3家以上主要竞品推出培育钻石专属系列时，启动A/B测试。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { id: "WL002", market: "新加坡", focus: "AR虚拟试戴功能在东南亚珠宝线上销售中的转化率提升效果", trigger: "当AR试戴功能使转化率提升超过15%（A/B测试数据），或主要竞品推出AR试戴并形成用户增长时，启动AR试戴MVP开发。", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d / branvas.com" },
  { id: "WL003", market: "日本", focus: "24小时佩戴场景下的无过敏、无针式耳饰与金属过敏对应材料的商品化机会", trigger: "当公司日本向け基本款耳饰退货理由中佩戴不适/过敏占比超过8%时，启动小样试产。", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1 / giant-starlly.com" },
  { id: "WL004", market: "中国", focus: "可持续材料（回收贵金属、实验室钻石）在年轻客群中的接受度与概念验证", trigger: "当社交媒体上#labgrowndiamond或#recycledgold话题月均讨论量增长50%，且至少2家竞品推出可持续材料系列时，启动绿色珠宝样品池构建。", evidence: "CN_market_trends_805f148c9d00d453f396ab54 / gabrielny.com" },
  { id: "WL005", market: "中国", focus: "幽默、超大号、食玩风格首饰的社交媒体内容范式与病毒式传播潜力", trigger: "当TikTok/Red上#funjewelry或#statementjewelry标签内容互动率高于品牌现有内容2倍时，启动内容实验。", evidence: "CN_market_trends_fad4dc74bc23db3672ccb4f4 / vogue.com" },
  { id: "WL006", market: "中国", focus: "黄金珠宝的投资属性强化与回购便利化对产品设计的影响", trigger: "当内部调研中购买黄金珠宝时考虑保值的受访者比例连续两季度超过50%时，启动可回购/易变现黄金首饰试点。", evidence: "CN_market_trends_632d45f5705a9861dc222d1c / gold.org" },
  { id: "WL007", market: "中国", focus: "无性别珠宝与男性珠宝在线上渠道的搜索增长和销售潜力", trigger: "当公司网站男性珠宝或无性别分类的访问量连续2个月环比增长超过30%时，启动小批量试销MVP。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { id: "WL008", market: "日本", focus: "日本Amazon费用调整后低毛利SKU通过包装优化与组合销售实现的利润结构创新", trigger: "当日本站珠宝品类FBA费用下降使得特定SKU毛利率提高超过3个百分点时，启动包装优化+组合销售A/B测试。", evidence: "JP_ecommerce_ece0bcfa25080451faf58c5c / forestshipping.com" },
];

// =============================================================================
// MODE: stable (稳健运营)
// =============================================================================

const StableDS = [
  "全球SDN清单需总部合规部统一解析并通知各区，避免跨境交易制裁风险",
  "日本Amazon费用及关税变化将直接影响毛利，区域须立即核算各SKU损益并调整运营策略",
  "美国Amazon品类合规和FBA费用更新要求区域前置准备材料并优化物流方案",
  "金价高位震荡，总部商品部应建立熔断机制，各区开展轻量化商品测试以维持毛利",
];

const StableMP: MarketPriority[] = [
  { rank: 1, market: "日本", priority: "P0", judgment: "Amazon推荐费上涨、关税政策到期、FBA费用变化三重压力，直接影响毛利率和履约成本", evidence: "JP_compliance_5178d40fd6caea37a8b044ae, JP_ecommerce_ab4e227606dd6964bb313efd" },
  { rank: 2, market: "中国", priority: "P0", judgment: "竞品密集促销挤压流量和价格，金价波动影响库存估值，需加强定价监控和差异化话术", evidence: "CN_competitors_6310815f7e6bd007bbddce1c, CN_prices_c8ac9cdb090d73a6f33c94d7" },
  { rank: 3, market: "韩国", priority: "P1", judgment: "Coupang自发货规则收紧将改变履约模式，须提前转型以避免流量损失和违规风险", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1" },
  { rank: 4, market: "美国", priority: "P1", judgment: "Amazon FBA费用更新和珠宝品类合规门槛提高，影响操作成本和账号安全", evidence: "US_ecommerce_f775cf7de217afe4b63b382b, US_ecommerce_9c47ae316bf11a1b3dbfb8a4" },
  { rank: 5, market: "新加坡", priority: "P2", judgment: "目前以趋势信号和竞争动态为主，暂无紧急运营风险，可观察", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d" },
  { rank: 6, market: "马来西亚", priority: "P2", judgment: "本地竞品活跃但暂无平台规则剧变，应以监控竞品价格和促销为主", evidence: "MY_competitors_7ee2bc857b5536d2f0f6ae1f" },
  { rank: 7, market: "泰国", priority: "P2", judgment: "主要信号为珠宝展会和趋势内容，可借势做轻量测试，无紧急运营调整", evidence: "TH_competitors_2345749cf882da8aa201812a" },
  { rank: 8, market: "越南", priority: "P2", judgment: "竞品扩张信号值得关注，但短期无平台或合规突变，保持观望", evidence: "VN_competitors_1059f8818eebafc3e3c74086" },
];

const StableKC: KeyChange[] = [
  { id: "K-01", market: "日本", category: "regulation", change: "美国对日关税Section 122将于2026年7月24日到期", businessImpact: "供应链成本不确定性增加，需在合同中加入关税变动条款", industryDimension: "毛利/价格", evidence: "JP_compliance_5178d40fd6caea37a8b044ae / global-scm.com" },
  { id: "K-02", market: "全球", category: "regulation", change: "OFAC SDN名单快照 fetched", businessImpact: "所有市场需排查业务往来中是否存在制裁实体，避免合规处罚", industryDimension: "合规", evidence: "CN_compliance_7a077c46a3685d2923828a8d / OFAC" },
  { id: "K-03", market: "日本", category: "platform", change: "Amazon日本站推荐费将上调0.4%", businessImpact: "毛利空间直接收窄，需测算影响并考虑调价或成本优化", industryDimension: "毛利/价格", evidence: "JP_ecommerce_ab4e227606dd6964bb313efd / sellercentral.amazon.co.jp" },
  { id: "K-04", market: "日本", category: "platform", change: "高价值珠宝退货政策调整为不可退货", businessImpact: "高客单商品售后风险上升，需更新客服流程和页面说明", industryDimension: "转化/品牌心智", evidence: "JP_ecommerce_dd5c5ff28b4bcc16a4ad063a / amazon.co.jp" },
  { id: "K-05", market: "韩国", category: "platform", change: "Coupang将停止自发货产品注册", businessImpact: "需将产品转为平台仓发货，否则面临流量下降或下架风险", industryDimension: "流量/转化", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1 / scm-en.ecer.com" },
  { id: "K-06", market: "美国", category: "platform", change: "Amazon FBA配送费更新，小件商品成本上升", businessImpact: "部分低客单珠宝物流费用占比增加，需优化包装或提价", industryDimension: "毛利/价格", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / sellercentral.amazon.com" },
  { id: "K-07", market: "美国", category: "platform", change: "Amazon珠宝品类要求提供材料测试文档", businessImpact: "如未及时提交可能导致listing被移除，影响销售", industryDimension: "合规/流量", evidence: "US_ecommerce_9c47ae316bf11a1b3dbfb8a4 / redstagfulfillment.com" },
  { id: "K-08", market: "中国", category: "competition", change: "本地竞品老凤祥、六福珠宝频繁上新及节日促销", businessImpact: "可能分流流量，压缩我方价格空间，需差异化应对", industryDimension: "流量/品牌心智", evidence: "CN_competitors_87d42c7072bb21bf06f67ce9 / lukfook.com" },
  { id: "K-09", market: "东南亚", category: "competition", change: "周大福在曼谷、新加坡加速开店", businessImpact: "区域竞争加剧，需加强本地化内容和服务差异", industryDimension: "转化/品牌心智", evidence: "SG_competitors_1cf64aaae8e59652897c4ec9 / marketech-apac.com" },
  { id: "K-10", market: "中国", category: "product", change: "金价高位波动，145 USD/克以上", businessImpact: "库存估值和定价策略需动态调整，以维持毛利", industryDimension: "毛利/价格", evidence: "CN_prices_c8ac9cdb090d73a6f33c94d7 / kitco.com" },
];

const StableOP: Opportunity[] = [
  { id: "O-01", market: "美国", priority: "P0", responsibility: "区域", opportunity: "分析自有珠宝SKU的包装尺寸与重量，测试将轻小件重新包装以落入更低费率分段。", businessImpact: "优化包装后单个订单履约成本有望降低0.3-0.5美元，直接影响毛利。", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / sellercentral.amazon.com" },
  { id: "O-02", market: "日本", priority: "P0", responsibility: "区域", opportunity: "排查所有FBA SKU的标签类型，对仍用制造商条码的产品在截止日前转换为亚马逊条码（FNSKU）。", businessImpact: "提前完成标签切换可防止数千件商品被隔离或强制移除。", evidence: "JP_ecommerce_9284a26477a42a94bebe6654 / bellavix.com" },
  { id: "O-03", market: "韩国", priority: "P0", responsibility: "区域", opportunity: "盘点现有SF商品，挑出销量前20%的SKU测试转为Coupang火箭配送（Fulfillment by Coupang）。", businessImpact: "转型为火箭配送商品可获得搜索排名加权和流量扶持，预计核心SKU转化率可提升15-20%。", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1 / scm-en.ecer.com" },
  { id: "O-04", market: "美国", priority: "P0", responsibility: "区域", opportunity: "整理现有黄金、钻石、珍珠品类的供应商发票和材质证书，在类目审核触发前主动提交合规申请。", businessImpact: "首批通过审核的卖家将在搜索加权和Buy Box赢得率上获得优势。", evidence: "US_ecommerce_62db03c100f860caa052f7d7 / sellerise.com" },
  { id: "O-05", market: "日本", priority: "P0", responsibility: "区域", opportunity: "拉取所有在售珠宝ASIN的最新费率表，计算综合成本变化，筛选出佣金增加额小于配送费减少额的产品。", businessImpact: "利用费率结构对冲机会，总费用可能不升反降；精准调整可优化每个SKU的利润。", evidence: "JP_ecommerce_ab4e227606dd6964bb313efd / sellercentral.amazon.co.jp" },
  { id: "O-06", market: "中国", priority: "P0", responsibility: "总部", opportunity: "在天猫/京东旗舰店设立培育钻石专区，上架3-5枚培育钻戒指/项链，定价比同克拉天然钻低60%。", businessImpact: "抢占培育钻石新品类心智，预计新专区可贡献额外5-10%的店铺自然流量。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { id: "O-07", market: "泰国", priority: "P0", responsibility: "区域", opportunity: "在Lazada/Shopee店铺上架10款银镀白金色或玫瑰金/白金双色极简项链、戒指。", businessImpact: "极简混合金属品类拥有较高搜索增长且竞争尚低，有机会在2-3周内获得类目Best Seller标签。", evidence: "TH_ecommerce_c3357d7b83824d37f25b4e7f / gabrielfinejewelers.com" },
  { id: "O-08", market: "中国", priority: "P0", responsibility: "总部+区域", opportunity: "监控老凤祥每周定价，对比我们同克重产品的工费，若发现我方溢价过高，推出金价+限时工费补贴活动。", businessImpact: "贴近竞品金饰克重溢价可防止价格敏感客户流失，保护黄金品类的销量和市场份额。", evidence: "CN_competitors_6310815f7e6bd007bbddce1c / lfxjewelry.com" },
  { id: "O-09", market: "泰国", priority: "P0", responsibility: "总部+区域", opportunity: "周大福在曼谷Siam Paragon开设新店，立即在曼谷地区投放竞品拦截广告，宣传本地化设计及曼谷当场维修服务。", businessImpact: "阻断高端商场周边的高价值客流向竞品，巩固曼谷核心商圈的品牌阵地。", evidence: "TH_competitors_2345749cf882da8aa201812a / businesstimes.com.sg" },
  { id: "O-10", market: "韩国", priority: "P0", responsibility: "总部", opportunity: "韩国搜索增长显著，2-4克拉无色钻石最受欢迎。立即在韩国Coupang和Naver Shopping上架3款2-4克拉培育钻戒指。", businessImpact: "利用品类高搜索增长窗口期，有机会以较低CPC获取精准购买意图流量。", evidence: "KR_market_trends_cc8793128029abb09c2f608e / cognitivemarketresearch.com" },
  { id: "O-11", market: "新加坡", priority: "P0", responsibility: "区域", opportunity: "在新加坡虾皮和独立站对TOP 50 SKU上线AR试戴功能，并制作10秒360°旋转视频放在主图位。", businessImpact: "降低消费者线上选款的不确定性，预期加购率可提升15-20%，退货率下降5个百分点。", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d / branvas.com" },
  { id: "O-12", market: "美国", priority: "P0", responsibility: "区域", opportunity: "在美国站针对培育钻石品类关键词提高广告出价20%，并将闲置的天然钻推广预算转移至培育钻广告组。", businessImpact: "在消费者偏好转移期抢先占领广告位，以更低获客成本拿到高意向订单。", evidence: "US_market_trends_db4242a39347fb39f01725ac / news.market.us" },
];

const StableRK: Risk[] = [
  { id: "risk_us_fba_fee", market: "美国", priority: "P0", responsibility: "区域", risk: "亚马逊美国站FBA配送费在2026年调整，部分尺寸段费率上涨，侵蚀低客单价珠宝产品的利润空间。", businessImpact: "毛利下滑，尤其影响轻小件珠宝的利润阈值。需区域运营复核各SKU的FBA费率变化。", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / sellercentral.amazon.com" },
  { id: "risk_us_jewelry_restricted", market: "美国", priority: "P0", responsibility: "区域", risk: "亚马逊珠宝品类被列为受限商品，要求提供材料成分文档、铅测试结果等，若无法及时通过审核，相关ASIN将被下架。", businessImpact: "合规风险导致Listing被移除，影响已有排名的流量和转化，库存可能积压。", evidence: "US_ecommerce_92ade2e3edc236befb9aeec8 / sellerlabs.com" },
  { id: "risk_jp_referral_fee", market: "日本", priority: "P0", responsibility: "区域", risk: "亚马逊日本站引荐费将从2026年4月起普遍上调0.4个百分点，对于珠宝等高客单价品类每单费用增加明显。", businessImpact: "直接减少净利润，需要区域运营重新核算是否调整售价或压缩其他成本。", evidence: "JP_ecommerce_ab4e227606dd6964bb313efd / sellercentral.amazon.co.jp" },
  { id: "risk_commingling", market: "日本", priority: "P0", responsibility: "区域", risk: "亚马逊自2026年3月31日起停止支持无标签混储（commingling），卖家必须为每件商品贴上FNSKU标签。", businessImpact: "库存入仓受阻，导致补货延迟，影响在售库存周转，增加贴标操作成本。", evidence: "JP_ecommerce_9284a26477a42a94bebe6654 / bellavix.com" },
  { id: "risk_coupang_self", market: "韩国", priority: "P0", responsibility: "区域", risk: "Coupang将停止新注册卖家自发货（SF）商品，流量向Coupang自有物流倾斜，自发货模式面临淘汰压力。", businessImpact: "如果本公司采用自发货，将失去流量支持，转化率下降。", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1 / scm-en.ecer.com" },
  { id: "risk_ofac_sdn", market: "中国", priority: "P0", responsibility: "总部", risk: "OFAC SDN制裁名单更新，若本公司或供应链涉及名单实体，可能面临账户冻结、款项被截等严重合规后果。", businessImpact: "合规风险，可能导致平台店铺或支付通道被关闭，影响整体运营稳定性。", evidence: "CN_compliance_7a077c46a3685d2923828a8d / OFAC" },
  { id: "risk_ctf_se_asia", market: "泰国", priority: "P0", responsibility: "总部+区域", risk: "周大福珠宝在曼谷暹罗百丽宫开设新店，其在东南亚的品牌知名度可能分流本公司中高端客户。", businessImpact: "市场份额被挤压，可能导致区域促销投入加大，拉低整体毛利水平。", evidence: "TH_competitors_2345749cf882da8aa201812a / businesstimes.com.sg" },
  { id: "risk_cn_price", market: "中国", priority: "P0", responsibility: "总部+区域", risk: "老凤祥官网实时展示黄金金价（$189.2/克），消费者对价格高度敏感。", businessImpact: "转化率下滑，需持续监控竞品价格并动态调整定价策略。", evidence: "CN_competitors_6310815f7e6bd007bbddce1c / lfxjewelry.com" },
  { id: "risk_jp_allergy", market: "日本", priority: "P0", responsibility: "区域", risk: "日本消费者对金属过敏非常敏感，未明确标注防过敏说明将被搜索算法过滤，失去绝大部分展示机会。", businessImpact: "流量骤减，导致库存滞销。", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1 / giant-starlly.com" },
];

const StableRA: RecommendedAction[] = [
  { id: "ACT-001", responsibility: "总部", suggestedOwner: "全球合规负责人", market: "全球", deadline: "本周", action: "下载最新OFAC SDN列表，解析XML并与现有客户/供应商/交易对手进行比对。", reviewCriteria: "提交一份包含差异分析、命中清单和应对建议的合规复核报告。", basis: "多个市场均触发SDN列表快照信号，证据等级A。", status: "open" },
  { id: "ACT-003", responsibility: "区域", suggestedOwner: "日本市场运营经理", market: "日本", deadline: "本周", action: "基于Amazon日本站推荐费上调0.4%的公告，提取所有在售ASIN模拟费用影响。", reviewCriteria: "提供一份按ASIN维度的利润影响模拟表，标出毛利率低于阈值的商品。", basis: "推荐费率增加0.4%，直接影响利润。", status: "open" },
  { id: "ACT-006", responsibility: "区域", suggestedOwner: "美国市场运营经理", market: "美国", deadline: "本周", action: "根据美国FBA履行费用变更表更新所有在售SKU的配送成本。", reviewCriteria: "产出《2026美国FBA费用更新影响分析》，包含至少Top20 ASIN的旧费与新费对比。", basis: "信号直接来自sellercentral.amazon.com。", status: "open" },
  { id: "ACT-007", responsibility: "区域", suggestedOwner: "美国市场合规专员", market: "美国", deadline: "本周", action: "收集并整理所有美国站在售珠宝产品的材料测试报告、供应商发票和铅含量检测证书。", reviewCriteria: "创建《美国站珠宝合规文件清单》，逐条标注有效期和缺失项。", basis: "多个信号强调Amazon美国对珠宝类有材料测试要求。", status: "open" },
  { id: "ACT-008", responsibility: "区域", suggestedOwner: "韩国市场运营经理", market: "韩国", deadline: "本周", action: "分析Coupang关闭自配送注册的可能性，评估现有自配送订单比例并制定过渡方案。", reviewCriteria: "提交一份《Coupang自发货政策应对方案》。", basis: "Coupang将停止新自发货注册。", status: "open" },
  { id: "ACT-009", responsibility: "总部+区域", suggestedOwner: "中国市场竞品分析专员", market: "中国", deadline: "本周", action: "收集老凤祥、六福珠宝2026年情人节及春季新品信息，提取其主打材质、价格带、营销卖点。", reviewCriteria: "输出《中国主要竞品2026春季新品监控报告》。", basis: "老凤祥、六福在婚嫁和礼赠场景发布新品，可能抢占市场份额。", status: "open" },
  { id: "ACT-010", responsibility: "总部+区域", suggestedOwner: "东南亚市场战略经理", market: "新加坡", deadline: "本周", action: "跟进周大福在新加坡樟宜机场店及泰国新店的运营动态，评估其对东南亚珠宝零售的影响。", reviewCriteria: "提供跟踪简报，包括周大福在东南亚的产品线、价格策略和新店销售数据。", basis: "周大福正在加速东南亚扩张，需持续监控。", status: "open" },
];

const StableWL: WatchItem[] = [
  { id: "W-01", market: "多市场", focus: "竞品信号聚合监控：持续观察8个市场的竞品动作信号是否从零散事件变成经营共性变化", trigger: "下一轮采集同类信号增加到58条以上时，升级为专项复核。", evidence: "聚合证据：同类信号数=56" },
  { id: "W-03", market: "中国、日本、美国、韩国", focus: "商品趋势信号聚合监控：观察商品趋势信号是否从零散事件变成经营共性变化", trigger: "下一轮采集同类信号增加到29条以上时，升级为专项复核。", evidence: "聚合证据：同类信号数=27" },
  { id: "W-05", market: "中国", focus: "观察SDN名单快照是否会在合规维度影响该市场的商品、渠道、内容或合规动作。", trigger: "若后续采集再次出现同主题信号，则升级为行动项。", evidence: "CN_compliance_7a077c46a3685d2923828a8d / OFAC" },
  { id: "W-08", market: "日本", focus: "观察美国进口关税国别状况对日本市场合规维度的影响。", trigger: "若后续采集再次出现同主题信号，则升级为行动项。", evidence: "JP_compliance_5178d40fd6caea37a8b044ae / global-scm.com" },
];

// =============================================================================
// MODE: rescue (战略转型)
// =============================================================================

const RescueDS = [
  "Chow Tai Fook全球品牌升级、品类扩展与激进国际化构成结构性竞争威胁，需重新评估集团品牌定位与海外市场优先级。",
  "多市场平台费用上涨与规则收紧要求建立跨市场电商运营中台，将渠道能力从依赖批发转向DTC与平台直营。",
  "实验室钻石、可持续与个性化趋势重塑消费者价值，产品组合需向年轻化、中性化、轻量化转型。",
  "关税波动与合规风险升级，总部须统一供应链合规体系并制定多元化采购策略。",
];

const RescueMP: MarketPriority[] = [
  { rank: 1, market: "日本", priority: "P0", judgment: "平台政策变化密集、消费趋势数据深度最佳，可作为能力建设与产品创新试点；关税风险突出。", evidence: "JP_ecommerce_ece0bcfa25080451faf58c5c / JP_compliance_5178d40fd6caea37a8b044ae" },
  { rank: 2, market: "中国", priority: "P0", judgment: "市场体量最大，竞对最集中，趋势信号明确；黄金珠宝需求结构变化，品牌心智争夺关键。", evidence: "CN_competitors_87d42c7072bb21bf06f67ce9 / CN_market_trends_fad4dc74bc23db3672ccb4f4" },
  { rank: 3, market: "韩国", priority: "P1", judgment: "Coupang规则变化与Cartier提价显示渠道与竞对动态，极简与性别流动趋势适合产品创新。", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1 / KR_competitors_046018bfd7b25e19901df58d" },
  { rank: 4, market: "美国", priority: "P1", judgment: "亚马逊政策密集调整影响运营，竞对扩张与趋势信号明确，需优化线上策略。", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / US_competitors_59733fa3b2190cd5778d2ef1" },
  { rank: 5, market: "新加坡", priority: "P1", judgment: "区域枢纽，Chow Tai Fook进入且黄金免税政策提供投资品类机会，GST豁免吸引高净值客群。", evidence: "SG_competitors_dec5022252032a6302a1ece9 / SG_geopolitics_38067895bc881b8791372d41" },
  { rank: 6, market: "泰国", priority: "P2", judgment: "曼谷珠宝展与Chow Tai Fook开店显示市场热度，但本土信号多为宏观风险，需进一步验证。", evidence: "TH_competitors_2345749cf882da8aa201812a / TH_social_media_a056ab124865a1df14850ed4" },
  { rank: 7, market: "马来西亚", priority: "P2", judgment: "本地竞品Poh Kong活跃，Chow Tai Fook存在，黄金会议显示行业交流，但电商趋势信号弱。", evidence: "MY_competitors_7ee2bc857b5536d2f0f6ae1f" },
  { rank: 8, market: "越南", priority: "P2", judgment: "市场容量较小，竞对存在，社交媒体与趋势信号初步，可观察但非优先。", evidence: "VN_competitors_e2cc6f8e0ef16643f526b34e" },
];

const RescueKC: KeyChange[] = [
  { id: "K-01", market: "日本", category: "消费趋势", change: "日本市场出现结构性需求变化：金属过敏成为基础门槛，つけっぱなし需求催生新品。", businessImpact: "若产品不符合新标准，将被市场淘汰；为跨市场产品创新提供明确方向。", industryDimension: "产品合规/研发", evidence: "JP_compliance_c23344d7a4bfcfe143cd76b1 / giant-starlly.com" },
  { id: "K-02", market: "日本、美国", category: "供应链/合规", change: "美国对全球加征关税（Section 122），日本额外关税清单明确，OFAC SDN合规风险全域存在。", businessImpact: "供应链成本与合规不确定性上升，需总部统筹应对。", industryDimension: "合规/成本", evidence: "JP_compliance_5178d40fd6caea37a8b044ae / CN_compliance_7a077c46a3685d2923828a8d" },
  { id: "K-03", market: "日本、美国", category: "平台规则", change: "Amazon多国调整FBA与推荐费，日本乐天活跃，Coupang收紧自发货规则，平台合规门槛提高。", businessImpact: "需构建跨市场电商运营能力，否则利润受损。", industryDimension: "渠道成本/运营", evidence: "JP_ecommerce_ece0bcfa25080451faf58c5c / US_ecommerce_f775cf7de217afe4b63b382b" },
  { id: "K-04", market: "全市场", category: "产品趋势", change: "2026年珠宝潮流聚焦实验室钻石、可持续材质、雕塑感银饰、中性化设计、个性化与轻量化。", businessImpact: "年轻客群购买决策受这些价值驱动，产品组合若滞后将流失份额。", industryDimension: "产品组合/品牌定位", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / US_market_trends_b8dbf9cfb498c0ac04bef2a8" },
  { id: "K-05", market: "中国", category: "市场结构", change: "中国黄金珠宝需求从投资保值转向悦己消费，轻量化、文创IP联名趋势明显，竞品促销密集。", businessImpact: "需调整产品与渠道策略，强化内容电商与年轻化表达。", industryDimension: "产品/渠道策略", evidence: "CN_market_trends_fad4dc74bc23db3672ccb4f4 / CN_competitors_87d42c7072bb21bf06f67ce9" },
  { id: "K-06", market: "韩国", category: "竞对动态", change: "Cartier在韩国大幅提价11%，显示奢侈品牌在该市场的定价权，同时韩国引领极简主义珠宝。", businessImpact: "高端价格带存在空间，但需与极简设计相匹配。", industryDimension: "定价/品牌定位", evidence: "KR_competitors_046018bfd7b25e19901df58d / KR_market_trends_4a9015dc1e2b8a79a4a48b00" },
  { id: "K-07", market: "多市场", category: "竞争结构", change: "Chow Tai Fook启动全球品牌升级，推出高端系列，进入家居领域，快速扩张东南亚和澳洲。", businessImpact: "可能长期占据国际市场的中国高端珠宝心智份额，迫使集团重新定位。", industryDimension: "品牌心智/竞争格局", evidence: "US_competitors_59733fa3b2190cd5778d2ef1 / SG_competitors_ba759d86758dffcfb9d3134e" },
  { id: "K-08", market: "越南", category: "社交电商", change: "越南网红营销成熟，Instagram与TikTok成重要销售渠道，时尚影响力增强。", businessImpact: "若进入越南市场，须优先发展社交电商能力。", industryDimension: "渠道策略", evidence: "VN_social_media_abaa83b3e76f05fb7685caf8 / campaignasia.com" },
  { id: "K-09", market: "新加坡", category: "市场机会", change: "新加坡对投资级贵金属实施GST豁免，吸引高净值客户；世界钻石大会将在新加坡举办。", businessImpact: "可探索投资贵金属零售，提升客单价与品牌形象。", industryDimension: "品类拓展/品牌形象", evidence: "SG_geopolitics_38067895bc881b8791372d41 / customs.gov.sg" },
  { id: "K-10", market: "泰国", category: "行业活动", change: "第73届曼谷珠宝展成功举办，泰国政府支持，国际参与度高，显示行业聚集效应。", businessImpact: "可考虑参展或考察，建立东南亚供应链和分销联系。", industryDimension: "渠道拓展/供应链", evidence: "TH_social_media_a056ab124865a1df14850ed4 / bkkgems.com" },
];

const RescueOP: Opportunity[] = [
  { id: "O-01", market: "中国", priority: "P0", responsibility: "区域", opportunity: "2026年珠宝趋势报告显示马主题吊坠和可夹式设计将成为柜台快消款。立即开发轻定制黄金/银饰马挂件。", businessImpact: "通过快速响应趋势吊坠，提升中国电商自然流量和新客转化率。", evidence: "CN_ecommerce_c7f941bc1c674dbb9987285e / wholesalejewelrywebsite.com" },
  { id: "O-02", market: "新加坡", priority: "P0", responsibility: "区域", opportunity: "在新加坡独立站部署AR戒指试戴模块，并优化详情页360°全景展示，选取3款钻石戒指作为测试SKU。", businessImpact: "改进在线体验直接降低钻石品类退货率，提升转化率与客单价。", evidence: "SG_ecommerce_50bd672fe7ab28c9ecba836d / branvas.com" },
  { id: "O-03", market: "日本", priority: "P0", responsibility: "区域", opportunity: "亚马逊日本2026年推介费将上调0.4%，但物流费可能下调。模拟FBA混合价商品的综合费率差。", businessImpact: "在费用结构变化窗口期精准卡位，可维持甚至提高日本站的毛利率。", evidence: "JP_ecommerce_ab4e227606dd6964bb313efd / sellercentral.amazon.co.jp" },
  { id: "O-04", market: "韩国", priority: "P0", responsibility: "区域", opportunity: "Coupang将停止注册自发货(SF)商品，一周内集中上传所有可发货珠宝SKU至Coupang。", businessImpact: "政策窗口关闭前抢占数万免费流量入口，避免库存积压损失。", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1 / scm-en.ecer.com" },
  { id: "O-05", market: "美国", priority: "P0", responsibility: "区域", opportunity: "梳理美国站重量在4盎司以下且尺寸为小号标准件的黄金/银质耳环，若新费率有利则增加FBA入仓量。", businessImpact: "利用费率下调优化主力小件商品的利润结构，并通过Prime标签提升转化。", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / sellercentral.amazon.com" },
  { id: "O-06", market: "中国", priority: "P0", responsibility: "总部+区域", opportunity: "在国内社交媒体发起新中式黄金设计挑战赛，邀请独立设计师联名推出轻量化黄金吊坠。", businessImpact: "差异化年轻化黄金产品线，提升品牌在竞品林立的中式黄金市场的心智份额。", evidence: "CN_competitors_6310815f7e6bd007bbddce1c / lfxjewelry.com" },
  { id: "O-07", market: "新加坡", priority: "P0", responsibility: "总部+区域", opportunity: "快速评估新加坡滨海湾金沙或樟宜机场快闪店的可行性，以文化联名+轻定制为概念推出限量吊坠。", businessImpact: "借助周大福教育市场的东风，以敏捷联名快速占位东南亚轻奢市场。", evidence: "SG_competitors_2f27302dc502402f047a3897 / chowtaifook.com" },
  { id: "O-08", market: "泰国", priority: "P0", responsibility: "总部+区域", opportunity: "主动接触曼谷高端商场，谈判联展或店中店机会，并提前针对泰国宋干节开发水花系列K金首饰。", businessImpact: "率先进入泰国顶级商圈可建立高端形象，避免未来被周大福等竞品独占渠道资源。", evidence: "TH_competitors_2345749cf882da8aa201812a / businesstimes.com.sg" },
  { id: "O-09", market: "日本", priority: "P0", responsibility: "总部", opportunity: "联合京都或金泽的独立工艺师，开发日本手作联名系列，以珍珠和漆艺元素制作项链。", businessImpact: "提升品牌艺术调性和故事性，吸引高净值文化消费者，带动客单价和日本市场品牌溢价。", evidence: "JP_market_trends_176419b81027e99ac6847984 / japanobjects.com" },
  { id: "O-10", market: "韩国", priority: "P0", responsibility: "总部+区域", opportunity: "Cartier在韩国提价11%显示奢侈品定价权强劲。开发极简钻石线，主打IF-VVS净度、D-F色培育钻，定价为Cartier同款1/5。", businessImpact: "利用奢侈品牌提价形成的价格真空带，以卓越性价比快速切入高端市场。", evidence: "KR_competitors_046018bfd7b25e19901df58d / en.sedaily.com" },
  { id: "O-11", market: "越南", priority: "P0", responsibility: "区域", opportunity: "越南社交电商增速领先东南亚，签约10名TikTok达人，以开箱+穿搭内容形式推广轻奢银饰和培育钻。", businessImpact: "以社交电商冷启动越南市场，绕过传统渠道高门槛。", evidence: "VN_social_media_abaa83b3e76f05fb7685caf8 / campaignasia.com" },
  { id: "O-12", market: "马来西亚", priority: "P0", responsibility: "总部+区域", opportunity: "宝光(Poh Kong)推出双闰月吉祥系列。以闰月双福为主题，设计可叠戴的金珠葫芦手链，联合本地风水KOL直播预售。", businessImpact: "精准切入马来西亚华人的节庆送礼需求，借助文化叙事提高手链品类毛利。", evidence: "MY_competitors_7ee2bc857b5536d2f0f6ae1f / pohkong.com.my" },
];

const RescueRK: Risk[] = [
  { id: "ris0", market: "中国", priority: "高", responsibility: "总部+区域", risk: "六福珠宝在2026年情人节推出一心一YI系列，深度绑定婚嫁与礼赠场景。若我方品牌无法建立对等的情感符号，关键节点心智将被竞品锁定。", businessImpact: "直接影响婚嫁季与节日期间的进店转化率和客单价，中长期将削弱品牌定价权。", evidence: "CN_competitors_87d42c7072bb21bf06f67ce9 / lukfook.com" },
  { id: "ris1", market: "泰国", priority: "高", responsibility: "总部+区域", risk: "周大福在曼谷暹罗百丽宫开设新店，并计划在澳大利亚、加拿大继续拓店，快速抢占东南亚高端点位。", businessImpact: "错失东南亚高端旅游零售流量入口，影响未来五年的区域收入增长。", evidence: "TH_competitors_2345749cf882da8aa201812a / businesstimes.com.sg" },
  { id: "ris2", market: "美国", priority: "高", responsibility: "区域", risk: "亚马逊美国站FBA配送费全面上调，同时珠宝类目被列为受限品类，要求提供材料检测报告。", businessImpact: "流量成本上升、合规下架风险增加，导致高依赖品类的毛利率下滑。", evidence: "US_ecommerce_f775cf7de217afe4b63b382b / sellercentral.amazon.com" },
  { id: "ris3", market: "日本", priority: "高", responsibility: "区域", risk: "亚马逊日本站销售佣金比例统一上调0.4%，高客单珠宝类手续费绝对值增加显著。", businessImpact: "直接压缩高客单珠宝的净利润率，可能面临卖得越多利润越薄的情况。", evidence: "JP_ecommerce_ab4e227606dd6964bb313efd / sellercentral.amazon.co.jp" },
  { id: "ris4", market: "中国", priority: "高", responsibility: "总部+区域", risk: "培育钻石必须作为独立品类运营，性别中性、可持续材质成为主流。若品牌仍以天然钻石为主力，将错失新一代客群。", businessImpact: "在钻石品类中的市场份额被培育钻石新锐品牌蚕食。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { id: "ris5", market: "中国", priority: "高", responsibility: "总部+区域", risk: "老凤祥以今日金价实时报价牢固占据黄金投资保值心智，我方品牌若缺乏回购通道和金价透明展示能力将难以竞争。", businessImpact: "在黄金消费旺季投资类黄金产品的销售转化被老凤祥截流。", evidence: "CN_competitors_6310815f7e6bd007bbddce1c / lfxjewelry.com" },
  { id: "ris6", market: "日本", priority: "高", responsibility: "总部", risk: "美国依据Section 122等国别关税工具对多国产品加征15%-50%关税，时效性关税变动频繁。", businessImpact: "供应链成本不确定性引发北美市场终端售价大幅波动。", evidence: "JP_compliance_5178d40fd6caea37a8b044ae / global-scm.com" },
  { id: "ris7", market: "美国", priority: "高", responsibility: "区域", risk: "亚马逊珠宝类目强制要求提供材料成分文档、铅测试结果和贵金属含量验证。", businessImpact: "导致核心电商渠道的销售中断和账号安全风险。", evidence: "US_ecommerce_62db03c100f860caa052f7d7 / sellerise.com" },
  { id: "ris8", market: "韩国", priority: "高", responsibility: "区域", risk: "Coupang宣布将停止新注册卖家自发货产品，推动卖家转向标准化物流履约体系。", businessImpact: "阻断新品上线和爆发性品类扩充，导致市场份额被竞争对手快速抢占。", evidence: "KR_ecommerce_6111c1fbb5d61d38f310e8a1 / scm-en.ecer.com" },
];

const RescueRA: RecommendedAction[] = [
  { id: "a1", responsibility: "总部", suggestedOwner: "总部法务部", market: "全球", deadline: "本周", action: "梳理所有在营市场对应的OFAC SDN及其他制裁清单，建立月度筛查机制。", reviewCriteria: "完成清单覆盖所有在营市场，各区域合规对接人确认本轮筛查无涉制裁交易记录。", basis: "多个市场均出现OFAC SDN列表快照合规信号，表明制裁合规风险存在全局性。", status: "待启动" },
  { id: "a2", responsibility: "区域", suggestedOwner: "中国区域市场部", market: "中国", deadline: "本周", action: "针对老凤祥和六福珠宝进行近6个月产品线、价格带、渠道布局和营销活动的对标分析。", reviewCriteria: "报告覆盖核心品类及婚嫁礼赠场景策略，提炼出至少3处可借鉴或避开的竞争策略。", basis: "老凤祥在黄金等多品类密集布阵，六福珠宝持续推出新品，需及时摸清对手动作。", status: "待启动" },
  { id: "a3", responsibility: "总部+区域", suggestedOwner: "总部战略部、新加坡区域", market: "新加坡", deadline: "本周", action: "全面分析周大福在东南亚的扩张节奏及其家居装饰线的战略逻辑。", reviewCriteria: "完成周大福东南亚开店时间表、品类延展的书面报告。", basis: "周大福已在新加坡、泰国布局并推出家居线，可能改变竞争格局。", status: "待启动" },
  { id: "a4", responsibility: "区域", suggestedOwner: "日本区域电商团队", market: "日本", deadline: "本周", action: "依据Amazon Japan推荐费率上涨和FBA费用调整，重新核算全部在售珠宝品类的单件毛利。", reviewCriteria: "输出各品类单位经济模型，标注费率影响幅度，给出至少两套应对方案。", basis: "Amazon Japan直接上调佣金率，高单价珠宝品类利润可能被显著侵蚀。", status: "待启动" },
  { id: "a6", responsibility: "区域", suggestedOwner: "韩国区域负责人", market: "韩国", deadline: "本周", action: "评估当前依靠SF模式的SKU比例，规划逐步迁移至Coupang物流服务（CLS）的方案。", reviewCriteria: "完成SF SKU占比清单及物流切换时间表，核算CLS与自配送成本差异。", basis: "Coupang流量在韩国占比极高，政策收紧若未及时跟进将丢失市场份额。", status: "待启动" },
  { id: "a7", responsibility: "区域", suggestedOwner: "美国区域电商团队", market: "美国", deadline: "本周", action: "全面排查Amazon美国站珠宝品类受限分类要求，整理并更新所需合规文件。", reviewCriteria: "清单列出全部在售珠宝子类的文件要求及当前持有状态。", basis: "Amazon持续收紧珠宝等品类的销售审核，未及时更新合规资质可能触发电击冻结。", status: "待启动" },
  { id: "a8", responsibility: "总部", suggestedOwner: "总部设计部", market: "全球", deadline: "本周", action: "结合2026年珠宝设计趋势信号，萃取雕塑感形态、可持续材质、个性化定制三个核心方向。", reviewCriteria: "总部设计团队输出趋势报告和3个方向的设计关键词。", basis: "多源趋势报告一致指向2026年消费者偏好转移，产品组合若无法跟进将失去吸引力。", status: "待启动" },
];

const RescueWL: WatchItem[] = [
  { id: "RW-01", market: "多市场", focus: "CTF在东南亚门店客流转化效果及对区域份额的侵蚀程度", trigger: "CTF新店商圈珠宝品类客流连续两月同比增长超10%且我方同商圈业绩下滑，则启动防御性品牌升级。", evidence: "SG/TH_competitors / eqs-news.com" },
  { id: "RW-02", market: "全市场", focus: "全球珠宝消费趋势从投资保值向悦己消费、年轻化转型的程度与速度", trigger: "当社交媒体上相关话题月均讨论量增长50%，且2家以上主要竞品推出转型产品线时，加速产品组合重构。", evidence: "CN_market_trends / vogue.com" },
  { id: "RW-03", market: "中国", focus: "培育钻石作为独立品类的消费者认知演变与定价体系形成", trigger: "当电商平台培育钻石品类搜索量环比增长超过20%，或3家以上主要竞品推出培育钻石专属系列时，启动战略规划。", evidence: "CN_ecommerce_140876f3d0d4b07cc5360554 / southernjewelrynews.com" },
  { id: "RW-04", market: "日本、美国", focus: "跨市场电商运营中台建设的成本效益与优先级评估", trigger: "当Amazon在2个以上市场同时变更费率或政策，且变更幅度超过5%时，启动中台建设可行性研究。", evidence: "JP_ecommerce_ece0bcfa25080451faf58c5c / US_ecommerce_f775cf7de217afe4b63b382b" },
];

// ============================
// Getter
// ============================

export function getStrategyData(mode: StrategyMode): StrategyDataSet {
  switch (mode) {
    case "innovation":
      return {
        decisionSummary: InnovationDS,
        marketPriorities: InnovationMP,
        keyChanges: InnovationKC,
        opportunities: InnovationOP,
        risks: InnovationRK,
        recommendedActions: InnovationRA,
        watchList: InnovationWL,
        evidenceRecords: sharedEvidenceRecords,
        uncertainties: sharedUncertainties,
      };
    case "stable":
      return {
        decisionSummary: StableDS,
        marketPriorities: StableMP,
        keyChanges: StableKC,
        opportunities: StableOP,
        risks: StableRK,
        recommendedActions: StableRA,
        watchList: StableWL,
        evidenceRecords: sharedEvidenceRecords,
        uncertainties: sharedUncertainties,
      };
    case "rescue":
      return {
        decisionSummary: RescueDS,
        marketPriorities: RescueMP,
        keyChanges: RescueKC,
        opportunities: RescueOP,
        risks: RescueRK,
        recommendedActions: RescueRA,
        watchList: RescueWL,
        evidenceRecords: sharedEvidenceRecords,
        uncertainties: sharedUncertainties,
      };
    default:
      return {
        decisionSummary: StableDS,
        marketPriorities: StableMP,
        keyChanges: StableKC,
        opportunities: StableOP,
        risks: StableRK,
        recommendedActions: StableRA,
        watchList: StableWL,
        evidenceRecords: sharedEvidenceRecords,
        uncertainties: sharedUncertainties,
      };
  }
}

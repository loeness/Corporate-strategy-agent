/**
 * 每日跨市场运营决策与策略判断报告 — 三模式结构化数据
 * 数据来源：
 *   - data/innovation_breakthrough_strategy_report.md → 创新突破
 *   - data/steady_operations_strategy_report.md → 稳健运营
 *   - data/strategic_transformation_strategy_report.md → 战略转型
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
// Public evidence records (shared)
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
    description: "老凤祥全球4,000+门店",
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
  { id: "U-01", type: "竞品数据噪音", description: "competitors维度数据约60%+为关键词匹配噪音", suggestion: "优化查询词，添加负向关键词降低噪音比例。" },
  { id: "U-02", type: "数据置信度分层", description: "4,674条记录中仅423条来自Primary API（conf=1.0）", suggestion: "对P0级决策所依据的Tavily数据人工确认。" },
];

// ============================
// Mode: innovation
// ============================

const InnovationDS = ["多市场涌现培育钻石、可持续材料与中性设计趋势，试点新品线可形成新增长曲线。", "日本市场呈现日常佩戴第二皮肤与磁石胸针等场景化创新，启发产品研发与内容测试。", "AR虚拟试戴与社交电商在韩国、越南等市场具备技术融合潜力。", "平台费用与合规收紧抬高试错成本，但差异化内容反易获搜索红利。"];

const InnovationMP: MarketPriority[] = [
  { rank:1, market:"日本", priority:"P0", judgment:"信号密度与创新信号质量最高，拥有具体的场景化消费者洞察可转化为MVP试点。", evidence:"JP_compliance_c23344d7 / giant-starlly.com" },
  { rank:2, market:"中国", priority:"P0", judgment:"培育钻石与中性设计趋势信号强烈，年轻客群集中且社交电商生态成熟。", evidence:"CN_ecommerce_140876 / southernjewelrynews.com" },
  { rank:3, market:"韩国", priority:"P1", judgment:"K-pop影响力与穿戴极简主义创新潜力突出，但AR技术落地需合规验证。", evidence:"KR_market_trends_4a9015 / jewelersmutual.com" },
  { rank:4, market:"美国", priority:"P1", judgment:"成熟市场中可持续材料搜索量上升，但品牌调性偏移风险较高。", evidence:"US_market_trends_db4242 / news.market.us" },
  { rank:5, market:"越南", priority:"P2", judgment:"影响者营销成本低，适合作为低成本内容实验场。", evidence:"VN_social_media_abaa83 / campaignasia.com" },
  { rank:6, market:"新加坡", priority:"P2", judgment:"高消费力市场可测试可持续材料叙事，适合作为区域新品首发地。", evidence:"SG_ecommerce_50bd67 / branvas.com" },
  { rank:7, market:"马来西亚", priority:"P2", judgment:"黄金消费文化浓厚，可试探轻量化与中性设计需求。", evidence:"MY_competitors_7ee2bc / pohkong.com.my" },
  { rank:8, market:"泰国", priority:"P2", judgment:"曼谷珠宝展与CTF扩张表明市场竞争加剧，可作为设计输出窗口。", evidence:"TH_social_media_a056ab / bkkgems.com" },
];

const InnovationKC: KeyChange[] = [
  { id:"K-01", market:"日本", category:"产品/设计", change:"日本出现つけっぱなし饰品趋势，磁石胸针与防过敏材料成为搜索门槛。", businessImpact:"启发新场景品类，影响材料采购标准与listing关键词策略。", industryDimension:"品类、渠道、转化", evidence:"JP_compliance_c23344d7" },
  { id:"K-02", market:"中国、日本、韩国", category:"产品/品类", change:"培育钻石被列为独立品类而非天然钻石替代品，强调环保属性。", businessImpact:"影响品类架构与毛利结构，若作为独立线推出可开辟新客群。", industryDimension:"品类、毛利/价格", evidence:"CN_ecommerce_140876" },
  { id:"K-03", market:"中国、美国、日本", category:"产品/设计", change:"中性化饰品与模块化设计在多份趋势报告中列为高搜索量品类。", businessImpact:"可能扩大客群基数，影响产品开发与视觉营销方向。", industryDimension:"品类、品牌心智", evidence:"CN_ecommerce_140876, JP_market_trends_dbc009" },
  { id:"K-04", market:"中国、日本", category:"产品/材料", change:"木材、树脂、搪瓷等非传统材质列为2026重要方向，强调色彩与雕塑感。", businessImpact:"若供应链支持可小批量试制。", industryDimension:"品类、库存", evidence:"CN_ecommerce_e82f0c" },
  { id:"K-05", market:"韩国、越南", category:"渠道/技术", change:"社交电商与AR试戴融合加速，Coupang收紧自发货政策。", businessImpact:"影响渠道策略与运营模式，AR可能提升线上转化。", industryDimension:"渠道、转化", evidence:"KR_ecommerce_6111c, VN_social_media_abaa83" },
  { id:"K-06", market:"美国、新加坡", category:"平台/合规", change:"Amazon更新FBA费用与首饰品类审批门槛，要求材料测试。", businessImpact:"增加新品试错成本，但也提升有准备商家的进入壁垒。", industryDimension:"渠道、合规", evidence:"US_ecommerce_f775cf" },
  { id:"K-07", market:"东南亚", category:"竞争/扩张", change:"Chow Tai Fook加速在东南亚开设旗舰店与推地域特供版。", businessImpact:"要求创新产品需有本地文化关联或差异化设计。", industryDimension:"品牌心智、流量", evidence:"SG_competitors_dec502" },
  { id:"K-08", market:"韩国", category:"设计/美学", change:"韩国极简主义与K-pop风格珠宝被全球趋势报告强调为标杆。", businessImpact:"可作为设计语言突破的参考，输出到其他市场。", industryDimension:"品类、品牌心智", evidence:"KR_market_trends_4a9015" },
];

const InnovationOP: Opportunity[] = [
  { id:"O-01", market:"中国", priority:"P0", responsibility:"区域", opportunity:"批发网站2026年趋势提到马主题饰品及可夹式吊坠的零售机会。", businessImpact:"低客单饰品拉动自然流量入口，带动高毛利黄金品类曝光。", evidence:"CN_ecommerce_c7f941 / wholesalejewelrywebsite.com" },
  { id:"O-02", market:"新加坡", priority:"P0", responsibility:"区域", opportunity:"AR虚拟试戴和高清360°影像正在降低线上买钻阻力。", businessImpact:"高客单钻石线上退货率每降1个百分点可直接提升毛利。", evidence:"SG_ecommerce_50bd67 / branvas.com" },
  { id:"O-03", market:"中国", priority:"P0", responsibility:"总部+区域", opportunity:"老凤祥24K金货架高度同质化，以古法金为基底加入中国色珐琅开发限量黄金手镯。", businessImpact:"跳出克价竞争，用文化设计建立品牌国潮心智。", evidence:"CN_competitors_631081 / lfxjewelry.com" },
  { id:"O-04", market:"美国", priority:"P0", responsibility:"区域", opportunity:"ELLE将雕塑感银饰列为2026核心趋势，启动TikTok #SilverStatement挑战。", businessImpact:"以低成本内容拉动自然流量，吸引Gen Z关注。", evidence:"US_market_trends_121928 / elle.com" },
  { id:"O-05", market:"日本", priority:"P0", responsibility:"区域", opportunity:"日本手工艺术家突出侘寂美学，与本土银匠合作推出Wabi-Sabi限量系列。", businessImpact:"借助在地手作故事拉升品牌高端形象，提升客单价。", evidence:"JP_market_trends_176419 / japanobjects.com" },
  { id:"O-06", market:"韩国", priority:"P0", responsibility:"区域", opportunity:"韩国趋势报告强调可持续和培育钻石，快速上架3款培育钻石求婚戒指。", businessImpact:"进入高增速品类，用性价比优势获取新婚消费者。", evidence:"KR_market_trends_73340e / okgjewelry.com" },
  { id:"O-07", market:"泰国", priority:"P0", responsibility:"区域", opportunity:"在Shopee Live开设2026趋势预购专场，以极简培育钻石项链为主打。", businessImpact:"以C2M预售模式降低新品库存风险，直接拉动泰国站GMV。", evidence:"TH_ecommerce_c3357d / gabrielfinejewelers.com" },
  { id:"O-08", market:"新加坡", priority:"P0", responsibility:"区域", opportunity:"周大福JOIE系列借助迪士尼等IP联名吸引年轻客群。", businessImpact:"借助IP流量打破品牌老化印象，提高年轻客群复购率。", evidence:"SG_competitors_2f2730 / chowtaifook.com" },
  { id:"O-10", market:"美国", priority:"P0", responsibility:"总部+区域", opportunity:"蒂芙尼重点展示粗链节、混合金属叠戴趋势，推出模块化薄手镯。", businessImpact:"模块化设计提高连带购买率，拉升客单价。", evidence:"TH_competitors_58e0a1 / tiffany.com" },
];

const InnovationRK: Risk[] = [
  { id:"risk_01", market:"日本", priority:"P0", responsibility:"区域", risk:"磁石胸针与防过敏材料需导入新供应链，日本JIS标准认证耗时长达6个月。", businessImpact:"新品上市延迟导致错失季节性窗口。", evidence:"JP_compliance_c23344d7" },
  { id:"risk_02", market:"中国", priority:"P0", responsibility:"总部+区域", risk:"培育钻石若市场批发价继续以每年15%-20%下跌，新品上市即面临价格倒挂。", businessImpact:"毛利快速收窄，天然钻石客单价可能被连带质疑。", evidence:"CN_ecommerce_140876" },
  { id:"risk_03", market:"新加坡", priority:"P0", responsibility:"区域", risk:"部署AR虚拟试戴但内部缺乏珠宝3D建模技术积累，可能导致模型失真。", businessImpact:"退货率上升侵蚀转化利润。", evidence:"SG_ecommerce_50bd67" },
  { id:"risk_05", market:"美国", priority:"P0", responsibility:"区域", risk:"美国站FBA履单费调整后小件珠宝配送成本上升约8%-12%。", businessImpact:"渠道毛利率下降，低客单价商品面临砍SKU或提价后流量下滑。", evidence:"US_ecommerce_f775cf" },
  { id:"risk_06", market:"日本", priority:"P0", responsibility:"总部", risk:"美国对日本产铝衍生品加征50%关税，从日本采购K金链条转运美国成本激增。", businessImpact:"供应链成本失控，美国市场黄金类饰品价格竞争力丧失。", evidence:"JP_compliance_5178d4" },
  { id:"risk_07", market:"泰国", priority:"P0", responsibility:"区域", risk:"CTF在曼谷Siam Paragon开设旗舰店，直接抢夺高端客流。", businessImpact:"泰国市场到店流量和转化率下降。", evidence:"TH_competitors_23457" },
  { id:"risk_08", market:"中国", priority:"P0", responsibility:"总部+区域", risk:"创新资源过度向前沿倾斜，导致传统产品线迭代延迟。", businessImpact:"节庆销售高峰期市场份额流失。", evidence:"CN_competitors_87d42c" },
  { id:"risk_10", market:"日本", priority:"P0", responsibility:"区域", risk:"创新系列未针对日本市场执行过敏原控制，将被搜索算法过滤。", businessImpact:"日本站流量和付费流量效率齐降。", evidence:"JP_compliance_c23344d7" },
];

const InnovationRA: RecommendedAction[] = [
  { id:"A-01", responsibility:"总部+区域", suggestedOwner:"产品总监、日本区域经理", market:"日本", deadline:"2026年7月前", action:"开发并上线基于第二皮肤概念的防过敏金属系列（耳环、项链），不少于5个SKU。", reviewCriteria:"上线30天内自然搜索词点击率高于平均值10%，且无严重品质退货。", basis:"该趋势在乐天市场排名已验证，创新点在于磁石扣合与医用材料。", status:"待人工确认" },
  { id:"A-02", responsibility:"区域", suggestedOwner:"韩国电商运营", market:"韩国", deadline:"2026年Q3前", action:"与Coupang合作或使用第三方AR工具，对一款新品戒指进行虚拟试戴vs静态图的A/B测试。", reviewCriteria:"AR组转化率显著高于对照组（p<0.1），且退货率不上升。", basis:"VR/AR技术可降低饰品网购障碍，但需本地验证。", status:"待人工确认" },
  { id:"A-03", responsibility:"总部", suggestedOwner:"品牌经理、设计师", market:"中国、美国", deadline:"2026年8月", action:"启动中性化珠宝设计工作坊，产出至少3个概念系列，通过DTC官网预售测试。", reviewCriteria:"预售转化率>2%且客单中位价符合中高端定位。", basis:"趋势报告多次强调，尽早占领用户心智。", status:"待人工确认" },
  { id:"A-04", responsibility:"区域", suggestedOwner:"越南市场主管", market:"越南", deadline:"2026年Q3", action:"签约5-10名微观时尚KOL，以日常叙事方式推广新材质配饰。", reviewCriteria:"KOL内容总曝光>50万，专属码使用次数>100。", basis:"越南消费者对影响者推荐信赖度高，适合低成本冷启动。", status:"待人工确认" },
  { id:"A-06", responsibility:"总部+区域", suggestedOwner:"电商总监", market:"美国、日本", deadline:"2026年7月前", action:"梳理Amazon最新首饰合规要求，完成现有产品检测文件更新，并为新品开发设置合规预审流。", reviewCriteria:"在下一季度无因合规导致的listing下架事件。", basis:"避免因政策突击导致新品无法按时上架。", status:"待人工确认" },
];

const InnovationWL: WatchItem[] = [
  { id:"WL001", market:"中国", focus:"实验室培育钻石作为独立品类的消费者认知与内容营销策略", trigger:"当电商平台培育钻石品类搜索量环比增长超过20%时，启动A/B测试。", evidence:"CN_ecommerce_140876 / southernjewelrynews.com" },
  { id:"WL002", market:"新加坡", focus:"AR虚拟试戴功能在东南亚珠宝线上销售中的转化率提升效果", trigger:"当AR试戴使转化率提升超过15%时，启动AR试戴MVP开发。", evidence:"SG_ecommerce_50bd67 / branvas.com" },
  { id:"WL003", market:"日本", focus:"24小时佩戴场景下的无过敏、无针式耳饰商品化机会", trigger:"当退货理由中佩戴不适/过敏占比超过8%时，启动小样试产。", evidence:"JP_compliance_c23344d7 / giant-starlly.com" },
];

// ============================
// Mode: stable
// ============================

const StableDS = ["全球SDN清单需总部合规部统一解析并通知各区，避免跨境交易制裁风险", "日本Amazon费用及关税变化将直接影响毛利，区域须立即核算各SKU损益并调整运营策略", "美国Amazon品类合规和FBA费用更新要求区域前置准备材料并优化物流方案", "金价高位震荡，总部商品部应建立熔断机制，各区开展轻量化商品测试以维持毛利"];

const StableMP: MarketPriority[] = [
  { rank:1, market:"日本", priority:"P0", judgment:"Amazon推荐费上涨、关税政策到期、FBA费用变化三重压力，直接影响毛利率和履约成本。", evidence:"JP_compliance_5178d4, JP_ecommerce_ab4e2" },
  { rank:2, market:"中国", priority:"P0", judgment:"竞品密集促销挤压流量和价格，金价波动影响库存估值。", evidence:"CN_competitors_631081, CN_prices_c8ac9c" },
  { rank:3, market:"韩国", priority:"P1", judgment:"Coupang自发货规则收紧将改变履约模式，须提前转型。", evidence:"KR_ecommerce_6111c1" },
  { rank:4, market:"美国", priority:"P1", judgment:"Amazon FBA费用更新和珠宝品类合规门槛提高，影响操作成本和账号安全。", evidence:"US_ecommerce_f775cf, US_ecommerce_9c47a" },
  { rank:5, market:"新加坡", priority:"P2", judgment:"目前以趋势信号和竞争动态为主，暂无紧急运营风险。", evidence:"SG_ecommerce_50bd67" },
  { rank:6, market:"马来西亚", priority:"P2", judgment:"本地竞品活跃但暂无平台规则剧变。", evidence:"MY_competitors_7ee2bc" },
  { rank:7, market:"泰国", priority:"P2", judgment:"主要信号为珠宝展会和趋势内容，可借势做轻量测试。", evidence:"TH_competitors_234574" },
  { rank:8, market:"越南", priority:"P2", judgment:"竞品扩张信号值得关注，但短期无平台或合规突变。", evidence:"VN_competitors_1059f8" },
];

const StableKC: KeyChange[] = [
  { id:"K-01", market:"日本", category:"regulation", change:"美国对日关税Section 122将于2026年7月24日到期。", businessImpact:"供应链成本不确定性增加，需在合同中加入关税变动条款。", industryDimension:"毛利/价格", evidence:"JP_compliance_5178d4" },
  { id:"K-02", market:"全球", category:"regulation", change:"OFAC SDN名单快照fetched。", businessImpact:"所有市场需排查业务往来中是否存在制裁实体。", industryDimension:"合规", evidence:"CN_compliance_7a077c / OFAC" },
  { id:"K-03", market:"日本", category:"platform", change:"Amazon日本站推荐费将上调0.4%。", businessImpact:"毛利空间直接收窄，需测算影响并考虑调价或成本优化。", industryDimension:"毛利/价格", evidence:"JP_ecommerce_ab4e22" },
  { id:"K-04", market:"日本", category:"platform", change:"高价值珠宝退货政策调整为不可退货。", businessImpact:"高客单商品售后风险上升。", industryDimension:"转化/品牌心智", evidence:"JP_ecommerce_dd5c5f" },
  { id:"K-05", market:"韩国", category:"platform", change:"Coupang将停止自发货产品注册。", businessImpact:"需将产品转为平台仓发货，否则面临流量下降或下架风险。", industryDimension:"流量/转化", evidence:"KR_ecommerce_6111c1" },
  { id:"K-06", market:"美国", category:"platform", change:"Amazon FBA配送费更新，小件商品成本上升。", businessImpact:"部分低客单珠宝物流费用占比增加。", industryDimension:"毛利/价格", evidence:"US_ecommerce_f775cf" },
  { id:"K-07", market:"美国", category:"platform", change:"Amazon珠宝品类要求提供材料测试文档。", businessImpact:"如未及时提交可能导致listing被移除。", industryDimension:"合规/流量", evidence:"US_ecommerce_9c47a" },
  { id:"K-08", market:"中国", category:"competition", change:"本地竞品老凤祥、六福珠宝频繁上新及节日促销。", businessImpact:"可能分流流量，压缩我方价格空间。", industryDimension:"流量/品牌心智", evidence:"CN_competitors_87d42c" },
  { id:"K-10", market:"中国", category:"product", change:"金价高位波动，145 USD/克以上。", businessImpact:"库存估值和定价策略需动态调整以维持毛利。", industryDimension:"毛利/价格", evidence:"CN_prices_c8ac9c / kitco.com" },
];

const StableOP: Opportunity[] = [
  { id:"O-01", market:"美国", priority:"P0", responsibility:"区域", opportunity:"分析自有珠宝SKU的包装尺寸与重量，测试将轻小件重新包装以落入更低费率分段。", businessImpact:"优化包装后单个订单履约成本有望降低0.3-0.5美元。", evidence:"US_ecommerce_f775cf" },
  { id:"O-02", market:"日本", priority:"P0", responsibility:"区域", opportunity:"排查所有FBA SKU的标签类型，在截止日前转换为亚马逊条码（FNSKU）。", businessImpact:"提前完成标签切换可防止数千件商品被隔离或强制移除。", evidence:"JP_ecommerce_9284a2 / bellavix.com" },
  { id:"O-03", market:"韩国", priority:"P0", responsibility:"区域", opportunity:"盘点现有SF商品，挑出销量前20%的SKU测试转为Coupang火箭配送。", businessImpact:"转型为火箭配送商品可获得搜索排名加权和流量扶持。", evidence:"KR_ecommerce_6111c1" },
  { id:"O-04", market:"美国", priority:"P0", responsibility:"区域", opportunity:"整理现有黄金、钻石、珍珠品类的供应商发票和材质证书，在类目审核触发前主动提交合规申请。", businessImpact:"首批通过审核的卖家将在搜索加权和Buy Box赢得率上获得优势。", evidence:"US_ecommerce_62db03" },
  { id:"O-05", market:"日本", priority:"P0", responsibility:"区域", opportunity:"拉取所有在售珠宝ASIN的最新费率表，计算综合成本变化。", businessImpact:"利用费率结构对冲机会，总费用可能不升反降。", evidence:"JP_ecommerce_ab4e22" },
  { id:"O-06", market:"中国", priority:"P0", responsibility:"总部", opportunity:"在天猫/京东旗舰店设立培育钻石专区，上架3-5枚培育钻戒指/项链。", businessImpact:"抢占培育钻石新品类心智，预计额外5-10%自然流量。", evidence:"CN_ecommerce_140876" },
];

const StableRK: Risk[] = [
  { id:"risk_us_fba_fee", market:"美国", priority:"P0", responsibility:"区域", risk:"Amazon美国站FBA配送费调整，部分尺寸段费率上涨，侵蚀低客单价珠宝利润。", businessImpact:"毛利下滑，尤其影响轻小件珠宝的利润阈值。", evidence:"US_ecommerce_f775cf" },
  { id:"risk_us_jewelry_restricted", market:"美国", priority:"P0", responsibility:"区域", risk:"Amazon珠宝品类被列为受限商品，要求材料文档、铅测试结果等。", businessImpact:"合规风险导致Listing被移除，库存可能积压。", evidence:"US_ecommerce_92ade2" },
  { id:"risk_jp_referral_fee", market:"日本", priority:"P0", responsibility:"区域", risk:"Amazon日本站引荐费将从2026年4月起普遍上调0.4个百分点。", businessImpact:"直接减少净利润，需要区域运营重新核算定价。", evidence:"JP_ecommerce_ab4e22" },
  { id:"risk_commingling", market:"日本", priority:"P0", responsibility:"区域", risk:"Amazon自2026年3月31日起停止支持无标签混储。", businessImpact:"库存入仓受阻，导致补货延迟。", evidence:"JP_ecommerce_9284a2" },
  { id:"risk_coupang_self", market:"韩国", priority:"P0", responsibility:"区域", risk:"Coupang将停止新注册卖家自发货商品，流量向自有物流倾斜。", businessImpact:"如果采用自发货，将失去流量支持。", evidence:"KR_ecommerce_6111c1" },
  { id:"risk_ofac_sdn", market:"中国", priority:"P0", responsibility:"总部", risk:"OFAC SDN制裁名单更新，若供应链涉及名单实体可能面临账户冻结。", businessImpact:"合规风险，可能导致平台店铺被关闭。", evidence:"CN_compliance_7a077c" },
  { id:"risk_cn_price", market:"中国", priority:"P0", responsibility:"总部+区域", risk:"老凤祥官网实时展示黄金金价，消费者价格高度敏感。", businessImpact:"转化率下滑，需持续监控竞品价格。", evidence:"CN_competitors_631081" },
  { id:"risk_jp_allergy", market:"日本", priority:"P0", responsibility:"区域", risk:"日本消费者对金属过敏非常敏感，未标注防过敏说明将被搜索算法过滤。", businessImpact:"流量骤减，导致库存滞销。", evidence:"JP_compliance_c23344d7" },
];

const StableRA: RecommendedAction[] = [
  { id:"ACT-001", responsibility:"总部", suggestedOwner:"全球合规负责人", market:"全球", deadline:"本周", action:"下载最新OFAC SDN列表，解析XML并与现有客户/供应商/交易对手进行比对。", reviewCriteria:"提交合规复核报告，由总法律顾问签字确认。", basis:"多个市场均触发SDN列表快照信号，证据等级A。", status:"open" },
  { id:"ACT-003", responsibility:"区域", suggestedOwner:"日本市场运营经理", market:"日本", deadline:"本周", action:"基于Amazon日本站推荐费上调0.4%的公告，提取所有在售ASIN模拟费用影响。", reviewCriteria:"提供按ASIN维度的利润影响模拟表。", basis:"推荐费率增加0.4%，直接影响利润。", status:"open" },
  { id:"ACT-006", responsibility:"区域", suggestedOwner:"美国市场运营经理", market:"美国", deadline:"本周", action:"根据美国FBA履行费用变更表更新所有在售SKU配送成本。", reviewCriteria:"产出《2026美国FBA费用更新影响分析》。", basis:"信号直接来自sellercentral.amazon.com。", status:"open" },
  { id:"ACT-007", responsibility:"区域", suggestedOwner:"美国市场合规专员", market:"美国", deadline:"本周", action:"收集并整理所有美国站在售珠宝产品的材料测试报告、供应商发票和铅含量检测证书。", reviewCriteria:"创建《美国站珠宝合规文件清单》。", basis:"多个信号强调Amazon美国对珠宝类有材料测试要求。", status:"open" },
  { id:"ACT-008", responsibility:"区域", suggestedOwner:"韩国市场运营经理", market:"韩国", deadline:"本周", action:"分析Coupang关闭自配送注册的可能性，评估现有自配送订单比例并制定过渡方案。", reviewCriteria:"提交《Coupang自发货政策应对方案》。", basis:"Coupang将停止新自发货注册。", status:"open" },
];

const StableWL: WatchItem[] = [
  { id:"W-05", market:"中国", focus:"观察SDN名单快照是否会在合规维度影响该市场。", trigger:"若后续采集再次出现同主题信号，则升级为行动项。", evidence:"CN_compliance_7a077c / OFAC" },
  { id:"W-08", market:"日本", focus:"观察美国进口关税国别状况对日本市场的影响。", trigger:"若后续采集再次出现同主题信号，则升级为行动项。", evidence:"JP_compliance_5178d4 / global-scm.com" },
];

// ============================
// Mode: rescue
// ============================

const RescueDS = ["Chow Tai Fook全球品牌升级、品类扩展与激进国际化构成结构性竞争威胁，需重新评估集团品牌定位。", "多市场平台费用上涨与规则收紧要求建立跨市场电商运营中台。", "实验室钻石、可持续与个性化趋势重塑消费者价值，产品组合需向年轻化、中性化、轻量化转型。", "关税波动与合规风险升级，总部须统一供应链合规体系并制定多元化采购策略。"];

const RescueMP: MarketPriority[] = [
  { rank:1, market:"日本", priority:"P0", judgment:"平台政策变化密集、消费趋势数据深度最佳，可作为能力建设与产品创新试点。", evidence:"JP_ecommerce_ece0bc / JP_compliance_5178d4" },
  { rank:2, market:"中国", priority:"P0", judgment:"市场体量最大，竞对最集中，趋势信号明确，品牌心智争夺关键。", evidence:"CN_competitors_87d42c / CN_market_trends_fad4dc" },
  { rank:3, market:"韩国", priority:"P1", judgment:"Coupang规则变化与Cartier提价显示渠道与竞对动态，极简趋势适合产品创新。", evidence:"KR_ecommerce_6111c / KR_competitors_046018" },
  { rank:4, market:"美国", priority:"P1", judgment:"亚马逊政策密集调整影响运营，竞对扩张与趋势信号明确。", evidence:"US_ecommerce_f775cf / US_competitors_59733" },
  { rank:5, market:"新加坡", priority:"P1", judgment:"区域枢纽，Chow Tai Fook进入且黄金免税政策提供投资品类机会。", evidence:"SG_competitors_dec502 / SG_geopolitics_380678" },
  { rank:6, market:"泰国", priority:"P2", judgment:"曼谷珠宝展与CTF开店显示市场热度，但需进一步验证。", evidence:"TH_competitors_23457 / TH_social_media_a056ab" },
  { rank:7, market:"马来西亚", priority:"P2", judgment:"本地竞品Poh Kong活跃，黄金会议显示行业交流。", evidence:"MY_competitors_7ee2bc" },
  { rank:8, market:"越南", priority:"P2", judgment:"市场容量较小，可观察但非优先。", evidence:"VN_competitors_e2cc6f" },
];

const RescueKC: KeyChange[] = [
  { id:"K-01", market:"日本", category:"消费趋势", change:"日本出现结构性需求变化：金属过敏成为基础门槛，つけっぱなし需求催生新品。", businessImpact:"若产品不符合新标准将被市场淘汰。", industryDimension:"产品合规/研发", evidence:"JP_compliance_c23344d7" },
  { id:"K-02", market:"日本、美国", category:"供应链/合规", change:"美国对全球加征关税（Section 122），OFAC SDN合规风险全域存在。", businessImpact:"供应链成本与合规不确定性上升。", industryDimension:"合规/成本", evidence:"JP_compliance_5178d4 / CN_compliance_7a077c" },
  { id:"K-03", market:"日本、美国", category:"平台规则", change:"Amazon多国调整FBA与推荐费，Coupang收紧自发货规则。", businessImpact:"需构建跨市场电商运营能力。", industryDimension:"渠道成本/运营", evidence:"JP_ecommerce_ece0bc / US_ecommerce_f775cf" },
  { id:"K-04", market:"全市场", category:"产品趋势", change:"2026珠宝潮流聚焦实验室钻石、可持续材质、雕塑感银饰、中性化设计。", businessImpact:"产品组合若滞后将流失年轻客群份额。", industryDimension:"产品组合/品牌定位", evidence:"CN_ecommerce_140876" },
  { id:"K-05", market:"中国", category:"市场结构", change:"中国黄金珠宝需求从投资保值转向悦己消费，轻量化、文创IP联名趋势明显。", businessImpact:"需调整产品与渠道策略，强化内容电商。", industryDimension:"产品/渠道策略", evidence:"CN_market_trends_fad4dc" },
  { id:"K-07", market:"多市场", category:"竞争结构", change:"Chow Tai Fook启动全球品牌升级，推出高端系列，快速扩张东南亚。", businessImpact:"可能长期占据中国高端珠宝心智份额，迫使集团重新定位。", industryDimension:"品牌心智/竞争格局", evidence:"US_competitors_59733 / SG_competitors_ba759" },
  { id:"K-09", market:"新加坡", category:"市场机会", change:"新加坡对投资级贵金属实施GST豁免，吸引高净值客户。", businessImpact:"可探索投资贵金属零售，提升客单价与品牌形象。", industryDimension:"品类拓展/品牌形象", evidence:"SG_geopolitics_380678" },
];

const RescueOP: Opportunity[] = [
  { id:"O-01", market:"中国", priority:"P0", responsibility:"区域", opportunity:"2026珠宝趋势报告显示马主题吊坠和可夹式设计将成为柜台快消款。", businessImpact:"通过快速响应趋势吊坠，提升中国电商自然流量和新客转化率。", evidence:"CN_ecommerce_c7f941" },
  { id:"O-02", market:"新加坡", priority:"P0", responsibility:"区域", opportunity:"在线渗透率加速提升，AR试戴消除决策摩擦，在新加坡独立站部署AR戒指试戴模块。", businessImpact:"改进在线体验直接降低钻石品类退货率，提升转化率与客单价。", evidence:"SG_ecommerce_50bd67" },
  { id:"O-03", market:"日本", priority:"P0", responsibility:"区域", opportunity:"Amazon日本推荐费上调0.4%但物流费可能下调，模拟FBA综合费率差。", businessImpact:"在费用结构变化窗口期精准卡位，维持日本站毛利率。", evidence:"JP_ecommerce_ab4e22" },
  { id:"O-04", market:"韩国", priority:"P0", responsibility:"区域", opportunity:"Coupang将停止注册自发货商品，一周内集中上传所有可发货SKU。", businessImpact:"政策窗口关闭前抢占免费流量入口，避免库存积压。", evidence:"KR_ecommerce_6111c1" },
  { id:"O-05", market:"美国", priority:"P0", responsibility:"区域", opportunity:"2026年FBA配送费调整，大件轻量商品费率可能下降，增加小件FBA入仓量。", businessImpact:"利用费率下调优化主力小件商品的利润结构。", evidence:"US_ecommerce_f775cf" },
  { id:"O-07", market:"新加坡", priority:"P0", responsibility:"总部+区域", opportunity:"周大福推出CTF JOIE轻奢系列主打IP联名，以文化联名+轻定制推出限量吊坠。", businessImpact:"借助周大福教育市场的东风，快速占位东南亚轻奢市场。", evidence:"SG_competitors_2f2730" },
];

const RescueRK: Risk[] = [
  { id:"risk_ctf_global", market:"多市场", priority:"P0", responsibility:"总部", risk:"Chow Tai Fook启动全球品牌升级与激进国际化，推出高端系列，快速扩张东南亚。", businessImpact:"可能长期占据中国高端珠宝心智份额，迫使集团重新定位。", evidence:"US_competitors_59733 / SG_competitors_ba759" },
  { id:"risk_platform_cost", market:"日本、美国", priority:"P0", responsibility:"总部+区域", risk:"Amazon多国调整FBA与推荐费，Coupang收紧自发货规则，平台合规门槛全面提高。", businessImpact:"多市场运营成本同时上升，若不构建中台利润将受损。", evidence:"JP_ecommerce_ece0bc / US_ecommerce_f775cf" },
  { id:"risk_product_lag", market:"全市场", priority:"P0", responsibility:"总部", risk:"2026珠宝潮流聚焦实验室钻石、可持续材质、中性化设计，产品组合未及时转型。", businessImpact:"Z世代和千禧一代购买决策受新价值驱动，产品滞后将流失份额。", evidence:"CN_ecommerce_140876" },
  { id:"risk_tariff_vol", market:"日本", priority:"P0", responsibility:"总部", risk:"美国对日关税即将到期，OFAC SDN合规风险全域存在。", businessImpact:"供应链成本与合规不确定性上升，需统一合规体系。", evidence:"JP_compliance_5178d4 / CN_compliance_7a077c" },
];

const RescueRA: RecommendedAction[] = [
  { id:"RA-01", responsibility:"总部", suggestedOwner:"集团战略部", market:"全市场", deadline:"本月内", action:"针对CTF全球品牌升级及激进国际化，启动集团品牌定位重新评估，制定差异化竞争策略。", reviewCriteria:"完成竞品深度分析报告，输出品牌定位建议方案。", basis:"Chow Tai Fook多市场扩张构成结构性威胁。", status:"待人工确认" },
  { id:"RA-02", responsibility:"总部", suggestedOwner:"电商总监", market:"日本、美国", deadline:"本月内", action:"建立跨市场电商运营中台，统一管理Amazon多国FBA/推荐费变化等平台政策。", reviewCriteria:"完成中台架构设计，输出跨市场费率监控与优化方案。", basis:"多市场平台费用上涨与规则收紧。", status:"待人工确认" },
  { id:"RA-03", responsibility:"总部", suggestedOwner:"产品总监", market:"全市场", deadline:"本月内", action:"制定产品组合转型路线图：增加实验室钻石、可持续材质、中性化设计、轻量化黄金产品比例。", reviewCriteria:"输出产品组合重构方案，明确各品类占比目标和时间表。", basis:"2026珠宝潮流方向明确，产品滞后将流失年轻客群。", status:"待人工确认" },
  { id:"RA-04", responsibility:"总部", suggestedOwner:"供应链总监", market:"日本", deadline:"本月内", action:"统一供应链合规体系：排查关税风险、OFAC合规、制定多元化采购策略。", reviewCriteria:"输出供应链合规审查报告和多元化采购方案。", basis:"关税波动与合规风险升级。", status:"待人工确认" },
];

const RescueWL: WatchItem[] = [
  { id:"RW-01", market:"多市场", focus:"CTF在东南亚门店客流转化效果及对区域份额的侵蚀程度", trigger:"CTF新店商圈珠宝品类客流连续两月同比增长超10%且我方同商圈业绩下滑，则启动防御性品牌升级。", evidence:"SG/TH_competitors / eqs-news.com" },
  { id:"RW-02", market:"全市场", focus:"全球珠宝消费趋势从投资保值向悦己消费、年轻化转型的程度与速度", trigger:"当社交媒体上相关话题月均讨论量增长50%，且2家以上主要竞品推出转型产品线时，加速产品组合重构。", evidence:"CN_market_trends / vogue.com" },
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

/**
 * 每日跨市场运营决策与策略判断报告 — 结构化数据
 * 来源：data/strategy_report.md
 * 生成日期：2026-05-24
 */

// ============================
// 1. 决策摘要
// ============================
export const decisionSummary = [
  "全市场 OFAC SDN 列表更新触发总部级合规审查，需立即确认涉制裁风险。",
  "平台政策高频变化（Amazon 美/日费用调整、Coupang 韩国 SF 规则收紧、Rakuten 春季活动）要求区域团队快速制定应对方案。",
  "竞争对手加速全球化布局，Chow Tai Fook 香港旗舰店开幕并拓展东南亚，老凤祥/六福在中国市场活跃，Tiffany 保持高端产品力。",
  "2026 珠宝趋势集中于雕塑感银饰、珍珠革新、实验室培育钻石、彩色珐琅与个性化，可转化为区域内容营销和选品行动。",
];

// ============================
// 2. 市场优先级一览
// ============================
export interface MarketPriority {
  rank: number;
  market: string;
  priority: string;
  judgment: string;
  evidence: string;
}

export const marketPriorities: MarketPriority[] = [
  { rank: 1, market: "日本", priority: "P1", judgment: "综合得分最高，平台政策变动密集（Amazon 推荐费和 FBA 费用变更、乐天活动），合规信号丰富（关税、出口管制），需优先处理。", evidence: "JP_compliance / global-scm.com; JP_ecommerce / sellercentral.amazon.co.jp" },
  { rank: 2, market: "美国", priority: "P1", judgment: "高优先级市场，Amazon 费用与限制品类政策集中更新，产品趋势信号明确，竞争压力大。", evidence: "US_ecommerce / sellercentral.amazon.com; US_market_trends / fortunebusinessinsights.com" },
  { rank: 3, market: "中国", priority: "P1", judgment: "信号数量多，社交媒体与平台趋势信号丰富，合规风险（OFAC SDN），本土竞争激烈。", evidence: "CN_compliance / OFAC; CN_competitors / lukfook.com" },
  { rank: 4, market: "韩国", priority: "P2", judgment: "平台政策（Coupang）变化需适应，竞争信号（Cartier 涨价、Chow Tai Fook 扩张）需监控，社交媒体和趋势信号相对较少。", evidence: "KR_ecommerce / scm-en.ecer.com; KR_competitors / en.sedaily.com" },
  { rank: 5, market: "新加坡", priority: "P2", judgment: "区域枢纽，受 Chow Tai Fook 扩张影响直接，平台与趋势信号中等，地缘政治关注供应链。", evidence: "SG_competitors / eqs-news.com; SG_geopolitics / odi.org" },
  { rank: 6, market: "马来西亚", priority: "P2", judgment: "本地竞争（Poh Kong）与 Chow Tai Fook 扩张并存，黄金会议和贸易协定带来供应链动态，需关注。", evidence: "MY_competitors / pohkong.com.my; MY_geopolitics / whitehouse.gov" },
  { rank: 7, market: "泰国", priority: "P2", judgment: "珠宝展览与贸易活跃，Chow Tai Fook 曼谷开店带来竞争，平台信号与趋势信号中等。", evidence: "TH_competitors / businesstimes.com.sg; TH_social_media / bkkgems.com" },
  { rank: 8, market: "越南", priority: "P2", judgment: "信号数量较多但多为本地文化事件，竞争与平台信号需关注，社交媒体影响者营销潜力大。", evidence: "VN_social_media / ajmarketing.io; VN_competitors / eqs-news.com" },
];

// ============================
// 3. 跨市场关键变化 (K-01 ~ K-10)
// ============================
export interface KeyChange {
  id: string; market: string; category: string; change: string;
  businessImpact: string; industryDimension: string; evidence: string;
}
export const keyChanges: KeyChange[] = [
  { id: "K-01", market: "日本", category: "关税/出口管制", change: "美国对日关税调整，Section 122 临时关税至 2026/7/24，并收紧出口管制。", businessImpact: "供应链成本增加，需准备税率变动条款。", industryDimension: "毛利/价格", evidence: "JP_compliance / global-scm.com" },
  { id: "K-02", market: "全球", category: "合规/制裁", change: "OFAC SDN 列表更新，所有市场需审查涉制裁风险。", businessImpact: "可能影响交易对手与供应链合规，导致业务中断。", industryDimension: "合规", evidence: "CN_compliance / OFAC" },
  { id: "K-03", market: "日本", category: "平台政策", change: "Amazon 日本站提高推荐费 0.4%，调整 FBA 费用和退货政策。", businessImpact: "直接影响利润率，需重新核算定价。", industryDimension: "毛利/价格", evidence: "JP_ecommerce / sellercentral.amazon.co.jp" },
  { id: "K-04", market: "美国", category: "平台政策", change: "Amazon 美国站更新 FBA 配送费，并在珠宝类别实施更严格的合规要求。", businessImpact: "成本上升，未合规商品面临下架风险。", industryDimension: "库存/合规", evidence: "US_ecommerce / sellercentral.amazon.com" },
  { id: "K-05", market: "韩国", category: "平台政策", change: "Coupang 收紧自发货规则，即将停止新注册，价格战预期加剧。", businessImpact: "需转向更标准化运营模式，可能影响流量和转化。", industryDimension: "渠道/转化", evidence: "KR_ecommerce / scm-en.ecer.com" },
  { id: "K-06", market: "中国", category: "竞争动态", change: "老凤祥与六福珠宝在中国市场推出情人节新品和多样化系列。", businessImpact: "本土品牌在婚嫁和礼赠场景加强渗透，争夺高客单消费。", industryDimension: "消费场景/转化", evidence: "CN_competitors / lukfook.com; lfxjewelry.com" },
  { id: "K-07", market: "多市场", category: "竞争动态", change: "Chow Tai Fook 全球扩张，香港旗舰店开幕，并在曼谷、新加坡开店，发布高端珠宝系列。", businessImpact: "竞争压力增大，对品牌心智和市场份额构成威胁。", industryDimension: "品牌心智/流量", evidence: "SG_competitors / eqs-news.com; VN_competitors / wwd.com" },
  { id: "K-08", market: "马来西亚", category: "竞争动态", change: "Poh Kong 推出吉祥系列和华人新年系列，积极利用节庆营销。", businessImpact: "本地节庆需求被竞争对手抢占，需制定对应促销策略。", industryDimension: "消费场景/品牌心智", evidence: "MY_competitors / pohkong.com.my" },
  { id: "K-09", market: "美国", category: "产品趋势", change: "2026 珠宝趋势：雕塑感银饰、彩色珐琅、实验室培育钻石、珍珠革新、中性设计。", businessImpact: "提供选品和营销新方向，可能带动特定品类搜索和销售增长。", industryDimension: "品类/流量", evidence: "US_market_trends / elle.com; gabrielny.com" },
  { id: "K-10", market: "中国", category: "社交趋势", change: "社交媒体信号显示中国消费者市场走向社交化购物，抖音和小红书带动全周期购买。", businessImpact: "需加强社交内容和达人合作以获取流量。", industryDimension: "渠道/转化", evidence: "CN_social_media / daxueconsulting.com" },
];

// ============================
// 4. 机会 (O-01 ~ O-12)
// ============================
export interface Opportunity {
  id: string; market: string; opportunity: string; businessImpact: string;
  responsibility: string; priority: string; evidence: string;
}
export const opportunities: Opportunity[] = [
  { id: "O-01", market: "美国", opportunity: "2026年雕塑感银饰成为主流趋势。测试引入造型独特的银质手镯、心形项链等单品，通过A/B测试对比银饰与金饰的点击率和转化率。", businessImpact: "拉新年轻客群，提升转化率，加速低成本商品周转。", responsibility: "总部", priority: "P0", evidence: "US_market_trends / elle.com" },
  { id: "O-02", market: "美国", opportunity: "实验室培育钻石市场快速增长。测试上架培育钻产品线，突出可持续性和高性价比卖点。", businessImpact: "以更低价格带吸引价格敏感型消费者，提升自然流量和毛利空间。", responsibility: "总部", priority: "P0", evidence: "US_market_trends / news.market.us" },
  { id: "O-03", market: "美国", opportunity: "美国男性珠宝兴趣上升。创建男士珠宝专区，主推钻石耳钉、图章戒指等单品。", businessImpact: "开拓男性自购市场，提升全站客单价和复购率。", responsibility: "总部", priority: "P0", evidence: "US_market_trends / fortunebusinessinsights.com" },
  { id: "O-04", market: "中国", opportunity: "抖音和小红书已演变为全周期交易生态。测试发布'2026珠宝趋势'互动短视频，嵌入商品链接。", businessImpact: "直接提升线上渠道转化率和自然流量，社交推荐缩短决策路径。", responsibility: "区域", priority: "P0", evidence: "CN_social_media / daxueconsulting.com" },
  { id: "O-05", market: "日本", opportunity: "品牌需构建数字社区和叙事世界。测试在Instagram和LINE创建日文品牌故事内容，发起UGC话题。", businessImpact: "高共鸣叙事可支撑溢价销售并提高复购，增强品牌心智。", responsibility: "区域", priority: "P0", evidence: "JP_social_media / blog.sarine.com" },
  { id: "O-06", market: "韩国", opportunity: "肩部耳饰（Shoulder Dusters）和雕塑银饰成为焦点。联合韩流KOL推出限量肩部耳饰。", businessImpact: "限量款创造稀缺感提高客单，潮流单品带动连带购买。", responsibility: "区域", priority: "P0", evidence: "KR_social_media / symbolsofauthority.com" },
  { id: "O-07", market: "中国", opportunity: "六福珠宝情人节推出'一心一YI'系列标的年轻情侣轻奢礼赠。对标推出相似质感串饰或手链，'定制告白语'限时预售。", businessImpact: "不跟进则年轻客群被分流，情人节档期流量和转化率可能下降5-10%。", responsibility: "总部+区域", priority: "P0", evidence: "CN_competitors / lukfook.com" },
  { id: "O-08", market: "韩国", opportunity: "Cartier在韩国上调腕表售价最高11%。我们处于相近价格带，有机会吸收溢出需求。", businessImpact: "若能成功承接，预计可新增约3-5%的销量增量。", responsibility: "总部+区域", priority: "P0", evidence: "KR_competitors / en.sedaily.com" },
  { id: "O-09", market: "马来西亚", opportunity: "Cartier发布Nature Sauvage高级珠宝系列。可借鉴其高端叙事方式推出限量联名系列。", businessImpact: "提升品牌档次感知，吸引高净值客群。", responsibility: "总部+区域", priority: "P0", evidence: "MY_competitors / lofficielmalaysia.com" },
  { id: "O-10", market: "日本", opportunity: "Amazon日本站佣金上调0.4%但同时下调FBA配送费，综合成本可能下降。重新核算全链路成本后测试让利调价。", businessImpact: "短期挤压毛利但配送成本改善，优化定价可提升竞争力。", responsibility: "区域", priority: "P0", evidence: "JP_ecommerce / sellercentral.amazon.co.jp" },
  { id: "O-11", market: "美国", opportunity: "Amazon禁止贴标混合库存。切换至卖家自有标签入仓，杜绝仿品差评和退货风险。", businessImpact: "提升库存准确性，降低退货和差评，保护品牌心智。", responsibility: "区域", priority: "P0", evidence: "JP_ecommerce / bellavix.com" },
  { id: "O-12", market: "韩国", opportunity: "Coupang停止接受新自发货注册。利用最后窗口期扩充SF listing，逐步将主力SKU转入火箭配送。", businessImpact: "提前布局官方物流抢占先发优势，避免陷入纯价格竞争。", responsibility: "区域", priority: "P0", evidence: "KR_ecommerce / scm-en.ecer.com" },
];

// ============================
// 5. 风险
// ============================
export interface Risk {
  id: string; market: string; risk: string; businessImpact: string;
  responsibility: string; priority: string; evidence: string;
}
export const risks: Risk[] = [
  { id: "risk_ofac_sdn", market: "中国", risk: "OFAC SDN名单更新包含与供应链相关实体，可能导致跨境支付受阻、货物扣押。", businessImpact: "影响合规，可能引发交易冻结、资金冻结，导致供应链中断。", responsibility: "总部", priority: "P0", evidence: "CN_compliance / OFAC" },
  { id: "risk_us_fba_fee", market: "美国", risk: "Amazon FBA配送费调整后未及时更新定价，导致高重量段产品利润下降。", businessImpact: "配送费上涨直接侵蚀低客单价商品利润空间。", responsibility: "区域", priority: "P0", evidence: "US_ecommerce / sellercentral.amazon.com" },
  { id: "risk_jp_tariff", market: "日本", risk: "美国对日关税若按Section 232加征50%，清关成本将大幅上升。", businessImpact: "关税成本增加使部分产品线在日本市场失去价格竞争力。", responsibility: "总部", priority: "P0", evidence: "JP_compliance / global-scm.com" },
  { id: "risk_kr_cartier_price", market: "韩国", risk: "Cartier在韩国上调手表价格最高11%，可能带动高端珠宝定价预期上升。", businessImpact: "若竞品提价而我们维持原价，品牌定位可能下移。", responsibility: "总部+区域", priority: "P0", evidence: "KR_competitors / en.sedaily.com" },
  { id: "risk_sg_ctf", market: "新加坡", risk: "周大福在新加坡机场店推出JOIE系列并扩张东南亚，抢占年轻客群心智。", businessImpact: "竞品在关键渠道截断客源，需评估加大投入或推出针对性产品线。", responsibility: "总部+区域", priority: "P0", evidence: "SG_competitors / chowtaifook.com" },
  { id: "risk_th_ctf", market: "泰国", risk: "周大福在曼谷暹罗百丽宫开设新店，并计划在澳加扩张，可能压制区域增长。", businessImpact: "被迫加大营销投入或加速渠道下沉，导致毛利承压。", responsibility: "总部+区域", priority: "P0", evidence: "TH_competitors / businesstimes.com.sg" },
  { id: "risk_vn_ctf", market: "越南", risk: "周大福将发布高端珠宝系列起售价20万港币，向东南亚辐射。", businessImpact: "若高端线成功，挤压我们高端产品定价空间和客户忠诚度。", responsibility: "总部+区域", priority: "P0", evidence: "VN_competitors / wwd.com" },
  { id: "risk_my_pohkong", market: "马来西亚", risk: "Poh Kong推出2026农历新年系列主打916黄金和吉祥寓意。", businessImpact: "春节销售旺季被抢占，可能导致库存积压和销售不达预期。", responsibility: "总部+区域", priority: "P0", evidence: "MY_competitors / pohkong.com.my" },
  { id: "risk_jp_amazon_fee", market: "日本", risk: "Amazon日本站调整销售佣金和FBA费用，服饰珠宝类目费率上升0.4%。", businessImpact: "费率变化改变盈亏平衡点，需精细化运营避免利润损失。", responsibility: "区域", priority: "P0", evidence: "JP_ecommerce / forestshipping.com" },
  { id: "risk_us_tiffany", market: "美国", risk: "Tiffany主推HardWear系列及Knot系列，引领2026年中性风潮。", businessImpact: "错过趋势导致年轻客群流失，需考虑推出联名或快闪系列。", responsibility: "总部+区域", priority: "P0", evidence: "US_competitors / tiffany.com" },
];

// ============================
// 6. 今日建议动作 (A-01 ~ A-08)
// ============================
export interface RecommendedAction {
  id: string; responsibility: string; suggestedOwner: string; market: string;
  deadline: string; action: string; reviewCriteria: string; basis: string; status: string;
}
export const recommendedActions: RecommendedAction[] = [
  { id: "A-01", responsibility: "总部", suggestedOwner: "总部合规部", market: "全球", deadline: "24小时内", action: "启动跨市场 OFAC SDN 审查，确认所有交易对手和供应链合作伙伴不在制裁名单，发布内部合规提醒。", reviewCriteria: "完成全部市场名单核对，零风险确认后通知区域。", basis: "OFAC SDN 更新为最高优先级合规事项，延误可能导致严重法律后果。", status: "待人工确认" },
  { id: "A-02", responsibility: "区域", suggestedOwner: "日本运营经理", market: "日本", deadline: "本周内", action: "根据 Amazon 费用变化重新核算重点 SKU 利润，评估降低 FBA 成本方案，准备乐天春季活动报名。", reviewCriteria: "提交新利润测算表，完成乐天活动提报。", basis: "平台费用变动直接影响盈利能力，需快速反应以保持竞争力。", status: "待人工确认" },
  { id: "A-03", responsibility: "区域", suggestedOwner: "美国运营经理", market: "美国", deadline: "本周内", action: "准备珠宝产品合规文件（材料测试、铅含量报告），调整 FBA 发货计划以利用新费率结构。", reviewCriteria: "至少 50% 的现有珠宝 ASIN 通过预审。", basis: "合规要求迫在眉睫，否则面临下架风险。", status: "待人工确认" },
  { id: "A-04", responsibility: "区域", suggestedOwner: "韩国运营经理", market: "韩国", deadline: "本周内", action: "将现有自发货 SKU 批量转为 Coupang 火箭配送，评估是否需要调整价格。", reviewCriteria: "自发货 SKU 转换率达到 80% 以上。", basis: "Coupang 政策收紧，若不尽快转型将失去重要渠道流量。", status: "待人工确认" },
  { id: "A-05", responsibility: "总部+区域", suggestedOwner: "总部市场部、新加坡/泰国区域经理", market: "新加坡, 泰国", deadline: "两周内", action: "制定东南亚市场差异化战略，针对中端轻奢和设计师联名品类进行产品测试和营销推广。", reviewCriteria: "完成竞品分析报告，确定至少 3 个差异化产品方向并启动小规模测试。", basis: "竞争对手强势扩张，需快速建立品牌辨识度。", status: "待人工确认" },
  { id: "A-06", responsibility: "区域", suggestedOwner: "中国市场营销经理", market: "中国", deadline: "下周内", action: "基于 2026 趋势创作抖音/小红书内容矩阵，重点推广'珍珠钻石混搭'、'彩色珐琅'等主题。", reviewCriteria: "发布至少 5 条趋势内容，监测播放量与互动率基线。", basis: "中国社交商业成熟，趋势内容可快速带动流量和转化。", status: "待人工确认" },
  { id: "A-07", responsibility: "总部", suggestedOwner: "总部产品部", market: "全球", deadline: "本月内", action: "整理 2026 下半年全球产品开发简报，重点包括实验室钻石、中性设计、彩色宝石等。", reviewCriteria: "完成整合报告并分享给区域团队。", basis: "趋势信号强烈，需要统一指导以免各市场盲目开发。", status: "待人工确认" },
  { id: "A-08", responsibility: "总部+区域", suggestedOwner: "总部财务、各区域经理", market: "全球", deadline: "持续进行", action: "建立贵金属价格风险监控看板，设置阈值警报，根据金价风险调整定价策略和库存水平。", reviewCriteria: "看板上线并每周输出建议。", basis: "金价高位波动，对珠宝企业利润影响巨大，需系统化管理。", status: "待人工确认" },
];

// ============================
// 7. 后续观察清单 (W001 ~ W008)
// ============================
export interface WatchItem {
  id: string; market: string; focus: string; trigger: string; evidence: string;
}
export const watchList: WatchItem[] = [
  { id: "W001", market: "日本", focus: "Amazon费用调整对珠宝类目低毛利SKU定价与组合策略的实际影响", trigger: "连续两周毛利低于阈值且竞品出现跟涨跟降，则升级为行动项。", evidence: "JP_ecommerce / sellercentral.amazon.co.jp" },
  { id: "W002", market: "日本", focus: "Amazon混储政策更新（禁止无标混储）对FBA卖家入库贴标及库存周转的影响", trigger: "贴标错误率上升或入库延迟超1周，则升级为行动项。", evidence: "JP_ecommerce / bellavix.com" },
  { id: "W003", market: "美国", focus: "Amazon珠宝与时尚品类限制要求收紧对现有SKU合规状态的影响", trigger: "热销ASIN被标记需提交合规文件未在72小时内响应，则升级。", evidence: "US_ecommerce / sellerlabs.com" },
  { id: "W004", market: "中国", focus: "老凤祥、六福珠宝等竞品在24K黄金饰品、婚嫁系列上的促销节奏与价格带", trigger: "竞品月销排名超过我方或出现针对性价格战，则升级为行动项。", evidence: "CN_competitors / 聚合证据" },
  { id: "W005", market: "新加坡", focus: "周大福在新加坡樟宜机场及泰国Siam Paragon新店开业后的客流转化效果", trigger: "新店商圈珠宝品类客流连续两月同比增超10%且我方业绩下滑，则升级。", evidence: "SG_competitors / eqs-news.com" },
  { id: "W006", market: "美国", focus: "OFAC SDN清单例行更新可能引发的珠宝交易对象合规风险", trigger: "发现与现有供应商相似的条目或银行反馈交易拦截，则立即升级。", evidence: "US_compliance / OFAC" },
  { id: "W007", market: "日本", focus: "珠宝趋势中'つけっぱなし'需求导致的金属过敏应对及'マルチウェイ'设计销售表现", trigger: "相关搜索词增长超20%且缺乏对应产品，则升级为行动项。", evidence: "JP_compliance / giant-starlly.com" },
  { id: "W008", market: "韩国", focus: "Coupang自配送政策收紧对现有SF卖家流量分配及售价的短期影响", trigger: "SF商品流量下降超30%且SF品类均价明显下移，则升级为行动项。", evidence: "KR_ecommerce / scm-en.ecer.com" },
];

// ============================
// 8. 证据追溯 — 用于 DataSources 组件
// ============================
export interface EvidenceRecord {
  id: string; market: string; source: string; urlStatus: string;
  evidenceLevel: string; description: string; category?: string;
}
export const evidenceRecords: EvidenceRecord[] = [
  { id: "CN_compliance_ofac", market: "中国", source: "OFAC", urlStatus: "URL完整", evidenceLevel: "A", description: "SDN名单快照 / 优先级=P0 / 责任类型=总部", category: "合规/监管" },
  { id: "JP_compliance_global_scm", market: "日本", source: "global-scm.com", urlStatus: "URL完整", evidenceLevel: "A", description: "美国进口关税国别状况 - 2026年3月4日時点", category: "合规/监管" },
  { id: "JP_compliance_gtaic", market: "日本", source: "gtaic.ai", urlStatus: "URL完整", evidenceLevel: "A", description: "2026 Japan precious metal jewellery sector developments", category: "合规/监管" },
  { id: "JP_compliance_giant_starlly", market: "日本", source: "giant-starlly.com", urlStatus: "URL完整", evidenceLevel: "A", description: "2026春夏 日本アクセサリー市場 トレンド深度分析", category: "市场研究" },
  { id: "US_compliance_ofac", market: "美国", source: "OFAC", urlStatus: "URL完整", evidenceLevel: "A", description: "SDN名单快照 / 优先级=P0", category: "合规/监管" },
  { id: "US_ecommerce_sellercentral", market: "美国", source: "sellercentral.amazon.com", urlStatus: "URL完整", evidenceLevel: "A", description: "Amazon FBA费用调整 / 珠宝类目合规要求更新", category: "电商平台" },
  { id: "KR_ecommerce_scm", market: "韩国", source: "scm-en.ecer.com", urlStatus: "URL完整", evidenceLevel: "A", description: "Coupang收紧自发货规则：停止新SF注册", category: "电商平台" },
  { id: "JP_ecommerce_sellercentral", market: "日本", source: "sellercentral.amazon.co.jp", urlStatus: "URL完整", evidenceLevel: "A", description: "2026 Referral fee changes / Amazon日本站", category: "电商平台" },
  { id: "JP_ecommerce_rakuten", market: "日本", source: "global.rakuten.com", urlStatus: "URL完整", evidenceLevel: "A", description: "2026 Events & Updates / Rakuten Group, Inc.", category: "电商平台" },
  { id: "CN_ecommerce_aggregate", market: "中国", source: "data_extractor_sqlite_aggregate", urlStatus: "URL缺失", evidenceLevel: "B", description: "电商平台聚合信号，来自111条SQLite记录", category: "聚合信号" },
  { id: "JP_compliance_aggregate", market: "日本", source: "data_extractor_sqlite_aggregate", urlStatus: "URL缺失", evidenceLevel: "B", description: "合规/监管聚合信号，来自71条SQLite记录", category: "聚合信号" },
  { id: "CN_social_daxue", market: "中国", source: "daxueconsulting.com", urlStatus: "URL完整", evidenceLevel: "A", description: "社交电商全周期交易生态分析", category: "社交媒体" },
  { id: "JP_social_sarine", market: "日本", source: "blog.sarine.com", urlStatus: "URL完整", evidenceLevel: "A", description: "品牌数字社区与叙事世界构建", category: "社交媒体" },
  { id: "KR_social_symbols", market: "韩国", source: "symbolsofauthority.com", urlStatus: "URL完整", evidenceLevel: "A", description: "2026珠宝趋势：肩部耳饰与雕塑银饰", category: "社交媒体" },
  { id: "US_trends_elle", market: "美国", source: "elle.com", urlStatus: "URL完整", evidenceLevel: "A", description: "2026 Jewelry Trends - ELLE报道", category: "市场趋势" },
  { id: "US_trends_fortune", market: "美国", source: "fortunebusinessinsights.com", urlStatus: "URL完整", evidenceLevel: "A", description: "Jewelry Market Report - 市场规模与增长预测", category: "市场趋势" },
  { id: "SG_competitors_ctf", market: "新加坡", source: "eqs-news.com", urlStatus: "URL完整", evidenceLevel: "A", description: "Chow Tai Fook expansion news", category: "竞争情报" },
  { id: "TH_competitors_ctf", market: "泰国", source: "businesstimes.com.sg", urlStatus: "URL完整", evidenceLevel: "A", description: "Chow Tai Fook Bangkok store opening", category: "竞争情报" },
  { id: "MY_competitors_pohkong", market: "马来西亚", source: "pohkong.com.my", urlStatus: "URL完整", evidenceLevel: "A", description: "Poh Kong 2026 CNY series / 节庆营销", category: "竞争情报" },
  { id: "CN_competitors_lukfook", market: "中国", source: "lukfook.com", urlStatus: "URL完整", evidenceLevel: "A", description: "六福珠宝2026年情人节新品发布", category: "竞争情报" },
];

// ============================
// 9. 不确定性
// ============================
export const uncertainties = [
  {
    id: "U-01",
    type: "上下文压缩",
    description: "264 条低优先级信号未进入LLM压缩上下文，但仍保留在全量导出文件中。",
    suggestion: "涉及高风险决策时，使用 sqlite_full_export.json 和 collection_audit.json 做全量审计。",
  },
];

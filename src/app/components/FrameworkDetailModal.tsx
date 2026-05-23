import { motion, AnimatePresence } from "motion/react";
import { X, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import type { StrategyMode } from "./StrategyModeSelector";

interface FrameworkDetailModalProps {
  framework: string | null;
  mode: StrategyMode;
  onClose: () => void;
  onDataPointClick: (dataPoint: any) => void;
}

const frameworkData = {
  innovation: {
    pestle: {
      name: "PESTLE 宏观环境分析",
      description: "评估政治、经济、社会、技术、法律、环境六大维度对创新战略的影响",
      chartType: "radar",
      data: [
        { dimension: "政治 Political", value: 72, impact: "high", sources: 30, details: "OFAC SDN 8市场同步拉取（conf=1.0）；Amazon/Walmart珠宝政策收紧；日本71条合规记录" },
        { dimension: "经济 Economic", value: 68, impact: "medium", sources: 35, details: "金价 $145/g（conf=1.0）；K型消费分化（ucfs.net）；USD/CNY=6.81（conf=1.0）" },
        { dimension: "社会 Social", value: 90, impact: "high", sources: 60, details: "雕塑银饰多源确认（ELLE/Gabriel/BriteCo）；有意义的奢侈；社交电商全周期交易生态" },
        { dimension: "技术 Technology", value: 85, impact: "high", sources: 12, details: "实验室培育钻石 $335.4亿 CAGR 13.42%（precedenceresearch.com）；2克拉以下细分增长引擎" },
        { dimension: "法律 Legal", value: 78, impact: "high", sources: 30, details: "Amazon珠宝合规升级：材料文档+铅测试+贵金属验证；日本关税/进口规则变动" },
        { dimension: "环境 Environment", value: 82, impact: "high", sources: 14, details: "可持续珠宝趋势（southernjewelrynews.com）；Pandora×UNICEF ESG叙事有效；道德黄金搜索上升" },
      ]
    },
    porter: {
      name: "波特五力竞争分析",
      description: "评估行业竞争强度与企业议价能力",
      chartType: "radar",
      data: [
        { dimension: "新进入者威胁", value: 75, impact: "high", sources: 8, details: "培育钻石DTC品牌（Brilliant Earth/VRAI）通过社交媒体直触消费者；技术降低生产壁垒" },
        { dimension: "替代品威胁", value: 88, impact: "high", sources: 12, details: "实验室培育钻石 $335.4亿 CAGR 13.42%；2克拉以下培育钻性价比压制天然钻；消费者搜索已转向" },
        { dimension: "买方议价能力", value: 72, impact: "medium", sources: 30, details: "消费者搜索从泛品类词转向精准价值观词（southernjewelrynews.com）；AI趋势分析增强买方信息透明度" },
        { dimension: "供应商议价能力", value: 60, impact: "medium", sources: 33, details: "金价 $145/g 高位（conf=1.0）增加供应商议价权；贵金属价格8市场本地货币全覆盖" },
        { dimension: "行业竞争强度", value: 78, impact: "high", sources: 25, details: "CTF全球扩张（新加坡/曼谷/杭州）；Cartier涨价11%（sedaily.com）；Laopu Gold品牌化；Richemont FY2026强劲" },
      ]
    },
    "strategic-group": {
      name: "战略群组竞争地图",
      description: "基于品牌定位与增长潜力的市场分层分析",
      chartType: "scatter",
      data: [
        { name: "奢侈品群组", x: 25, y: 90, size: 800, impact: "low", sources: 6, details: "Cartier(Richemont FY2026强劲) / Tiffany / Harry Winston — 品牌壁垒稳固", group: "传统奢侈" },
        { name: "培育钻石群组", x: 88, y: 78, size: 650, impact: "high", sources: 12, details: "Brilliant Earth / VRAI / Blue Nile — $335.4亿 CAGR 13.42% 高速增长", group: "科技创新" },
        { name: "可持续/ESG群组", x: 82, y: 72, size: 450, impact: "high", sources: 8, details: "Pandora×UNICEF $1400万 / 道德黄金 — 新兴差异化赛道", group: "可持续" },
        { name: "轻奢时尚群组", x: 58, y: 55, size: 700, impact: "medium", sources: 8, details: "Pandora Disney×Pandora 2026夏 / Swarovski — 年轻客群活跃", group: "轻奢" },
        { name: "传统中端群组", x: 35, y: 40, size: 600, impact: "medium", sources: 25, details: "受K型分化双向挤压 / Amazon合规成本上升 — 需消费金融方案应对", group: "快时尚" },
        { name: "本企业", x: 62, y: 62, size: 550, impact: "high", sources: 11, details: "当前竞争位置 — 趋势感知强但需向培育钻/可持续群组迁移", group: "本企业" },
      ],
      xLabel: "增长潜力指数",
      yLabel: "品牌溢价能力"
    },
    "value-chain": {
      name: "价值链创新潜力分析",
      description: "识别价值链各环节的数据信号密度与业务影响",
      chartType: "scatter",
      data: [
        { name: "设计开发", x: 88, y: 85, size: 620, impact: "high", sources: 30, details: "30条市场趋势+30条社媒：雕塑银饰/粗链/珍珠革新/彩色珐琅/混合金属/培育钻 多源确认" },
        { name: "营销与客户体验", x: 85, y: 80, size: 600, impact: "high", sources: 30, details: "社交媒体信号：从产品目录转向价值观叙事；色彩宝石社媒传播效率高；社交电商全周期交易" },
        { name: "采购管理", x: 65, y: 72, size: 520, impact: "medium", sources: 33, details: "金价$145/g（conf=1.0）8市场本地货币覆盖；金价高位需系统化监控与阈值警报" },
        { name: "合规与物流", x: 72, y: 78, size: 550, impact: "high", sources: 20, details: "Amazon合规：材料文档+铅测试+贵金属验证；FBA Prep终止；日本71条合规记录" },
        { name: "分销渠道", x: 70, y: 68, size: 500, impact: "medium", sources: 25, details: "US Amazon/Walmart；CN JD.com(Qeelin入驻)；KR Coupang政策收紧；东南亚电商数据丰富" },
        { name: "数据分析", x: 78, y: 75, size: 480, impact: "medium", sources: 15, details: "collected.db 4,674条记录；Primary API 423条（conf=1.0）+ Tavily 4,251条（conf=0.7）" },
        { name: "售后服务", x: 55, y: 52, size: 380, impact: "low", sources: 5, details: "客户忠诚度与复购数据尚未系统采集" },
      ],
      xLabel: "数据信号密度",
      yLabel: "业务影响程度"
    },
    swot: {
      name: "SWOT 四象限矩阵",
      description: "综合评估内部优劣势与外部机会威胁",
      chartType: "quadrant",
      data: {
        strengths: [
          { label: "趋势感知能力", score: 88, sources: 60, details: "30条市场趋势+30条社媒：跨源交叉验证（ELLE/Gabriel/BriteCo）降低伪趋势风险" },
          { label: "数据驱动决策", score: 85, sources: 423, details: "Primary API 423条（conf=1.0）：价格/FX/OFAC/Richemont/Pandora 全量覆盖" },
          { label: "多市场覆盖", score: 75, sources: 8, details: "8个市场全维度采集：US 818条 / CN 1,288条 / JP 1,166条 / KR 903条" },
        ],
        weaknesses: [
          { label: "竞品数据噪音", score: 65, sources: 25, details: "competitors 2,936条中60%+为噪音；仅25条Primary为有效信号" },
          { label: "Tavily数据置信度", score: 60, sources: 1196, details: "social_media 1,196条全部为Tavily（conf=0.7），未经Primary API验证" },
        ],
        opportunities: [
          { label: "雕塑感银饰", score: 90, sources: 30, details: "ELLE/Gabriel/BriteCo/Brilliant Earth 多源确认2026主流趋势" },
          { label: "实验室培育钻石", score: 92, sources: 12, details: "$335.4亿 CAGR 13.42%；2克拉以下细分最强增长引擎" },
          { label: "社交电商转型", score: 85, sources: 20, details: "抖音/小红书全周期交易生态；AI个性化选品" },
          { label: "男士珠宝市场", score: 80, sources: 10, details: "Fortune Business Insights确认男性珠宝兴趣上升" },
        ],
        threats: [
          { label: "培育钻石替代", score: 88, sources: 12, details: "培育钻 $335.4亿侵蚀天然钻价格体系；消费者搜索行为已转向" },
          { label: "CTF全球扩张", score: 85, sources: 15, details: "新加坡/曼谷/杭州三线扩张；高端系列起售价20万港币" },
          { label: "合规成本上升", score: 82, sources: 30, details: "Amazon珠宝合规升级+OFAC审查+日本71条合规记录；FBA Prep服务终止" },
        ],
      }
    },
  },
  stable: {
    pestle: {
      name: "PESTLE 宏观环境分析",
      description: "评估宏观环境稳定性与可预测性",
      chartType: "radar",
      data: [
        { dimension: "政治 Political", value: 75, impact: "medium", sources: 30, details: "OFAC SDN 8市场同步拉取（conf=1.0）例行更新；Amazon/Walmart政策收紧但可预测" },
        { dimension: "经济 Economic", value: 72, impact: "medium", sources: 35, details: "金价 $145/g 高位但稳定（conf=1.0）；K型分化持续（ucfs.net）；8市场汇率全覆盖（conf=1.0）" },
        { dimension: "社会 Social", value: 78, impact: "medium", sources: 60, details: "雕塑银饰/粗链/珍珠革新趋势稳定；消费者从YOLO转向YONO投资型购买" },
        { dimension: "技术 Technology", value: 70, impact: "medium", sources: 12, details: "培育钻石技术成熟但增长可预测（CAGR 13.42%）；AI辅助设计逐步渗透" },
        { dimension: "法律 Legal", value: 80, impact: "medium", sources: 30, details: "Amazon合规要求明确（材料文档+铅测试）；日本合规71条可追踪；Walmart政策更新可跟进" },
        { dimension: "环境 Environment", value: 74, impact: "medium", sources: 14, details: "ESG叙事持续有效；可持续珠宝消费稳定增长；Pandora×UNICEF模式可复制" },
      ]
    },
    porter: {
      name: "波特五力竞争分析",
      description: "评估竞争格局稳定性",
      chartType: "radar",
      data: [
        { dimension: "新进入者威胁", value: 55, impact: "medium", sources: 8, details: "培育钻石DTC品牌进入可监测；Amazon合规壁垒提高进入门槛" },
        { dimension: "替代品威胁", value: 65, impact: "medium", sources: 12, details: "培育钻石蚕食可控（$335.4亿CAGR 13.42%）；天然钻高端定位仍有需求" },
        { dimension: "买方议价能力", value: 62, impact: "medium", sources: 30, details: "社交媒体增强买方信息透明度；但品牌叙事仍可维持溢价" },
        { dimension: "供应商议价能力", value: 58, impact: "medium", sources: 33, details: "金价 $145/g 增加供应商议价权但8市场价格监控系统化可对冲" },
        { dimension: "行业竞争强度", value: 68, impact: "medium", sources: 25, details: "CTF扩张可追踪；Cartier涨价可承接；Laopu Gold品牌化在中国市场形成压力" },
      ]
    },
    "strategic-group": {
      name: "战略群组竞争地图",
      description: "市场定位稳定性分析",
      chartType: "scatter",
      data: [
        { name: "奢侈品群组", x: 28, y: 92, size: 850, impact: "low", sources: 6, details: "Cartier(Richemont FY2026强劲)/Tiffany — 地位稳固，受培育钻石冲击最小", group: "传统奢侈" },
        { name: "培育钻石群组", x: 85, y: 72, size: 600, impact: "high", sources: 12, details: "Brilliant Earth/VRAI — $335.4亿高速增长", group: "科技创新" },
        { name: "可持续/ESG群组", x: 78, y: 68, size: 420, impact: "high", sources: 8, details: "Pandora×UNICEF — 新兴差异化赛道", group: "可持续" },
        { name: "本企业", x: 55, y: 58, size: 750, impact: "medium", sources: 10, details: "当前定位 — 趋势感知强但需关注培育钻和可持续群组的相邻机会", group: "本企业" },
        { name: "传统中端群组", x: 32, y: 42, size: 650, impact: "medium", sources: 25, details: "K型分化双向挤压 — 消费金融为主要应对但不足以扭转结构性压力", group: "快时尚" },
      ],
      xLabel: "增长潜力指数",
      yLabel: "品牌溢价能力"
    },
    "value-chain": {
      name: "价值链效率优化分析",
      description: "各环节运营效率与优化空间",
      chartType: "scatter",
      data: [
        { name: "设计开发", x: 82, y: 78, size: 600, impact: "medium", sources: 30, details: "30条趋势信号提供明确选品方向；多源交叉验证降低伪趋势风险" },
        { name: "采购管理", x: 72, y: 75, size: 580, impact: "medium", sources: 33, details: "金价 $145/g 8市场覆盖（conf=1.0）；建议建立阈值警报看板" },
        { name: "合规与物流", x: 75, y: 80, size: 550, impact: "medium", sources: 20, details: "Amazon合规+OFAC审查 — 当前最大瓶颈但也是竞争壁垒" },
        { name: "营销与客户体验", x: 78, y: 72, size: 520, impact: "medium", sources: 30, details: "社交叙事转型进行中；色彩宝石社媒传播效率高" },
        { name: "分销渠道", x: 68, y: 65, size: 500, impact: "medium", sources: 25, details: "US Amazon/Walmart；CN JD.com；KR Coupang转型；东南亚电商数据丰富" },
        { name: "数据分析", x: 70, y: 68, size: 480, impact: "medium", sources: 15, details: "4,674条记录覆盖8市场×8维度；竞品噪音率需优化" },
      ],
      xLabel: "当前效率",
      yLabel: "优化潜力"
    },
    swot: {
      name: "SWOT 四象限矩阵",
      description: "稳健运营态势评估",
      chartType: "quadrant",
      data: {
        strengths: [
          { label: "趋势感知能力", score: 88, sources: 60, details: "30条市场趋势+30条社媒跨源交叉验证；贵金属价格Primary API（conf=1.0）" },
          { label: "多市场覆盖", score: 78, sources: 8, details: "8个市场全维度采集；FX Rates全市场×9货币对（conf=1.0）" },
          { label: "合规数据完整", score: 82, sources: 8, details: "OFAC SDN 8市场Primary同步（28.6MB XML）；Amazon/Walmart政策实时追踪" },
        ],
        weaknesses: [
          { label: "竞品数据噪音率", score: 62, sources: 25, details: "2,936条competitors中60%+噪音；仅25条Primary为有效竞争信号" },
          { label: "Tavily置信度不均", score: 58, sources: 1196, details: "social_media全部Tavily（conf=0.7）；东南亚Tavily覆盖不足" },
        ],
        opportunities: [
          { label: "培育钻石布局", score: 85, sources: 12, details: "$335.4亿市场以CAGR 13.42%增长；2克拉以下为最强引擎" },
          { label: "社交电商转型", score: 80, sources: 20, details: "抖音/小红书全周期交易；AI个性化选品" },
          { label: "合规壁垒窗口", score: 75, sources: 20, details: "Amazon合规收紧淘汰不合规竞品；提前合规认证抢占份额" },
        ],
        threats: [
          { label: "CTF全球扩张", score: 78, sources: 15, details: "新加坡/曼谷/杭州三线；高端系列20万港币起" },
          { label: "培育钻石蚕食", score: 82, sources: 12, details: "$335.4亿侵蚀天然钻价格体系；消费者搜索行为已转向" },
          { label: "K型消费分化", score: 72, sources: 25, details: "中低收入群体受通胀压制（ucfs.net）；中端产品线需求萎缩风险" },
        ],
      }
    },
  },
  rescue: {
    pestle: {
      name: "PESTLE 宏观环境分析",
      description: "识别外部风险与应对重点",
      chartType: "radar",
      data: [
        { dimension: "政治 Political", value: 42, impact: "high", sources: 30, details: "OFAC SDN 全市场审查（24h内必须完成）；Amazon珠宝合规未完成即下架；日本71条合规密集" },
        { dimension: "经济 Economic", value: 45, impact: "high", sources: 35, details: "金价 $145/g 高位挤压利润（conf=1.0）；K型分化中端需求萎缩（ucfs.net）" },
        { dimension: "社会 Social", value: 55, impact: "medium", sources: 60, details: "消费者从YOLO转向YONO；投资型消费需产品线转型" },
        { dimension: "技术 Technology", value: 52, impact: "medium", sources: 12, details: "培育钻石技术成熟加速替代（CAGR 13.42%）；传统天然钻面临库存贬值" },
        { dimension: "法律 Legal", value: 38, impact: "high", sources: 30, details: "Amazon材料文档+铅测试+贵金属验证；FBA Prep终止；Coupang政策收紧" },
        { dimension: "环境 Environment", value: 48, impact: "medium", sources: 14, details: "ESG叙事差距扩大；Pandora×UNICEF $1400万证明可持续营销有效性但投入门槛高" },
      ]
    },
    porter: {
      name: "波特五力竞争分析",
      description: "多重竞争压力评估",
      chartType: "radar",
      data: [
        { dimension: "新进入者威胁", value: 75, impact: "high", sources: 8, details: "培育钻石DTC品牌通过社交+可持续叙事快速获取年轻消费者" },
        { dimension: "替代品威胁", value: 88, impact: "high", sources: 12, details: "培育钻 $335.4亿 CAGR 13.42%；2克拉以下培育钻性价比全面压制天然钻" },
        { dimension: "买方议价能力", value: 80, impact: "high", sources: 30, details: "社交媒体赋能的超级消费者；价格透明度提高；品牌溢价需更扎实的叙事支撑" },
        { dimension: "供应商议价能力", value: 72, impact: "high", sources: 33, details: "金价 $145/g 8市场高位（conf=1.0）；贵金属成本占比高且波动大" },
        { dimension: "行业竞争强度", value: 85, impact: "high", sources: 25, details: "CTF全球扩张 + Cartier涨价11% + Laopu Gold品牌化 + 培育钻替代 — 四重压力叠加" },
      ]
    },
    "strategic-group": {
      name: "战略群组竞争地图",
      description: "竞争地位与转型方向分析",
      chartType: "scatter",
      data: [
        { name: "奢侈品群组", x: 22, y: 90, size: 700, impact: "high", sources: 6, details: "Cartier/Tiffany — 高端稳固，中端无法直接竞争", group: "传统奢侈" },
        { name: "培育钻石群组", x: 88, y: 75, size: 620, impact: "high", sources: 12, details: "Brilliant Earth/VRAI — 快速增长，蚕食传统中端市场", group: "科技创新" },
        { name: "本企业", x: 38, y: 45, size: 600, impact: "high", sources: 11, details: "当前困境位置 — 传统中端群组受K型分化双向挤压，需紧急评估转型路径", group: "本企业" },
        { name: "传统中端群组", x: 30, y: 40, size: 550, impact: "high", sources: 25, details: "K型分化最重灾区 — Amazon合规成本上升+培育钻蚕食+消费金融效果有限", group: "风险区" },
        { name: "可持续群组", x: 75, y: 65, size: 450, impact: "medium", sources: 8, details: "Pandora ESG模式 — 潜在转型方向但投入门槛高", group: "转型目标" },
      ],
      xLabel: "竞争力指数",
      yLabel: "盈利能力"
    },
    "value-chain": {
      name: "价值链问题诊断",
      description: "识别效率瓶颈与优化优先级",
      chartType: "scatter",
      data: [
        { name: "合规端瓶颈", x: 28, y: 92, size: 720, impact: "high", sources: 20, details: "Amazon材料文档+铅测试+贵金属验证三项必补；FBA Prep终止增加预处理成本" },
        { name: "金价成本挤压", x: 35, y: 88, size: 680, impact: "high", sources: 33, details: "金价$145/g高位（conf=1.0）；低客单价SKU利润受FBA费率+金价双重挤压" },
        { name: "竞品情报噪音", x: 42, y: 82, size: 620, impact: "high", sources: 25, details: "competitors 60%+噪音率；仅25条Primary有效信号 → 竞争决策信息基础薄弱" },
        { name: "东南亚覆盖不足", x: 48, y: 75, size: 580, impact: "medium", sources: 8, details: "SG/MY/TH/VN Tavily数据量明显少于东亚三国；本地化采集需紧急补齐" },
        { name: "社交营销滞后", x: 52, y: 70, size: 550, impact: "medium", sources: 30, details: "social_media 全部Tavily（conf=0.7）；社交电商转型速度落后于中国市场" },
      ],
      xLabel: "改善难度（低→高）",
      yLabel: "优先级"
    },
    swot: {
      name: "SWOT 四象限矩阵",
      description: "危机态势与扭转路径",
      chartType: "quadrant",
      data: {
        strengths: [
          { label: "趋势感知能力", score: 72, sources: 60, details: "30条趋势+30条社媒仍可提供方向；贵金属价格Primary API（conf=1.0）准确可靠" },
          { label: "合规数据基础", score: 68, sources: 8, details: "OFAC SDN 8市场拉取已完成（conf=1.0）；Amazon/Walmart政策已追踪" },
        ],
        weaknesses: [
          { label: "竞品情报噪音", score: 72, sources: 25, details: "2,936条competitors中60%+噪音；决策信息基础薄弱" },
          { label: "Tavily数据可信度", score: 75, sources: 1196, details: "social_media 全部Tavily（conf=0.7）；P0决策需人工验证URL" },
          { label: "东南亚覆盖不足", score: 68, sources: 8, details: "SG/MY/TH/VN数据量显著不足；本地化采集配置缺失" },
        ],
        opportunities: [
          { label: "合规壁垒窗口", score: 72, sources: 20, details: "Amazon合规收紧淘汰不合规竞品 → 短期加重投入，中期获得竞争壁垒" },
          { label: "Cartier涨价承接", score: 68, sources: 5, details: "Cartier韩国涨价11% → 同价位替代品牌可承接溢出需求" },
        ],
        threats: [
          { label: "OFAC审查紧迫", score: 92, sources: 8, details: "28.6MB XML全市场拉取（conf=1.0）→ 24h内必须人工审查完成" },
          { label: "Amazon合规下架", score: 88, sources: 10, details: "未合规珠宝ASIN面临下架（redstagfulfillment.com）→ 直接影响营收" },
          { label: "培育钻石蚕食", score: 85, sources: 12, details: "$335.4亿 CAGR 13.42% → 天然钻产品线库存贬值风险" },
          { label: "CTF全球扩张", score: 80, sources: 15, details: "新加坡/曼谷/杭州三线 → 东南亚市场份额被侵蚀" },
        ],
      }
    },
  },
};

export function FrameworkDetailModal({ framework, mode, onClose, onDataPointClick }: FrameworkDetailModalProps) {
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  if (!framework) return null;

  const data = frameworkData[mode]?.[framework as keyof typeof frameworkData[typeof mode]];
  if (!data) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chartContainerRef.current && tooltipData) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleShowTooltip = (item: any) => {
    if (hideTimeoutRef.current) { clearTimeout(hideTimeoutRef.current); hideTimeoutRef.current = null; }
    setTooltipData(item);
  };

  const handleHideTooltip = () => {
    hideTimeoutRef.current = setTimeout(() => { if (!isTooltipHovered) setTooltipData(null); }, 150);
  };

  useEffect(() => { return () => { if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current); }; }, []);

  const renderChart = () => {
    if (data.chartType === "radar") {
      return (
        <div ref={chartContainerRef} className="relative" onMouseMove={handleMouseMove} onMouseLeave={handleHideTooltip}>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={data.data}
              onMouseMove={(e: any) => { if (e?.activePayload?.[0]) handleShowTooltip(e.activePayload[0].payload); }}
              onClick={(e: any) => { if (e?.activePayload?.[0]) onDataPointClick(e.activePayload[0].payload); }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 13 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar name="影响指数" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
          <AnimatePresence>
            {tooltipData && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-50 pointer-events-none"
                style={{ left: `${tooltipPosition.x + 20}px`, top: `${tooltipPosition.y - 70}px`, maxWidth: '320px' }}>
                <div className="font-medium text-foreground mb-2">{tooltipData.dimension}</div>
                <div className="text-sm text-muted-foreground mb-2">{tooltipData.details}</div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <span className="text-muted-foreground">影响: {tooltipData.value}/100</span>
                  <span className="text-muted-foreground">{tooltipData.sources} 条数据源</span>
                </div>
                <div className="mt-2 text-xs text-primary text-center">💡 点击图表查看数据源</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    if (data.chartType === "scatter") {
      const scatterData = data as any;
      return (
        <div ref={chartContainerRef} className="relative" onMouseMove={handleMouseMove} onMouseLeave={handleHideTooltip}>
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
              onMouseMove={(e: any) => { if (e?.activePayload?.[0]) handleShowTooltip(e.activePayload[0].payload); }}
              onClick={(e: any) => { if (e?.activePayload?.[0]) onDataPointClick(e.activePayload[0].payload); }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" dataKey="x" name={scatterData.xLabel} domain={[0, 100]}
                label={{ value: scatterData.xLabel, position: 'bottom', offset: 40, style: { fill: '#6b7280' } }} tick={{ fill: '#9ca3af' }} />
              <YAxis type="number" dataKey="y" name={scatterData.yLabel} domain={[0, 100]}
                label={{ value: scatterData.yLabel, angle: -90, position: 'left', offset: 40, style: { fill: '#6b7280' } }} tick={{ fill: '#9ca3af' }} />
              <Scatter data={scatterData.data}>
                {scatterData.data.map((entry: any, index: number) => {
                  const colors: Record<string,string> = { '本企业':'#6366f1','传统奢侈':'#8b5cf6','科技创新':'#06b6d4','可持续':'#10b981','轻奢':'#f59e0b','快时尚':'#ef4444','风险区':'#ef4444','转型目标':'#f59e0b' };
                  return <Cell key={`cell-${index}`} fill={colors[entry.group] || '#6b7280'} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <AnimatePresence>
            {tooltipData && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-50 pointer-events-none"
                style={{ left: `${tooltipPosition.x + 20}px`, top: `${tooltipPosition.y - 90}px`, maxWidth: '320px' }}>
                <div className="font-medium text-foreground mb-2">{tooltipData.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{tooltipData.details}</div>
                <div className="text-xs text-muted-foreground mb-2">{scatterData.xLabel}: {tooltipData.x} | {scatterData.yLabel}: {tooltipData.y}</div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <span className="text-muted-foreground">{tooltipData.sources} 条数据源</span>
                </div>
                <div className="mt-2 text-xs text-primary text-center">💡 点击数据点查看详情</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    if (data.chartType === "quadrant") {
      const quadrantData = data as any;
      const quadrants = [
        { title: "优势 Strengths", color: "emerald", items: quadrantData.data.strengths },
        { title: "劣势 Weaknesses", color: "rose", items: quadrantData.data.weaknesses },
        { title: "机会 Opportunities", color: "blue", items: quadrantData.data.opportunities },
        { title: "威胁 Threats", color: "amber", items: quadrantData.data.threats },
      ];
      return (
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          {quadrants.map((q) => (
            <div key={q.title} className={`border-2 border-${q.color}-500/30 rounded-xl p-6 bg-${q.color}-500/5`}>
              <h4 className={`text-${q.color}-700 mb-4 flex items-center gap-2`}>
                <div className={`size-3 rounded-full bg-${q.color}-500`}></div>{q.title}
              </h4>
              <div className="space-y-3">
                {q.items.map((item: any, index: number) => (
                  <motion.button key={index} onClick={() => onDataPointClick(item)}
                    className={`w-full p-3 rounded-lg bg-card border border-border hover:border-${q.color}-500/50 hover:shadow-md transition-all text-left group`}
                    whileHover={{ scale: 1.02 }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-foreground group-hover:text-${q.color}-700`}>{item.label}</span>
                      <span className={`text-sm text-${q.color}-600`}>{item.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{item.details}</p>
                    <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">{item.sources} 条数据源 →</p>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="border-b border-border p-6 flex items-start justify-between">
            <div><h2 className="text-foreground mb-2">{data.name}</h2>
              <p className="text-sm text-muted-foreground">{data.description}</p></div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors"><X className="size-5 text-muted-foreground" /></button>
          </div>
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <Info className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground/80">数据来源：collected.db（2026-05-22/23，4,674条记录，Primary API 423条 + Tavily 4,251条）。点击图表中的数据点或卡片可查看详细数据源信息。</p>
            </div>
            {renderChart()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

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
        { dimension: "政治 Political", value: 85, impact: "high", sources: 12, details: "可持续珠宝认证政策利好" },
        { dimension: "经济 Economic", value: 72, impact: "medium", sources: 10, details: "消费升级趋势明显" },
        { dimension: "社会 Social", value: 88, impact: "high", sources: 15, details: "Z世代消费崛起" },
        { dimension: "技术 Technology", value: 92, impact: "high", sources: 18, details: "区块链与AI技术成熟" },
        { dimension: "法律 Legal", value: 68, impact: "medium", sources: 8, details: "知识产权保护加强" },
        { dimension: "环境 Environment", value: 90, impact: "high", sources: 14, details: "碳中和要求推动创新" },
      ]
    },
    porter: {
      name: "波特五力竞争分析",
      description: "评估行业竞争强度与企业议价能力",
      chartType: "radar",
      data: [
        { dimension: "新进入者威胁", value: 78, impact: "high", sources: 10, details: "DTC品牌与科技公司入局" },
        { dimension: "替代品威胁", value: 85, impact: "high", sources: 14, details: "实验室钻石快速增长" },
        { dimension: "买方议价能力", value: 72, impact: "medium", sources: 11, details: "信息透明度提高" },
        { dimension: "供应商议价能力", value: 55, impact: "medium", sources: 7, details: "供应商分化明显" },
        { dimension: "行业竞争强度", value: 68, impact: "medium", sources: 9, details: "创新成为差异化关键" },
      ]
    },
    "strategic-group": {
      name: "战略群组竞争地图",
      description: "基于创新能力与价格定位的市场分层分析",
      chartType: "scatter",
      data: [
        { name: "奢侈传统", x: 30, y: 95, size: 800, impact: "low", sources: 6, details: "Cartier, Tiffany等传统奢侈品牌", group: "传统奢侈" },
        { name: "创新科技", x: 92, y: 75, size: 600, impact: "high", sources: 13, details: "科技驱动的新兴品牌", group: "科技创新" },
        { name: "可持续", x: 85, y: 80, size: 450, impact: "high", sources: 9, details: "环保理念驱动品牌", group: "可持续" },
        { name: "轻奢时尚", x: 55, y: 60, size: 700, impact: "medium", sources: 8, details: "Pandora等轻奢品牌", group: "轻奢" },
        { name: "快时尚", x: 25, y: 35, size: 500, impact: "medium", sources: 5, details: "快速更新的平价品牌", group: "快时尚" },
        { name: "本企业", x: 70, y: 72, size: 550, impact: "high", sources: 11, details: "当前竞争位置", group: "本企业" },
      ],
      xLabel: "创新能力指数",
      yLabel: "价格定位指数"
    },
    "value-chain": {
      name: "价值链创新潜力分析",
      description: "识别价值链各环节的创新机会与投资回报",
      chartType: "scatter",
      data: [
        { name: "AI辅助设计", x: 88, y: 85, size: 600, impact: "high", sources: 11, details: "生成式AI缩短设计周期60%" },
        { name: "虚拟试戴", x: 82, y: 80, size: 550, impact: "high", sources: 9, details: "AR技术提升转化率35%" },
        { name: "区块链溯源", x: 75, y: 72, size: 500, impact: "high", sources: 12, details: "提升消费者信任度42%" },
        { name: "智能制造", x: 68, y: 65, size: 450, impact: "medium", sources: 7, details: "3D打印提高生产灵活性" },
        { name: "数据驱动营销", x: 72, y: 70, size: 520, impact: "medium", sources: 10, details: "精准推荐提升客户价值" },
        { name: "智能供应链", x: 60, y: 58, size: 400, impact: "medium", sources: 6, details: "优化库存管理" },
        { name: "自动化物流", x: 55, y: 52, size: 380, impact: "low", sources: 5, details: "降低配送成本" },
      ],
      xLabel: "创新潜力",
      yLabel: "投资回报率"
    },
    swot: {
      name: "SWOT 四象限矩阵",
      description: "综合评估内部优劣势与外部机会威胁",
      chartType: "quadrant",
      data: {
        strengths: [
          { label: "品牌积淀", score: 85, sources: 8, details: "成熟供应链与品牌认知度" },
          { label: "资本实力", score: 78, sources: 6, details: "充足资金支持创新投入" },
          { label: "渠道网络", score: 72, sources: 7, details: "全渠道布局完善" },
        ],
        weaknesses: [
          { label: "组织敏捷性", score: 62, sources: 6, details: "决策流程可能延缓响应" },
          { label: "技术基因", score: 55, sources: 5, details: "数字化能力需加强" },
        ],
        opportunities: [
          { label: "技术赋能", score: 92, sources: 15, details: "新技术重构竞争优势" },
          { label: "可持续趋势", score: 88, sources: 12, details: "绿色消费成主流" },
          { label: "Z世代市场", score: 85, sources: 13, details: "年轻消费群体扩大" },
          { label: "个性化定制", score: 80, sources: 10, details: "定制需求快速增长" },
        ],
        threats: [
          { label: "颠覆性竞争", score: 82, sources: 12, details: "跨界竞争者重新定义规则" },
          { label: "替代品冲击", score: 78, sources: 14, details: "培育钻石侵蚀市场" },
          { label: "消费分化", score: 70, sources: 9, details: "市场需求多样化" },
        ],
      }
    },
  },
  // 为了简化，stable 和 rescue 模式使用相似结构但不同数据
  stable: {
    pestle: {
      name: "PESTLE 宏观环境分析",
      description: "评估宏观环境稳定性与可预测性",
      chartType: "radar",
      data: [
        { dimension: "政治 Political", value: 75, impact: "medium", sources: 10, details: "政策环境平稳可预测" },
        { dimension: "经济 Economic", value: 78, impact: "medium", sources: 12, details: "经济温和增长" },
        { dimension: "社会 Social", value: 72, impact: "medium", sources: 11, details: "消费者信心稳定" },
        { dimension: "技术 Technology", value: 68, impact: "medium", sources: 9, details: "技术迭代平稳" },
        { dimension: "法律 Legal", value: 80, impact: "low", sources: 8, details: "合规要求明确" },
        { dimension: "环境 Environment", value: 70, impact: "medium", sources: 9, details: "环保成本可控" },
      ]
    },
    porter: {
      name: "波特五力竞争分析",
      description: "评估竞争格局稳定性",
      chartType: "radar",
      data: [
        { dimension: "新进入者威胁", value: 45, impact: "low", sources: 8, details: "进入壁垒稳固" },
        { dimension: "替代品威胁", value: 52, impact: "medium", sources: 9, details: "替代压力可控" },
        { dimension: "买方议价能力", value: 58, impact: "medium", sources: 8, details: "客户忠诚度高" },
        { dimension: "供应商议价能力", value: 48, impact: "low", sources: 6, details: "长期合作关系稳固" },
        { dimension: "行业竞争强度", value: 62, impact: "medium", sources: 11, details: "竞争有序可预测" },
      ]
    },
    "strategic-group": {
      name: "战略群组竞争地图",
      description: "市场定位稳定性分析",
      chartType: "scatter",
      data: [
        { name: "奢侈传统", x: 30, y: 95, size: 850, impact: "low", sources: 7, details: "地位稳固", group: "传统奢侈" },
        { name: "本企业", x: 55, y: 72, size: 780, impact: "medium", sources: 10, details: "市场份额稳定", group: "本企业" },
        { name: "轻奢主流", x: 50, y: 65, size: 720, impact: "medium", sources: 9, details: "增长平稳", group: "轻奢" },
        { name: "快时尚", x: 28, y: 38, size: 520, impact: "low", sources: 6, details: "竞争激烈", group: "快时尚" },
      ],
      xLabel: "市场创新度",
      yLabel: "价格定位"
    },
    "value-chain": {
      name: "价值链效率优化分析",
      description: "各环节运营效率与优化空间",
      chartType: "scatter",
      data: [
        { name: "集中采购", x: 85, y: 82, size: 600, impact: "medium", sources: 9, details: "成本下降2%" },
        { name: "生产效率", x: 82, y: 78, size: 580, impact: "medium", sources: 7, details: "产能利用率85%" },
        { name: "物流优化", x: 78, y: 75, size: 550, impact: "medium", sources: 8, details: "周转率提升" },
        { name: "质量控制", x: 88, y: 85, size: 520, impact: "low", sources: 6, details: "良品率稳定" },
        { name: "售后服务", x: 75, y: 72, size: 500, impact: "low", sources: 6, details: "满意度提升" },
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
          { label: "规模效应", score: 88, sources: 10, details: "成本结构优于行业" },
          { label: "品牌资产", score: 85, sources: 9, details: "高品牌认知度" },
          { label: "渠道掌控", score: 82, sources: 8, details: "全渠道布局稳固" },
        ],
        weaknesses: [
          { label: "创新速度", score: 58, sources: 6, details: "创新响应相对保守" },
          { label: "组织弹性", score: 52, sources: 5, details: "组织架构偏传统" },
        ],
        opportunities: [
          { label: "渠道下沉", score: 75, sources: 8, details: "低线市场增长空间" },
          { label: "会员深化", score: 72, sources: 7, details: "提升客户终身价值" },
          { label: "效率提升", score: 70, sources: 9, details: "运营优化持续" },
        ],
        threats: [
          { label: "新兴竞争", score: 62, sources: 8, details: "创新品牌分流" },
          { label: "市场波动", score: 55, sources: 7, details: "经济周期影响" },
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
        { dimension: "政治 Political", value: 48, impact: "high", sources: 11, details: "监管风险需应对" },
        { dimension: "经济 Economic", value: 42, impact: "high", sources: 13, details: "经济下行压力大" },
        { dimension: "社会 Social", value: 55, impact: "medium", sources: 10, details: "消费支出谨慎" },
        { dimension: "技术 Technology", value: 52, impact: "medium", sources: 8, details: "数字化转型滞后" },
        { dimension: "法律 Legal", value: 58, impact: "medium", sources: 9, details: "合规成本上升" },
        { dimension: "环境 Environment", value: 45, impact: "high", sources: 10, details: "供应链脆弱" },
      ]
    },
    porter: {
      name: "波特五力竞争分析",
      description: "多重竞争压力评估",
      chartType: "radar",
      data: [
        { dimension: "新进入者威胁", value: 72, impact: "high", sources: 11, details: "市场进入壁垒降低" },
        { dimension: "替代品威胁", value: 78, impact: "high", sources: 10, details: "低价替代品冲击" },
        { dimension: "买方议价能力", value: 82, impact: "high", sources: 12, details: "客户流失加速" },
        { dimension: "供应商议价能力", value: 75, impact: "high", sources: 9, details: "议价能力减弱" },
        { dimension: "行业竞争强度", value: 88, impact: "high", sources: 14, details: "价格战侵蚀利润" },
      ]
    },
    "strategic-group": {
      name: "战略群组竞争地图",
      description: "竞争地位与转型方向分析",
      chartType: "scatter",
      data: [
        { name: "领先群组", x: 75, y: 85, size: 700, impact: "high", sources: 10, details: "目标定位", group: "目标" },
        { name: "本企业", x: 42, y: 48, size: 600, impact: "high", sources: 11, details: "当前困境位置", group: "本企业" },
        { name: "衰退群组", x: 25, y: 30, size: 450, impact: "high", sources: 9, details: "需避免滑入", group: "风险区" },
        { name: "稳健群组", x: 58, y: 68, size: 650, impact: "medium", sources: 8, details: "潜在转型方向", group: "转型目标" },
      ],
      xLabel: "竞争力指数",
      yLabel: "盈利能力"
    },
    "value-chain": {
      name: "价值链问题诊断",
      description: "识别效率瓶颈与优化优先级",
      chartType: "scatter",
      data: [
        { name: "成本失控", x: 35, y: 92, size: 700, impact: "high", sources: 12, details: "运营成本高企" },
        { name: "库存积压", x: 28, y: 88, size: 680, impact: "high", sources: 10, details: "周转率下降" },
        { name: "渠道低效", x: 42, y: 85, size: 620, impact: "high", sources: 8, details: "部分渠道ROI为负" },
        { name: "组织冗余", x: 48, y: 75, size: 580, impact: "medium", sources: 7, details: "人效低下" },
        { name: "营销低效", x: 52, y: 70, size: 550, impact: "medium", sources: 6, details: "获客成本高" },
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
          { label: "品牌遗产", score: 65, sources: 8, details: "仍有品牌认知基础" },
          { label: "核心团队", score: 58, sources: 6, details: "关键人才保留" },
        ],
        weaknesses: [
          { label: "优势侵蚀", score: 78, sources: 10, details: "传统优势不再奏效" },
          { label: "成本高企", score: 82, sources: 11, details: "运营效率低下" },
          { label: "组织僵化", score: 75, sources: 9, details: "响应速度慢" },
        ],
        opportunities: [
          { label: "改革窗口", score: 68, sources: 8, details: "危机倒逼转型" },
          { label: "战略重塑", score: 65, sources: 7, details: "重新定义定位" },
        ],
        threats: [
          { label: "生存威胁", score: 92, sources: 13, details: "现金流与市场双重压力" },
          { label: "人才流失", score: 85, sources: 11, details: "核心团队不稳" },
          { label: "品牌受损", score: 80, sources: 10, details: "市场信心下降" },
        ],
      }
    },
  },
};

export function FrameworkDetailModal({ framework, mode, onClose, onDataPointClick }: FrameworkDetailModalProps) {
  // 自定义 Tooltip 状态管理
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null); // 🔑 新增：图表容器引用

  if (!framework) return null;

  const data = frameworkData[mode]?.[framework as keyof typeof frameworkData[typeof mode]];
  if (!data) return null;

  // 🔑 修改：使用原生鼠标事件更新位置
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chartContainerRef.current && tooltipData) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // 显示 Tooltip
  const handleShowTooltip = (item: any) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setTooltipData(item);
  };

  // 隐藏 Tooltip（带延迟）
  const handleHideTooltip = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!isTooltipHovered) {
        setTooltipData(null);
      }
    }, 150); // 150ms 延迟，给用户时间移动鼠标
  };

  // 鼠标进入 Tooltip
  const handleTooltipMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsTooltipHovered(true);
  };

  // 鼠标离开 Tooltip
  const handleTooltipMouseLeave = () => {
    setIsTooltipHovered(false);
    setTooltipData(null);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const renderChart = () => {
    if (data.chartType === "radar") {
      return (
        <div
          ref={chartContainerRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleHideTooltip}
        >
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart
              data={data.data}
              onMouseMove={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  handleShowTooltip(e.activePayload[0].payload);
                }
              }}
              onClick={(e: any) => {
                // 🔑 直接点击图表触发跳转
                if (e && e.activePayload && e.activePayload[0]) {
                  onDataPointClick(e.activePayload[0].payload);
                }
              }}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: '#6b7280', fontSize: 13 }}
                style={{ cursor: 'pointer' }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar
                name="影响指数"
                dataKey="value"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
                style={{ cursor: 'pointer' }}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* 纯展示型 Tooltip - 不可点击 */}
          <AnimatePresence>
            {tooltipData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-50 pointer-events-none"
                style={{
                  left: `${tooltipPosition.x + 20}px`,
                  top: `${tooltipPosition.y - 70}px`,
                  maxWidth: '320px',
                }}
              >
                <div className="font-medium text-foreground mb-2">{tooltipData.dimension}</div>
                <div className="text-sm text-muted-foreground mb-2">{tooltipData.details}</div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <span className="text-muted-foreground">影响: {tooltipData.value}/100</span>
                  <span className="text-muted-foreground">{tooltipData.sources} 条数据源</span>
                </div>
                <div className="mt-2 text-xs text-primary text-center">
                  💡 点击图表查看数据源
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (data.chartType === "scatter") {
      const scatterData = data as any;
      return (
        <div
          ref={chartContainerRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleHideTooltip}
        >
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart
              margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
              onMouseMove={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  handleShowTooltip(e.activePayload[0].payload);
                }
              }}
              onClick={(e: any) => {
                // 🔑 直接点击图表触发跳转
                if (e && e.activePayload && e.activePayload[0]) {
                  onDataPointClick(e.activePayload[0].payload);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="x"
                name={scatterData.xLabel}
                domain={[0, 100]}
                label={{ value: scatterData.xLabel, position: 'bottom', offset: 40, style: { fill: '#6b7280' } }}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name={scatterData.yLabel}
                domain={[0, 100]}
                label={{ value: scatterData.yLabel, angle: -90, position: 'left', offset: 40, style: { fill: '#6b7280' } }}
                tick={{ fill: '#9ca3af' }}
              />
              <Scatter
                data={scatterData.data}
                style={{ cursor: 'pointer' }}
              >
                {scatterData.data.map((entry: any, index: number) => {
                  const colors = {
                    '本企业': '#6366f1',
                    '传统奢侈': '#8b5cf6',
                    '科技创新': '#06b6d4',
                    '可持续': '#10b981',
                    '轻奢': '#f59e0b',
                    '快时尚': '#ef4444',
                    '目标': '#10b981',
                    '风险区': '#ef4444',
                    '转型目标': '#f59e0b',
                    'default': '#6b7280'
                  };
                  const color = colors[entry.group as keyof typeof colors] || colors.default;
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          {/* 纯展示型 Tooltip - 不可点击 */}
          <AnimatePresence>
            {tooltipData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-50 pointer-events-none"
                style={{
                  left: `${tooltipPosition.x + 20}px`,
                  top: `${tooltipPosition.y - 90}px`,
                  maxWidth: '320px',
                }}
              >
                <div className="font-medium text-foreground mb-2">{tooltipData.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{tooltipData.details}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  {scatterData.xLabel}: {tooltipData.x} | {scatterData.yLabel}: {tooltipData.y}
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <span className="text-muted-foreground">{tooltipData.sources} 条数据源</span>
                </div>
                <div className="mt-2 text-xs text-primary text-center">
                  💡 点击数据点查看详情
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (data.chartType === "quadrant") {
      const quadrantData = data as any;
      return (
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          {/* Strengths */}
          <div className="border-2 border-emerald-500/30 rounded-xl p-6 bg-emerald-500/5">
            <h4 className="text-emerald-700 mb-4 flex items-center gap-2">
              <div className="size-3 rounded-full bg-emerald-500"></div>
              优势 Strengths
            </h4>
            <div className="space-y-3">
              {quadrantData.data.strengths.map((item: any, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => onDataPointClick(item)}
                  className="w-full p-3 rounded-lg bg-card border border-border hover:border-emerald-500/50 hover:shadow-md transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground group-hover:text-emerald-700">{item.label}</span>
                    <span className="text-sm text-emerald-600">{item.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.details}</p>
                  <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.sources} 条数据源 →
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="border-2 border-rose-500/30 rounded-xl p-6 bg-rose-500/5">
            <h4 className="text-rose-700 mb-4 flex items-center gap-2">
              <div className="size-3 rounded-full bg-rose-500"></div>
              劣势 Weaknesses
            </h4>
            <div className="space-y-3">
              {quadrantData.data.weaknesses.map((item: any, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => onDataPointClick(item)}
                  className="w-full p-3 rounded-lg bg-card border border-border hover:border-rose-500/50 hover:shadow-md transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground group-hover:text-rose-700">{item.label}</span>
                    <span className="text-sm text-rose-600">{item.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.details}</p>
                  <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.sources} 条数据源 →
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div className="border-2 border-blue-500/30 rounded-xl p-6 bg-blue-500/5">
            <h4 className="text-blue-700 mb-4 flex items-center gap-2">
              <div className="size-3 rounded-full bg-blue-500"></div>
              机会 Opportunities
            </h4>
            <div className="space-y-3">
              {quadrantData.data.opportunities.map((item: any, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => onDataPointClick(item)}
                  className="w-full p-3 rounded-lg bg-card border border-border hover:border-blue-500/50 hover:shadow-md transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground group-hover:text-blue-700">{item.label}</span>
                    <span className="text-sm text-blue-600">{item.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.details}</p>
                  <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.sources} 条数据源 →
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Threats */}
          <div className="border-2 border-amber-500/30 rounded-xl p-6 bg-amber-500/5">
            <h4 className="text-amber-700 mb-4 flex items-center gap-2">
              <div className="size-3 rounded-full bg-amber-500"></div>
              威胁 Threats
            </h4>
            <div className="space-y-3">
              {quadrantData.data.threats.map((item: any, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => onDataPointClick(item)}
                  className="w-full p-3 rounded-lg bg-card border border-border hover:border-amber-500/50 hover:shadow-md transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground group-hover:text-amber-700">{item.label}</span>
                    <span className="text-sm text-amber-600">{item.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.details}</p>
                  <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.sources} 条数据源 →
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-border p-6 flex items-start justify-between">
            <div>
              <h2 className="text-foreground mb-2">{data.name}</h2>
              <p className="text-sm text-muted-foreground">{data.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="size-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <Info className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground/80">
                点击图表中的数据点或卡片可查看详细数据源信息
              </p>
            </div>
            {renderChart()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

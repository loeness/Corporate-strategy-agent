import { useState } from "react";
import { motion } from "motion/react";
import { Gem } from "lucide-react";
import { RegionProvider } from "./contexts/RegionContext";
import { StrategyModeSelector, type StrategyMode } from "./components/StrategyModeSelector";
import { RegionSelector } from "./components/RegionSelector";
import { TimeDisplay } from "./components/TimeDisplay";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { StrategicBriefCard } from "./components/StrategicBriefCard";
import { DailyBrief } from "./components/DailyBrief";
import { MarketExpectationChart } from "./components/MarketExpectationChart";
import { FrameworkOverview } from "./components/FrameworkOverview";
import { FrameworkDetailModal } from "./components/FrameworkDetailModal";
import { DataSourceModal } from "./components/DataSourceModal";
import { ReportGenerationModal } from "./components/ReportGenerationModal";
import { InsightDetailModal } from "./components/InsightDetailModal";

function AppContent() {
  const [selectedMode, setSelectedMode] = useState<StrategyMode>("stable");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportKey, setReportKey] = useState(0); // 用于强制刷新报告

  const handleModeChange = (mode: StrategyMode) => {
    setSelectedMode(mode);
    setIsGenerating(true); // 触发报告生成流程
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
    setReportKey(prev => prev + 1); // 刷新报告显示
  };

  const handleInsightClick = (insight: any) => {
    setSelectedInsight(insight);
  };

  const handleFrameworkClick = (framework: string) => {
    setSelectedFramework(framework);
  };

  const handleDataPointClick = (dataPoint: any) => {
    setSelectedDataPoint(dataPoint);
  };

  const handleCloseFramework = () => {
    setSelectedFramework(null);
  };

  const handleCloseDataSource = () => {
    setSelectedDataPoint(null);
  };

  const handleCloseInsight = () => {
    setSelectedInsight(null);
  };

  return (
    <>
      <LoadingOverlay />

      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-amber-200/50 bg-gradient-to-r from-white/80 via-amber-50/80 to-rose-50/80 backdrop-blur-2xl sticky top-0 z-40 shadow-lg">
          <div className="max-w-[1600px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-rose-500 shadow-xl relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(251, 191, 36, 0.3)",
                      "0 15px 40px rgba(251, 113, 133, 0.4)",
                      "0 10px 30px rgba(251, 191, 36, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Gem className="size-8 text-white relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-white"
                    animate={{
                      scale: [0, 2],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-600 to-rose-700 bg-clip-text text-transparent">
                    全球珠宝企业战略智能中心
                  </h1>
                  <p className="text-sm text-amber-700/80 font-medium">Strategic Intelligence Hub</p>
                </div>
              </div>

              {/* Time Display & Region Selector */}
              <div className="flex items-center gap-4">
                <TimeDisplay />
                <RegionSelector />
              </div>
            </div>

          {/* Mode Selector */}
          <StrategyModeSelector
            selectedMode={selectedMode}
            onModeChange={handleModeChange}
          />
        </div>
      </header>

      {/* Main Content - Single Page */}
      <main className="max-w-[1600px] mx-auto px-8 py-12 space-y-16">
        {/* 战略简报卡片 - 最优先展示 */}
        <motion.section
          key={`brief-${reportKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StrategicBriefCard mode={selectedMode} />
        </motion.section>

        {/* 分隔线 */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <div className="size-2 rounded-full bg-amber-400" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* 核心战略指标面板 */}
        <motion.section
          key={`indicators-${reportKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <DailyBrief mode={selectedMode} onInsightClick={handleInsightClick} />
        </motion.section>

        {/* 分隔线 */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <div className="size-2 rounded-full bg-amber-400" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* 市场预期与投资建议 */}
        <motion.section
          key={`market-${reportKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <MarketExpectationChart mode={selectedMode} />
        </motion.section>

        {/* 分隔线 */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <div className="size-2 rounded-full bg-amber-400" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* 战略框架分析 */}
        <motion.section
          key={`framework-${reportKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <FrameworkOverview mode={selectedMode} onFrameworkClick={handleFrameworkClick} />
        </motion.section>
      </main>

      {/* Report Generation Modal */}
      {isGenerating && (
        <ReportGenerationModal
          mode={selectedMode}
          onComplete={handleGenerationComplete}
        />
      )}

      {/* Insight Detail Modal - 显示简报项关联的框架 */}
      {selectedInsight && (
        <InsightDetailModal
          insight={selectedInsight}
          onClose={handleCloseInsight}
          onFrameworkClick={handleFrameworkClick}
        />
      )}

      {/* Layer 2: Framework Detail Modal */}
      {selectedFramework && (
        <FrameworkDetailModal
          framework={selectedFramework}
          mode={selectedMode}
          onClose={handleCloseFramework}
          onDataPointClick={handleDataPointClick}
        />
      )}

      {/* Layer 3: Data Source Modal */}
      {selectedDataPoint && (
        <DataSourceModal
          dataPoint={selectedDataPoint}
          onClose={handleCloseDataSource}
        />
      )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <RegionProvider>
      <AppContent />
    </RegionProvider>
  );
}
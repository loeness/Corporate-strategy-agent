import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ExternalLink, Calendar, Tag } from "lucide-react";
import type { StrategyMode } from "./StrategyModeSelector";
import { evidenceRecords, type EvidenceRecord } from "../data/strategyData";

interface DataSourcesProps {
  mode: StrategyMode;
}

const dataItems: EvidenceRecord[] = evidenceRecords.map((r) => ({
  ...r,
}));

export function DataSources({ mode }: DataSourcesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allCategories = Array.from(new Set(dataItems.map((i) => i.category || "其他")));

  const filteredData = dataItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelBadge = (level: string) => {
    if (level === "A") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (level === "B") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-rose-100 text-rose-700 border-rose-200";
  };

  return (
    <div>
      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-500" />
          <input
            type="text"
            placeholder="搜索数据来源、描述或市场..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-200 bg-white/80 focus:outline-none focus:border-amber-400 text-amber-900 placeholder-amber-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-amber-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-amber-200 bg-white/80 focus:outline-none focus:border-amber-400 text-amber-900"
          >
            <option value="all">全部类别</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-amber-50/50 border border-amber-200/30">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-amber-400" />
          <span className="text-sm text-amber-700">共 <strong>{dataItems.length}</strong> 条证据记录</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-amber-700">A 级：<strong>{dataItems.filter(i => i.evidenceLevel === "A").length}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-amber-400" />
          <span className="text-sm text-amber-700">B 级：<strong>{dataItems.filter(i => i.evidenceLevel === "B").length}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-500">来源：data/strategy_report.md</span>
        </div>
      </div>

      {/* 数据列表 */}
      <div className="space-y-3">
        {filteredData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group p-5 rounded-xl border border-amber-200/40 bg-white hover:border-amber-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getLevelBadge(item.evidenceLevel)}`}>
                  等级 {item.evidenceLevel}
                </span>
                {item.category && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    {item.category}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200">
                  {item.market}
                </span>
                <span className={`text-xs ${item.urlStatus === "URL完整" ? "text-emerald-600" : "text-amber-600"}`}>
                  {item.urlStatus}
                </span>
              </div>
            </div>
            <p className="text-sm text-amber-800 mb-3 leading-relaxed">{item.description}</p>
            <div className="flex items-center gap-4 text-xs text-amber-500">
              <div className="flex items-center gap-1.5">
                <Tag className="size-3" />
                <span>来源：{item.source}</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="size-3" />
                <span>查看原始报告</span>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-12 text-amber-500">
            <Search className="size-8 mx-auto mb-3 opacity-50" />
            <p>未找到匹配的数据来源</p>
          </div>
        )}
      </div>
    </div>
  );
}

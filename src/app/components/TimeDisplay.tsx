import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useRegion, regionConfig } from "../contexts/RegionContext";
import { motion } from "motion/react";

export function TimeDisplay() {
  const { currentRegion } = useRegion();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const config = regionConfig[currentRegion];
  const localTime = currentTime.toLocaleString('zh-CN', {
    timeZone: config.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const beijingTime = currentTime.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const localDate = currentTime.toLocaleDateString('zh-CN', {
    timeZone: config.timezone,
    month: 'short',
    day: 'numeric',
  });

  const isBeijing = config.timezone === 'Asia/Shanghai';

  return (
    <div className="flex items-center gap-4 px-4 py-2.5 rounded-xl bg-gradient-to-br from-white to-amber-50/50 border border-amber-200/50 shadow-sm">
      <Clock className="size-5 text-amber-600" />

      <div className="flex items-center gap-4 divide-x divide-amber-200">
        {/* 当地时间 */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-amber-700 font-medium">
            {isBeijing ? '北京时间' : `${config.label}时间`}
          </div>
          <motion.div
            className="flex items-center gap-1 font-mono text-lg font-bold text-amber-900"
            key={localTime}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {localTime.split(':').map((part, index) => (
              <span key={index} className="flex items-center">
                {part}
                {index < 2 && <span className="text-amber-500 mx-0.5 animate-pulse">:</span>}
              </span>
            ))}
          </motion.div>
          <span className="text-xs text-amber-600">{localDate}</span>
        </div>

        {/* 北京时间（如果不是北京） */}
        {!isBeijing && (
          <div className="flex items-center gap-2 pl-4">
            <div className="text-xs text-amber-700 font-medium">北京时间</div>
            <motion.div
              className="font-mono text-base font-semibold text-amber-800"
              key={beijingTime}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {beijingTime}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

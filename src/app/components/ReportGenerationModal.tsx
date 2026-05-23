import { motion } from "motion/react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ReportGenerationModalProps {
  mode: string;
  onComplete: () => void;
}

const modeLabels = {
  innovation: "创新突破模式",
  stable: "稳定运营模式",
  rescue: "拯救者模式"
};

const generationSteps = [
  { id: 1, label: "配置检索参数", duration: 800 },
  { id: 2, label: "检索宏观环境数据 (PESTLE)", duration: 1200 },
  { id: 3, label: "分析竞争态势 (Porter)", duration: 1000 },
  { id: 4, label: "评估战略群组定位", duration: 900 },
  { id: 5, label: "优化价值链分析", duration: 800 },
  { id: 6, label: "生成 SWOT 矩阵", duration: 1000 },
  { id: 7, label: "汇总战略简报", duration: 700 },
];

export function ReportGenerationModal({ mode, onComplete }: ReportGenerationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let mounted = true;
    let totalDelay = 0;

    generationSteps.forEach((step, index) => {
      totalDelay += step.duration;
      setTimeout(() => {
        if (mounted) {
          setCurrentStep(index + 1);
        }
      }, totalDelay);
    });

    // 完成后
    setTimeout(() => {
      if (mounted) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, totalDelay + 500);

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4">
            {isComplete ? (
              <CheckCircle2 className="size-8 text-emerald-500" />
            ) : (
              <Loader2 className="size-8 text-primary animate-spin" />
            )}
          </div>
          <h2 className="text-foreground mb-2">
            {isComplete ? "报告生成完成" : "正在生成战略报告"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {modeLabels[mode as keyof typeof modeLabels]}
          </p>
        </div>

        <div className="space-y-3">
          {generationSteps.map((step, index) => {
            const isActive = currentStep === index + 1;
            const isCompleted = currentStep > index + 1 || isComplete;
            const isPending = currentStep < index + 1;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-primary/10 border border-primary/30" :
                  isCompleted ? "bg-emerald-500/10" :
                  "bg-muted/30"
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="size-5 text-emerald-500" />
                  ) : isActive ? (
                    <Loader2 className="size-5 text-primary animate-spin" />
                  ) : (
                    <div className="size-5 rounded-full border-2 border-muted-foreground/30" />
                  )}
                </div>
                <span className={`text-sm ${
                  isActive ? "text-primary font-medium" :
                  isCompleted ? "text-emerald-600" :
                  "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
          >
            <p className="text-sm text-emerald-700 text-center">
              已根据「{modeLabels[mode as keyof typeof modeLabels]}」生成专属战略报告
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

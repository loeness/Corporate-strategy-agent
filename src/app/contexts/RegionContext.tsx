import { createContext, useContext, useState, ReactNode } from "react";

export type Region = "global" | "china" | "japan" | "korea" | "southeast-asia" | "usa";

export const regionConfig = {
  global: {
    label: "全球",
    currency: "USD",
    newsCountry: "all",
    language: "en",
    platforms: ["instagram", "tiktok", "twitter", "xiaohongshu", "douyin"],
    ecommerce: ["amazon", "taobao", "shopee", "rakuten"],
    regulators: ["WTO", "UN Trade", "各国监管机构"],
    timezone: "UTC",
  },
  china: {
    label: "中国",
    currency: "CNY",
    newsCountry: "cn",
    language: "zh",
    platforms: ["xiaohongshu", "douyin", "weibo"],
    ecommerce: ["taobao", "jd", "dewu"],
    regulators: ["国家市场监督管理总局", "商务部"],
    timezone: "Asia/Shanghai",
  },
  japan: {
    label: "日本",
    currency: "JPY",
    newsCountry: "jp",
    language: "ja",
    platforms: ["line", "twitter", "instagram"],
    ecommerce: ["rakuten", "amazon-jp", "yahoo-shopping"],
    regulators: ["消費者庁", "経済産業省"],
    timezone: "Asia/Tokyo",
  },
  korea: {
    label: "韩国",
    currency: "KRW",
    newsCountry: "kr",
    language: "ko",
    platforms: ["naver", "kakao", "instagram"],
    ecommerce: ["coupang", "11st", "gmarket"],
    regulators: ["공정거래위원회", "산업통상자원부"],
    timezone: "Asia/Seoul",
  },
  "southeast-asia": {
    label: "东南亚",
    currency: "SGD", // 使用新加坡元作为基准
    newsCountry: "sg",
    language: "en",
    platforms: ["facebook", "instagram", "tiktok"],
    ecommerce: ["shopee", "lazada", "tokopedia"],
    regulators: ["ASEAN Secretariat", "各国商务部"],
    timezone: "Asia/Singapore",
  },
  usa: {
    label: "美国",
    currency: "USD",
    newsCountry: "us",
    language: "en",
    platforms: ["instagram", "tiktok", "pinterest"],
    ecommerce: ["amazon", "etsy", "ebay"],
    regulators: ["FTC", "SEC", "CBP"],
    timezone: "America/New_York",
  },
};

interface RegionContextType {
  currentRegion: Region;
  setCurrentRegion: (region: Region) => void;
  targetRegion: Region | null;
  setTargetRegion: (region: Region | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  getRegionConfig: () => typeof regionConfig[Region];
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<Region>("global");
  const [targetRegion, setTargetRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRegionConfig = () => regionConfig[currentRegion];

  return (
    <RegionContext.Provider
      value={{
        currentRegion,
        setCurrentRegion,
        targetRegion,
        setTargetRegion,
        isLoading,
        setIsLoading,
        getRegionConfig,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within RegionProvider");
  }
  return context;
}

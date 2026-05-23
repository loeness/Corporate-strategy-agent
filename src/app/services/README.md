# 数据服务层 - API 集成指南

本文档说明如何在组件中使用带有地域参数的 7 大核心数据模块。

## 目录结构

```
src/app/
├── contexts/
│   └── RegionContext.tsx       # 全局地域状态管理
├── components/
│   ├── RegionSelector.tsx      # 地域选择器 UI
│   └── LoadingOverlay.tsx      # 加载遮罩
└── services/
    ├── dataService.ts          # 7 大核心 API 模块
    └── README.md               # 本文档
```

## 快速开始

### 1. 在组件中使用地域状态

```typescript
import { useRegion } from "../contexts/RegionContext";

function MyComponent() {
  const { currentRegion, getRegionConfig } = useRegion();
  const config = getRegionConfig();

  console.log(config.currency);    // "CNY" / "JPY" / "USD" ...
  console.log(config.platforms);   // ["xiaohongshu", "douyin"] ...
  
  return <div>当前地区：{config.label}</div>;
}
```

### 2. 调用 API 服务

```typescript
import { useEffect, useState } from "react";
import { useRegion } from "../contexts/RegionContext";
import { fetchMetalsPrices, fetchCompetitorNews } from "../services/dataService";

function PriceWidget() {
  const { currentRegion } = useRegion();
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    // 当地区切换时自动重新获取数据
    fetchMetalsPrices(currentRegion)
      .then(data => setPrices(data))
      .catch(error => console.error(error));
  }, [currentRegion]); // 🔑 依赖 currentRegion

  if (!prices) return <div>加载中...</div>;

  return (
    <div>
      <h3>黄金价格（{prices.currency}）</h3>
      <p>{prices.prices.gold}</p>
    </div>
  );
}
```

## 7 大核心模块详解

### 1. 贵金属价格实时数据 (`fetchMetalsPrices`)

**功能：** 根据地区获取不同货币计价的贵金属价格

**API：** Metals-API / GoldAPI.io

**地域参数：**
- `baseCurrency`：根据地区自动映射（中国→CNY，日本→JPY）

**示例代码：**
```typescript
const priceData = await fetchMetalsPrices("china");
// {
//   region: "china",
//   currency: "CNY",
//   prices: { gold: 420.50, silver: 5.23, ... }
// }
```

**配置要点：**
```typescript
// RegionContext.tsx 中的货币映射
china: { currency: "CNY" }
japan: { currency: "JPY" }
usa: { currency: "USD" }
```

---

### 2. 竞品动态新闻 (`fetchCompetitorNews`)

**功能：** 获取特定国家的珠宝行业新闻

**API：** NewsAPI

**地域参数：**
- `country`：新闻源国家代码（cn / jp / us）
- `language`：语言过滤（zh / ja / en）
- 关键词：根据地区添加本地品牌名称

**示例代码：**
```typescript
const news = await fetchCompetitorNews("japan");
// 自动搜索：jewelry OR ミキモト OR タサキ
// 过滤：country=jp, language=ja
```

**区域化关键词映射：**
```typescript
const regionalKeywords = {
  china: ["周大福", "老凤祥", "潮宏基"],
  japan: ["ミキモト", "タサキ", "4℃"],
  usa: ["Tiffany", "Cartier", "Blue Nile"],
};
```

---

### 3. OFAC 制裁名单更新 (`fetchOFACSanctions`)

**功能：** 筛选涉及特定地区的制裁实体

**API：** OFAC Sanctions List Service

**地域参数：**
- `country` 字段过滤：只返回地址在目标国家的实体

**示例代码：**
```typescript
const sanctions = await fetchOFACSanctions("china");
// 只返回 address.country = "cn" 的制裁实体
```

**过滤逻辑：**
```typescript
const filtered = data.filter(entity =>
  entity.addresses?.some(addr =>
    addr.country?.toLowerCase() === config.newsCountry
  )
);
```

---

### 4. WTO/海关关税变化 (`fetchTariffChanges`)

**功能：** 查询特定国家的珠宝产品关税

**API：** World Bank WITS / USITC

**地域参数：**
- `reporter`：报告国代码（CHN / JPN / USA）
- `product`：HS 编码（7113 = 珠宝首饰）

**示例代码：**
```typescript
const tariffs = await fetchTariffChanges("usa", "7113");
// URL: .../reporter/USA/product/7113
```

**国家代码映射：**
```typescript
const countryCodeMap = {
  china: "CHN",
  japan: "JPN",
  korea: "KOR",
  usa: "USA",
};
```

---

### 5. 社媒品类趋势 (`fetchSocialMediaTrends`)

**功能：** 根据地区抓取不同社交平台数据

**API：** Apify 爬虫服务

**地域参数：**
- `platforms`：根据地区选择主流平台

**示例代码：**
```typescript
const trends = await fetchSocialMediaTrends("china");
// 启动爬虫：xiaohongshu, douyin, weibo

const trendsUS = await fetchSocialMediaTrends("usa");
// 启动爬虫：instagram, tiktok, pinterest
```

**平台映射：**
```typescript
china: ["xiaohongshu", "douyin", "weibo"]
japan: ["line", "twitter", "instagram"]
usa: ["instagram", "tiktok", "pinterest"]
```

---

### 6. 电商平台规则变化 (`fetchEcommercePolicies`)

**功能：** 监控不同地区主流电商平台的政策更新

**API：** 爬虫 + RSS 订阅

**地域参数：**
- `platforms`：根据地区选择电商平台

**示例代码：**
```typescript
const policies = await fetchEcommercePolicies("southeast-asia");
// 监控平台：Shopee, Lazada, Tokopedia
```

**平台映射：**
```typescript
china: ["taobao", "jd", "dewu"]
"southeast-asia": ["shopee", "lazada", "tokopedia"]
usa: ["amazon", "etsy", "ebay"]
```

---

### 7. 各国法规更新 (`fetchRegulatoryUpdates`)

**功能：** 订阅不同国家监管机构的政策 RSS

**API：** 各国监管机构 RSS Feed

**地域参数：**
- `rssFeedsMap`：根据地区选择监管机构订阅源

**示例代码：**
```typescript
const updates = await fetchRegulatoryUpdates("usa");
// 订阅源：FTC, SEC, CBP
```

**RSS 源映射：**
```typescript
const rssFeedsMap = {
  china: [
    "http://www.samr.gov.cn/rss/index.rss",
    "http://www.mofcom.gov.cn/rss/gzdt.xml"
  ],
  usa: [
    "https://www.ftc.gov/feeds/ftc-news.xml",
    "https://www.sec.gov/news/pressreleases.rss"
  ],
};
```

---

## 统一刷新接口

### `refreshAllData(region)`

一次性刷新所有 7 个模块的数据，使用 `Promise.allSettled` 确保部分失败不影响其他模块。

**使用场景：**
- 切换地区时
- 定时刷新
- 手动刷新按钮

**示例代码：**
```typescript
import { refreshAllData } from "../services/dataService";

async function handleRegionChange(newRegion) {
  setLoading(true);
  
  try {
    const result = await refreshAllData(newRegion);
    
    console.log("成功模块:", result.data);
    console.log("失败模块:", result.errors);
    
    // 更新各个组件状态
    setMetalsData(result.data.metals);
    setNewsData(result.data.news);
    // ...
  } catch (error) {
    console.error("数据刷新失败:", error);
  } finally {
    setLoading(false);
  }
}
```

---

## 环境变量配置

在 `.env` 文件中配置 API 密钥：

```bash
# 贵金属价格
VITE_METALS_API_KEY=your_metals_api_key

# 新闻 API
VITE_NEWS_API_KEY=your_newsapi_key

# Apify 爬虫
VITE_APIFY_TOKEN=your_apify_token

# 其他 API...
```

在代码中读取：

```typescript
const apiKey = import.meta.env.VITE_METALS_API_KEY;
```

---

## 错误处理

所有 API 函数都包含 try-catch 错误处理：

```typescript
try {
  const data = await fetchMetalsPrices(region);
  return data;
} catch (error) {
  console.error(`Failed to fetch metals prices for ${region}:`, error);
  throw error; // 向上抛出，由组件处理
}
```

在组件中处理错误：

```typescript
useEffect(() => {
  fetchMetalsPrices(currentRegion)
    .then(data => setPrices(data))
    .catch(error => {
      setError("加载失败，请稍后重试");
      console.error(error);
    });
}, [currentRegion]);
```

---

## 性能优化建议

### 1. 使用 React Query / SWR

```typescript
import { useQuery } from '@tanstack/react-query';

function useMetal sPrices() {
  const { currentRegion } = useRegion();
  
  return useQuery({
    queryKey: ['metals', currentRegion],
    queryFn: () => fetchMetalsPrices(currentRegion),
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  });
}
```

### 2. 防抖地区切换

```typescript
const debouncedChange = useMemo(
  () => debounce((region) => {
    refreshAllData(region);
  }, 500),
  []
);
```

### 3. 增量更新

某些模块可以只刷新变化的部分，而不是全量刷新：

```typescript
// 只刷新新闻和社媒，其他保持不变
const updates = await Promise.allSettled([
  fetchCompetitorNews(region),
  fetchSocialMediaTrends(region),
]);
```

---

## 测试

```typescript
import { describe, it, expect } from 'vitest';
import { fetchMetalsPrices } from './dataService';

describe('dataService', () => {
  it('should fetch metals prices for China', async () => {
    const data = await fetchMetalsPrices('china');
    
    expect(data.region).toBe('china');
    expect(data.currency).toBe('CNY');
    expect(data.prices).toHaveProperty('gold');
  });
});
```

---

## 常见问题

### Q: 切换地区后数据没有更新？

确保组件的 `useEffect` 依赖了 `currentRegion`：

```typescript
useEffect(() => {
  fetchData(currentRegion);
}, [currentRegion]); // ✅ 必须包含
```

### Q: 某个 API 调用失败了怎么办？

使用 `refreshAllData` 时，单个 API 失败不会影响其他模块。检查 `result.errors` 数组查看失败原因。

### Q: 如何添加新的地区？

在 `RegionContext.tsx` 的 `regionConfig` 中添加新地区配置即可：

```typescript
export const regionConfig = {
  // ...
  "europe": {
    label: "欧洲",
    currency: "EUR",
    newsCountry: "gb",
    // ...
  },
};
```

---

## 总结

通过 **RegionContext 全局状态** + **数据服务层地域参数注入**，实现了：

✅ 统一的地域管理  
✅ 自动化的数据刷新  
✅ 7 大核心模块的地域联动  
✅ 清晰的 API 封装  

切换地区时，所有组件会自动重新请求对应地区的数据，无需手动干预。

import { regionConfig, type Region } from "../contexts/RegionContext";

/**
 * 数据服务层 - 集成地域参数的 7 大核心模块
 */

// ============================
// 1. 贵金属价格实时数据
// ============================
export async function fetchMetalsPrices(region: Region) {
  const config = regionConfig[region];

  // 示例：使用 Metals-API
  const apiKey = "YOUR_METALS_API_KEY";
  const baseCurrency = config.currency; // 根据地区使用不同货币

  const url = `https://metals-api.com/api/latest?access_key=${apiKey}&base=${baseCurrency}&symbols=XAU,XAG,XPT,XPD`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      region,
      currency: baseCurrency,
      timestamp: data.timestamp,
      prices: {
        gold: data.rates?.XAU || 0,
        silver: data.rates?.XAG || 0,
        platinum: data.rates?.XPT || 0,
        palladium: data.rates?.XPD || 0,
      }
    };
  } catch (error) {
    console.error(`Failed to fetch metals prices for ${region}:`, error);
    throw error;
  }
}

// ============================
// 2. 竞品动态新闻
// ============================
export async function fetchCompetitorNews(region: Region, keywords: string[] = ["jewelry", "luxury"]) {
  const config = regionConfig[region];

  // 示例：使用 NewsAPI
  const apiKey = "YOUR_NEWSAPI_KEY";
  const country = config.newsCountry;
  const language = config.language;

  // 根据地区添加特定关键词
  const regionalKeywords = {
    china: ["周大福", "老凤祥", "潮宏基"],
    japan: ["ミキモト", "タサキ", "4℃"],
    korea: ["제이에스티나", "스톤헨지"],
    "southeast-asia": ["Poh Heng", "Tomei"],
    usa: ["Tiffany", "Cartier", "Blue Nile"],
  };

  const allKeywords = [...keywords, ...(regionalKeywords[region] || [])];
  const query = allKeywords.join(" OR ");

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      region,
      articles: data.articles?.map((article: any) => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url,
      })) || []
    };
  } catch (error) {
    console.error(`Failed to fetch news for ${region}:`, error);
    throw error;
  }
}

// ============================
// 3. OFAC 制裁名单更新
// ============================
export async function fetchOFACSanctions(region: Region) {
  const config = regionConfig[region];

  // OFAC API 端点
  const url = "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 根据地区过滤制裁实体
    const filteredEntities = data.filter((entity: any) => {
      // 检查地址字段是否包含目标国家
      const addressMatch = entity.addresses?.some((addr: any) =>
        addr.country?.toLowerCase() === region ||
        addr.country?.toLowerCase() === config.newsCountry
      );

      return addressMatch;
    });

    return {
      region,
      count: filteredEntities.length,
      entities: filteredEntities.slice(0, 50), // 限制返回数量
      lastUpdate: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch OFAC sanctions for ${region}:`, error);
    throw error;
  }
}

// ============================
// 4. WTO/海关关税变化
// ============================
export async function fetchTariffChanges(region: Region, productCode: string = "7113") {
  const config = regionConfig[region];

  // 国家代码映射
  const countryCodeMap: Record<Region, string> = {
    china: "CHN",
    japan: "JPN",
    korea: "KOR",
    "southeast-asia": "SGP", // 使用新加坡作为代表
    usa: "USA",
  };

  const reporterCode = countryCodeMap[region];

  // 示例：使用 World Bank WITS API
  const url = `https://wits.worldbank.org/API/V1/SDMX/V21/datasource/tradestats-tariff/reporter/${reporterCode}/product/${productCode}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      }
    });
    const data = await response.json();

    return {
      region,
      reporterCountry: reporterCode,
      productCode,
      tariffData: data.tariffs || [],
      lastUpdate: data.lastUpdate,
    };
  } catch (error) {
    console.error(`Failed to fetch tariff data for ${region}:`, error);
    throw error;
  }
}

// ============================
// 5. 社媒品类趋势
// ============================
export async function fetchSocialMediaTrends(region: Region) {
  const config = regionConfig[region];
  const platforms = config.platforms;

  // 示例：使用 Apify 爬虫
  const apifyToken = "YOUR_APIFY_TOKEN";

  const crawlers: Record<string, string> = {
    xiaohongshu: "apify/xiaohongshu-scraper",
    douyin: "apify/douyin-scraper",
    instagram: "apify/instagram-scraper",
    tiktok: "apify/tiktok-scraper",
    twitter: "apify/twitter-scraper",
    // ... 其他平台
  };

  const tasks = platforms.map(async (platform) => {
    const crawlerId = crawlers[platform];
    if (!crawlerId) return null;

    const url = `https://api.apify.com/v2/acts/${crawlerId}/runs?token=${apifyToken}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchQueries: ["珠宝", "jewelry", "luxury jewelry"],
          maxResults: 50,
        }),
      });

      const data = await response.json();
      return {
        platform,
        runId: data.data?.id,
        status: data.data?.status,
      };
    } catch (error) {
      console.error(`Failed to start crawler for ${platform}:`, error);
      return null;
    }
  });

  const results = await Promise.all(tasks);

  return {
    region,
    platforms,
    crawlJobs: results.filter(Boolean),
  };
}

// ============================
// 6. 电商平台规则变化
// ============================
export async function fetchEcommercePolicies(region: Region) {
  const config = regionConfig[region];
  const platforms = config.ecommerce;

  // 平台政策页面映射
  const policyUrls: Record<string, string> = {
    taobao: "https://rule.taobao.com/",
    jd: "https://rule.jd.com/",
    amazon: "https://sellercentral.amazon.com/gp/help/external/521",
    shopee: "https://seller.shopee.com/edu/article/policies",
    lazada: "https://sellercenter.lazada.com/seller/helpcenter/policies",
    // ... 其他平台
  };

  const tasks = platforms.map(async (platform) => {
    const url = policyUrls[platform];
    if (!url) return null;

    try {
      // 这里可以使用爬虫服务或 RSS 订阅
      // 示例：使用简单的 fetch + 解析
      const response = await fetch(url);
      const html = await response.text();

      // 提取更新日期和关键变更（实际需要更复杂的解析）
      return {
        platform,
        url,
        lastChecked: new Date().toISOString(),
        hasUpdates: html.includes("更新") || html.includes("update"),
      };
    } catch (error) {
      console.error(`Failed to fetch policy for ${platform}:`, error);
      return null;
    }
  });

  const results = await Promise.all(tasks);

  return {
    region,
    platforms,
    policies: results.filter(Boolean),
  };
}

// ============================
// 7. 各国法规更新
// ============================
export async function fetchRegulatoryUpdates(region: Region) {
  const config = regionConfig[region];
  const regulators = config.regulators;

  // 监管机构 RSS 订阅源映射
  const rssFeedsMap: Record<Region, string[]> = {
    china: [
      "http://www.samr.gov.cn/xw/zj/index.rss",
      "http://www.mofcom.gov.cn/rss/gzdt.xml",
    ],
    japan: [
      "https://www.caa.go.jp/rss/index.rss",
      "https://www.meti.go.jp/rss/press.rss",
    ],
    korea: [
      "https://www.ftc.go.kr/www/rss/rssFeed.do",
    ],
    "southeast-asia": [
      "https://asean.org/feed/",
    ],
    usa: [
      "https://www.ftc.gov/feeds/ftc-news.xml",
      "https://www.sec.gov/news/pressreleases.rss",
    ],
  };

  const feeds = rssFeedsMap[region] || [];

  const tasks = feeds.map(async (feedUrl) => {
    try {
      const response = await fetch(feedUrl);
      const xmlText = await response.text();

      // 这里需要 XML 解析器，简化示例
      return {
        feedUrl,
        status: response.ok ? "success" : "failed",
        lastFetch: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Failed to fetch RSS feed ${feedUrl}:`, error);
      return null;
    }
  });

  const results = await Promise.all(tasks);

  return {
    region,
    regulators,
    feeds: results.filter(Boolean),
  };
}

// ============================
// 统一数据刷新接口
// ============================
export async function refreshAllData(region: Region) {
  console.log(`🔄 Refreshing all data for region: ${region}`);

  try {
    const [
      metals,
      news,
      sanctions,
      tariffs,
      social,
      ecommerce,
      regulatory,
    ] = await Promise.allSettled([
      fetchMetalsPrices(region),
      fetchCompetitorNews(region),
      fetchOFACSanctions(region),
      fetchTariffChanges(region),
      fetchSocialMediaTrends(region),
      fetchEcommercePolicies(region),
      fetchRegulatoryUpdates(region),
    ]);

    return {
      region,
      timestamp: new Date().toISOString(),
      data: {
        metals: metals.status === "fulfilled" ? metals.value : null,
        news: news.status === "fulfilled" ? news.value : null,
        sanctions: sanctions.status === "fulfilled" ? sanctions.value : null,
        tariffs: tariffs.status === "fulfilled" ? tariffs.value : null,
        social: social.status === "fulfilled" ? social.value : null,
        ecommerce: ecommerce.status === "fulfilled" ? ecommerce.value : null,
        regulatory: regulatory.status === "fulfilled" ? regulatory.value : null,
      },
      errors: [
        metals.status === "rejected" ? metals.reason : null,
        news.status === "rejected" ? news.reason : null,
        sanctions.status === "rejected" ? sanctions.reason : null,
        tariffs.status === "rejected" ? tariffs.reason : null,
        social.status === "rejected" ? social.reason : null,
        ecommerce.status === "rejected" ? ecommerce.reason : null,
        regulatory.status === "rejected" ? regulatory.reason : null,
      ].filter(Boolean),
    };
  } catch (error) {
    console.error("Failed to refresh data:", error);
    throw error;
  }
}

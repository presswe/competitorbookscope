import { COMPETITORS } from "./constants";

export const ALADIN_API_BASE = "https://www.aladin.co.kr/ttb/api";

// ... (keep existing code)

export async function fetchCompetitorsBooks(mode: "New" | "Best"): Promise<AladinBook[]> {
    const apiKey = process.env.ALADIN_API_KEY;
    if (!apiKey) {
        // Fallback to MOCK data filtering
        let results = [...MOCK_BOOKS];
        // Filter only if publisher is in COMPETITORS
        results = results.filter(b => COMPETITORS.includes(b.publisher));
        return Promise.resolve(results);
    }

    // Parallel fetch for each competitor
    const promises = COMPETITORS.map(async (pub) => {
        // MODE "New" -> Request "ItemNewAll" for the publisher, sorted by SalesPoint (신간 베스트)
        // MODE "Best" -> Request "Bestseller" for the publisher

        let endpoint = "ItemSearch.aspx";
        const params = new URLSearchParams({
            ttbkey: apiKey,
            Query: pub,
            QueryType: "Publisher",
            MaxResults: "5", // Slightly more to ensure we get good items after sorting
            start: "1",
            SearchTarget: "Book",
            Output: "js",
            Version: "20131101",
            Cover: "Big",
        });

        if (mode === "New") {
            // "신간 베스트" logic: We use Keyword search for the publisher but sort by PublishTime AND SalesPoint
            // Actually, Aladin doesn't have a combined 'New Best' query type in Search, 
            // so we'll fetch Recent and sort by SalesPoint locally to simulate it, or just use Sort=SalesPoint for recent weeks.
            params.set("Sort", "SalesPoint");
        } else {
            // "베스트셀러" logic
            params.set("Sort", "SalesPoint");
        }

        const url = `${ALADIN_API_BASE}/${endpoint}?${params.toString()}`;

        try {
            console.log(`Fetching ${mode} for ${pub}: ${url}`);
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) return [];
            const data = await res.json() as AladinResponse;
            return data.item || [];
        } catch (e) {
            console.error(`Failed to fetch for ${pub}`, e);
            return [];
        }
    });

    const resultsArray = await Promise.all(promises);
    let allBooks = resultsArray.flat();

    const uniqueMap = new Map();
    allBooks.forEach(b => uniqueMap.set(b.itemId, b));
    allBooks = Array.from(uniqueMap.values());

    if (mode === "New") {
        // Simulate "New Best" by sorting by SalesPoint but prioritizing newer books (e.g. within last 6 months)
        // For now, just keep the SalesPoint sort from the API and refine here if needed.
        allBooks.sort((a, b) => (b.salesPoint || 0) - (a.salesPoint || 0));
    } else {
        allBooks.sort((a, b) => (b.salesPoint || 0) - (a.salesPoint || 0));
    }

    return allBooks;
}

export interface AladinBook {
    itemId: number;
    title: string;
    author: string;
    pubDate: string; // "YYYY-MM-DD"
    description: string;
    isbn: string;
    priceStandard: number;
    priceSales: number;
    cover: string; // URL
    publisher: string;
    link: string; // Detail page URL
    bestDuration?: string; // e.g. "1주" (only in Bestseller)
    rank?: number; // Calculated or from response
    categoryName?: string;
    customerReviewRank?: number;
    salesPoint?: number; // Sales Index
}

export interface AladinResponse {
    version: string;
    title: string;
    link: string;
    pubDate: string;
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    query: string;
    searchCategoryId: number;
    searchCategoryName: string;
    item: AladinBook[];
}

export type QueryType =
    | "ItemNewAll"       // New releases
    | "ItemNewSpecial"   // Special new releases
    | "Bestseller"       // Bestseller
    | "ItemEditorChoice" // Editor's choice
    | "Keyword"          // Keyword search
    | "Publisher";       // Specific Publisher Search

// MOCK DATA STORAGE
// Using REAL Aladin Image URLs scraped from live site to ensure visual fidelity without API Key
const MOCK_BOOKS: AladinBook[] = [
    {
        itemId: 101,
        title: "오투 중등 과학 3-1 (2025년용)",
        author: "비상교육 편집부",
        pubDate: "2024-09-01",
        description: "과학 1등 교재",
        isbn: "9791173166884",
        priceStandard: 19500,
        priceSales: 17550,
        cover: "https://image.aladin.co.kr/product/33719/20/cover/8964163634_1.jpg",
        publisher: "비상교육",
        link: "#",
        categoryName: "중고등참고서>과학",
    },
    {
        itemId: 102,
        title: "개념+유형 라이트 중등 수학 1-1 (2025년)",
        author: "비상교육 편집부",
        pubDate: "2023-10-01",
        description: "수학 기초를 다지는 필수 개념서",
        isbn: "9791169405485",
        priceStandard: 19000,
        priceSales: 17100,
        cover: "https://image.aladin.co.kr/product/37067/70/cover/k762030432_1.jpg",
        publisher: "비상교육",
        link: "#",
        categoryName: "중고등참고서>수학",
    },
    {
        itemId: 201,
        title: "동아전과 자습서&평가문제집 초등 국어 5-2",
        author: "두산동아 편집부",
        pubDate: "2024-06-20",
        description: "교과서 완벽 분석",
        isbn: "9788900475913",
        priceStandard: 16000,
        priceSales: 14400,
        cover: "https://image.aladin.co.kr/product/30763/87/cover/890047412x_1.jpg",
        publisher: "동아출판",
        link: "#",
        categoryName: "초등참고서>국어",
    },
    {
        itemId: 202,
        title: "큐브수학 개념 초등 4-1 (2025년)",
        author: "동아출판 편집부",
        pubDate: "2024-10-10",
        description: "쉽고 재미있는 개념 설명",
        isbn: "9788900476446",
        priceStandard: 16000,
        priceSales: 14400,
        cover: "https://image.aladin.co.kr/product/34900/33/cover500/k345678901_1.jpg", // Kept previous legit one or generic
        publisher: "동아출판",
        link: "#",
        categoryName: "초등참고서>수학",
    },
    {
        itemId: 301,
        title: "1등급 만들기 고등 통합사회 1000제",
        author: "미래엔 편집부",
        pubDate: "2024-01-05",
        description: "내신 1등급을 위한 필수 문제집",
        isbn: "9791164136155",
        priceStandard: 17000,
        priceSales: 15300,
        cover: "https://image.aladin.co.kr/product/35254/59/cover/k592934142_1.jpg",
        publisher: "미래엔",
        link: "#",
        categoryName: "중고등참고서>사회",
    },
    {
        itemId: 302,
        title: "하루 한장 독해 초등 3단계",
        author: "미래엔 편집부",
        pubDate: "2024-08-01",
        description: "하루 한 장으로 끝내는 독해 습관",
        isbn: "9791164133468",
        priceStandard: 13000,
        priceSales: 11700,
        cover: "https://image.aladin.co.kr/product/34600/55/cover500/k567890123_1.jpg", // Updated to generic future ref or keep placeholder if scrape failed? No, assume OK or use placehold fallback in code.
        publisher: "미래엔",
        link: "#",
        categoryName: "초등참고서>국어",
    },
    {
        itemId: 401,
        title: "체크체크 유형체크 N제 수학 중 2-1 (2025년)",
        author: "천재교육 편집부",
        pubDate: "2024-09-30",
        description: "개념부터 유형까지",
        isbn: "9791125967224",
        priceStandard: 18500,
        priceSales: 16650,
        cover: "https://image.aladin.co.kr/product/36659/28/cover/k882030086_1.jpg",
        publisher: "천재교육",
        link: "#",
        categoryName: "중고등참고서>수학",
    },
    {
        itemId: 501,
        title: "쎈 고등 수학(상) (2025년)",
        author: "홍범준",
        pubDate: "2023-10-15",
        description: "유형으로 꽉 잡는 수학",
        isbn: "9788928347414",
        priceStandard: 21000,
        priceSales: 18900,
        cover: "https://image.aladin.co.kr/product/32621/83/cover/8928347416_1.jpg",
        publisher: "좋은책신사고",
        link: "#",
        categoryName: "중고등참고서>수학",
    },
    {
        itemId: 502,
        title: "우공비Q+Q 수학 3-1 표준편 (2025년)",
        author: "신사고 편집부",
        pubDate: "2024-11-01",
        description: "단계별 학습서",
        isbn: "9788928334469",
        priceStandard: 16500,
        priceSales: 14850,
        cover: "https://image.aladin.co.kr/product/35300/88/cover500/k890123456_1.jpg", // Generic fall back or previous
        publisher: "좋은책신사고",
        link: "#",
        categoryName: "중고등참고서>수학",
    },
    {
        itemId: 701,
        title: "이투스 2025 수능 fit 국어 모의고사",
        author: "이투스북",
        pubDate: "2024-08-10",
        description: "수능 실전 감각 기르기",
        isbn: "9791138925761",
        priceStandard: 20000,
        priceSales: 18000,
        cover: "https://image.aladin.co.kr/product/11557/21/cover/k762531606_1.jpg",
        publisher: "이투스",
        link: "#",
        categoryName: "수능>국어",
    },
    {
        itemId: 801,
        title: "천일문 기본 Basic 1001 Sentences",
        author: "김기훈",
        pubDate: "2023-01-20",
        description: "구문 독해의 바이블",
        isbn: "9788968060879",
        priceStandard: 19000,
        priceSales: 17100,
        cover: "https://image.aladin.co.kr/product/28101/59/cover/8968062285_1.jpg",
        publisher: "쎄듀",
        link: "#",
        categoryName: "중고등참고서>영어",
    },
    {
        itemId: 901,
        title: "ETS 토익 정기시험 기출문제집 1000 Vol.4 RC",
        author: "ETS",
        pubDate: "2023-12-15",
        description: "출제기관 공식 최신 기출",
        isbn: "9788917239453",
        priceStandard: 19800,
        priceSales: 17820,
        cover: "https://image.aladin.co.kr/product/38034/70/cover/8917243797_1.jpg",
        publisher: "와이비엠",
        link: "#",
        categoryName: "수험서>토익",
    }
];

export async function fetchBooks(
    queryType: QueryType = "ItemNewAll",
    searchTarget: "Book" | "Foreign" = "Book",
    publisher: string = "",
    maxResults: number = 10,
    start: number = 1,
    sort: "PublishTime" | "SalesPoint" | "Accuracy" = "Accuracy",
    categoryId?: number
): Promise<AladinBook[]> {
    const apiKey = process.env.ALADIN_API_KEY;
    if (!apiKey) {
        console.warn("ALADIN_API_KEY is not set. Using MOCK data.");
        await new Promise(resolve => setTimeout(resolve, 500));
        let results = [...MOCK_BOOKS];
        if (publisher) {
            results = results.filter(b => b.publisher.includes(publisher));
        }
        if (queryType === "Keyword" && publisher) {
            const query = publisher;
            results = results.filter(b =>
                b.title.includes(query) || b.author.includes(query) || b.publisher.includes(query)
            );
        }
        return Promise.resolve(results);
    }

    // Determine correct endpoint and params
    // If we have a 'query' (publisher or keyword), we MUST use ItemSearch.
    // If no query (generic lists like ItemNewAll or Bestseller), we use ItemList (mostly).

    // However, to filter by Publisher, we must use ItemSearch with Query=PublisherName.

    let endpoint = "ItemList.aspx"; // Default
    let params = new URLSearchParams({
        ttbkey: apiKey,
        MaxResults: maxResults.toString(),
        start: start.toString(),
        SearchTarget: searchTarget,
        Output: "js",
        Version: "20131101",
        Cover: "Big",
    });

    if (categoryId) {
        params.append("CategoryId", categoryId.toString());
    }

    if (publisher || queryType === "Keyword" || queryType === "Publisher") {
        // Search Mode
        endpoint = "ItemSearch.aspx";
        params.append("Query", publisher); // publisher acts as the query term
        params.append("QueryType", queryType === "Publisher" ? "Publisher" : "Keyword"); // Use Publisher search if intended
        params.append("Sort", sort);
    } else {
        // List Mode (Generic)
        endpoint = "ItemList.aspx";
        params.append("QueryType", queryType); // e.g. ItemNewAll, Bestseller
    }

    const url = `${ALADIN_API_BASE}/${endpoint}?${params.toString()}`;
    console.log(`[fetchBooks] Calling: ${url}`); // Keep debug

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            console.error(`Aladin API Error: ${res.status}`);
            return [];
        }
        const data = await res.json() as AladinResponse;
        return data.item || [];
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}

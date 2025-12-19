import styles from "./page.module.css";
import { fetchBooks, fetchCompetitorsBooks } from "@/lib/aladin-client";
import Spotlight from "@/components/Spotlight";
import SideNav from "@/components/SideNav";
import BookRows from "@/components/BookRows";

export const dynamic = 'force-dynamic'; // Ensure we don't cache static pages since we have search inputs

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const publisher = typeof params.publisher === 'string' ? params.publisher : '';
  const query = typeof params.q === 'string' ? params.q : '';

  // Data Fetching
  let rows: Array<{
    title: string;
    books: import("@/lib/aladin-client").AladinBook[];
    showRank?: boolean;
  }> = [];

  if (query) {
    // 1. Search Mode
    const searchResults = await fetchBooks('Publisher', query, 20);
    rows = [{ title: `'${query}' 검색 결과`, books: searchResults }];
  } else if (publisher) {
    // 2. Specific Publisher Mode -> Split by School Level
    const [elem, mid, high] = await Promise.all([
      fetchBooks('Publisher', publisher, 12, 1, 'PublishTime', 50246),
      fetchBooks('Publisher', publisher, 12, 1, 'PublishTime', 76000),
      fetchBooks('Publisher', publisher, 12, 1, 'PublishTime', 76001)
    ]);
    rows = [
      { title: "초등 참고서 NEW", books: elem },
      { title: "중등 참고서 NEW", books: mid },
      { title: "고등 참고서 NEW", books: high }
    ];
  } else {
    // 3. Default "Integrated" Mode (7 Rows - 3 Weekly Best + 3 New Releases)
    const [elemNew, midNew, highNew, elemBest, midBest, highBest] = await Promise.all([
      // New Releases for each level
      fetchBooks('ItemNewAll', 'Book', '', 12, 1, 'PublishTime', 50246),
      fetchBooks('ItemNewAll', 'Book', '', 12, 1, 'PublishTime', 76000),
      fetchBooks('ItemNewAll', 'Book', '', 12, 1, 'PublishTime', 76001),
      // Weekly Best 10 for each level
      fetchBooks('Bestseller', 'Book', '', 10, 1, 'SalesPoint', 50246),
      fetchBooks('Bestseller', 'Book', '', 10, 1, 'SalesPoint', 76000),
      fetchBooks('Bestseller', 'Book', '', 10, 1, 'SalesPoint', 76001),
    ]);

    rows = [
      { title: "초등 참고서 주간 BEST 10", books: elemBest, showRank: true },
      { title: "중등 참고서 주간 BEST 10", books: midBest, showRank: true },
      { title: "고등 참고서 주간 BEST 10", books: highBest, showRank: true },
      { title: "초등 참고서 NEW", books: elemNew },
      { title: "중등 참고서 NEW", books: midNew },
      { title: "고등 참고서 NEW", books: highNew }
    ];
  }

  const titleText = query
    ? `'${query}' SEARCH RESULTS`
    : publisher
      ? `${publisher} NEW RELEASES`
      : '참고서 NEW RELEASES';

  return (
    <div className={styles.mainContainer}>
      <Spotlight />

      {/* Left Column: Title & Nav */}
      <div className={styles.sideColumn}>
        <h1 className={styles.bigTitle}>Book<br />Scope</h1>
        <div className={styles.subTitle}>{titleText}</div>
        <SideNav />
      </div>

      {/* Right Column: Rows handled by Client Component */}
      <BookRows rows={rows} />
    </div>
  );
}

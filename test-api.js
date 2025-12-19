// Test script to verify Aladin API QueryTypes for Elementary Special Bestsellers
const fs = require('fs');


// Read API key from .env.local
let ALADIN_API_KEY;
try {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const match = envContent.match(/ALADIN_API_KEY=(.+)/);
    ALADIN_API_KEY = match ? match[1].trim() : null;
} catch (e) {
    console.error('Failed to read .env.local:', e.message);
}


async function testAPI(queryType, categoryId, description) {
    const params = new URLSearchParams({
        ttbkey: ALADIN_API_KEY,
        QueryType: queryType,
        MaxResults: "5",
        SearchTarget: "Book",
        Output: "js",
        Version: "20131101",
        Cover: "Big",
    });

    if (categoryId) {
        params.append("CategoryId", categoryId.toString());
    }

    const url = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?${params.toString()}`;

    console.log(`\n========================================`);
    console.log(`Testing: ${description}`);
    console.log(`URL: ${url}`);
    console.log(`========================================`);

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(`Total Results: ${data.totalResults}`);
        console.log(`Category: ${data.searchCategoryName || 'N/A'}`);
        console.log(`\nFirst 3 books:`);

        if (data.item && data.item.length > 0) {
            data.item.slice(0, 3).forEach((book, idx) => {
                console.log(`  ${idx + 1}. ${book.title}`);
                console.log(`     Publisher: ${book.publisher}`);
                console.log(`     Category: ${book.categoryName}`);
                console.log(`     Sales Point: ${book.salesPoint || 'N/A'}`);
            });
        } else {
            console.log(`  No books found!`);
        }
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
}

async function main() {
    if (!ALADIN_API_KEY) {
        console.error("ERROR: ALADIN_API_KEY is missing");
        process.exit(1);
    }

    // Test different QueryTypes for elementary books (category 50246)
    await testAPI("ItemNewAll", 50246, "신간 전체 (ItemNewAll) - 초등참고서");
    await testAPI("ItemNewSpecial", 50246, "주목할만한 신간 (ItemNewSpecial) - 초등참고서");
    await testAPI("Bestseller", 50246, "베스트셀러 (Bestseller) - 초등참고서");

    // Also test without category to see what we get
    await testAPI("ItemNewSpecial", null, "주목할만한 신간 (ItemNewSpecial) - 전체");
}

main();

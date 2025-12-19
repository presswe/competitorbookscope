const { ALADIN_API_KEY } = process.env;
if (!ALADIN_API_KEY) {
  process.stdout.write("ERROR: ALADIN_API_KEY is missing\n");
  process.exit(1);
}

async function searchCategory(query) {
  const params = new URLSearchParams({
    ttbkey: ALADIN_API_KEY,
    Query: query,
    QueryType: "Keyword",
    MaxResults: "1",
    SearchTarget: "Book",
    Output: "js",
    Version: "20131101"
  });
  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?${params.toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.item && data.item.length > 0) {
      process.stdout.write(`Query: ${query} -> CategoryId: ${data.searchCategoryId}, CategoryName: ${data.searchCategoryName}\n`);
      process.stdout.write(`First Item Category: ${data.item[0].categoryName}\n`);
    } else {
      process.stdout.write(`Query: ${query} -> No items found\n`);
    }
  } catch (e) {
    process.stdout.write(`Query: ${query} -> Error: ${e.message}\n`);
  }
}

async function main() {
  await searchCategory("초등참고서");
  await searchCategory("중학교참고서");
  await searchCategory("고등학교참고서");
}
main();

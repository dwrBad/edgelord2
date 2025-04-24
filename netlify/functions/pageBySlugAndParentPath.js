export async function handler(event, _context) {
    const slug = event.queryStringParameters.slug ?? "";
    const parentPath = event.queryStringParameters.parentPath ?? "/";
    const PUBLISHER_HOST = 'https://dev.cf.skoda-auto.com'
    const persistedQuery = `test-site/pageBySlugAndParentPath%2BparentPath%3D%2Fcontent%2Fdam%2Fskoda-auto-dirk%2F${parentPath}%3Bslug%3D%2Fimprint;`
    const res = await fetch(`${PUBLISHER_HOST}/graphql/execute.json/${persistedQuery}%2BparentPath%3D%2Fcontent%2Fdam%2Fskoda-auto-dirk%2F%2F%3Bslug%3D%2F${slug};`, {});

    if (!res.ok) {
        return {
            statusCode: res.status,
            body: JSON.stringify({error: "Failed to fetch from AEM"}),
        };
    }

    const data = await res.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // for local dev
        },
    };
}

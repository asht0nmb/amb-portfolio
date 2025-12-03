// app/api/literal/route.ts
import { NextResponse } from 'next/server';

// Dummy export to satisfy TypeScript while code is commented out
export async function GET() {
  return NextResponse.json({ disabled: true });
}

// // Commented out implementation below:

// const LITERAL_GRAPHQL_URL = 'https://literal.club/graphql/';

// // Book fragment for consistent data shape
// const BOOK_PARTS = `
//   fragment BookParts on Book {
//     id
//     slug
//     title
//     cover
//     pageCount
//     gradientColors
//     authors {
//       id
//       name
//     }
//   }
// `;

// // Get books by reading status
// const BOOKS_BY_STATUS_QUERY = `
//   ${BOOK_PARTS}
//   query booksByReadingStateAndProfile(
//     $limit: Int!
//     $offset: Int!
//     $readingStatus: ReadingStatus!
//     $profileId: String!
//   ) {
//     booksByReadingStateAndProfile(
//       limit: $limit
//       offset: $offset
//       readingStatus: $readingStatus
//       profileId: $profileId
//     ) {
//       ...BookParts
//     }
//   }
// `;

// // Get profile by handle (to get profileId)
// const PROFILE_QUERY = `
//   query getProfile($handle: String!) {
//     profile(where: { handle: $handle }) {
//       id
//       handle
//       name
//     }
//   }
// `;

// async function literalFetch(query: string, variables: Record<string, any>, token?: string) {
//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//   };
  
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const response = await fetch(LITERAL_GRAPHQL_URL, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({ query, variables }),
//     next: { revalidate: 3600 } // Cache for 1 hour
//   });

//   if (!response.ok) {
//     throw new Error(`Literal API error: ${response.status}`);
//   }

//   const data = await response.json();
  
//   if (data.errors) {
//     throw new Error(data.errors[0]?.message || 'GraphQL error');
//   }

//   return data.data;
// }

// export async function GET() {
//   try {
//     const token = process.env.LITERAL_TOKEN;
//     const profileId = process.env.LITERAL_PROFILE_ID;
    
//     if (!token || !profileId) {
//       return NextResponse.json(
//         { error: 'Missing Literal credentials' },
//         { status: 500 }
//       );
//     }

//     // Fetch currently reading (limit 2)
//     const currentlyReadingData = await literalFetch(
//       BOOKS_BY_STATUS_QUERY,
//       {
//         limit: 2,
//         offset: 0,
//         readingStatus: 'IS_READING',
//         profileId,
//       },
//       token
//     );

//     // Fetch recently finished (limit 2)
//     const finishedData = await literalFetch(
//       BOOKS_BY_STATUS_QUERY,
//       {
//         limit: 2,
//         offset: 0,
//         readingStatus: 'FINISHED',
//         profileId,
//       },
//       token
//     );

//     return NextResponse.json({
//       currentlyReading: currentlyReadingData.booksByReadingStateAndProfile[0] || null,
//       justRead: finishedData.booksByReadingStateAndProfile || [],
//     });
//   } catch (error) {
//     console.error('Literal API error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch reading data' },
//       { status: 500 }
//     );
//   }
// }
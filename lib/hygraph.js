export async function fetchAPI(query, { variables = {} } = {}) {
    try {
        const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!res.ok) {
            // Log error response from Hygraph
            const errorText = await res.text();
            console.error('Error response:', errorText);
            throw new Error(`Network error: ${res.status} - ${res.statusText}`);
        }

        const json = await res.json();

        if (json.errors) {
            console.error(json.errors);
            throw new Error(`GraphQL error: ${json.errors[0].message}`);
        }

        return json.data;
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
}

// Common GraphQL fragments
const SECTIONS_FRAGMENT = `
  sections {
    __typename
    ... on PriceSection {
        id
        title
        text {
          html
        }
        sessions {
          description
          price
          sessionTitle
        }
    }
    ... on ContainerSection {
      id
      title
      cards {
        title
        description
        asset {
          altText
          fileName
          height
          mimeType
          size
          url
          width
        }
        link {
          slug
          homePage
        }
      }
    }
    ... on TestimonialSection {
      id
      nameAndAge
      testimonial
    }
    ... on MainSection {
      id
      alignment
      sectionAsset {
        altText
        fileName
        height
        mimeType
        size
        url
        width
      }
      sectionLink {
        __typename
        ... on ExternalLink {
          id
          linkText
          stage
          urlLink
        }
        ... on InternalLink {
          id
          linkText
          page {
            slug
            title
          }
        }
      }
      title
      useTitleOnWebsite
      sectionText {
        html
      }
    }
    ... on HeroSection {
      id
      asset {
        altText
        fileName
        height
        id
        mimeType
        size
        url
        width
      }
      link {
        __typename
        ... on ExternalLink {
          id
          linkText
          urlLink
        }
        ... on InternalLink {
          id
          linkText
          page {
            slug
            title
          }
        }
      }
      title
    }
  }
`;

const MENU_FRAGMENT = `
  menu {
    menuItem {
      text
      pages {
        slug
        title
        homePage
      }
    }
  }
`;

const FOOTER_FRAGMENT = `
  footer {
    bottomTextArea {
      html
    }
    textArea {
      html
    }
    menu {
      title
      menuItem {
        pages {
          homePage
          slug
        }
        text
      }
    }
  }
`;

// Fetch home page content
export function getHomePageContent() {
    const query = `
      query HomePageContent {
        page(where: {homePage: true}) {
          title
          description
          slug
          ${SECTIONS_FRAGMENT}
          ${MENU_FRAGMENT}
          ${FOOTER_FRAGMENT}
        }
      }
    `;

    return fetchAPI(query);
}

// Fetch home page content
export async function getPageBySlug(slug) {
    const query = `
      query GetPageBySlug($slug: String!) {
        page(where: { slug: $slug }) {
          title
          description
          slug
          ${SECTIONS_FRAGMENT}
          ${MENU_FRAGMENT}
          ${FOOTER_FRAGMENT}
        }
      }
    `;

    const variables = { slug };
    try {
        const { page } = await fetchAPI(query, { variables });
        return page || null;
    } catch (error) {
        console.error('Error fetching page by slug:', error);
        return null;
    }
}

// Fetch all pages
export async function getAllPages() {
    const query = `
      query GetAllPages {
        pages {
          slug
        }
      }
    `;

    try {
        // Call the fetchAPI function with the query
        const { pages } = await fetchAPI(query);

        // Return the pages data
        return pages || [];
    } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
    }
}
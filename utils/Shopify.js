async function fetchProducts() {
    const response = await fetch(
      'https://faux-nostalgia-1.myshopify.com/api/2023-04/graphql.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: `
            query {
                products(first: 2) {
                  edges {
                    node {
                      id
                      title
                      description
                      handle
                      images(first: 3) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                      variants(first: 3) {
                        edges {
                          node {
                            title
                            price {amount}
                            availableForSale
                          }
                        }
                      }
                    }
                  }
                }
            }
          `,
        }),
      }
    );
  
    const { data } = await response.json();
  
    const products = data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      imageSrc: node.images.edges[0]?.node.url ?? '',
      imageSrc1: node.images.edges[1]?.node.url ?? '',
      imageSrc2: node.images.edges[2]?.node.url ?? '',
      variants: node.variants.edges.map(({ node }) => ({
        title: node.title,
        price: node.price.amount,
        availableForSale: node.availableForSale
      })),
    }));
  
    return products;
  }

  export { fetchProducts };
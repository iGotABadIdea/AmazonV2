import Head from 'next/head'
import Header from "../src/components/Header"
import Banner from "../src/components/Banner"
import ProductFeed from "../src/components/ProductFeed"

export default function Home ( { products } ) {
  return (
    <div className="bg-gray-100 ">
      <Head>
        <title>Amazon 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        <ProductFeed products={ products } />
      </main>
    </div>
  );
}

export async function getStaticProps () {
  let products = [];
  let error = "";
  try {
    const res = await fetch(
      "https://fakestoreapi.com/products",
      {
        method: "GET",
        headers: {
          // update with your user-agent
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          Accept: "application/json; charset=UTF-8",
        },
      }
    );

    products = await res.json();
  } catch ( e ) {
    error = e.toString();
  }

  return {
    props: {
      products,
      error,
    },
  };
}

//https://fakestoreapi.com/products
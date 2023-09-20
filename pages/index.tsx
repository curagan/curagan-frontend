import { NextPage } from "next";
import Head from "next/head";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>curagan</title>
        <meta name="description" content="curagan" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hello World</h1>
      </div>
    </>
  );
};

export default Index;

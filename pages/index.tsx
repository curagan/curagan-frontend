import { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/Button';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>curagan</title>
        <meta name="description" content="curagan" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Holaa World
        </h1>
        <Button text="Click Me!" onClick={() => alert('Button Clicked!')} />
      </div>
    </>
  );
};

export default Index;

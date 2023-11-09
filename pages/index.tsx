import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/beranda');
  }, []);

  return (
    <>
      <Head>
        <title>Curagan</title>
        <meta name="description" content="curagan" />
      </Head>
    </>
  );
};

export default Index;

import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CgCalculator } from 'react-icons/cg';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Food Macro Conversor</title>
      <meta
        content="Convert your macros from one food to another"
        name="description"
      />
      <link href="/favicon.ico" rel="icon" />
    </Head>

    <main className={styles.main}>
      <h2 className={styles.title}>Food macro conversor</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <Link href="/food-equivalence">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <h2>Food calculator</h2>
              <CgCalculator />
            </a>
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});

export default Home;

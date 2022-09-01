import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CgCalculator } from 'react-icons/cg';
import Head from 'next/head';
import Link from 'next/link';
import { TbChartArcs } from 'react-icons/tb';
import { StHomeContainer } from '../styles/Home.styled';

const Home: NextPage = () => (
  <StHomeContainer>
    <Head>
      <title>Macro Conversor</title>
      <meta
        content="Convert your macros from one food to another"
        name="description"
      />
      <link href="/favicon.ico" rel="icon" />
    </Head>

    <main className="main">
      <h2 className="title home__brandTitle">
        <span className="home__brandIcon">
          <TbChartArcs />
        </span>
        <span>Macro Conversor</span>
      </h2>
      <div className="grid">
        <div className="card">
          <Link href="/equivalence">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <h2>Food calculator</h2>
              <CgCalculator />
            </a>
          </Link>
        </div>
      </div>
    </main>
  </StHomeContainer>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});

export default Home;

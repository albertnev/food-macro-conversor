import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CgCalculator, CgInfo } from 'react-icons/cg';
import Head from 'next/head';
import Link from 'next/link';
import { TbChartArcs } from 'react-icons/tb';
import { FaBalanceScale } from 'react-icons/fa';
import { BiGitCompare } from 'react-icons/bi';
import { useTranslation } from 'next-i18next';

import { StHomeContainer } from '../styles/Home.styled';

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <StHomeContainer>
      <Head>
        <title>Macro Conversor</title>
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
                <h2>{t('equivalence')}</h2>
                <FaBalanceScale />
              </a>
            </Link>
          </div>
          <div className="card">
            <Link href="/comparator">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <h2>{t('comparator')}</h2>
                <BiGitCompare />
              </a>
            </Link>
          </div>
          <div className="card">
            <Link href="/calculator">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <h2>{t('calculator')}</h2>
                <CgCalculator />
              </a>
            </Link>
          </div>
          <div className="card">
            <Link href="/about">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <h2>{t('aboutApp')}</h2>
                <CgInfo />
              </a>
            </Link>
          </div>
        </div>
      </main>
    </StHomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});

export default Home;

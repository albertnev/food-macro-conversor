import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { CgCalculator, CgDatabase } from 'react-icons/cg';
import { GiOrange } from 'react-icons/gi';
import { BiGitCompare } from 'react-icons/bi';
import { FaBalanceScale } from 'react-icons/fa';

import { PageWithMenu } from '../components/PageWithMenu';
import { StAboutContainer } from '../styles/About.styled';
import { Collapsible } from '../components/Collapsible';

const About: NextPage = () => {
  const { t } = useTranslation('about');

  return (
    <PageWithMenu>
      <Head>
        <title>Macro Conversor - {t('common:aboutApp')}</title>
      </Head>
      <StAboutContainer>
        <Collapsible
          id="responsability-disclaimer"
          title={t('responsabilityDisclaimer.title')}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: t('responsabilityDisclaimer.fiabilityWarning'),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t('responsabilityDisclaimer.userIsResponsible'),
            }}
          />
        </Collapsible>
        <Collapsible
          id="objectives-and-development"
          title={t('objectivesAndDev.title')}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: t('objectivesAndDev.withoutProfit'),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t('objectivesAndDev.completelyFunctional'),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t('objectivesAndDev.freeHosting'),
            }}
          />
        </Collapsible>
        <Collapsible
          id="app-functionalities"
          title={t('appFunctionalities.title')}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: t('appFunctionalities.functionalitiesAim'),
            }}
          />
          <ul className="about__list">
            <li className="about__listItem">
              <span className="about__itemName">
                <span className="about__itemIcon">
                  <FaBalanceScale />
                </span>
                {t('common:equivalence')}:
              </span>{' '}
              <span>{t('appFunctionalities.equivalenceDescription')}</span>
            </li>
            <li className="about__listItem">
              <span className="about__itemName">
                <span className="about__itemIcon">
                  <BiGitCompare />
                </span>
                {t('common:comparator')}:
              </span>{' '}
              <span>{t('appFunctionalities.comparatorDescription')}</span>
            </li>
            <li className="about__listItem">
              <span className="about__itemName">
                <span className="about__itemIcon">
                  <CgCalculator />
                </span>
                {t('common:calculator')}:
              </span>{' '}
              <span>{t('appFunctionalities.calculatorDescription')}</span>
            </li>
          </ul>
        </Collapsible>
        <Collapsible id="data-sources" title={t('dataSources.title')}>
          <p
            dangerouslySetInnerHTML={{
              __html: t('dataSources.noManipulation'),
            }}
          />
          <ul className="about__list">
            <li className="about__listItem">
              <span className="about__itemName">
                <span className="about__itemIcon">
                  <CgDatabase />
                </span>{' '}
                <span>BEDCA:</span>
              </span>{' '}
              <span>{t('dataSources.bedcaDescription')}</span>
            </li>
            <li className="about__listItem">
              <span className="about__itemName">
                <span className="about__itemIcon">
                  <GiOrange />
                </span>{' '}
                <span>Open Food Facts:</span>
              </span>{' '}
              <span>{t('dataSources.openfoodfactsDescription')}</span>
            </li>
          </ul>
          <p
            dangerouslySetInnerHTML={{
              __html: t('dataSources.identifyingSource'),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t('dataSources.databaseNotResponding'),
            }}
          />
        </Collapsible>
      </StAboutContainer>
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common', 'about'])),
  },
});

export default About;

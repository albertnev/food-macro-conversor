import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { FoodSelector } from '../components/FoodSelector';
import { PageWithMenu } from '../components/PageWithMenu';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FormWizardSteps } from '../components/FormWizardSteps';
import { FoodCalculator } from '../components/FoodCalculator';

const FoodEquivalence: NextPage = () => {
  const { t } = useTranslation();
  const [selectedFood, setSelectedFood] = useState<FoodDetailsTd>();
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <PageWithMenu
      precontent={
        <FormWizardSteps
          activeStep={activeStep}
          steps={[
            { completed: !!selectedFood, name: t('selectFood') },
            { name: t('calculator') },
          ]}
        />
      }
    >
      <Head>
        <title>Macro Conversor - {t('calculator')}</title>
      </Head>
      {activeStep === 0 && (
        <FoodSelector
          onSelectFood={(food) => {
            setSelectedFood(food);
            setActiveStep((current) => current + 1);
          }}
        />
      )}
      {activeStep === 1 && (
        <FoodCalculator
          selectedFood={selectedFood!}
          onChangeFood={() => setActiveStep(0)}
        />
      )}
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default FoodEquivalence;

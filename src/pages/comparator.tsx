import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { FoodSelector } from '../components/FoodSelector';
import { PageWithMenu } from '../components/PageWithMenu';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FormWizardSteps } from '../components/FormWizardSteps';
import { FoodComparator } from '../components/FoodComparator';

const FoodEquivalence: NextPage = () => {
  const { t } = useTranslation();
  const [selectedFoods, setSelectedFoods] = useState<FoodDetailsTd[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const changeFood = (food: FoodDetailsTd) => {
    let foodIndex;
    selectedFoods.some((f, i) => {
      if (f.id === food.id) {
        foodIndex = i;
        return true;
      }
      return false;
    });

    if (foodIndex !== undefined) setActiveStep(foodIndex);
  };

  const editSelectedFoods = (food: FoodDetailsTd, index: number) => {
    setSelectedFoods((current) => {
      const cur = [...current];
      cur[index] = food;
      return cur;
    });
  };

  const nextStepIfNeeded = () => {
    if (activeStep === 0 && selectedFoods?.[1]) {
      setActiveStep(2);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <PageWithMenu
      precontent={
        <FormWizardSteps
          activeStep={activeStep}
          steps={[
            { completed: !!selectedFoods?.[0], name: t('firstFood') },
            { completed: !!selectedFoods?.[1], name: t('secondFood') },
            { name: t('comparative') },
          ]}
        />
      }
    >
      <Head>
        <title>{`Macro Conversor - ${t('comparator')}`}</title>
      </Head>
      {activeStep === 0 && (
        <FoodSelector
          onSelectFood={(food) => {
            editSelectedFoods(food, 0);
            nextStepIfNeeded();
          }}
        />
      )}
      {activeStep === 1 && (
        <FoodSelector
          onSelectFood={(food) => {
            editSelectedFoods(food, 1);
            nextStepIfNeeded();
          }}
        />
      )}
      {activeStep === 2 && (
        <FoodComparator
          foodsToCompare={selectedFoods}
          onChangeFood={changeFood}
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

import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';

import { FoodSelector } from '../components/FoodSelector';
import { PageWithMenu } from '../components/PageWithMenu';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodEquivalence as FoodEquivalenceComponent } from '../components/FoodEquivalence';
import { PossibleMacrosKcalsTd } from '../types/PossibleMacrosKcalsTd';

const FoodEquivalence: NextPage = () => {
  const [selectedFoods, setSelectedFood] = useState<FoodDetailsTd[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [sourceGrams, setSourceGrams] = useState<number>(100);
  const [selectedMacros, setSelectedMacros] = useState<PossibleMacrosKcalsTd[]>(
    [],
  );

  const editSelectedFood = (food: FoodDetailsTd, index: number) => {
    setSelectedFood((current) => {
      const cur = [...current];
      cur[index] = food;
      return cur;
    });
  };

  return (
    <PageWithMenu>
      {activeStep === 0 && (
        <FoodSelector
          onSelectFood={(food) => {
            editSelectedFood(food, 0);
            setActiveStep(1);
          }}
        />
      )}
      {activeStep === 1 && (
        <FoodSelector
          onSelectFood={(food) => {
            editSelectedFood(food, 1);
            setActiveStep(2);
          }}
        />
      )}
      {activeStep === 2 && (
        <FoodEquivalenceComponent
          foodsToCompare={selectedFoods}
          quantity={sourceGrams}
          selectedMacros={selectedMacros}
          onMacrosChange={setSelectedMacros}
          onQuantityChange={setSourceGrams}
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

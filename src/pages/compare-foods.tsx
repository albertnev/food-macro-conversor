import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { FoodSelector } from '../components/FoodSelector';
import { PageWithMenu } from '../components/PageWithMenu';

const CompareFoods: NextPage = () => (
  <PageWithMenu>
    <FoodSelector onSelectFood={(food) => console.log(food)} />
  </PageWithMenu>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default CompareFoods;

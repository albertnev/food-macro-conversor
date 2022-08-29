import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FoodSearchResultTd } from '../../../types/FoodSearchResultTd';

import { FoodList } from '../../FoodList';
import { Input } from '../../Input';
import styles from '../FoodSelector.module.scss';

interface SearchFoodProps {
  foodList?: FoodSearchResultTd[];
  onSearchResponse?: (searchResponse: FoodSearchResultTd[]) => void;
  onSelect: (food: FoodSearchResultTd) => void;
  selectedFoodId?: string;
  title?: string;
}

const SearchFood: React.FC<SearchFoodProps> = ({
  foodList,
  onSearchResponse,
  onSelect,
  selectedFoodId,
  title,
}) => {
  const { t } = useTranslation();
  const [retrievedFoodList, setRetrievedFoodList] = useState(foodList);

  const fetchFoodData = async (text: string) => {
    const resp = await fetch(`/api/food/search?text=${text}`);
    const parsedData = await resp.json();

    onSearchResponse?.(parsedData);
    setRetrievedFoodList(parsedData);
  };

  useEffect(() => {
    if (foodList) setRetrievedFoodList(foodList);
  }, [foodList]);

  return (
    <>
      <h2>{title || t('foodSearch')}</h2>
      <div className={styles.searchContainer}>
        <Input
          icon={<HiSearch />}
          placeholder={t('searchForYourFood')}
          onChange={fetchFoodData}
        />
      </div>
      {!!retrievedFoodList?.length && (
        <FoodList
          foodList={retrievedFoodList}
          selectedFoodId={selectedFoodId}
          onSelect={(food) => onSelect(food)}
        />
      )}
    </>
  );
};

SearchFood.defaultProps = {
  foodList: undefined,
  onSearchResponse: undefined,
  selectedFoodId: '',
  title: '',
};

export default SearchFood;

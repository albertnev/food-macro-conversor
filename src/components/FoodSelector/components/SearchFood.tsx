import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';

import { FoodSearchResultTd } from '../../../types/FoodSearchResultTd';
import { FoodList } from '../../FoodList';
import { Input } from '../../Input';
import { SmallLoader } from '../../SmallLoader';

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
  const [isLoading, setIsLoading] = useState(false);
  const [retrievedFoodList, setRetrievedFoodList] = useState(foodList);

  const fetchFoodData = async (text: string) => {
    setIsLoading(true);
    const resp = await fetch(`/api/food/search?text=${text}`);
    const parsedData = await resp.json();
    setIsLoading(false);

    onSearchResponse?.(parsedData);
    setRetrievedFoodList(parsedData);
  };

  useEffect(() => {
    if (foodList) setRetrievedFoodList(foodList);
  }, [foodList]);

  return (
    <>
      <h2>{title || t('foodSearch')}</h2>
      <div className="searchFood__searchContainer">
        <Input
          className="searchFood__input"
          icon={<HiSearch />}
          placeholder={t('searchForYourFood')}
          onChange={fetchFoodData}
        />
        {isLoading && (
          <div className="searchFood__loaderContainer">
            <SmallLoader />
          </div>
        )}
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

import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import useFetch from '../../../hooks/useFetch';

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
  const {
    data: fetchedFoodList,
    fetchData,
    isLoading,
  } = useFetch<FoodSearchResultTd[]>(`/api/food/search`);
  const [retrievedFoodList, setRetrievedFoodList] = useState(foodList);

  const fetchFoodData = async (text: string) => {
    fetchData(undefined, `?text=${text}`);
  };

  useEffect(() => {
    if (fetchedFoodList) {
      onSearchResponse?.(fetchedFoodList);
      setRetrievedFoodList(fetchedFoodList);
    }
  }, [fetchedFoodList, onSearchResponse]);

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

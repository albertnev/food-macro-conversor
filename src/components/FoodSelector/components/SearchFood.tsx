import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { TbZoomQuestion } from 'react-icons/tb';
import { toast } from 'react-toastify';

import useFetch from '../../../hooks/useFetch';
import { FoodSearchResultTd } from '../../../types/FoodSearchResultTd';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { notifyIfDatabaseError } from '../../../utils/showDatabaseError';
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
  const [alreadySearched, setAlreadySearched] = useState(false);

  const fetchFoodData = async (text: string) => {
    try {
      notifyIfDatabaseError(await fetchData(undefined, `?text=${text}`));
    } catch (err) {
      toast.error(t(getErrorMessage(err)));
    }
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
      <div className="searchFood__searchContainer" data-testid="search-food">
        <Input
          className="searchFood__input"
          icon={<HiSearch />}
          placeholder={t('searchForYourFood')}
          onChange={(val) => {
            fetchFoodData(val);
            setAlreadySearched(!!val);
          }}
        />
        {isLoading && (
          <div className="searchFood__loaderContainer">
            <SmallLoader />
          </div>
        )}
      </div>
      {alreadySearched &&
        fetchedFoodList !== undefined &&
        !fetchedFoodList?.length &&
        !retrievedFoodList?.length && (
          <div
            className="searchFood__noResults"
            data-testid="search-food-no-results"
          >
            <div className="searchFood__noResultsIcon">
              <TbZoomQuestion />
            </div>
            <div>{t('noResultsRetrieved')}</div>
            <div>{t('tryAnotherSearch')}</div>
          </div>
        )}
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

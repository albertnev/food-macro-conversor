import React, { useEffect, useState } from 'react';
import { FoodDataSourcesType } from '../../../constants/foodDataSources';
import useFetch from '../../../hooks/useFetch';
import { FoodDetailsTd } from '../../../types/FoodDetailsTd';
import { FoodDetails } from '../../FoodDetails';
import { Loader } from '../../Loader';

interface ShowFoodDetailsProps {
  datasource: FoodDataSourcesType;
  foodDetails?: FoodDetailsTd;
  foodId: string;
  onDetailsLoad?: (foodDetails: FoodDetailsTd) => void;
}

const ShowFoodDetails: React.FC<ShowFoodDetailsProps> = ({
  datasource,
  foodDetails,
  foodId,
  onDetailsLoad,
}) => {
  const {
    data: fetchedFoodData,
    fetchData,
    isLoading,
  } = useFetch<FoodDetailsTd>(`/api/food/getDetails?id=${foodId}`);
  const [foodData, setFoodData] = useState<FoodDetailsTd | undefined>(
    foodDetails,
  );

  useEffect(() => {
    if (!foodDetails || foodDetails.id !== foodId) {
      fetchData({
        headers: { datasource },
      });
    }
  }, [foodId, foodDetails, datasource, fetchData]);

  useEffect(() => {
    if (fetchedFoodData) {
      setFoodData(fetchedFoodData);
      onDetailsLoad?.(fetchedFoodData);
    }
  }, [fetchedFoodData, onDetailsLoad]);

  return (
    <>
      {isLoading && <Loader />}
      {foodData && <FoodDetails food={foodData} />}
    </>
  );
};

ShowFoodDetails.defaultProps = {
  foodDetails: undefined,
  onDetailsLoad: undefined,
};

export default ShowFoodDetails;

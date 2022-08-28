import React, { useEffect, useState } from 'react';
import { FoodDataSourcesType } from '../../../constants/foodDataSources';
import { FoodDetailsTd } from '../../../types/FoodDetailsTd';
import { FoodDetails } from '../../FoodDetails';

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
  const [foodData, setFoodData] = useState<FoodDetailsTd | undefined>(
    foodDetails,
  );

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const resp = await fetch(`/api/food/getDetails?id=${foodId}`, {
        headers: { datasource },
      });
      const parsedData = await resp.json();

      setFoodData(parsedData);
    };

    if (!foodDetails || foodDetails.id !== foodId) {
      fetchFoodDetails();
    }
  }, [foodId, foodDetails, datasource]);

  useEffect(() => {
    if (foodData) onDetailsLoad?.(foodData);
  }, [foodData, onDetailsLoad]);

  return (foodData && <FoodDetails food={foodData} />) || null;
};

ShowFoodDetails.defaultProps = {
  foodDetails: undefined,
  onDetailsLoad: undefined,
};

export default ShowFoodDetails;

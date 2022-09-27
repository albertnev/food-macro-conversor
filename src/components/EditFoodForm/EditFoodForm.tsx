import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { Button } from '../Button';
import { MacroDisplay } from '../MacroDisplay';
import { StEditFoodFormContainer } from './EditFoodForm.styled';
import { SimpleInput } from '../SimpleInput';
import { Textarea } from '../Textarea';
import { PossibleMacrosKcalsTd } from '../../types/PossibleMacrosKcalsTd';
import { getEmptyFoodDetails } from '../../utils/getEmptyFoodDetails';

interface EditFoodFormProps {
  className?: string;
  foodDetails?: FoodDetailsTd;
  onSubmit: (editedFood: FoodDetailsTd) => void;
  verticalDisplay?: boolean;
}

const EditFoodForm: React.FC<EditFoodFormProps> = ({
  className,
  foodDetails,
  onSubmit,
  verticalDisplay,
}) => {
  const { t } = useTranslation();

  const [foodData, setFoodData] = useState(
    foodDetails || getEmptyFoodDetails(),
  );

  const onEditMacro = (macro: PossibleMacrosKcalsTd, val: string) =>
    setFoodData((current) => ({
      ...current,
      ...(macro === 'kcals' && { kcals: val }),
      ...(macro !== 'kcals' && {
        macronutrients: {
          ...current.macronutrients,
          [macro]: { ...current.macronutrients[macro], amount: val },
        },
      }),
    }));

  useEffect(() => {
    if (foodDetails) setFoodData(foodDetails);
  }, [foodDetails]);

  return (
    <StEditFoodFormContainer
      className={cx({
        [className!]: !!className,
        editFoodForm__verticalDisplay: verticalDisplay,
        foodDetailsContainer: true,
      })}
      data-testid="edit-food-form"
    >
      <div className="editFoodForm__titleContainer">
        <div
          className="editFoodForm__image"
          data-testid="food-details-image"
          style={{
            backgroundImage: `url(${
              foodData.imageUrl || '/images/foodNotFound.png'
            })`,
          }}
        />
        <div className="editFoodForm__nameContainer">
          <SimpleInput
            className="editFoodForm__input editFoodForm__nameTitle"
            defaultValue={foodData.name}
            placeholder={t('name')}
            onChange={(val) =>
              setFoodData((current) => ({ ...current, name: val }))
            }
          />
          <SimpleInput
            className="editFoodForm__input editFoodForm__brand"
            defaultValue={foodData.brand}
            placeholder={t('brand')}
            onChange={(val) =>
              setFoodData((current) => ({ ...current, brand: val }))
            }
          />
        </div>
      </div>
      <MacroDisplay
        className="editFoodForm__macroDisplay"
        food={foodData}
        verticalDisplay={verticalDisplay}
        onEditMacro={onEditMacro}
      />
      <div className="editFoodForm__ingredientsContainer">
        <div className="editFoodForm__detailTitle">{t('ingredients')}:</div>
        <Textarea
          className="editFoodForm__detailValue"
          defaultValue={foodData.ingredients}
          placeholder={t('ingredients')}
          onChange={(val) =>
            setFoodData((current) => ({ ...current, ingredients: val }))
          }
        />
      </div>
      <Button
        className="editFoodForm__submitButton"
        label={t(foodData.id ? 'edit' : 'create')}
        onClick={() => onSubmit(foodData)}
      />
    </StEditFoodFormContainer>
  );
};

EditFoodForm.defaultProps = {
  className: '',
  foodDetails: undefined,
  verticalDisplay: false,
};

export default EditFoodForm;

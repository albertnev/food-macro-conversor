import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { toast } from 'react-toastify';

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

  const validateForm = () => {
    const emptyName = !foodData.name;
    const emptyMacros = Object.values(foodData.macronutrients).every(
      (macro) => !macro.amount || macro.amount === '0',
    );
    const emptyKcals = !foodData.kcals || foodData.kcals === '0';

    const errorsList = [];

    if (emptyName) {
      errorsList.push(t('errors.foodForm.emptyName'));
    }

    if (emptyMacros) {
      errorsList.push(t('errors.foodForm.emptyMacros'));
    }

    if (emptyKcals) {
      errorsList.push(t('errors.foodForm.emptyKcals'));
    }

    if (errorsList.length) {
      toast.error(
        <>
          <span>{t('errors.foodForm.validationError')}</span>
          <ul>
            {errorsList.map((error) => (
              <li key={`form-validation-error-${error}`}>{error}</li>
            ))}
          </ul>
        </>,
      );
    }

    return errorsList.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(foodData);
    }
  };

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
          <SimpleInput
            className="editFoodForm__input editFoodForm__imageUrl"
            defaultValue={foodData.imageUrl}
            placeholder={t('imageUrl')}
            onChange={(val) =>
              setFoodData((current) => ({ ...current, imageUrl: val }))
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
        label={t(foodData.id ? 'saveChanges' : 'addFood')}
        onClick={handleSubmit}
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

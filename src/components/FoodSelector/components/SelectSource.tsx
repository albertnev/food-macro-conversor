import { useTranslation } from 'next-i18next';
import React from 'react';
import { GiOrange } from 'react-icons/gi';
import { CgDatabase } from 'react-icons/cg';

import {
  foodDataSources,
  FoodDataSourcesType,
} from '../../../constants/foodDataSources';
import { ButtonCard } from '../../ButtonCard';
import styles from '../FoodSelector.module.scss';

interface SelectSourceProps {
  onSelectSource: (source: FoodDataSourcesType) => void;
  selectedSource?: FoodDataSourcesType;
  title?: string;
}

const SelectSource: React.FC<SelectSourceProps> = ({
  onSelectSource,
  selectedSource,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{title || t('selectDataSource')}</h2>
      <div className={styles.foodSourceButtonsContainer}>
        <ButtonCard
          icon={<GiOrange />}
          isActive={selectedSource === foodDataSources.openfoodfacts}
          label={t(`foodDataSources.openfoodfacts`)}
          onClick={() => onSelectSource(foodDataSources.openfoodfacts)}
        />
        <ButtonCard
          icon={<CgDatabase />}
          isActive={selectedSource === foodDataSources.bedca}
          label={t(`foodDataSources.bedca`)}
          onClick={() => onSelectSource(foodDataSources.bedca)}
        />
      </div>
      {selectedSource && (
        <div className={styles.foodSourceDescriptionContainer}>
          <h3>{t(`foodDataSources.${selectedSource}`)}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: t(`foodDataSourcesDescription.${selectedSource}`),
            }}
          />
        </div>
      )}
    </>
  );
};

SelectSource.defaultProps = {
  selectedSource: '',
  title: '',
};

export default SelectSource;

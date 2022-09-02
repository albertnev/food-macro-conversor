import { toast } from 'react-toastify';
import { i18n } from 'next-i18next';

import { databaseErrorCodes } from '../constants/databaseErrorCodes';
import { FetchResponse } from './fetchServer';

export const notifyIfDatabaseError = (response: FetchResponse<any> | null) => {
  if (response?.status) {
    let errorMessage = '';

    if (response.status === databaseErrorCodes.bedca) {
      errorMessage = 'bedcaDatabase';
    } else if (response.status === databaseErrorCodes.openfoodfacts) {
      errorMessage = 'openfoodfactsDatabase';
    }

    if (errorMessage) toast.info(`${i18n?.t(`errors.${errorMessage}`)}`);
  }
};

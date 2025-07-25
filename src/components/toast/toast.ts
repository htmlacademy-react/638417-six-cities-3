import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';
import { selectOfferError } from '../../store/selectors/offer';
import { selectUserError } from '../../store/selectors/user';
import { selectOffersError } from '../../store/selectors/offers';

function ErrorToastHandler() {
  const offersError = useAppSelector(selectOffersError);
  const offerError = useAppSelector(selectOfferError);
  const userError = useAppSelector(selectUserError);

  const lastErrorsRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const errors = {
      offersError,
      offerError,
      userError,
    };

    Object.entries(errors).forEach(([key, error]) => {
      if (error && !lastErrorsRef.current[key]) {
        toast.error(error);
        lastErrorsRef.current[key] = true;
      }

      if (!error && lastErrorsRef.current[key]) {
        lastErrorsRef.current[key] = false;
      }
    });
  }, [offersError, offerError, userError]);

  return null;
}


export default ErrorToastHandler;

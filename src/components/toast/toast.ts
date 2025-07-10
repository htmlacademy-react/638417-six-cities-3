import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';
import { selectOfferError } from '../../store/slices/offer';
import { selectOffersError } from '../../store/slices/offers';
import { selectUserError } from '../../store/slices/user';
import { selectCommentsError } from '../../store/slices/comments';

function ErrorToastHandler() {
  const offersError = useAppSelector(selectOffersError);
  const offerError = useAppSelector(selectOfferError);
  const commentError = useAppSelector(selectCommentsError);
  const userError = useAppSelector(selectUserError);

  const lastErrorsRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const errors = {
      offersError,
      offerError,
      commentError,
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
  }, [offersError, offerError, commentError, userError]);

  return null;
}


export default ErrorToastHandler;

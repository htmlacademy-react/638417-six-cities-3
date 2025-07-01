import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';

function ErrorToastHandler() {
  const offersError = useAppSelector((state) => state.offers.error);
  const userError = useAppSelector((state) => state.user.error);

  const lastErrorRef = useRef<string | null>(null);

  const currentError = offersError || userError;

  useEffect(() => {
    if (currentError && currentError !== lastErrorRef.current) {
      toast.error(currentError);
      lastErrorRef.current = currentError;
    }

    if (!currentError) {
      lastErrorRef.current = null;
    }
  }, [currentError]);

  return null;
}

export default ErrorToastHandler;

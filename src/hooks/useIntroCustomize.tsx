import { useEffect } from 'react';

const useIntroCustomize = () => {

  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = 'hidden';
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = `${window.innerHeight + overflow}px`;
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);

    const onTouchStart = () => {};
    const onTouchMove = () => {};

    document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
    document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.body.style.overflowY = '';
      document.body.style.marginTop = '';
      document.body.style.height = '';
      document.body.style.paddingBottom = '';
      document.documentElement.removeEventListener('touchstart', onTouchStart);
      document.documentElement.removeEventListener('touchmove', onTouchMove);
    };

  }, []);
};

export default useIntroCustomize
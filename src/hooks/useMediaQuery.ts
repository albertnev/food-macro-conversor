import { useEffect, useState } from 'react';

const useMediaQuery = (minWidth: number) => {
  const [state, setState] = useState({
    isSmallerThanWidth: false,
    windowWidth: window.innerWidth,
  });

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isSmallerThanWidth = currentWindowWidth < minWidth;
      setState({
        isSmallerThanWidth,
        windowWidth: currentWindowWidth,
      });
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [state.windowWidth, minWidth]);

  return state.isSmallerThanWidth;
};

export default useMediaQuery;

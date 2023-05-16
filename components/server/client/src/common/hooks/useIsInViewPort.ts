import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

function useIsInViewport(ref: any) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

// const useIsInViewport = (more: boolean, fetchMore: () => void) => {
//   const observer = useRef<IntersectionObserver>();

//   return useCallback((element: any) => {
//     //element is the react element being referenced

//     // disconnect observer set on previous last element
//     if (observer.current) observer.current.disconnect();

//     if (!more) return

//     // set new observer
//     observer.current = new IntersectionObserver((entries) => {
//       // increase page number when element enters (is intersecting with) viewport.
//       // This triggers the pagination hook to fetch more items in the new page
//       if (entries[0].isIntersecting) return true;
//     });

//     // observe/monitor last element
//     if (element) observer.current.observe(element);
//     return false;
//   }, [more]);
// };

export default useIsInViewport;

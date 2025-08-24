import { useEffect, useState } from 'react';

/**
 * Usage:
 *   const ref = useRef(null)
 *   const onScreen = useOnScreen(ref, '-100px')
 */
export default function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref?.current; // capture once for cleanup correctness
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);
    return () => {
      try {
        observer.unobserve(node);
      } finally {
        observer.disconnect();
      }
    };
    // We intentionally don't include `ref` (mutable) as a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin]);

  return isIntersecting;
}

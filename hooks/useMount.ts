import { useEffect, useRef } from 'react';

/**
 * Custom hook that runs a function only once on component mount.
 * @param fn - The function to be executed on mount.
 */
const useMount = (fn: () => void) => {
  // Create a ref to store the function
  const fnRef = useRef(fn);

  // Update the ref to the latest function
  fnRef.current = fn;

  // Run the function on mount
  useEffect(() => fnRef.current(), []);
};

export default useMount;

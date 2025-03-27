import {useEffect, useState} from "react";

/**
 * A custom hook that creates a debounced value from a given value
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
function UseDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default UseDebounce;
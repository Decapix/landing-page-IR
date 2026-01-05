export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (element: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(element)
        } else if (ref && typeof ref === 'object') {
          (ref as React.MutableRefObject<T | null>).current = element
        }
      })
    }
  }
  
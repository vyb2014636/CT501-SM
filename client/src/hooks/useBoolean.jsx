import React, { useCallback, useState } from 'react'

function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((x) => !x), [])

  return [value, setTrue, setFalse, toggle]
}

export default useBoolean

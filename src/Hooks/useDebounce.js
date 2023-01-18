import { useEffect, useState } from 'react' // Импорт компонента

export const useDebounce = (value, ms = 600) => { // Хук (useDebounce) с задержкой 600ms
  const [debounceValue, setDebounceValue] = useState(value) // Хук для приема значен. из поля поиска

  useEffect(() => { // Хук для отработки (setTimeout)
    const timeoutId = setTimeout(() => { // Сущность с функцией отсчёта времени
      setDebounceValue(value) // Запись в Хук если время пришло
    }, ms)

    return () => {
      clearTimeout(timeoutId) // Очистка сущности с счётчиком времени (сброс)
    }
  }, [value]) // Срабатывает на прием значения из поля поиска

  return debounceValue
}

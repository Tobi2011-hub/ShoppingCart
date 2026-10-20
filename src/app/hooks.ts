import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Typed hooks keep Redux selectors and dispatched actions aligned with the store.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

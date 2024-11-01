import { AppDispatch, removeKey, RootState, setKey } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";

export const useShortTermStorage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shortTermStorage = useSelector((state: RootState) => state.storage);

  const setKeyValue = (key: string, value: string) => {
    dispatch(setKey({ key, value }));
  };

  const deleteKey = (key: string) => {
    dispatch(removeKey(key));
  };

  return { shortTermStorage, setKeyValue, deleteKey };
};

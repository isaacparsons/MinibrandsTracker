import { useEffect, useState } from 'react';
import { Item } from '../EditableList';

const useEditableList = (data: Item[]) => {
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    setList(data);
  }, [data]);

  const addItem = (item: Item) => {
    setList((prevList) => {
      const doesExist = prevList.find((i) => i.value === item.value);
      if (!doesExist) return [...prevList, item];
      return prevList;
    });
  };
  const removeItem = (item: Item) => {
    setList((prevList) => {
      return prevList.filter((i) => i.value !== item.value);
    });
  };

  return { list, addItem, removeItem };
};

export default useEditableList;

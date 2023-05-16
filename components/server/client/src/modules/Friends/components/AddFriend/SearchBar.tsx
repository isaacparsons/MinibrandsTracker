import Search from 'common/components/Search';
import React, { useState } from 'react';

interface Props {
  handleSearchPress: (value: string) => void;
}

function SearchBar(props: Props) {
  const { handleSearchPress } = props;
  const [searchText, setSearchText] = useState('');

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    updateSearchText('');
  };
  return (
    <Search
      value={searchText}
      onValueChange={updateSearchText}
      clearSearch={clearSearch}
      onSearchPress={() => handleSearchPress(searchText)}
    />
  );
}

export default SearchBar;

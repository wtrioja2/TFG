import React, { useState, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TextField } from '@mui/material';

function SearchBox({ placeholder, initialValue = '', onDebounce }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const debouncer = useMemo(() => new Subject(), []);

  useEffect(() => {
    const debouncerSubscription = debouncer
      .pipe(debounceTime(300))
      .subscribe(value => {
        onDebounce(value);
      });

    return () => {
      debouncerSubscription.unsubscribe();
    };
  }, [debouncer, onDebounce]);

  const onKeyPress = (searchTerm) => {
    setSearchTerm(searchTerm);
    debouncer.next(searchTerm);
  };

  return (
    <form className="form-control mb-3 tercio">
      <div className="example-full-width">
        <TextField
          fullWidth
          label={placeholder}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => onKeyPress(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchBox;
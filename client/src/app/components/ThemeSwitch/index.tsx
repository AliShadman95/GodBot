import * as React from 'react';
/* import { FormLabel } from 'app/components/FormLabel';
import { Radio } from 'app/components/Radio'; */
import styled from 'styled-components/macro';
import { themeActions } from 'styles/theme/slice';
import { useDispatch, useSelector } from 'react-redux';
import { saveTheme } from 'styles/theme/utils';
import { ThemeKeyType } from 'styles/theme/slice/types';
import { selectThemeKey } from 'styles/theme/slice/selectors';

export function ThemeSwitch() {
  /*   const theme = useSelector(selectThemeKey);
   */ const dispatch = useDispatch();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ThemeKeyType;
    saveTheme(value);
    dispatch(themeActions.changeTheme(value));
  };

  return {
    /*   <Radio
          id="system"
          label="System theme"
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="system"
          isSelected={theme === 'system'}
        />
        <Radio
          id="light"
          label="Light"
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="light"
          isSelected={theme === 'light'}
        />
        <Radio
          id="dark"
          label="Dark"
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="dark"
          isSelected={theme === 'dark'}
        /> */
  };
}

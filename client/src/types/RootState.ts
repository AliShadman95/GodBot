import { ThemeState } from 'styles/theme/slice/types';
import { DashboardState } from 'app/pages/Dashboard/slice/types';
import { AuthenticationProviderState } from 'app/pages/AuthenticationProvider/slice/types';
import { AlertState } from 'app/pages/Alert/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  dashboard?: DashboardState;
  authenticationProvider?: AuthenticationProviderState;
  alert?: AlertState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

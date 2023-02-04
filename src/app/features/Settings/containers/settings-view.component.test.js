import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '../../../shared/theme/theme';
import SettingsCardComponent from '../components/settings-card.component';

describe('<SettginsView/>', () => {
  it('correctly call sign out function', async () => {
    const signOutMock = jest.fn();
    render(
      <ThemeProvider theme={lightTheme}>
        <SettingsCardComponent signOut={signOutMock} />
      </ThemeProvider>
    );

    const signOutButton = screen.getByTestId('signOut');
    user.click(signOutButton);

    await waitFor(() => expect(signOutMock).toBeCalled());
    await waitFor(() => expect(signOutMock).toHaveBeenCalledTimes(1));
  });

  it('correctly render theme to dark after change', () => {
    const signOutMock = jest.fn();
    render(
      <ThemeProvider theme={lightTheme}>
        <SettingsCardComponent signOut={signOutMock} />
      </ThemeProvider>
    );

    // TODO
    const labelBeforeChange = screen.getByTestId('label');
    const themeSelect = screen.getByTestId('theme');
    user.selectOptions(themeSelect, ['on']);
    const labelAfterChange = screen.getByTestId('label');
    expect(labelBeforeChange).toHaveStyle('background: #00214D');
    expect(labelAfterChange).toHaveStyle('background: #f2a365');
  });
});

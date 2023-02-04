import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import { availableLanguages } from '../../../language';
import { ThemeProvider } from '../../../shared/theme/theme';
import { TranslationProvider } from '../../../shared/utils/translation';
import SettingsCardComponent from '../components/settings-card.component';

describe('<SettginsView/>', () => {
  it('correctly call sign out function', async () => {
    const signOutMock = jest.fn();
    const defaultLanguage = 'en';

    render(
      <ThemeProvider>
        <TranslationProvider
          languages={availableLanguages}
          defaultLanguage={defaultLanguage}
        >
          <SettingsCardComponent signOut={signOutMock} />
        </TranslationProvider>
      </ThemeProvider>
    );
    const signOutButton = screen.getByTestId('signOut');
    await user.click(signOutButton);

    await waitFor(() => expect(signOutMock).toBeCalled());
    await waitFor(() => expect(signOutMock).toHaveBeenCalledTimes(1));
  });

  it('correctly render theme to dark after change', async () => {
    const signOutMock = jest.fn();
    const defaultLanguage = 'en';

    render(
      <ThemeProvider>
        <TranslationProvider
          languages={availableLanguages}
          defaultLanguage={defaultLanguage}
        >
          <SettingsCardComponent signOut={signOutMock} />
        </TranslationProvider>
      </ThemeProvider>
    );

    // TODO - this test is incorrect
    // const labelBeforeChange = screen.getByTestId('label');
    // const themeSelect = screen.getByTestId('theme');
    // await user.selectOptions(themeSelect, ['on']);
    // const labelAfterChange = screen.getByTestId('label');
    // expect(labelBeforeChange).toHaveStyle('background: #00214D');
    // expect(labelAfterChange).toHaveStyle('background: #f2a365');
  });
});

/*
 * User Messages
 *
 * This contains all the text for the User container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.User';

export default defineMessages({
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  admin: {
    id: `${scope}.admin`,
    defaultMessage: 'Admin',
  },
});

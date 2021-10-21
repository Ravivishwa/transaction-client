/**
 *
 * Asynchronously loads the component for ListData
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

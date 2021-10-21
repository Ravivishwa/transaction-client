/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// export const API_URL = 'https://transactions-node-app.herokuapp.com/api/';
export const API_URL = process.env.NODE_ENV === "development" ? 'http://localhost:5000/api/' : 'https://transaction-app-backend.herokuapp.com/api/';
export const PUBLIC_API_CALL = 'app/API/public/call';
export const SECURE_API_CALL = 'app/API/secure/call';

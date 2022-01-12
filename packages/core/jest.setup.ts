import "@testing-library/jest-dom/extend-expect";

/**
 * `mocked` util function is now deprecated and has been moved to Jest repository,
 * see https://github.com/facebook/jest/pull/12089. In `ts-jest` v28.0.0,
 * `mocked` function will be completely removed.
 *
 * Users are encouraged to use to Jest v27.4.0 or above to have `mocked` function
 * available from `jest-mock`. One can disable this warning by setting environment
 * variable process.env.DISABLE_MOCKED_WARNING=true
 */
process.env.DISABLE_MOCKED_WARNING = "true";

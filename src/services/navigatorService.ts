export let navigateFunction: (path: string) => void;

export const setNavigator = (navigate: (path: string) => void) => {
   navigateFunction = navigate;
};

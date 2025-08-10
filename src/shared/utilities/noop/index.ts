

export const noop = (..._args:unknown[]):void => {
    if(__DEV__){
         console.log('CALLING EMPTY FUNCTION');
    }
};

import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal,
});

export const setLoadingStatePage = (isLoading) => ({
    type: actionTypes.SET_LOADING_STATE,
    isLoading,
});

import type { UIAction, UIState } from "./UIContextTypes"

/** Initial State */
export const initialState: UIState = {
    isAsideToggled: true,
    isMobileAsideToggled: false,
    isAlertVisible: false,
    subMenuToggled: null,
    userMenu: false,
    alertContent: "",
    alertType: null,
    canReloadOrders: false,
    isListLoading: false,
    isOrderLoading: false,
    isFormLoading: false
}

/** Reducer function */
export const UIReducer = (state: UIState, action: UIAction): UIState => {
    switch (action.type) {
        case "TOGGLE_ASIDE":
            return { ...state, isAsideToggled: !state.isAsideToggled }
        case "TOGGLE_MOBILE_ASIDE":
            return { ...state, isMobileAsideToggled: !state.isMobileAsideToggled }
        case "TOGGLE_SUBMENU":
            return { ...state, subMenuToggled: action.payload !== state.subMenuToggled && state.isAsideToggled !== false ? action.payload : null }
        case "TOGGLE_USER_MENU":
            return { ...state, userMenu: !state.userMenu }
        case "TOGGLE_ALERT":
            return {
                ...state,
                isAlertVisible: action.payload.isAlertVisible,
                alertContent: action.payload.content,
                alertType: action.payload.alertType
            }
        case "DISMISS_ALERT":
            return { ...state, isAlertVisible: action.payload }
        case "ACTIVE_ORDER_RELOAD":
            return { ...state, canReloadOrders: action.payload }
        case "DEACTIVE_ORDER_RELOAD":
            return { ...state, canReloadOrders: action.payload }
        case "TOGGLE_LIST_LOADING":
            return { ...state, isListLoading: action.payload }
        case "TOGGLE_ORDER_LOADING":
            return { ...state, isOrderLoading: action.payload }
        case "DISMISS_LIST_LOADING":
            return { ...state, isListLoading: action.payload }
        case "TOGGLE_FORM_LOADING":
            return { ...state, isFormLoading: action.payload }
        case "DISMISS_FORM_LOADING":
            return { ...state, isFormLoading: action.payload }
        default:
            return state
    }
}
import type { Dispatch } from "react"

export enum AlertType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    ATTENTION = "ATTENTION"
}

export type UIState = {
    isAsideToggled: boolean
    isMobileAsideToggled: boolean
    isAlertVisible: boolean
    subMenuToggled: number | null
    userMenu: boolean
    alertContent: string
    alertType: AlertType | null
    canReloadOrders: boolean
    isListLoading: boolean
    isOrderLoading: boolean
    isFormLoading: boolean
}

export type UIAction =
    { type: "TOGGLE_ASIDE" } |
    { type: "TOGGLE_MOBILE_ASIDE" } |
    { type: "TOGGLE_SUBMENU"; payload: number } |
    { type: "TOGGLE_USER_MENU" } |
    {
        type: "TOGGLE_ALERT"; payload: {
            content: string, alertType: AlertType, isAlertVisible: boolean
        }
    } |
    { type: "DISMISS_ALERT"; payload: boolean } |
    { type: "ACTIVE_ORDER_RELOAD"; payload: boolean } |
    { type: "DEACTIVE_ORDER_RELOAD"; payload: boolean } |
    { type: "TOGGLE_LIST_LOADING"; payload: boolean } |
    { type: "DISMISS_LIST_LOADING"; payload: boolean } |
    { type: "TOGGLE_ORDER_LOADING"; payload: boolean } |
    { type: "DISMISS_ORDER_LOADING"; payload: boolean } |
    { type: "TOGGLE_FORM_LOADING"; payload: boolean } |
    { type: "DISMISS_FORM_LOADING"; payload: boolean }

export type UIDataContext = {
    state: UIState,
    dispatch: Dispatch<UIAction>
}
import { createAction } from "redux-actions";

enum PageActions {
    moveNext = "MOVE_NEXT",
    moveBack = "MOVE_BACK",
    reset = "RESET"
}

export const MOVE_NEXT = PageActions.moveNext;
export const MOVE_BACK = PageActions.moveBack;
export const RESET = PageActions.reset;

export const moveNext = createAction(MOVE_NEXT);
export const moveBack = createAction(MOVE_BACK);
export const reset = createAction(RESET);

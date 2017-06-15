/**
 * Created by hguo on 3/30/16.
 */
import { createAction } from "redux-actions";
import {INCREMENT, DECREMENT, RESET} from "./action-types";

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const reset = createAction(RESET);
export const test = createAction("TEST");
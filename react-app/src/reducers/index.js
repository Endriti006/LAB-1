import { combineReducers } from "redux";
import {ImportBook} from "./ImportBook";
import { dCandidate } from "./dCandidate";

export const reducers = combineReducers({
    dCandidate,
    ImportBook
})
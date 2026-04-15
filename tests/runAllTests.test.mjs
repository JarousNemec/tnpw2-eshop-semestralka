import "./actions/authActions.test.mjs";
import "./actions/cartActions.test.mjs";
import "./actions/orderActions.test.mjs";
import "./actions/shopActions.test.mjs";
import "./actions/uiActions.test.mjs";
import "./system/appFlows.test.mjs";
import {printSummary, runTests} from "./testFramework.mjs";

await runTests();

printSummary();
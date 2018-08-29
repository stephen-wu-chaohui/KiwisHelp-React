import { API as awsAPI, Auth as awsAuth, default as awsAmplify } from "aws-amplify";
import { API as emptyAPI, Auth as emptyAuth, default as emptyAmplify } from "./empty-amplify";

var _amplifyType = 0;

export const AmplifyType = { Aws: 0, NCore: 1, Empty: 2, };
export const setAmplifyType = (ty) => _amplifyType = ty;

export const API = [awsAPI, emptyAPI, emptyAPI][_amplifyType];
export const Auth = [awsAuth, emptyAuth, emptyAuth][_amplifyType];
export default [awsAmplify, emptyAmplify, emptyAmplify][_amplifyType];

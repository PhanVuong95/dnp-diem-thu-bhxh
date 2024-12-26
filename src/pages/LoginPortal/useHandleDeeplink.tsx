import { useLocation, useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { referrerState, userState } from "../../state";

export enum EQrCodeType {
  CALL_API = "CALL_API",
  LOGIN_PORTAL = "LOGIN_PORTAL",
  REFER = "REFER",
}

export interface IDeepLinkCallApiState {
  type: EQrCodeType.CALL_API;
  data: { pathname: string; body: any; callback: string };
}

export interface IDeepLinkReferState {
  type: EQrCodeType.REFER;
  data: { referrerId: string; callback: string };
}

export interface IDeepLinkLoginPortalState {
  type: EQrCodeType.LOGIN_PORTAL;
  data: { pathname: string; body: any; callback: string };
}

export type DeepLinkStateType = (
  | IDeepLinkCallApiState
  | IDeepLinkReferState
  | IDeepLinkLoginPortalState
) & { disableCallback?: boolean };

const useHandleDeeplink = () => {
  const user = useRecoilValue(userState);
  const { search } = useLocation();

  const setReferrerState = useSetRecoilState(referrerState);
  const navigate = useNavigate();

  const handleGetState = (
    state: string | DeepLinkStateType,
    stateName?: string
  ) => {

    if (typeof state == "object") {
      return state;
    }

    if (typeof state == "string") {
      // deeplink
      if (stateName) {
        const stateStr = new URL(state).searchParams.get(stateName) as string;
        return JSON.parse(atob(stateStr));
      } else {
        const stateStr = new URL(state).searchParams.get("state") as string;
        return JSON.parse(atob(stateStr));
      }
    }
  };

  return {
    // handleDeeplink,
    handleGetState,
  };
};

export default useHandleDeeplink;

import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderPage from "../components/header_page";
import { isValidString } from "../utils/validate_string";

export let logged = false;

const LayoutPage: React.FunctionComponent = (props) => {
  const containerRef = useRef<any>();

  const decodeState = () => {
    const url = window.location.href;

    // Tách tham số 'state' từ URL
    const urlParams = new URLSearchParams(new URL(url).search);
    const state = urlParams.get("state");

    if (state) {
      // Giải mã base64
      const decodedState = atob(state);

      try {
        // Parse JSON từ chuỗi đã giải mã
        const jsonState = JSON.parse(decodedState);
        return jsonState;
      } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        return null;
      }
    }

    return null;
  };

  if (!logged) {

    // Lấy referrerCode
    const stateJson = decodeState();

    const referrerCode = isValidString(stateJson?.data.body.referrerCode)
    localStorage.setItem("referrerCode", referrerCode);
  }

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      (scrollContainer as any).scrollTo({ top: 0 }); // Cuộn container
    }
  }, [useLocation().pathname]);

  return (
    <div ref={containerRef} style={{ overflow: 'scroll', height: '100vh', }}>
      <div>
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;


import { useEffect } from "react";

export default function useBlockBackButton(redirectTo = null) {
  console.log(redirectTo);
  useEffect(() => {
    const disableBack = () => {
      console.log("jkecbwjbhjed",window.location.href);
      window.history.pushState({ page: "block" }, "", window.location.pathname + "#block-back");
     
      window.onpopstate = function () {
        if (redirectTo) {
          console.log('hit');
          window.location.replace(redirectTo);
        } else {
          console.log('hit2');
          window.history.go(1);
        }
      };
    };

    disableBack();

    return () => {
      window.onpopstate = null;
    };
  }, [redirectTo]);
}

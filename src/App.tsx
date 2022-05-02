import * as React from "react";
import { RouteComponent } from "./pages/RouteComponent";
import './theme/styles.css';
import { RecoilRoot } from 'recoil';

export const App = () => {
  return (
    <RecoilRoot>
      <RouteComponent />
    </RecoilRoot>
  );
}

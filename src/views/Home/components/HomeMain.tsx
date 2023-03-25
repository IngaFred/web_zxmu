import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function HomeMain() {
  return (
    <div>
      {/* 懒加载包裹 */}
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}

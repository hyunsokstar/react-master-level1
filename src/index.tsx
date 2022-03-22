import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
// 추가
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        {/* <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider> */}
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);

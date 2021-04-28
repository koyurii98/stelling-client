import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import View from "./pages/View";
import Write from "./pages/Write"; 
import Base from "../src/components/layout/Base";

import { AppContext } from "./context/index";
import LoadMask from "./components/LoadMask";
import { MODAL_OPEN } from "./reducer/modal";

function App() {
	const { user, dispatchModal } = useContext(AppContext);

	useEffect(() => {
		if (user.token && !user.data.name) {
			dispatchModal({ type: MODAL_OPEN, name: "mypage", edit: false });
		}
	}, [dispatchModal, user]);

	return (
		<div className="App">
			<BrowserRouter>
				<React.Suspense fullback={LoadMask}>
					<Route exact path="/">
						{user?.token ? (
							<Base>
								<Home />
							</Base>
						) : (
							<Login />
						)}
					</Route>{" "}
					<Route path="/view">
						<Base>
							<View />
						</Base>
					</Route>
					<Route path="/write">
						<Base>
							<Write />
						</Base>
					</Route>
				</React.Suspense>
			</BrowserRouter>
		</div>
	);
}

export default App;
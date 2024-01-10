import SelectMenu from "./SelectMenu";

import { Button, Container } from "react-bootstrap";

const ActionBar = (props) => {
	return (
		<Container
			fluid
			className="d-flex flex-column flex-md-row align-items-center py-4">
			<h1 className="ms-md-3 text-left" style={{ width: "200px" }}>
				{props.title}
			</h1>
			<SelectMenu />
			<div className="ms-md-auto mt-3 mt-md-0 me-3">
				<Button variant="outline-light">
					<i className="bi bi-list p-1 fs-6"></i>
				</Button>
				<Button variant="outline-light">
					<i className="bi bi-grid-fill p-1 fs-6"></i>
				</Button>
			</div>
		</Container>
	);
};

export default ActionBar;

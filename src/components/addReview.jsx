import { useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Row,
	Spinner,
} from "react-bootstrap";
// import TestComponent from "./TestComponent";

// proprietà che il server si aspetta di ricevere da noi per ogni prenotazione inviata:

// name <-- string
// phone <-- string
// numberOfPeople <-- string/number
// smoking <-- boolean
// dateTime <-- date/string
// specialRequests <-- string

const addReview = (props) => {
	// state = {
	//   userName: "Stefano Miceli",
	// reservation: {
	//   name: "",
	//   phone: "",
	//   numberOfPeople: "1",
	//   smoking: false,
	//   dateTime: "",
	//   specialRequests: ""
	// },
	//   hasAlert: false,
	// alert: {
	//   message: "",
	//   status: null,
	//   variant: "primary"
	// },
	//   isLoading: false
	// };

	const [review, setReview] = useState({
		comment: "",
		rate: "3",
		elementId: "tt0076759",
	});

	const [hasAlert, setHasAlert] = useState(false);
	const [alert, setAlert] = useState({
		message: "",
		status: null,
		variant: "primary",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleLoading = (loading) => {
		setIsLoading(loading);
	};

	const handleChange = (propertyName, propertyValue) => {
		setReview({ ...review, [propertyName]: propertyValue });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		handleLoading(true);

		try {
			const response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments",
				{
					method: "POST",
					body: JSON.stringify(review),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				setReview({
					comment: "",
					rate: "3",
					elementId: "tt0076759",
				});

				const newReview = await response.json();

				setHasAlert(true);
				setAlert({
					...alert,
					message:
						"la recensione " +
						newReview._id +
						" è stata registrata con successo",
					status: response.status,
					variant: "success",
				});

				setTimeout(() => {
					setHasAlert(false);
					setAlert({ message: "", status: null, variant: "primary" });
				}, 2500);
			} else {
				// siamo nel caso di errore con uno status >= 400

				// gestiamo l'avviso
				setHasAlert(true);
				setAlert({
					message:
						"Errore nell'invio dei dati. Status: " +
						response.status,
					variant: "danger",
					status: response.status,
				});
				// spegnamo l'avviso
				setTimeout(() => {
					setHasAlert(false);
					setAlert({ message: "", status: null, variant: "primary" });
				}, 2500);
			}
		} catch (err) {
			console.log(err);
		} finally {
			handleLoading(false);
		}
	};

	return (
		<Container className={props.className}>
			<h2 className="text-center mt-5">Prenota il tuo tavolo</h2>

			{/* <TestComponent reservation={reservation} /> */}

			<Row className="justify-content-center">
				<Col md={8}>
					{hasAlert && (
						<Alert variant={alert.variant}>{alert.message}</Alert>
					)}

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Rate</Form.Label>
							<Form.Control
								type="text"
								placeholder="Inserisci il tuo commento"
								value={review.comment}
								onChange={(event) =>
									// setState({ reservation: { ...reservation, name: event.target.value } })
									handleChange("comment", event.target.value)
								}
							/>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="formBasicPassword">
							<Form.Label>Voto al titolo</Form.Label>
							<Form.Select
								value={review.rate}
								onChange={(event) =>
									handleChange("rate", event.target.value)
								}>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Select>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
							{isLoading && (
								<Spinner
									animation="border"
									variant="light"
									size="sm"
									className="ms-2"
								/>
							)}
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default addReview;

// ReservationList è un componente che recupererà dal server la lista delle prenotazioni
// esistenti e si occuperà di presentarle all'utente

// import { Container, Row, Col } from 'react-bootstrap'
// un import generico come questo importa l'intera libreria react-bootstrap
// anche se ne state selezionando solo 3 componenti

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
// degli import così selettivi, se eseguiti come prassi, renderanno
// il bundle della vostra applicazione più leggero nel momento in cui
// la dovrete deployare online

// recuperare una risorsa può richiedere del tempo, anche svariati secondi
// un'applicazione moderna presenta all'utente le parti statiche IMMEDIATAMENTE,
// mostrando un indicatore di caricamento per addolcire l'attesa del contenuto dinamico

// se il vostro componente necessita di recuperare una risorsa esterna,
// createlo come CLASSE

// PASSAGGI IN CORSO:
// 1) lo stato viene inizializzato con un array reviews vuoto
// 2) render() viene invocato per la prima volta, essendo già collegato
// allo stato ma non avendo elementi da mostrare al momento, renderizzerà
// solamente le parti STATICHE dell'interfaccia (titolo, struttura di BS etc.)
// 3) finito il primo render, parte (se presente) componentDidMount
// 4) componentDidMount esegue la funzione di fetch() e recupera i dati.
// finito il recupero, i dati vengono inseriti nello stato con un setState
// 5) a causa del setState e del cambiamento di stato, render() viene invocato
// una seconda volta: le parti statiche sono le stesse di prima, ma il contenuto
// della lista questa volta è diverso e questa seconda invocazione si
// occuperà di popolarla con i nuovi list items

const ReviewList = () => {
	// state = {
	//   reviews: [],
	//   // inizializzare reviews come array vuoto è un'ottima scelta
	//   // in quanto rispecchia il tipo di dato che andremo a recuperare
	//   // e fa in modo che un eventuale .map() nel JSX semplicemente
	//   // non renderizzi alcun elemento dinamico
	//   hasError: false,
	//   isLoading: true
	// };

	const [reviews, setReviews] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// quindi quello che ci servirebbe sarebbe un modo per effettuare
	// il fetch delle prenotazioni immediatamente dopo la presentazione
	// delle parti STATICHE della pagina
	// sarebbe fantastico trovare un modo per recuperare i dati
	// DOPO la prima invocazione di render()...

	useEffect(() => {
		fetchreviews();
	}, []);

	const fetchreviews = async () => {
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments"
			);
			if (response.ok) {
				let reviews = await response.json();
				// salvare nello state il nostro array data

				setReviews(reviews);

				// ogni volta che cambia lo stato, render() viene invocato di nuovo
			} else {
				setHasError(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// render viene eseguito la prima volta al montaggio,
	// ma viene eseguito NUOVAMENTE ogni volta che c'è un cambio nello
	// // state o nelle props
	// console.log("sono render");
	// this.fetchreviews() // !!! DA NON FARE ASSOLUTAMENTE !!!
	// fare un setState nel render === infinite loop
	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<h2 className="text-center my-4 d-inline-block">
						Recensioni del titolo:
					</h2>
					{hasError && (
						<Alert variant="danger">
							Errore nel caricamento dati
						</Alert>
					)}
					{isLoading && (
						<Spinner
							animation="border"
							variant="primary"
							className="ms-2"
						/>
					)}
					{/* qua inseriamo la lista dinamica */}
					<ListGroup>
						{reviews.length > 0 && !isLoading && !hasError && (
							<>
								{reviews.map((reservation) => (
									<ListGroup.Item
										key={reviews.elementId}
										className="d-flex justify-content-between">
										<span>
											Voto dato:{" "}
											<strong>{reviews.rate}</strong>
										</span>
										{/* voglio trasformare la proprietà dateTime della prenotazione in qualcosa di più leggibile*/}
										<span>
											{/* {new Date(
												reservation.dateTime
											).toLocaleTimeString()} */}
										</span>
									</ListGroup.Item>
								))}
							</>
						)}
						{reviews.length === 0 && !hasError && isLoading && (
							<Alert variant="info">Caricamento...</Alert>
						)}
						{reviews.length === 0 && !hasError && !isLoading && (
							<ListGroup.Item>
								Non ci sono recensioni al momento
							</ListGroup.Item>
						)}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default ReviewList;

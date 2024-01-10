import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { token } from "./config/token";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ReviewList from "./ReviewsList";
import AddReview from "./AddReview";

const MovieDetails = (props) => {
	const [data, setData] = useState([]);
	const [comments, setComments] = useState([]);
	const params = useParams();

	const fetchData = async () => {
		const endpoint = `http://www.omdbapi.com/?apikey=${token}&i=${params.movieId}`;
		try {
			const resp = await fetch(endpoint);
			if (resp.ok) {
				const response = await resp.json();
				console.log(response);
				setData(response);
				// this.setState({ isLoaded: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchComments = async () => {
		const endpoint = `https://striveschool-api.herokuapp.com/api/comments/${params.movieId}`;
		try {
			const resp = await fetch(endpoint, {
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyMGYxYzBkOGEyMDAwMThhNDhiNTIiLCJpYXQiOjE3MDQ4OTg3NjYsImV4cCI6MTcwNjEwODM2Nn0.Dfh6SWG4vG7N5voO4TGXfqb4L_CIQrNADLj9b5sG4U4",
				},
			});
			if (resp.ok) {
				const commentData = await resp.json();
				console.log(commentData);
				setComments(commentData);
				// this.setState({ isLoaded: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
		fetchComments();
	}, []);
	return (
		<Container>
			<Row className=" justify-content-center">
				<Col xs={6}>
					<Card className="bg-black text-center">
						<Card.Img
							variant="top"
							src={data.Poster}
							style={{
								width: "100%",
								height: "600px",
								objectFit: "contain",
							}}
						/>
						<Card.Body>
							<Card.Title className=" fw-bold fs-1">
								{data.Title}
							</Card.Title>
							<Card.Text>{data.Plot}</Card.Text>
							<Button variant="outline-light">Watch Now</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<AddReview />
			<ReviewList />
		</Container>
	);
};
export default MovieDetails;

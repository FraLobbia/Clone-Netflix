import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { token } from "./config/token";
import NextArrow from "./NextArrows";
import PrevArrow from "./PrevArrow";
import { Link } from "react-router-dom";
const Gallery = (props) => {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		const endpoint = `http://www.omdbapi.com/?apikey=${token}&s=${props.searchQuery}`;
		try {
			const resp = await fetch(endpoint);
			if (resp.ok) {
				const response = await resp.json();
				setData(response);
				// this.setState({ isLoaded: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	});

	const settingsSlider = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 9,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<Slider {...settingsSlider} className={props.stile}>
				{data.Search &&
					data.Search.map((movie) => (
						<Link to={`/${movie.imdbID}`}>
							<img
								key={movie.imdbID}
								src={movie.Poster}
								alt={`Poster di ${movie.Title}`}
								style={{
									width: "100%",
									height: "300px",
									objectFit: "contain",
								}}
							/>
						</Link>
					))}
			</Slider>
		</>
	);
};

export default Gallery;

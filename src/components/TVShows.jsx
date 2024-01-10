import ActionBar from "./ActionsBar";
import Gallery from "./Gallery";

const TVShows = (props) => {
	return (
		<>
			<ActionBar title={props.title} />
			<h2 className="ms-3">{props.secondaryTitles[0]}</h2>
			<Gallery searchQuery={props.searchQuery[0]} stile="mb-3" />
			<h2 className="ms-3">{props.secondaryTitles[1]}</h2>
			<Gallery searchQuery={props.searchQuery[1]} stile="mb-3" />
			<h2 className="ms-3">{props.secondaryTitles[2]}</h2>
			<Gallery searchQuery={props.searchQuery[2]} />
		</>
	);
};

export default TVShows;

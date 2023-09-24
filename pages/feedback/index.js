import { buildFeedBackPath, extractFeedBack } from '../api/feedback/index';
import { Fragment,useState } from 'react';


function Feedbackpage(props) {
	const [feedbackData, setFeedbackData] = useState();

	function loadFeedBackHandler(id) {
		fetch(`/api/feedback/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setFeedbackData(data.feedback);
			});
	}

	return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}  said {feedbackData.text}</p>}
		<ul>
			{props.feedbackItems.map((item) => (
				<li key={item.id}>
					{item.text}
					<button onClick={loadFeedBackHandler.bind(null, item.id)}>
						{' '}
						Show Details
					</button>
				</li>
			))}
		</ul>
    </Fragment>
	);
}

export async function getStaticProps() {
	const filePath = buildFeedBackPath();
	const data = extractFeedBack(filePath);

	return {
		props: {
			feedbackItems: data,
		},
	};
}

export default Feedbackpage;

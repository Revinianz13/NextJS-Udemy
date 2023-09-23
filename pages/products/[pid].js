import { Fragment } from 'react';
import path from 'path';




function ProductDetailPage(props) {
	const { laoadedProduct } = props;

	if (!laoadedProduct) {
		return <p>Loading...</p>;
	}

	return (
		<Fragment>
			<h1>{laoadedProduct.title}</h1>
			<p>{laoadedProduct.description}</p>
		</Fragment>
	);
}




export async function getStaticProps(context) {


  const fs = require('fs').promises;
 
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

	const { params } = context;

	const productId = params.pid;


	const product = data.products.find((product) => product.id === productId);

  if(!product ) {
    return{ notFount: true}
  }


	return {
		props: {
			laoadedProduct: product,
		},
	};
}




export async function getStaticPaths() {
  const fs = require('fs').promises;
 
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);


	const ids = data.products.map((product) => product.id);

	const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

	return {
		paths: pathsWithParams,
		fallback: true,
	};
}


export default ProductDetailPage;

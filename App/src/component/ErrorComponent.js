import React, { Fragment } from 'react'
import { Toast } from 'react-bootstrap';

const ErrorComponent = ({ data }) => {
	return (
		<Fragment>
			{data.return_amount
				?
				<Toast>
					<Toast.Header>
						<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
						<strong className="me-auto">{data.err ? 'Error Message' : 'Success Message'}</strong>
					</Toast.Header>
					<Toast.Body>
						{data.err ? data.err : ` Return Quantity = ${data.return_quantity} Return Amount = ${data.return_amount} `}
					</Toast.Body>
				</Toast>
				:
				<Toast>
					<Toast.Header>
						<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
						<strong className="me-auto">{data.err ? 'Error Message' : 'Success Message'}</strong>
					</Toast.Header>
					<Toast.Body>
						{data.err ? data.err : `Bill id = ${data.bill_id} Amount Received = ${data.amount_received}	Total = ${data.total} Change = ${data.change}`}</Toast.Body>
				</Toast>
			}
		</Fragment>
	)
}

export default ErrorComponent
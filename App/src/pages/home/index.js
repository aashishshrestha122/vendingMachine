import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, Button, ButtonGroup, Modal, FormControl } from "react-bootstrap";

import ErrorComponent from '../../component/ErrorComponent';

const http = axios.create({
	baseURL: `http://localhost:5000/api`,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	},
})

const Home = () => {
	const mystyle = {
		color: "white",
		backgroundColor: "DodgerBlue",
		padding: "10px",
		fontFamily: "Arial",
		maxWidth: "500px",
		width: "500px",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: '10px'
	};

	const items = {
		textAlign: "center",
		marginTop: "10px"
	}

	const refundButton = {
		margin: "5px 5px 5px 5px ",
		textAlign: "center"
	}

	const [values, setValues] = React.useState({
		loadAmount: '',
		billId: ''
	});

	const [inventory, setInventory] = React.useState([]);
	const [activePage, setActivePage] = React.useState('home');
	const [selectedItem, setSelectedItem] = React.useState(null);
	const [showErr, setShowErr] = React.useState(false);
	const [resMessage, setResMessage] = React.useState([]);

	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);

	const handleRefund = (e) => {
		e.preventDefault();
		setActivePage('refund');
	}

	const handleBack = (e) => {
		setActivePage('');
	}

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
		setShowErr(false);
		setResMessage('');
	};

	const showModal = async (item) => {
		setSelectedItem(item);
		setShow(true);
	}

	useEffect(async () => {
		const { data } = await http.get('/billing/fetchInventory');
		setInventory(data);
	}, []);

	const handleBuy = async () => {
		const { id, item_price } = selectedItem;
		const payload = { item_id: id, item_price, sold_qty: 1, total: values.loadAmount, created_by: 1 }
		const { data } = await http.post('/billing/', payload);
		if (data) {
			setShowErr(true);
			handleClose();
			setResMessage(data);
			setInterval(() => window.location.reload(), 1000);
		}
	}

	const handleReturn = async () => {
		const payload = { return_quantity: 1, bill_id: values.billId, created_by: 1 }
		const { data } = await http.post('/refund/', payload);
		if (data) {
			setShowErr(true);
			setInterval(() => window.location.reload(), 1000);
			setResMessage(data);
		}
	}

	return (
		activePage == "refund" ?
			<Fragment>
				<div style={mystyle}>
					<InputGroup>
						<InputGroup.Text id="basic-addon1">Billd Id</InputGroup.Text>
						<FormControl
							name="billId"
							type="number"
							placeholder="Enter Billd Id"
							onChange={handleChange}
						/>
					</InputGroup>
					<Button style={refundButton} variant="secondary" onClick={handleBack}>
						Back
					</Button>
					<Button style={refundButton} variant="danger" onClick={handleReturn} disabled={!values.billId}>
						Refund
					</Button>
				</div>

				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to buy {selectedItem?.name}?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleBuy}>
							Buy
						</Button>
					</Modal.Footer>
				</Modal>
				{showErr && <ErrorComponent data={resMessage} />}
			</Fragment>
			:
			<Fragment>
				<div style={mystyle}>
					<div><Button style={refundButton} variant="danger" onClick={(e) => handleRefund(e)}>Refund</Button></div>
					<InputGroup>
						<InputGroup.Text id="basic-addon1">Load Amount</InputGroup.Text>
						<FormControl
							name="loadAmount"
							type="number"
							placeholder="Enter Load Amount"
							onChange={handleChange}
						/>
					</InputGroup>
					<div style={items}>
						<ButtonGroup aria-label="Basic example">
							{inventory.map((item, index) => (
								<Button key={index} variant="secondary" onClick={() => showModal(item)} disabled={!values.loadAmount}>
									{item.name}
									(Rs {item.item_price})<br />
									Stock : {item.item_quantity === 0 ? 'Out of Stock' : item.item_quantity}
								</Button>
							))}
						</ButtonGroup>
					</div>
				</div>
				<div>

					<Modal show={show} onHide={handleClose} centered>
						<Modal.Header closeButton>
							<Modal.Title>Confirmation</Modal.Title>
						</Modal.Header>
						<Modal.Body>Are you sure you want to buy {selectedItem?.name}?</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleBuy}>
								Buy
							</Button>
						</Modal.Footer>
					</Modal>
					{showErr && <ErrorComponent data={resMessage} />}

				</div>
			</Fragment >
	)
}

export default Home;
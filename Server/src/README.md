when a user buys an item 
- if the paid amount is less that the total amount throws an error.
-it first checks the actual amount and paid amount and will calculate the change amount and checks if the required 
	changed amount is in the vending machine or not if not then throws an error else goes to the next step.
- it then checks the quantity that user had ordered with the available quantity the machine have in the inventory table 
	if the quantity is greater than the available quantity then throws an error else goes to the next step.
- now it takes to the service where the billing is being inserted in the billing table and deduction in the inventory
	table is done also updates the coins table
- when everything is successfully done then user gets a response on the screen as total amount, paid amount, change amount.
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Registration
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label="First name"
						fullWidth
						autoComplete="fname"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="Last name"
						fullWidth
						autoComplete="lname"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="email"
						name="email"
						label="Enter  Email"
						fullWidth
						autoComplete="email"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="contact"
						name="contact"
						label="contact"
						fullWidth
						autoComplete="contact"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address"
						name="address"
						label="Address line "
						fullWidth
						autoComplete="billing address-line"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="city"
						name="city"
						label="City"
						fullWidth
						autoComplete="billing address-level2"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id="state" name="state" label="State/Province/Region" fullWidth />
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						required
						id="zip"
						name="zip"
						label="Zip / Postal code"
						fullWidth
						autoComplete="billing postal-code"
					/>
				</Grid>
			
				<Grid item xs={12} sm={4}>
					<TextField
						required
						id="country"
						name="country"
						label="Country"
						fullWidth
						autoComplete="billing country"
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						required
						id="storeName"
						name="storename"
						label="storeName"
						fullWidth
						autoComplete="storeName"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
						label="Use this address for payment details"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

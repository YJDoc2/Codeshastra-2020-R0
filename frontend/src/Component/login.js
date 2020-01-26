import React from 'react';
import {Typography,AppBar,createMuiTheme,MuiThemeProvider,Button,MenuItem,Tabs,Tab,Grid,Box,makeStyles,TextField} from '@material-ui/core';
import {deepOrange,blue} from '@material-ui/core/colors';
import {Formik,ErrorMessage,Form} from 'formik';
import './login.css';
import Axios from 'axios';
import {Redirect} from 'react-router-dom'
//<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> in index.html for font

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: blue,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 500,
    margin: 'auto',
    flexGrow: 1
  },
  textf: {
  	marginTop: 20
  },
  box: {
  	alignItems: 'center',
  }
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}


export default function LoginPage(){
	const classes = useStyles();
  	const [value, setValue] = React.useState(0);
  	const handleTabChange = (event, newValue) => {
    	setValue(newValue);
	};
	const [isLogged, setLog] = React.useState(false);
	const setLogFunc = (event) => {
    	setLog(true);
	};
	const [isV, setV] = React.useState(false);
	const setVFunc = (event) => {
    	setLog(true);
	};
    return (
    	<div>
			{(isLogged && isV) ? <Redirect to='/v_home' />:null}
			{(isLogged && !isV) ? <Redirect to='/ngo_home' />:null}
    		<MuiThemeProvider theme={theme}>
        		<div className={classes.root}>
	        		<AppBar position="static">
			        <Tabs value={value} variant="fullWidth" onChange={handleTabChange} aria-label="simple tabs example">
			          <Tab label="Log In" {...a11yProps(0)} />
			          <Tab label="Sign Up" {...a11yProps(1)} />
			        </Tabs>
			      </AppBar>
			      <TabPanel value={value} index={0}>
			        <Formik 
			        	initialValues={{ username: '', password: '' }}
			        	validate={values => {
				        const errors = {};
				        if (!values.username) {
				          errors.username = 'Required';
				        } else if (
				          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
				        ) {
				          errors.username = 'Invalid username address';
				        }
				        if (!values.password){
				        	errors.password = 'Required';
				        }
				        return errors;
					  }}
					  //Login
				      onSubmit={async (values, { setSubmitting }) => {
				        setTimeout(() => {
				          setSubmitting(false);
						}, 1000);
						try{
							let temp = await Axios.post('/api/volunteers/login',{username:values.username,password:values.password});
							setLogFunc();
							setVFunc();
							//console.log(temp.data)
						}catch(e){
							try{
								let temp = await Axios.post('/api/NGO/login',{username:values.username,password:values.password});
								setLog();
								console.log(temp.data);
							}catch(e){
								console.log(e.response)
							}
							
						}
				        //console.log(values);
				    }}>
				    {({ isSubmitting ,handleChange,handleBlur}) => (
				    	<Box className={classes.box}>
				    	<Form autoComplete="off"> 
				        	<TextField 
				        		name="username"
				        		type="email" 
				        		label="Email" 
				        		color="secondary" 
				        		variant="outlined" 
				        		placeholder="Enter your email"
				        		onChange={handleChange}
				        		onBlur={handleBlur}
				        	/> <br/>
							<ErrorMessage name="username" component="div" />
				        	<TextField 
				        		name="password" 
				        		type="password" 
				        		color="secondary" 
				        		label="Password" 
				        		variant="outlined" 
				        		placeholder="Enter your password" 
				        		className={classes.textf}
				        		onChange={handleChange}
				        		onBlur={handleBlur}
				        	/> <br/>
				        	<ErrorMessage name="password" component="div" />
				        	<Button 
				        		type="submit" 
				        		disabled={isSubmitting}
				        		variant="contained" 
				        		color="primary" 
				        		className={classes.textf}
				        	> 
				        		Log In 
				        	</Button>
			        	</Form>
			        	</Box>
			        	)}
			        </Formik>
			      </TabPanel>
			      <TabPanel value={value} index={1}>
			      <Formik 
			      	initialValues={{
			      		name:'',
			      		age:'',
			      		contact_n:'',
			      		fname:'' ,
			      		lname:'', 
			      		username:'',
			      		password:'',
			      		password_confirm:'',
			      		loginAs:'Volunteer',
			      		locality:'',
			      		bloodGroup: '',
			      	}}
			      	validate={values => {
			      	const errors = {};
				        if (!values.username) {
				          errors.username = 'Required';
				        } else if (
				          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
				        ) {
				          errors.username = 'Invalid email address';
				        }
				        if (!values.password){
				        	errors.password = 'Fill this field';
				        }
				        else if (values.password.length<8){
				        	errors.password = 'Password is too Short'
				        }
				        else if(values.password!==values.password_confirm && values.password_confirm!==''){
				        	errors.password = 'Password not matching';
				        }
				        if ((!values.fname || !values.lname) && values.loginAs==="Volunteer"){
				        	errors.name = "Fill this field"
				        }
				        else if (!values.name && values.loginAs==="NGO"){
				        	errors.name = "Fill this field"
				        }
				        if((values.contact_n).toString().length!==10){
				        	errors.contact_n = "Invalid Number"
				        }
				        if (!values.bloodGroup && values.loginAs==="Volunteer"){
				        	errors.bloodGroup = "Required"
				        }
				        if (!values.locality){
				        	errors.locality = "Enter your location"
				        }
				        if (!values.age && values.loginAs==="Volunteer"){
				        	errors.age ="Invalid age"
				        }
				        return errors;
				      }}
				      onSubmit={async (values, { setSubmitting }) => {
				        setTimeout(() => {
				          setSubmitting(false);
				        }, 1000);
				        if (values.loginAs==="Volunteer"){
							values.name=values.fname+" "+values.lname;
							try{
									let temp = await Axios.post('/api/volunteers/register',{
										name:values.name,
										contact_n:values.contact_n,
										email:values.username,
										password1:values.password,
										address:values.locality,
										blood_group:values.bloodGroup,
										age:values.age
									});
									console.log(temp.data);
							}catch(e){
								console.log(e.response)
							}
						}else{
							try{
								let temp = await Axios.post('/api/NGO/register',{
									name:values.name,
									contact_n:values.contact_n,
									email:values.username,
									password1:values.password,
									address:values.locality,
								});
								console.log(temp);
						}catch(e){
							console.log(e)
						}
						}
				        console.log(values);
				    }}
			      >
			      {({ isSubmitting ,handleChange,handleBlur,values,errors}) => (
			      	<Form autoComplete="off">
				      <Grid container spacing={2}>
				      	{values.loginAs==="Volunteer"?
				      	<React.Fragment>
				      	<Grid item xs={6}>
					      		<TextField name="fname" color="secondary" label="First Name" onChange={handleChange} onBlur={handleBlur} fullWidth/> 
					      	</Grid>
				      		<Grid item xs={6}>
								<TextField name="lname" color="secondary" label="Last Name" onChange={handleChange} onBlur={handleBlur} fullWidth/>
							</Grid>
						</React.Fragment>
							:	
							<TextField 
							name="name"							
							fullWidth
							label="Organization Name" 
							color="secondary"
							className={classes.textf}
			        		onChange={handleChange}
			        		onBlur={handleBlur}
						/> 
						}
						</Grid>	 
						<ErrorMessage name="name" component="div" />  
						<TextField 
							name="username"
							type="email" 
							fullWidth
							label="Email" 
							placeholder="example@domain.com" 
							color="secondary"
							className={classes.textf}
			        		onChange={handleChange}
			        		onBlur={handleBlur}
						/> 
						<ErrorMessage name="username" component="div" />
						<TextField 
							name="contact_n"
							type="number" 
							color="secondary" 
							label="Contact Number" 
							fullWidth
							placeholder="Contact Number" 
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
						/> 
						<br/>
						<ErrorMessage name="contact_n" component="div" />
						<TextField 
							name="password"
							type="password" 
							color="secondary" 
							label="Password" 
							fullWidth
							variant="outlined" 
							placeholder="Enter your password" 
							helperText="Minimum 8 charecters"
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
						/> 
						<ErrorMessage name="password" component="div" />
						<TextField 
							name="password_confirm"
							type="password" 
							color="secondary" 
							label="Confirm Password" 
							fullWidth
							variant="outlined" 
							placeholder="Re-Enter your password" 
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
						/> 
						<br/>
						<Grid container className={classes.textf}>
						<Grid item xs={4}>
						<Typography>Join as: </Typography>
						</Grid>
						<Grid item xs={8}>
						<TextField 
							select 
							value={values.loginAs} 
							color="secondary" 
							name="loginAs" 
							onChange={handleChange} 
							onBlur={handleBlur} 
							fullWidth
						>
							<MenuItem value="Volunteer">Volunteer</MenuItem>
							<MenuItem value="NGO">NGO</MenuItem>
						</TextField><br/>
						</Grid>
						<Grid container className={classes.textf}>
						<Grid item xs={4}>
						<Typography>Locality: </Typography>
						</Grid>
						<Grid item xs={8}>
						<TextField 
							select 
							value={values.locality} 
							color="secondary" 
							name="locality" 
							onChange={handleChange} 
							onBlur={handleBlur} 
							fullWidth
						>
							<MenuItem value="Borivali">Borivali</MenuItem>
							<MenuItem value="Vile Parle">Vile Parle</MenuItem>
							<MenuItem value="Andheri">Andheri</MenuItem>
							<MenuItem value="Dahisar">Dahisar</MenuItem>
							<MenuItem value="Mira Road">Mira Road</MenuItem>
							<MenuItem value="Kandivali">Kandivali</MenuItem>
						</TextField><br/>
							</Grid>
						</Grid>
						<Grid container>
						<Grid item xs={12}>
						<ErrorMessage name="locality" component="div" />
						</Grid>
						</Grid>
						{values.loginAs==="Volunteer"?
						<React.Fragment>
						<Grid container className={classes.textf}>
						<Grid item xs={3}>
						<Typography>Blood Group: </Typography>
						</Grid>
						<Grid item xs={4}>
						<TextField 
							select 
							value={values.bloodGroup} 
							color="secondary" 
							name="bloodGroup" 
							onChange={handleChange} 
							onBlur={handleBlur} 
							fullWidth
						>
							<MenuItem value="AB+">AB+</MenuItem>
							<MenuItem value="AB-">AB-</MenuItem>
							<MenuItem value="A+">A+</MenuItem>
							<MenuItem value="A-">A-</MenuItem>
							<MenuItem value="B+">B+</MenuItem>
							<MenuItem value="B-">B-</MenuItem>
							<MenuItem value="O+">O+</MenuItem>
							<MenuItem value="O-">O-</MenuItem>
						</TextField><br/>
						</Grid>
						<Grid item xs={2}>
						<Typography>Age: </Typography>
						</Grid>
						<Grid item xs={3}>
						<TextField 
							value={values.age} 
							color="secondary" 
							name="age" 
							type="number"
							onChange={handleChange} 
							onBlur={handleBlur} 
							fullWidth
						/><br/>
							</Grid>
						</Grid>
						<Grid container>
						<Grid item xs={7}>
							<ErrorMessage name="bloodGroup" component="div" />
							</Grid>
							<Grid item xs={5}>
							<ErrorMessage name="age" component="div" />
							</Grid>
							</Grid>
							</React.Fragment>
						:
						<React.Fragment>
						</React.Fragment>
					}
						</Grid>
					<Button type="submit" disabled={isSubmitting} className={classes.textf} variant="contained" color="primary">Sign Up</Button>
					</Form>
					)}
			        </Formik>
			      </TabPanel>
			    </div>
        	</MuiThemeProvider>
    	</div>
    );
}


import React from 'react';
import {Typography,Divider,Container,Grid} from '@material-ui/core'

function NGO(){
    return (
    	<div>
        <Typography variant="h2"> NGO Org Name </Typography>
        <Typography paragraph> No. U-15, J.V.P.D. Scheme, Bhaktivedanta Swami Rd, Opp.Cooper Hospital, Vile Parle, Mumbai, Maharashtra 400056</Typography>
        <Divider/>
        <Grid container>
        <Grid item xs={6}>
        <p align="center">
			<img alt="NGO IMAGE HERE" src="https://crossbarriers.org/wp-content/uploads/2016/02/NGO-1024x594.jpg" height="250px"/> <br/><br/><br/>
		</p>
		</Grid>
		<Grid item xs={6}>
        <p align="center">
			<img alt="Graph" src="https://www.stickpng.com/assets/images/5a5cbf7a9538462e5a82d543.png" height="300px"/> <br/><br/><br/>
		</p>
		</Grid>
		</Grid>
		<Divider/>
		<Container>
		<Typography paragraph>
			Non-governmental organizations, or NGOs, were first called such in Article 71 in the Charter of the newly formed United Nations in 1945. While NGOs have no fixed or formal definition, they are generally defined as nonprofit entities independent of governmental influence (although they may receive government funding).
		</Typography>
		<Typography paragraph>
			As one can tell from the basic definition above, the difference between nonprofit organizations (NPOs) and NGOs is slim. However, the term "NGO" is not typically applied to U.S.-based nonprofit organizations. Generally, the NGO label is given to organizations operating on an international level although some countries classify their own civil society groups as NGOs.
		</Typography>
		<Typography paragraph>
			NGO activities include, but are not limited to, environmental, social, advocacy and human rights work. They can work to promote social or political change on a broad scale or very locally. NGOs play a critical part in developing society, improving communities, and promoting citizen participation.
		</Typography>
		</Container>
        </div>
    );
}

export default NGO;

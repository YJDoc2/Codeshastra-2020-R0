import React, { Component } from 'react';
import Card from './Card';
import Axios from 'axios';

import { Typography, Divider, Container, Grid } from '@material-ui/core';

class NGO_Home extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false, leaflets: null };
    }

    componentDidMount() {
        console.log('hey');
        Axios.get('/api/volunteers/posts/all')
            .then(res => {
                this.setState({ isLoaded: true, leaflets: res.data });
                console.log(res.data);
            })
            .catch(e => console.log(e.response));
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant='h2'> NGO Org Name </Typography>
                <Typography paragraph>
                    {' '}
                    No. U-15, J.V.P.D. Scheme, Bhaktivedanta Swami Rd,
                    Opp.Cooper Hospital, Vile Parle, Mumbai, Maharashtra 400056
                </Typography>
                <Divider />
                <br />
                <Grid
                    container
                    spacing={3}
                    direction='row'
                    justify='center'
                    alignItems='center'
                >
                    {this.state.isLoaded
                        ? this.state.leaflets.map(leaf => {
                              return (
                                  <Grid item xs={4}>
                                      <Card
                                          path={`/api/files/${leaf.photo}`}
                                          name={
                                              leaf.name ? leaf.name : 'Unknown'
                                          }
                                          date={
                                              leaf.date
                                                  ? leaf.date
                                                  : Date().toString()
                                          }
                                          address={
                                              leaf.address
                                                  ? leaf.address
                                                  : 'Unknown'
                                          }
                                          description={
                                              leaf.description
                                                  ? leaf.description
                                                  : 'No Description provided'
                                          }
                                      />
                                  </Grid>
                              );
                          })
                        : null}
                </Grid>
            </React.Fragment>
        );
    }
}

export default NGO_Home;

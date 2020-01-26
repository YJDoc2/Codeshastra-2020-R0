import React, { Component } from 'react';
import Card from './Card';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';

class V_Home extends Component {
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
                <Grid container spacing={3}>
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

export default V_Home;

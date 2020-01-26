import React, { Component } from 'react';
import { Button, TextField, Paper, Box } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import $ from 'jquery';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    addFile = e => {
        this.setState({ ...this.state, file: e.target.files[0] });
    };

    submitFiles = async e => {};

    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <Paper elevation={3}>
                    <Formik
                        initialValues={{
                            name: '',
                            locality: '',
                            description: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.locality) {
                                errors.locality = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            const data = new FormData();

                            data.append('files', this.state.file);
                            data.append('address', values.locality);
                            data.append('descr', values.description);
                            $.ajax({
                                type: 'POST',
                                url: 'http://localhost:5000/api/upload',
                                // xhrFields: {
                                //     withCredentials: true
                                // },
                                data: data,
                                contentType: false,
                                processData: false,
                                cache: false,
                                success: res => {
                                    console.log('res');
                                    console.log(res);
                                },
                                error: e => {
                                    let errStr = e.responseJSON
                                        ? e.responseJSON.err
                                        : null;
                                    console.log(e);
                                }
                            });
                        }}
                    >
                        {({ isSubmitting, handleChange, handleBlur }) => (
                            <Box>
                                <Form autoComplete='off'>
                                    <div>
                                        <br />
                                        <TextField
                                            name='name'
                                            label='Name'
                                            color='secondary'
                                            variant='outlined'
                                            placeholder='Name of the needy '
                                            color='primary'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />{' '}
                                        <br />
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                            name='locality'
                                            color='secondary'
                                            label='Locality'
                                            variant='outlined'
                                            color='primary'
                                            placeholder='Enter your password'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />{' '}
                                        <br />
                                        <ErrorMessage
                                            name='locality'
                                            component='div'
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                            name='description'
                                            multiline
                                            color='secondary'
                                            label='Description/Address'
                                            placeholder='Describe the help Required or mention the exact address of the needy   '
                                            variant='outlined'
                                            color='primary'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />{' '}
                                        <br />
                                    </div>
                                    <br />
                                    <TextField
                                        onChange={this.addFile}
                                        type='file'
                                        formEncType='multipart/form-data'
                                        className='custom-file-input'
                                        id='inputGroupFile04'
                                        aria-describedby='inputGroupFileAddon04'
                                    />
                                    <br />
                                    <br />
                                    <Button
                                        type='submit'
                                        disabled={isSubmitting}
                                        variant='contained'
                                        color='primary'
                                    >
                                        Submit
                                    </Button>
                                    <br />
                                    <br />
                                </Form>
                            </Box>
                        )}
                    </Formik>
                </Paper>
            </React.Fragment>
        );
    }
}

export default Upload;

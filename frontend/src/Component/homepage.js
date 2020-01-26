import React from 'react';
import './homeStyle.css';

class Homepage extends React.Component {
    render() {
        return (
            <div>
                <div className='hpage'>
                    <div className='htext'>
                        <i>
                            Helping hands coming together to provide a better,
                            happier world for the underpriviledged.
                        </i>
                    </div>
                </div>
                <div className='aboutus'>
                    <b style={{ fontSize: '30px', fontFamily: 'Cinzel' }}>
                        DIVYA SEVA
                    </b>
                    <br />
                    <i style={{ fontSize: '20px' }}>
                        Catalysts in healing the world
                    </i>
                    <br />
                    <br />
                    <div style={{ fontFamily: 'Comfortaa' }}>
                        An initiative to use the digital world to help the poor
                        and needy in the most effecient cost effective way
                        possible.
                        <br />
                        Volunteers and NGOs can register on the site. A user can
                        upload pictures and relevant details of a needy person.
                        <br />
                        The volunteers in that particular region can verify the
                        authenticity of the appeal and accordingly the nearest
                        ng can take action.
                        <br />
                        Sign up and help the NGOs reach out to the needy.
                        <br />
                    </div>
                    <br />
                    <br />
                    <i style={{ fontSize: '20px' }}>Kidness costs nothing.</i>
                </div>
                <div className='donate'>
                    <b style={{ fontSize: '30px' }}>Donate for a cause</b>
                    <br />
                    <br />
                    <br />
                    <a href='https://pay.google.com/intl/en_in/about/?gclid=EAIaIQobChMIh8i9jNeg5wIVVxiPCh1WXwH8EAAYASAAEgImjPD_BwE'>
                        <button className='button'>GPay</button>
                    </a>
                    {'      '}
                    <a href='https://paytm.com/'>
                        <button className='button'>Paytm</button>
                    </a>{' '}
                    {'      '}
                    <a href='https://www.paypal.com/in/webapps/mpp/home?gclsrc=aw.ds&gclid=EAIaIQobChMIwa2Pmtmg5wIVQouPCh0qVQDiEAAYASAAEgIv4_D_BwE&gclsrc=aw.ds'>
                        <button className='button'>PayPal</button>
                    </a>
                    {'      '}
                </div>
            </div>
        );
    }
}

export default Homepage;

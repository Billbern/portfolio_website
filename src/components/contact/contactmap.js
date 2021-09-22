import { Component } from 'react';
import '../../assets/css/contact.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';


export default class ContactMap extends Component {

    componentDidMount() {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconSize: [48, 48],
            iconRetinaUrl: require('../../assets/img//icons/location.svg').default,
            iconUrl: require('../../assets/img//icons/location.svg').default,
            shadowUrl: ''
        });
    }

    render() {
        return (
            <section className="contact-map">
                <div className="contactmap-content">
                    <div className="map">
                        <MapContainer className="map-content" zoom={17} scrollWheelZoom={false} zoomControl={false} center={[4.9177, -1.7770]}>
                            <ZoomControl position="bottomleft" />
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                            <Marker position={[4.9177, -1.7820]}>
                                <Popup>
                                    <p>Bernard</p>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="contact">
                        <div className="contact-content">
                            <div>
                                <h4>Leave A Message</h4>
                                <form>
                                    <div>
                                        <label htmlFor="mail"></label>
                                        <input name="ml" type="email" placeholder="Email" id="mail"/>
                                    </div>
                                    <div>
                                        <label htmlFor="subject"></label>
                                        <input name="subt" type="text" placeholder="Subject" id="subject"/>
                                    </div>
                                    <div>
                                        <label htmlFor="message"></label>
                                        <textarea name="msg" id="message" cols="40" rows="8" placeholder="Message"></textarea>
                                    </div>
                                    <div>
                                        <input className="send-btn" type="submit" value="Send" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
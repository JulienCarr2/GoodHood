import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { gql, useQuery } from "@apollo/client";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const FETCH_POSTS = gql`
        query GetAllPosts {
            getAllPosts {
                _id
                latitude
                longitude
                donationGoal
                timestamp
                title
                volunteerInfo
            }
        }  
    `;

const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow,
    iconSize: [32, 48],
    iconAnchor: [16,48]
});

export default function Map() {
    const { loading, error, data } = useQuery(FETCH_POSTS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <MapContainer center={[40.744, -74.032]} zoom={4} style={{ width: "100%", height: "100vh" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.getAllPosts.map((post) => (
            <Marker key={(post._id)} icon={icon} position={[post.latitude, post.longitude]}>
            <Popup>
                <a href={`/posts/${post._id}`}>{post.title}</a>
                <br/>
                {post.volunteerInfo}
            </Popup>
            </Marker>
        ))}
        </MapContainer>
    );
}
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { gql, useQuery } from "@apollo/client";
import 'leaflet/dist/leaflet.css';

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

export default function Map() {
    const { loading, error, data } = useQuery(FETCH_POSTS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <MapContainer center={[40.744, -74.032]} zoom={15} scrollWheelZoom={false} zoomControl={false} dragging={false} style={{ width: "100%", height: "100vh" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.getAllPosts.map((post) => (
            <Marker key={(post._id)} position={[post.latitude, post.longitude]}>
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
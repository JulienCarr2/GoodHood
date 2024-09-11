import {React, useState, useEffect} from 'react';
import { Typography, Card, CardContent, CardMedia, CardActions, Button, Divider, Box } from '@mui/material';
import { styled } from '@mui/system';
import {useParams, useNavigate} from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

const PostCard = styled(Card)(({}) => ({
    maxWidth: 800,
    margin: '32px auto',
    padding: '32px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
}));

const PostContent = styled(Box)(({}) => ({
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 600px)': {
        flexDirection: 'column',
    },
}));

const PostDetails = styled(CardContent)(({}) => ({
    flex: 1, 
}));

const PostImage = styled(CardMedia)(({}) => ({
    width: '40%',
    borderRadius: '8px',
    marginLeft: '16px',
    '@media (max-width: 600px)': {
        width: '100%',
        marginLeft: 0,
        marginTop: '16px',
    },
}));

const PostTitle = styled(Typography)(({}) => ({
    fontWeight: 'bold',
    marginBottom: '8px',
}));

const PostInfo = styled(Typography)(({}) => ({
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: '4px',
}));

const DonationGoal = styled(Typography)(({}) => ({
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '16px',
}));

const VolunteerInfo = styled(Typography)(({}) => ({
    marginBottom: '32px',
}));

const ActionButton = styled(Button)(({}) => ({
    marginRight: '16px',
}));

const getPostQuery = gql`
query Query(
    $id: ID!
) {
  getPost(
    _id: $id
  ) {
    _id
    title
    timestamp
    latitude
    longitude
    image
    donationGoal
    volunteerInfo
    comments {
        owner { 
            username
        }
        text
    }
  }
}
`;

function formatDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const paddedDay = day < 10 ? '0' + day : day;
    const paddedMonth = month < 10 ? '0' + month : month;
    
    return `${paddedMonth}/${paddedDay}/${year}`;
}

const Post = () => {
    const { id } = useParams();
    const { loading, error, data: dataRet } = useQuery(getPostQuery, {variables: {id: id}});
    const navigate = useNavigate();

    if (loading) {
        return (
            <Typography variant="h1" gutterBottom>
                Loading...
            </Typography>
        );
    } else if (error) {
        console.log(error)
        return (
            <Typography variant="h1" gutterBottom>
                {error.message}
            </Typography>
        );
    } 

    const data = dataRet.getPost;
    
    return (
        <div class="content-container">
        <PostCard>
        <PostContent>
            <PostDetails>
            <PostTitle variant="h4" component="div">
                {data.title}
            </PostTitle>
            <PostInfo variant="subtitle1">
                {formatDate(parseInt(data.timestamp))}
            </PostInfo>
            <PostInfo variant="body1">
                Location: {data.latitude}, {data.longitude}
            </PostInfo>
            <DonationGoal variant="h5">
                Donation Goal: ${data.donationGoal.toLocaleString()}
            </DonationGoal>
            <VolunteerInfo variant="body1">{data.volunteerInfo}</VolunteerInfo>
            </PostDetails>
            <PostImage component="img" image="/background.png" alt={data.title} />
        </PostContent>
        <Divider />
        <CardActions>
            <ActionButton variant="contained" color="primary" size="large">
            Donate Now
            </ActionButton>
            <ActionButton variant="outlined" color="primary" size="large">
            Volunteer
            </ActionButton>
        </CardActions>
        </PostCard>
        </div>
    );
};

export default Post;
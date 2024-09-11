import React from 'react';
import TeamMember1Photo from '../Headshots/team_member_1.jpeg';
import TeamMember2Photo from '../Headshots/team_member_2.png';
import TeamMember3Photo from '../Headshots/team_member_3.png';
import TeamMember4Photo from '../Headshots/team_member_4.JPG';
import TeamMember5Photo from '../Headshots/team_member_5.png';
import TeamMember6Photo from '../Headshots/team_member_6.png';

const teamMembers = [
  {
    name: 'Rodney Wotton',
    role: 'Front End Developer',
    src: TeamMember1Photo,
    bio: 'Hi, my name is Rodney Wotton. I am a senior at Stevens Institute of Technology majoring in computer science. I worked on developing the front end of our website.',
  },
  {
    name: 'Robert Miller',
    role: 'Database Creation/Maintaining',
    src: TeamMember2Photo,
    bio: 'Hi, my name is Robert Miller. I am a senior at Stevens Institute of Technology majoring in Computer Science, and I had the pleasure of working on the backend.',
  },
  {
    name: 'Antonio Delrosso',
    role: 'Map API Integration',
    src: TeamMember3Photo,
    bio: 'Hi, my name is Antonio Delrosso. I am a senior computer science major at Stevens Institute of Technology, and I worked on Map Integration.',
  },
  {
    name: 'Bryan Feighner',
    role: 'AI/Front-End',
    src: TeamMember4Photo,
    bio: "Hello, my name is Bryan Feigner. I am a master's student studying Computer Engineer at Stevens Institute of Technology, and I worked on the front end.",
  },
  {
    name: 'Julien Carr',
    role: 'UI/Routing',
    src: TeamMember5Photo,
    bio: "My name is Julien Carr, and I'm a senior at Stevens Institute of Technology graduating with a Bachelor of Science in Computer Science.",
  },
  {
    name: 'Lennon Okun',
    role: 'Backend/Machine Learning',
    src: TeamMember6Photo,
    bio: "My name is Lennon Okun, and I am a master's student at Stevens Institute of Technology studying Machine Learning.",
  },
];

const AboutUs = () => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  };

  const headingStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '40px',
    textTransform: 'uppercase',
  };

  const memberStyles = {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  
  };

  const memberNameStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  };

  const memberRoleStyles = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '10px',
    textTransform: 'uppercase',
  };

  const memberBioStyles = {
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.6',
  };

  const memberImageStyles = {
    width: '300px',
    height: '400px',
    borderRadius: '50%',
    marginBottom: '20px',
  };

  return (
    <div style={pageStyles}>
      <h1 style={headingStyles}>Meet the Creators</h1>
      {teamMembers.map((member, index) => (
        <div key={index} style={memberStyles}>
          <img src={member.src} alt={member.name} style={memberImageStyles} />
          <div style={{ padding: '20px' }}>
            <h2 style={memberNameStyles}>{member.name}</h2>
            <p style={memberRoleStyles}>{member.role}</p>
            <p style={memberBioStyles}>{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;

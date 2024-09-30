import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import userProfiles from '../../data/userProfiles.json'; // Adjust the import path based on your structure
import './Dashboard.css'; // Import your CSS for badge hover effect

interface UserProfile {
  badges: string[];
  email: string;
  eventsAttended: number;
  name: string;
  registerNumber: string;
  xp: number;
  linkedinUrl: string; // Added LinkedIn URL
}

const Dashboard: React.FC<{ user: User | null }> = ({ user }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [badgeToPost, setBadgeToPost] = useState<string | null>(null); // State to hold badge for posting

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user) {
          // Find user profile from JSON based on logged-in email
          const profile = userProfiles.find(profile => profile.email === user.email);
          if (profile) {
            setUserProfile(profile);
          } else {
            setError('No user profile found matching the email.');
          }
        } else {
          setError('User not authenticated.');
        }
      } catch (err) {
        setError(`Error fetching user profile: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const postToLinkedIn = async () => {
    if (userProfile && userProfile.linkedinUrl && badgeToPost) {
      const badgeImageUrl = `../../images/${badgeToPost}.jpeg`; // Adjust the image path accordingly
      const accessToken = await getAccessToken(); // Function to get LinkedIn access token
  
      // Prepare the post body
      const postBody = {
        // Do not set author using URL; follow LinkedIn documentation for your specific use case
        commentary: `I just earned the ${badgeToPost} badge!`,
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        },
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
              "text": `I just earned the ${badgeToPost} badge!`
            },
            "shareMediaCategory": "IMAGE",
            "media": [
              {
                "status": "READY",
                "description": {
                  "text": `Check out my ${badgeToPost} badge!`
                },
                "media": badgeImageUrl,
                "title": {
                  "text": `${badgeToPost} Badge`
                }
              }
            ]
          }
        }
      };
  
      // Make the POST request to LinkedIn
      try {
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        });
  
        if (response.ok) {
          alert('Badge posted successfully on LinkedIn!');
          setBadgeToPost(null); // Reset the badge to post after successful posting
        } else {
          const errorData = await response.json();
          console.error('LinkedIn API Error:', errorData);
          alert(`Error posting to LinkedIn: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        alert('There was an error posting to LinkedIn. Please try again later.');
      }
    } else {
      alert('LinkedIn URL not found for this user or no badge selected.');
    }
  };
  

  const getAccessToken = async (): Promise<string> => {
    // Replace with your logic to retrieve an access token
    return 'AQW4fLtqYGnHm_3bQFSlry8XFucPEtHyLBoJ33JsMZGcbT7DR6rR9iQhE7jzd9qkEjWbAR-J1UqfhhxcrSS02jhiKFkxKq_shUs00ZSYLRG1K2AQxFU3J0arolHpCfNA5h79uc2e4LrOn12jBOX6wF-v0467LOBiWbaKLHnd7QRPs3jJPN-yrLo3E3X2TTZrbOaSTXfS_XQrWkRlz8Xf-HSSUI433Cxfwu0LffQ-XNu4b9GXolfRZP5gWNydirBrswK6yuOQ-6bbGbGy4AHLYJXYY0IBrAFycOKveJB_rRKO4JncbVpG1YxSGtgJTD69EOD5WunCVTjsBC-9smMaNMsYeXd_pw';
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No user profile found.</div>;
  }

  return (
    <div>
      <h1>{userProfile.name}&apos;s Dashboard</h1>
      <p>Email: {userProfile.email}</p>
      <p>Register Number: {userProfile.registerNumber}</p>
      <p>XP: {userProfile.xp}</p>
      <p>Events Attended: {userProfile.eventsAttended}</p>

      {/* Display Badges */}
      <div className="badges">
        {userProfile.badges.map((badge) => (
          <div key={badge} className="badge-container">
            <img
              src={`../../images/Contributor.jpeg`} 
              alt={badge}
              className="badge-image"
              onClick={() => setBadgeToPost(badge)} // Set badge to post on click
            />
          </div>
        ))}
      </div>

      {/* Button to Post on LinkedIn */}
      <button onClick={postToLinkedIn}>
        Post Badge to LinkedIn
      </button>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(userProfile.xp / 5000) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Dashboard;

import ProfilePhoto from '../svg/profile-photo.svg';

function Profile() {
  return (
    <div className="profile-icon">
      <img src={ProfilePhoto} alt="img not available" />
      <h2>Guest</h2>
    </div>
  );
}

export default Profile;

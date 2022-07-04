import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UpdateProfile from "../components/UserPanel/UpdateProfile";

function UpdateUserProfile() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <UpdateProfile />
      <Footer />
    </div>
  );
}

export default UpdateUserProfile;

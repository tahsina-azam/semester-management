import React from "react";
import UserProfile from "../../src/components/userProfile";
import withAuth from "../../src/components/common/withAuth";
function profile() {
  return (
    <div>
      <UserProfile />
    </div>
  );
}

export default withAuth(profile);

import React from "react";

const ProfileIdPage = ({ params }: { params: { clerkId: string } }) => {
  return <div>ProfileIdPage : #{params.clerkId}</div>;
};

export default ProfileIdPage;

import React from "react";

type Props = {
  params: {
    storyId: string;
  };
};

const NesStoryPage = ({ params }: Props) => {
  return <div>NesStoryPage : {params.storyId} </div>;
};

export default NesStoryPage;

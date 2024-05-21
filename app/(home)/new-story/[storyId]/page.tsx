import React from "react";
import NewStoryForm from "./_components/NewStoryForm";

type Props = {
  params: {
    storyId: string;
  };
};

const NesStoryPage = ({ params }: Props) => {
  return <NewStoryForm />;
};

export default NesStoryPage;

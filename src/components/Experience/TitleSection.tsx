import * as React from "react";

interface Props {
  title: string;
}

const TitleSection: React.FC<Props> = ({ title }) => {
  return (
    <section>
      <div className="relative">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default TitleSection;

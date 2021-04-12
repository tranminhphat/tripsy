import React, { useEffect, useState } from "react";

interface Props {
  label: string;
  backgroundColor?: string;
  visualParts: any;
}

const MyProgressBar: React.FC<Props> = ({
  label,
  backgroundColor = "#e5e5e5",
  // expected format for visual parts
  visualParts = [
    {
      percentage: "0%",
      color: "white",
    },
  ],
}) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        visualParts.map((item) => {
          return item.percentage;
        })
      );
    });
  }, [visualParts]);

  return (
    <>
      <div className="progressLabel">{label}</div>
      <div
        className="flex h-8 my-4 rounded-lg"
        style={{
          backgroundColor,
        }}
      >
        {visualParts.map((item, index) => {
          return (
            <div
              key={index}
              className={`rounded-lg ${item.color}`}
              style={{
                width: widths[index],
                transition: "width 2s",
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyProgressBar;

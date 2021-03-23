import * as React from "react";
import { FileReaderResultType } from "types";

interface Props {
  photoGallery: {
    type?: string;
    base64String?: FileReaderResultType;
    url?: string;
  }[];
}

const MyImageHero: React.FC<Props> = ({ photoGallery }) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "1fr 1.5fr 1fr",
        }}
      >
        <div
          style={{
            display: "grid",
            gridArea: "1 / 1 / auto / auto",
          }}
        >
          <div
            className="h-full w-full"
            style={{
              display: "grid",
              gridArea: "1 / 1 / auto / auto",
            }}
          >
            <div>
              <img src={photoGallery[0].url} alt={photoGallery[0].type} />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridArea: "1 / 2 / auto / auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridAutoColumns: "1fr",
              gridAutoRows: "1fr",
              gridGap: "8px",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <div
              className="w-full h-full"
              style={{ gridArea: "1 / 1 / span 2 / span 2" }}
            >
              <img src={photoGallery[1].url} alt={photoGallery[1].type} />
            </div>
            <div
              className="h-full w-full"
              style={{ gridArea: "1 / 3 / auto / auto" }}
            >
              <img src={photoGallery[2].url} alt={photoGallery[2].type} />
            </div>
            <div
              className="h-full w-full"
              style={{ gridArea: "2 / 3 / auto / auto" }}
            >
              <img src={photoGallery[3].url} alt={photoGallery[3].type} />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridArea: "1 / 3 / auto / auto",
          }}
        >
          <div
            className="h-full w-full"
            style={{
              display: "grid",
              gridArea: "1 / 1 / auto / auto",
            }}
          >
            <div>
              <img src={photoGallery[5].url} alt={photoGallery[5].type} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyImageHero;

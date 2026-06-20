import React from "react";
import { Composition } from "remotion";
import { ProTilingPromo } from "./ProTilingVideo";

export const Root: React.FC = () => (
  <>
    <Composition id="ProTilingPromo" component={ProTilingPromo} durationInFrames={900} fps={30} width={1920} height={1080} />
    <Composition id="ProTilingShort" component={ProTilingPromo} durationInFrames={450} fps={30} width={1080} height={1080} defaultProps={{ variant: "square" }} />
  </>
);

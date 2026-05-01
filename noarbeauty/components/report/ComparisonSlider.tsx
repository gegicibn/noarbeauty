"use client";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";

interface Props {
  beforeUrl: string;
  afterUrl: string;
}

export default function ComparisonSlider({ beforeUrl, afterUrl }: Props) {
  return (
    <div className="rounded-xl overflow-hidden max-w-2xl mx-auto">
      <ReactCompareSlider
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              background: "linear-gradient(135deg, #c9a96e, #e8c98a)",
              border: "none",
              color: "#000",
            }}
            linesStyle={{ background: "rgba(201,169,110,0.7)" }}
          />
        }
        itemOne={
          <ReactCompareSliderImage
            src={beforeUrl}
            alt="Original"
            style={{ objectFit: "cover" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterUrl}
            alt="AI vizualizacija"
            style={{ objectFit: "cover" }}
          />
        }
        style={{ height: 480 }}
      />
      <div className="flex justify-between text-xs text-white/30 px-2 mt-2">
        <span>← Original</span>
        <span>AI vizualizacija →</span>
      </div>
    </div>
  );
}

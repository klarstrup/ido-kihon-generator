"use client";

import html2canvas from "html2canvas";

export function SaveKihonAsImage() {
  return (
    <button
      type="button"
      onClick={async () => {
        const canvas = await html2canvas(
          document.getElementById("kihon-display")!
        );

        const link = document.createElement("a");
        link.download = `ido-kihon-generated-${new Date().toISOString()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }}
    >
      Save kihon as image
    </button>
  );
}

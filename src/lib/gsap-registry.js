import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Yerel dosyalar (src/lib/gsap/ klasöründen)
import { SplitText } from "./gsap/SplitText";
import { ScrambleTextPlugin } from "./gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);
}

export { gsap, useGSAP, SplitText, ScrambleTextPlugin };

import { SynthesizerRenderNote } from "../render";
import { SynthesizerInstrumentSynth } from "../types";

type SynthesizerInstrumentOSCSynth = SynthesizerInstrumentSynth & {
    flavor: "osc",
    wave: "sine" | "saw" | "tri" | "sqr"
}

export default function osc(
    data: SynthesizerInstrumentOSCSynth,
    note: SynthesizerRenderNote,
    time: number
) {
    const phase = (time - note.start) * note.frequency * 2 * Math.PI
    const phase01 = (phase % (2 * Math.PI)) / (2 * Math.PI)

    if (data.wave === "sine") {
        return Math.sin(phase)
    } else if (data.wave === "sqr") {
        return Math.sign(Math.sin(phase))
    } else if (data.wave === "saw") {
        return phase01 * 2 - 1
    } else if (data.wave === "tri") {
        return Math.abs(phase01 - 0.5) * 4 - 1
    }

    return 0
}
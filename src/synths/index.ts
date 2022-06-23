import { SynthesizerInstrumentSynth } from "../types"
import osc from "./osc"

export function getSynth(data: SynthesizerInstrumentSynth) {
    if (data.flavor === "osc") {
        return osc
    } else {
        throw new Error(`Unknown synth flavor: ${data.flavor}`)
    }
}
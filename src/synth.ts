import { SynthesizerRenderNote } from "./render"
import { SynthesizerEnvelope } from "./types"
import { clamp, unlerp, lerp } from "./util"

export function adsr(adsr: SynthesizerEnvelope, note: SynthesizerRenderNote, time: number) {
    if (time >= note.end) {
        return clamp(1 - unlerp(time, note.end, note.end + adsr.release), 0, 1) * adsr.sustain
    } else if (time - note.start < adsr.attack) {
        return clamp(unlerp(time, note.start, note.start + adsr.attack), 0, 1)
    } else if (time - note.start < note.end) {
        return lerp(clamp(unlerp(time, note.start + adsr.attack, note.start + adsr.attack + adsr.decay), 0, 1), 1, adsr.sustain)
    }

    return 1
}
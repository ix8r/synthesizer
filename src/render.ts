import { SynthesizerData, SynthesizerPattern } from "./types"
import { getPatternTime } from "./util"

const sampleRate = 44100

export function renderPattern(pattern: SynthesizerPattern, data: SynthesizerData) {
    const length = Math.floor(getPatternTime(pattern, data) * sampleRate)
    const buffer = new Float32Array(length)

    return buffer
}
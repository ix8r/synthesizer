import { SynthesizerData, SynthesizerInstrument, SynthesizerPattern } from "./types"

export function getBeatTime(data: SynthesizerData) {
    return 60 / data.time.bpm
}

export function getPatternInstrument(
    pattern: SynthesizerPattern, data: SynthesizerData
) {
    if (!(pattern.instrument in data.instruments)) {
        throw new Error(`${pattern.instrument} not present in score data.`)
    }

    return data.instruments[pattern.instrument]
}

export function getInstrumentTailTime(instrument: SynthesizerInstrument) {
    if (instrument.type === "synth") {
        return instrument.envelope.release
    }

    return 0
}

export function getPatternTime(
    pattern: SynthesizerPattern, data: SynthesizerData
) {
    const instrument = getPatternInstrument(pattern, data)
    const baseTime = getBeatTime(data) * data.time.pattern

    return baseTime + getInstrumentTailTime(instrument)
}

export function clamp(x: number, min: number, max: number) {
    return Math.min(max, Math.max(min, x))
}

export function unlerp(x: number, a: number, b: number) {
    return (x - a) / (b - a)
}

export function lerp(x: number, a: number, b: number) {
    return a + x * (b - a)
}
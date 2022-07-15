export type SynthesizerEnvelope = {
    attack: number,
    decay: number,
    sustain: number,
    release: number
}

export type SynthesizerInstrumentSynth = {
    type: "synth",

    envelope: SynthesizerEnvelope,
    gain: number,

    flavor: string
}

export type SynthesizerInstrument = SynthesizerInstrumentSynth

export type SynthesizerNote = {
    note: string,
    start: number,
    length: number,
    subtype?: string
}

export type SynthesizerPattern = {
    instrument: string,
    notes: SynthesizerNote[]
}

export type SynthesizerTimingInfo = {
    bpm: number,
    pattern: number
}

export type SynthesizerData = {
    time: SynthesizerTimingInfo,
    stems: string[],
    instruments: {
        [key: string]: SynthesizerInstrument
    },
    patterns: {
        [key: string]: SynthesizerPattern
    },
    score: string[][]
}
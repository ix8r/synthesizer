import { adsr } from "./synth"
import { SynthesizerData, SynthesizerPattern, SynthesizerNote } from "./types"
import { getBeatTime, getPatternTime } from "./util"

export const sampleRate = 44100

export type SynthesizerRenderNote = {
    frequency: number,
    start: number,
    end: number
}

function processNotes(notes: SynthesizerNote[], data: SynthesizerData): SynthesizerRenderNote[] {
    const beatTime = getBeatTime(data)

    return notes.map(note => {
        return {
            frequency: 440,
            start: note.start * beatTime,
            end: (note.start + note.length) * beatTime
        }
    })
}

export function renderPattern(pattern: SynthesizerPattern, data: SynthesizerData) {
    const length = Math.floor(getPatternTime(pattern, data) * sampleRate)
    const buffer = new Float32Array(length)

    const notes = processNotes(pattern.notes, data)

    const synthData = data.instruments[pattern.instrument]

    const synth = {
        note: (note: SynthesizerRenderNote, time: number) => {
            return Math.sin((time - note.start) * note.frequency * 2 * Math.PI)
        }
    }

    for (let i = 0; i < length; i++) {
        const time = i / sampleRate

        buffer[i] = notes.reduce((acc, note) => acc + synth.note(note, time) * adsr(synthData.envelope, note, time), 0)
    }

    return buffer
}
const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export function noteToFrequency(note: string) {
    const octave = +note[note.length - 1]
    const name = note.substring(0, note.length - 1)

    const notesAwayFromA4 = 12 * (octave - 4) + noteNames.indexOf(name.toUpperCase()) - 9

    return 440 * ((2 ** (1 / 12)) ** notesAwayFromA4)
}
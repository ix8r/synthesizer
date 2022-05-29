import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import WavEncoder, { AudioData } from "wav-encoder"
import { renderPattern, sampleRate } from "./render"
import { SynthesizerData } from "./types"

const score = JSON.parse(
    readFileSync(join(__dirname, "../data/example.json"), "utf8")
) as SynthesizerData

const wavBuffer = renderPattern(score.patterns["test"], score)

const wavEncoderData: AudioData = {
    sampleRate: sampleRate,
    channelData: [wavBuffer, wavBuffer]
}

WavEncoder.encode(wavEncoderData).then(wavBuffer => {
    writeFileSync(
        join(__dirname, "../data/pattern.wav"),
        Buffer.from(wavBuffer),
        "utf-8"
    )
})
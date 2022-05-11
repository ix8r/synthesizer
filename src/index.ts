import { readFileSync } from "fs"
import { join } from "path"
import { renderPattern } from "./render"
import { SynthesizerData } from "./types"

const score = JSON.parse(
    readFileSync(join(__dirname, "../data/example.json"), "utf8")
) as SynthesizerData

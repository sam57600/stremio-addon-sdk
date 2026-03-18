const { addonBuilder } = require("stremio-addon-sdk")
const express = require("express")
const app = express()

// Création de l'addon
const builder = new addonBuilder({
    id: "org.ygg.private",
    version: "1.0.0",
    name: "YGG Private",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"]
})

// StreamHandler vide pour l'instant
builder.defineStreamHandler(async ({ type, id }) => {
    return { streams: [] }  // On n'a pas encore connecté YGG
})

// 🔹 Cette ligne rend le manifest accessible à Stremio
app.get("/manifest.json", (req,res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(builder.getInterface().manifest)
})

// Écoute sur le port Render
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))

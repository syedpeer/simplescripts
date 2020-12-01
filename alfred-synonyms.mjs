#!js

let query = $1.replace(/ /g, "+")

let response = await fetch(
  `https://api.datamuse.com/words?ml=${query}&md=d`
)

let results = await response.json()

let items = results.map(({ word, score, tags, defs }) => {
  return {
    title: word,
    subtitle:
      defs
        ?.map(def => def.replace(/.*\t/, ""))
        .join("; ") || "",
    arg: word,
    variables: { word, score, tags, defs },
  }
})

let out = {
  variables: {
    query,
  },
  items,
}
console.log(JSON.stringify(out))

// Pointer parallax and replayable one-shots for the hero's space band.
//
// Everything visual lives in satyrn.css (block: space). This only feeds it:
//   --satyrn-px / --satyrn-py  the pointer's position over the hero band, -1 to 1
//   data-flight="1" | "2"      flipped each time the pointer enters the band,
//                              which switches the shooting star and twinkle to
//                              their other keyframe copy and so replays them
//
// Motion here is driven by the pointer and stops when it does, so it needs no
// pause control under WCAG 2.2.2. It does nothing for touch-only devices or
// under prefers-reduced-motion, and it is `document$`-based rather than
// DOMContentLoaded because navigation.instant swaps pages without a reload.
document$.subscribe(function () {
  // The whole band listens, not just the planet: the scene answers the pointer
  // anywhere over the hero, text and buttons included.
  const band = document.querySelector(".satyrn-hero")
  const scene = band && band.querySelector(".satyrn-space")
  if (!scene) return
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

  let frame = 0
  let x = 0
  let y = 0

  function paint() {
    frame = 0
    scene.style.setProperty("--satyrn-px", x.toFixed(3))
    scene.style.setProperty("--satyrn-py", y.toFixed(3))
  }

  band.addEventListener("pointermove", function (event) {
    const box = band.getBoundingClientRect()
    x = ((event.clientX - box.left) / box.width) * 2 - 1
    y = ((event.clientY - box.top) / box.height) * 2 - 1
    // At most one style write per frame, however fast the pointer reports.
    if (!frame) frame = requestAnimationFrame(paint)
  })

  band.addEventListener("pointerenter", function () {
    scene.dataset.flight = scene.dataset.flight === "1" ? "2" : "1"
  })

  band.addEventListener("pointerleave", function () {
    x = 0
    y = 0
    if (!frame) frame = requestAnimationFrame(paint)
  })
})

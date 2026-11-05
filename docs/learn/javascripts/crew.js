// The contributor carousel under "Why Satyrn".
//
// The markdown ships a plain list of avatars, which is what readers without
// JavaScript, or with prefers-reduced-motion, get: a row they can scroll.
// This turns it into a slow, seamless marquee by appending one inert,
// aria-hidden copy of the list, so the loop can wrap without a jump and
// assistive technology still reads each contributor once.
//
// Motion that starts by itself and runs longer than five seconds needs a way
// to stop it (WCAG 2.2.2), so this adds a visible Pause button ahead of the
// row. The CSS also pauses the row on hover and on keyboard focus.
//
// `document$` rather than DOMContentLoaded, because navigation.instant swaps
// pages without a reload.
document$.subscribe(function () {
  const crew = document.querySelector(".satyrn-crew")
  const list = crew && crew.querySelector("ul")
  if (!list || crew.dataset.enhanced) return
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
  crew.dataset.enhanced = "true"

  Array.from(list.children).forEach(function (item) {
    const copy = item.cloneNode(true)
    copy.setAttribute("aria-hidden", "true")
    copy.inert = true
    list.appendChild(copy)
  })

  // A constant speed of about 30px a second, however many contributors there
  // are, rather than a fixed duration that races once the list grows.
  function pace() {
    const seconds = Math.max(20, list.scrollWidth / 2 / 30)
    crew.style.setProperty("--satyrn-crew-duration", seconds.toFixed(1) + "s")
  }
  pace()
  addEventListener("resize", pace, { passive: true })

  const toggle = document.createElement("button")
  toggle.type = "button"
  toggle.className = "satyrn-crew__toggle"
  toggle.textContent = "Pause"
  toggle.addEventListener("click", function () {
    const paused = crew.classList.toggle("is-paused")
    toggle.textContent = paused ? "Play" : "Pause"
  })
  crew.before(toggle)

  // Moving, the row no longer scrolls, so it is no longer a keyboard stop of
  // its own; the "You?" link inside it still is.
  crew.removeAttribute("tabindex")
  crew.classList.add("is-moving")
})

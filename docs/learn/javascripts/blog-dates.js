document$.subscribe(function () {
  const fmt = new Intl.DateTimeFormat(undefined, {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
  })
  document.querySelectorAll("time[datetime]").forEach(function (el) {
    const raw = el.getAttribute("datetime")
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return
    const [y, m, d] = raw.split("-").map(Number)
    el.textContent = fmt.format(new Date(Date.UTC(y, m - 1, d)))
  })

  // Layered article title: copy the post h1's text into `data-title` so the CSS
  // `::before` can paint an offset outline copy behind it. The theme generates
  // this h1 from the front-matter title, so there is no markup to duplicate by
  // hand. A clone strips the permalink ¶ that would otherwise land in the copy.
  const title = document.querySelector(".satyrn-byline + h1")
  if (title) {
    const clone = title.cloneNode(true)
    clone.querySelectorAll(".headerlink").forEach(function (n) { n.remove() })
    title.dataset.title = clone.textContent.trim()
  }
})

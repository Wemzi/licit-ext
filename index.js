const table = document.querySelector("table")
let links= table.querySelectorAll("a")
const tds = document.querySelectorAll("td")
links = (Array.from(links)).map(a => a.href)

case_numbers = links.map(async a => 
                                    await fetch(a).then(response => response.text())
                                                  .then(text => { text = new DOMParser().parseFromString(text, "text/html")
                                                                Array.from(text.querySelector("table")
                                                                .querySelectorAll("tr"))
                                                                .filter(a => a.children[0].innerHTML == "Végrehajtási ügyszám")[0]
                                                                .children[1]
                                                                .innerHTML
                                                                }
                                                        )
                        )
                            
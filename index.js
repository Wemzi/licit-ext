const table = document.querySelector("table")
let links= table.querySelectorAll("a")
const tds = document.querySelectorAll("td")
links = (Array.from(links)).map(a => a.href)

real_estate_auction_doc = await fetch("https://arveres.mbvk.hu/arverezok/ingatlanhirdetmenyek.php?")
                                    .then(response => response.text())
                                    .then(a => new DOMParser().parseFromString(a, "text/html"))
//this will contain all the case numbers after the async fetch
case_number_list = []
case_numbers = links.map(async a => 
                                    await fetch(`${a}`).then(response => response.text())
                                    .then(a => new DOMParser().parseFromString(a, "text/html"))
                                    .then(htmlBody => Array.from(htmlBody.querySelector("table")
                                    .querySelectorAll("tr"))
                                    .filter(a => a.children[0].innerHTML == "Végrehajtási ügyszám")[0]
                                    .children[1]
                                    .innerHTML).then(case_number_response => case_number_list.push(case_number_response))
                        )

function downloadCasePDF(case_number,id){
    if(real_estate_auction_doc != null)
    {
        real_estate_auction_doc.forms['pdfmegjelenit'].elements['generaltfajlnev'].value=case_number;
        real_estate_auction_doc.forms['pdfmegjelenit'].elements['id'].value=id; 
        real_estate_auction_doc.forms['pdfmegjelenit'].submit();
    }  
}



                        

                        /*.then(response => response.text())
                        .then(text => { text = new DOMParser().parseFromString(text, "text/html")
                        Array.from(text.querySelector("table")
                        .querySelectorAll("tr"))
                        .filter(a => a.children[0].innerHTML == "Végrehajtási ügyszám")[0]
                        .children[1]
                        .innerHTML
                        }
                ) */


                //let a = await fetch('https://licit.info/ingatlan/766443')
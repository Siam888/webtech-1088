
const birthYears =
    [
        1998,
        2002,
        2005,
        2010,
        1995,
        2000,
        2012,
        2004
    ]

//map: Aplica o functie pe fiecare element din array si returneaza un nou array cu acelasi numar de elemente

const above18 = function (birthYears) {
    const currentYear = new Date().getFullYear()
    return birthYears.map(year => currentYear - year).filter(y => y >= 18)
}

console.log(above18(birthYears))

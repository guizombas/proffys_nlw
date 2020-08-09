//dados
const proffys = [
    {
        name: "Guilherme Gabriel",
        avatar: "https://avatars0.githubusercontent.com/u/63319368?s=460&u=bdf502a9e02038033aff63b3cf3ce561a0ee7711&v=4",
        whatsapp: 3798343632,
        bio: "Estudante que precisa de uma rendinha",
        subject: "Matemática",
        cost: 10,
        weekday: [1,6],
        time_from: [1200, 800],
        time_to: [1400, 1000]
    },
    {
        name: "Lucas Kelvão",
        avatar: "https://avatars3.githubusercontent.com/u/49598959?s=460&u=d090d4d79ea60b977b84f844712615b62092d5e9&v=4",
        whatsapp: 1243312123,
        bio: "O brabo dos brabo",
        subject: "Física",
        cost: 100,
        weekday: [4],
        time_from: [20000],
        time_to: [22000]
    }
]
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

//funções
const getSubject = (subjectNumber) =>{
    const position = subjectNumber - 1
    return subjects[position]
}

const getMinutes = (time) =>{
    const [hours, minutes] = time.split(":")
    return Number( (hours*60) + Number(minutes) )
}

module.exports = {
    proffys,
    weekdays,
    subjects,
    getSubject,
    getMinutes
}
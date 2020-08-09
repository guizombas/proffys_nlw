const {
    weekdays,
    subjects,
    getSubject,
    getMinutes
} = require("./utils/format")

const Database = require("./database/db")

const pageLanding = (req,res) =>{
    res.render("index.html")
}

const pageStudy = async (req,res) =>{
    const filters = req.query
    
    if ( !filters.subject || !filters.weekday || !filters.time )
    {
        return res.render("study.html", {weekdays, subjects})
    }

    const timeAsMinutes = getMinutes(filters.time)

    const query = `
        SELECT proffys.*, classes.*
        FROM proffys
        JOIN classes ON ( classes.proffy_id = proffys.id )
        WHERE EXISTS(
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = classes.id
            AND classes_schedule.weekday = ${filters.weekday}
            AND classes_schedule.time_from <= ${timeAsMinutes}
            AND classes_schedule.time_to > ${timeAsMinutes}
        )
        AND classes.subject = '${filters.subject}';
    `

    try {
        const db = await Database
        let proffys = await db.all(query)

        proffys = proffys.map((proffy,index)=>{
            proffy.subject = getSubject(proffy.subject)
            return proffy
        })

        res.render("study.html", { proffys, filters, weekdays, subjects })
    } catch (error) {
        console.log(error)
    }

    
}

const pageGiveClasses = (req,res) =>{
    res.render("give-classes.html", { weekdays, subjects })
}
const saveClass = async (req,res) =>{
    
    const createProffy = require("./database/createProffy")

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    const scheduleValues = req.body.weekday.map( (weekday,index) =>{
        return {
            weekday,
            time_from: getMinutes(req.body.time_from[index]),
            time_to: getMinutes(req.body.time_to[index])
        }
    } )

    try {
        const db = await Database
        await createProffy(db,{proffyValue,classValue,scheduleValues})

        let query = "?subject=" + req.body.subject
        query+= "&weekday=" + req.body.weekday[0]
        query+= "&time=" + req.body.time_from[0]

        res.redirect("/study"+query)

    } catch (error) {
        console.log(error)
    }

    

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClass
}
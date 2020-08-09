module.exports = async (db, {proffyValue, classValue, scheduleValues}) =>{
    
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    const class_id = insertedClass.lastID

    const insertedAllSchedules = scheduleValues.map( (schedule)=>{
        return db.run(`
            INSERT INTO classes_schedule (
                weekday,
                time_from,
                time_to,
                class_id
            ) VALUES (
                "${schedule.weekday}",
                "${schedule.time_from}",
                "${schedule.time_to}",
                "${class_id}"
            );
        `)
    })

    await Promise.all( insertedAllSchedules )

}
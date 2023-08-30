const WookieePeople = require('./wookieePeople');
const CommonPeople = require('./CommonPeople');

const peopleFactory = async (id, lang = 'galactic', db) => {
    let people = null;
    if (lang === 'wookiee'){
        people = new WookieePeople(id, db);
    } else {
        people = new CommonPeople(id, db);
    }
    await people.init();
    return people;
}

module.exports = { peopleFactory }
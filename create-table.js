import sql from './db.js'

// sql`DROP TABLE IF EXISTS videos`.then(()=> console.log('tabela apagada'))

sql`
    CREATE TABLE videos (
    video_id TEXT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    duration INTEGER ); `
    .then(()=> console.log('on'))

## SQL запрос:
Вставка таблиц:
```sql
CREATE TABLE users (id INTEGER, name VARCHAR(255));
CREATE TABLE groups (id INTEGER, name VARCHAR(255));
CREATE TABLE members (uid INTEGER, gid INTEGER);
CREATE TABLE payments (id INTEGER, uid INTEGER, amount INTEGER, created TIMESTAMP );
```

Заполнение таблиц данными:
```sql
INSERT INTO users (id, name) VALUES
                                 (1, 'User1'),
                                 (2, 'User2'),
                                 (3, 'User3'),
                                 (4, 'User4');

INSERT INTO groups (id, name) VALUES
                                  (1, 'member'),
                                  (2, 'premium_member'),
                                  (3, 'member_test');

INSERT INTO members (uid, gid) VALUES
                                   (1, 1),
                                   (2, 1),
                                   (3, 2),
                                   (4, 3);

INSERT INTO payments (id, uid, amount, created) VALUES
                                                    (1, 1, 300, '2024-01-16 12:30:00'),
                                                    (2, 2, 500, '2024-01-16 14:45:00'),
                                                    (3, 3, 700, '2024-01-17 09:00:00'),
                                                    (4, 1, 400, '2024-01-18 10:30:00'),
                                                    (5, 2, 600, '2024-01-18 15:20:00'),
                                                    (6, 3, 800, '2024-01-19 11:45:00'),
                                                    (7, 1, 350, '2024-01-19 13:15:00'),
                                                    (8, 2, 550, '2024-01-20 08:30:00'),
                                                    (9, 3, 750, '2024-01-20 16:00:00'),
                                                    (10, 4, 1200, '2024-01-20 16:00:00'),
                                                    (11, 1, 450, '2024-01-21 09:45:00'),
                                                    (12, 2, 650, '2024-01-21 14:00:00'),
                                                    (13, 3, 900, '2024-01-22 10:30:00');
```
Select по заданию:
```sql
SELECT
    DATE_TRUNC('day', p.created) AS date,
    AVG(p.amount) AS amount
FROM
    users u
        JOIN
    members m ON u.id = m.uid
        JOIN
    groups g ON m.gid = g.id AND g.name IN ('member', 'premium_member')
        JOIN
    payments p ON u.id = p.uid
WHERE
        p.created >= CURRENT_DATE - INTERVAL '8 days'
  AND p.created < CURRENT_DATE - INTERVAL '1 day'
GROUP BY
    DATE_TRUNC('day', p.created)
ORDER BY
    DATE_TRUNC('day', p.created) DESC;
```
## Full-Stack приложение:
Для начало нужно поднять бд:
```bash
docker run --name TestFullStack -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```
Перейти в папку ./backend и выполнить:
```bash
yarn install
yarn start
```
Backend запустится на http://localhost:3000, swagger на http://localhost:3000/docs

Перейти в папку ./frontend и выполнить:
```bash
yarn install
yarn dev
```
Фронт запустится на http://localhost:8000
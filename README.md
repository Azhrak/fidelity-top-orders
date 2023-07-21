# fidelity-top-orders

Node program to fetch [Top 30 Orders by Fidelity Customers](https://eresearch.fidelity.com/eresearch/gotoBL/fidelityTopOrders.jhtml) and write them into a database table.

## NOTICE!

Fidelity has removed the top orders from their page. As of now, this script does not work.

## Requirements

- Node 12+
- Running relational database: MariaDB, MySQL, PostgreSQL, CockroachDB, SQLite etc. that is supported by [knex](https://knexjs.org/).

## Install

1. Clone repository
2. Install dependencies `npm install`
3. Copy `.env.example`, rename it to `.env` and change values according to your setup
4. Initialize database by running `db.sql` (edit if necessary)
5. Run with `npm run start`

## Usage

Setup a cronjob to run the program on weekdays after market close (e.g. 21:00 UTC).

## Further development

Visualize the history of ranking and buy-sell-ratios for single symbol.

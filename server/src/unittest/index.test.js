const request = require("supertest");
const app = require("../server");

const { testEntry } = require("./entry.test");
const { testEvent } = require("./event.test");
const { testTenant } = require("./tenant.test");
const { testCheckin } = require("./checkin.test");
const { testAccount } = require("./account.test");
const { testStatistic } = require("./statistic.test");

testEntry(app, request);
testEvent(app, request);
testTenant(app, request);
testCheckin(app, request);
testAccount(app, request);
testStatistic(app, request);

INSERT INTO users (password, email, admin) VALUES
    ('test', 'alexdy2007@gmail.com', true),
    ('test1', 'user2@test.com', false),
    ('test2', 'user3@test.com', false),
    ('test3', 'user4@test.com', false);
INSERT INTO accounttypes (name) VALUES
    ('NotAssigned'),
    ('MonthlyPaid'),
    ('Trail'),
    ('Expired');
INSERT INTO sport (sporttype) VALUES
    ('Football'),
    ('HorseRacing'),
    ('Rugby'),
    ('Tennis');
INSERT INTO account (expiryDate, userid, accounttypeid) VALUES
    ('30/07/2090', 1, 2),
    ('30/09/2016', 2, 3),
    ('1/07/2016', 3, 4);
INSERT INTO bet_type (name, comment) VALUES
    ('REGULAR', 'Normal bet, odds * stake'),
    ('QUALIFIER', 'Normal bet, Just helps identify bet placed to qualify for free bet'),
    ('FREE SNR', 'Free bet, Stake not returned on win'),
    ('FREE SR', 'Free bet, Stake returned with bet');

INSERT INTO result_type (resultname) VALUES
    ('WIN'),
    ('DRAW'),
    ('LOSE'),
    ('SUSPENDED');
INSERT INTO bookie (name, website, defaultcommission) VALUES
    ('William Hill', 'http://sports.williamhill.com/',0.02),
    ('StanJames', 'http://www.stanjames.com/', 0.03),
    ('Smarkets', 'https://smarkets.com', 0.02),
    ('Betfair', 'https://www.betfair.com/',0.04),
    ('Betfred', 'http://www.betfred.com/',0.01),
    ('Coral', 'http://www.coral.com/',0.02);
INSERT INTO bookie_account (username, bookieid, accountid, commission, active) VALUES
    ('username1Bookie1',1,1,0.06, true),
    ('username2Bookie1', 1, 2, 0.02, true),
    ('username1Bookie2', 2,1,0.01, true),
    ('username1Bookie3', 3,1,0.02, true),
    ('username1Bookie4',4,1,0.04, false),
    ('username2Bookie2', 2, 2, 0.01, true),
    ('username2Bookie3', 3, 2, 0.02, true),
    ('username2Bookie3', 4, 2, 0.04, false);
INSERT INTO betcase (accountid, sportid, statusactive) VALUES
    (1, 1, 'TRUE'),
    (1, 1, 'FALSE'),
    (2, 1, 'TRUE'),
    (1, 2, 'TRUE'),
    (3, 1, 'TRUE'),
    (1, 1, 'TRUE'),
    (1, 1, 'TRUE'),
    (2, 1, 'TRUE');

INSERT INTO fb_absolute (bookieaccountid, betcaseid, stake, odds, sportid, commission, laybet, datetime, hometeam, awayteam, hometeamselected, resulttypeid, bettypeid, betfulfillment) VALUES
    (1, 1, 11.50, 2, 1, 0.02, false, '2016-09-09 12:30:00','Man Utd', 'West Ham', true, 1,'1', true),
    (3, 1, 50, 0.5, 1, 0.02, true, '2016-09-09 12:30:00','Man Utd', 'West Ham', false, 1,'3', false),
    (1, 6, 400, 0.25, 1, 0.02, false, '2016-10-15 16:30:00','Liverpool', 'Burnley', true, 1,'3', true),
    (4, 6, 28.57, 3.5, 1, 0.02, true, '2016-10-15 16:30:00','Liverpool', 'Burnley', true, 1,'1', false),
    (1, 7, 10, 1.5, 1, 0.02, false, '2016-11-10 17:00:00','Chelsea', 'Man City', true, 1,'3', true),
    (5, 7, 18.75, 0.8, 1, 0.02, false, '2016-11-10 17:00:00','Chelsea', 'Man City', false, 1,'2', false),
    (2, 3, 100, 2, 1, 0.02, true, '2016-10-12 16:30:00','Chelsea', 'Wolves', true, 1,'3', false),
    (6, 3, 100, 1, 1, 0.02, true, '2016-10-12 16:30:00','Chelsea', 'Wolves', false, 1,'3', true),
    (7, 8, 200, 1, 1, 0.02, false, '2016-10-12 16:30:00','Chelsea', 'Wolves', false, 1,'3', null),
    (8, 8, 100, 2, 1, 0.02, true, '2016-10-12 16:30:00','Chelsea', 'Wolves', false, 1,'3', null);

INSERT INTO fb_ht_ft_result (bookieaccountid, betcaseid, stake, odds, sportid, commission, laybet, datetime, hometeam, awayteam, ht_result, ft_result, bettypeid) VALUES
    (1, 1, 30, 2.31, 1, 0.02, false, '2016-09-09 12:30:00','Man Utd', 'West Ham', 'HOME', 'AWAY', '4'),
    (2, 1, 90, 0.45, 1, 0.02, false, '2016-09-09 12:30:00','Man Utd', 'West Ham', 'HOME', 'AWAY', '1');

INSERT INTO users (password, email) VALUES
    ('test', 'alexdy2007@gmail.com'),
    ('test1', 'user2@test.com'),
    ('test2', 'user3@test.com'),
    ('test3', 'user4@test.com');
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
    ('Betfred', 'http://www.betfred.com/',0.01);
INSERT INTO bookie_account (username, email, bookieid, accountid, commission) VALUES
    ('username1', 'ash@gb.com',1,1,0.02),
    ('username2', 'us@sdasdad.com', 2, 2, 0.03);
INSERT INTO betcase (accountid, sportid, status) VALUES
    (1, 1, 'OPEN'),
    (1, 1, 'CLOSED'),
    (2, 1, 'OPEN');
INSERT INTO fb_absolute (bookieaccountid, betcaseid, stake, odds, sportid, commission, laybet, datetime, hometeam, awayteam, hometeamselected, resulttypeid, bettypeid) VALUES
    (1, 1, 30, 2.31, 1, 0.02, false, '2016-09-09 12:30:00','Man Utd', 'West Ham', true, 1,'1'),
    (2, 1, 90, 0.45, 1, 0.02, true, '2016-09-09 12:30:00','Man Utd', 'West Ham', true, 1,'3'),
    (2, 3, 400, 2, 1, 0.02, true, '2016-10-12 16:30:00','Chelsea', 'Wolves', true, 1,'3');

INSERT INTO fb_ht_ft_result (bookieaccountid, betcaseid, stake, odds, sportid, commission, laybet, datetime, hometeam, awayteam, ht_result, ft_result, bettypeid) VALUES
    (1, 1, 30, 2.31, 1, 0.02, false, '2016-09-09 12:30:00','Man Utd', 'West Ham', 'HOME', 'AWAY', '4'),
    (2, 1, 90, 0.45, 1, 0.02, false, '2016-09-09 12:30:00','Man Utd', 'West Ham', 'HOME', 'AWAY', '1');

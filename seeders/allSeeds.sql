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
INSERT INTO bet_market (name, sportid) VALUES
    ('WIN, LOSE, DRAW',1),
    ('half time full time score', 1),
    ('WIN, LOSE, DRAW',2);
INSERT INTO bet_status (name) VALUES
    ('PENDING'),
    ('WIN'),
    ('LOST'),
    ('SUSPENDED'),
    ('STAKE RETURNED');

INSERT INTO bet_type (name, comment) VALUES
    ('REGULAR', 'Normal bet, odds * stake'),
    ('QUALIFIER', 'Normal bet, Just helps identify bet placed to qualify for free bet'),
    ('FREE SNR', 'Free bet, Stake not returned on win'),
    ('FREE SR', 'Free bet, Stake returned with bet');

INSERT INTO bookie (name, website, defaultcommission, color) VALUES
    ('Ladbrokes','www.ladbrokes.co.uk','0.01','#EB2519'),
    ('bet365','www.bet365.com','0','#14805E'),
    ('Betfred','www.betfred.com','0','#0B488F'),
    ('SkyBet','www.skybet.com','0','#014CD0'),
    ('Smarkets','www.smarkets.com','0.023','#00211F'),
    ('WilliamHill','www.williamhill.com','0','#184B74'),
    ('10bet','www.10bet.com','0','#0A3F74'),
    ('12Bet','www.12bet.com','0','#E71418'),
    ('138.Com','www.138.com','0','#000223'),
    ('188bet','www.188bet.com','0.01','#F6901E'),
    ('32RedSport','www.32redsport.com','0','#650000'),
    ('888sport','www.888sport.com','0','#FA6200'),
    ('BetBright','www.betbright.com','0','#00A1E0'),
    ('BETDAQ','www.betdaq.com','0.03','#853395'),
    ('Betfair','www.betfair.com','0.05','#FFB80C'),
    ('BetMcLean','www.betmclean.com','0','#DE292E'),
    ('Betsafe','www.betsafe.com','0','#A10000'),
    ('BetVictor','www.betvictor.com','0','#1D242B'),
    ('Betway','www.betway.com','0','#111111'),
    ('BoyleSports','www.boylesports.com','0','#001F60'),
    ('Bwin','www.bwin.com','0','#FFCC00'),
    ('Cashpoint','www.cashpoint.com','0','#FECC00'),
    ('Comeon','www.comeon.com','0','#96BF0D'),
    ('Coral','www.coral.co.uk','0','#0159BD'),
    ('Favourit','www.favourit.com','0','#508ECB'),
    ('Fun88','www.fun88.com','0','#28BAEE'),
    ('Gentingbet','https://sports.gentingcasino.com/sportsbook/','0.01','#E21F26'),
    ('MarathonBet','www.marathonbet.co.uk','0.06','#0B1E3C'),
    ('Matchbook','www.matchbook.com','0.05','#BB1021'),
    ('Mobilbet','www.mobilbet.com','0.05','#62CF03'),
    ('Netbet','https://sport.netbet.com','0.012','#C62026'),
    ('Novibet','www.novibet.com','0.034','#138996'),
    ('PaddyPower','www.paddypower.com','0.023','#005644'),
    ('Pokerstars','https://bet.pokerstars.com','0.01','#000000'),
    ('RealDealBet','www.realdealbet.com','0.01','#E7C76A'),
    ('Redbet','www.redbet.com','0.025','#EF2530'),
    ('SeanieMac','www.seaniemac.com','0.023','#F37A29'),
    ('Sportingbet','www.sportingbet.com','0.01','#15286A'),
    ('StanJames','www.stanjames.com','0','#7ABC20'),
    ('Titanbet','www.titanbet.com','0.01','#141313'),
    ('TLCBET','www.tlcbet.co.uk','0.024','#000000'),
    ('Tonybet','www.tonybet.com','0.01','#A02488'),
    ('Totesport','www.totesport.com','0.012','#B5DC10'),
    ('Unibet','www.unibet.co.uk','0.01','#247423'),
    ('Vernons','www.vernons.com','0.013','#E41C24');



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

INSERT INTO bet (bookieaccountid, betcaseid, stake, odds, betmarketid, commission, laybet, datetime, betstatusid, bettypeid, bet_specific) VALUES
--BET FB_ABSOLUTE DATA--
    (3, 1, 11.50, 2, 1, 0.02, false, '2016-09-09 12:30:00', 2, 1,'{"betmarket":"fb_absolute",
                                                        "hometeam":"Man Utd",
                                                        "awayteam":"West Ham",
                                                        "homeTeamSelected":true,
                                                        "result":"WIN"
                                                        }'),
    (1, 1, 50, 0.5, 1, 0.02, true, '2016-09-09 12:30:00', 3,3, '{"betmarket":"fb_absolute",
                                                        "hometeam":"Man Utd",
                                                        "awayteam":"West Ham",
                                                        "homeTeamSelected":true,
                                                        "result":"WIN"
                                                        }'),
    (3, 6, 400, 0.25, 1, 0.02, false, '2016-10-15 16:30:00',2,3, '{"betmarket":"fb_absolute",
                                                        "hometeam":"Liverpool",
                                                        "awayteam":"Burnley",
                                                        "homeTeamSelected":false,
                                                        "result":"WIN"
                                                        }'),
    (4, 6, 28.57, 3.5, 1, 0.02, true, '2016-10-15 16:30:00', 3,1,'{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Liverpool",
                                                        "awayteam":"Burnley",
                                                        "homeTeamSelected":false,
                                                        "result":"WIN"
                                                        }'),
    (1, 7, 10, 1.5, 1, 0.02, false, '2016-11-10 17:00:00', 2,3, '{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Chelsea",
                                                        "awayteam":"Man City",
                                                        "homeTeamSelected":true,
                                                        "result":"WIN"
                                                        }'),
    (5, 7, 18.75, 0.8, 1, 0.02, false, '2016-11-10 17:00:00', 3, 2, '{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Chelsea",
                                                        "awayteam":"Man City",
                                                        "homeTeamSelected":false,
                                                        "result":"LOSE"
                                                        }'),
    (2, 3, 100, 2, 1, 0.02, true, '2016-10-12 16:30:00', 3, 3, '{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Leicester",
                                                        "awayteam":"West Brom",
                                                        "homeTeamSelected":true,
                                                        "result":"WIN"
                                                        }'),
    (6, 3, 100, 1, 1, 0.02, false, '2016-10-12 16:30:00', 2,1, '{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Leicester",
                                                        "awayteam":"West Brom",
                                                        "homeTeamSelected":true,
                                                        "result":"WIN"
                                                        }'),

    (7, 8, 200, 1, 1, 0.02, false, '2016-10-19 20:30:00', 1, 1, '{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Chelsea",
                                                        "awayteam":"Wolves",
                                                        "homeTeamSelected":false,
                                                        "result":"LOSE"
                                                        }'),
    (8, 8, 100, 2, 1, 0.02, true, '2016-10-19 20:30:00', 1 ,2, '{
                                                        "betmarket":"fb_absolute",
                                                        "hometeam":"Chelsea",
                                                        "awayteam":"Wolves",
                                                        "homeTeamSelected":false,
                                                        "result":"LOSE"
                                                        }'),
--  FB_FT_HT_SCORE
    (1, 1, 30, 2.5, 2, 0.02, false, '2016-11-12 18:30:00', 2, 4, '{
                                                        "betmarket":"fb_ht_ft_score",
                                                        "hometeam":"Man Utd",
                                                        "awayteam":"West Ham",
                                                        "homehtscore":2,
                                                        "awayhtscore":1,
                                                        "homeftscore":2,
                                                        "awayhtscore":2
                                                        }'),
    (2, 1, 30, 2.5, 2, 0.02, true, '2016-11-12 18:30:00', 2, 1, '{
                                                        "betmarket":"fb_ht_ft_score",
                                                        "hometeam":"Man Utd",
                                                        "awayteam":"West Ham",
                                                        "homehtscore":2,
                                                        "awayhtscore":1,
                                                        "homeftscore":2,
                                                        "awayhtscore":2
                                                        }');
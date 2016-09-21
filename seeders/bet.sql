INSERT INTO bet (bookieaccountid, betcaseid, stake, odds, sportid, commission, laybet, datetime, betstatusid, bettypeid, bet_specific) VALUES
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
    (1, 1, 30, 2.5, 1, 0.02, false, '2016-11-12 18:30:00', 2, 4, '{
                                                        "betmarket":"fb_ht_ft_score",
                                                        "hometeam":"Man Utd",
                                                        "awayteam":"West Ham",
                                                        "homehtscore":2,
                                                        "awayhtscore":1,
                                                        "homeftscore":2,
                                                        "awayhtscore":2
                                                        }'),
    (2, 1, 30, 2.5, 1, 0.02, true, '2016-11-12 18:30:00', 2, 1, '{
                                                        "betmarket":"fb_ht_ft_score",
                                                        "hometeam":"Man Utd",
                                                        "awayteam":"West Ham",
                                                        "homehtscore":2,
                                                        "awayhtscore":1,
                                                        "homeftscore":2,
                                                        "awayhtscore":2
                                                        }');
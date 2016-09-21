/**
 * Created by ayoung on 11/09/16.
 */

var MOCKBETS = {

    "fb_absolute":{
        bet1:{
            bookieaccountid:1,
            betcaseid: 1,
            stake: 100,
            odds: 3.00,
            sportid:1,
            commission:0.05,
            datetime: "2016-12-01 18:30:00",
            laybet:false,
            betstatusid:1,
            bettypeid:1,
            bet_specific: {
                "betmarket":"fb_absolute",
                "hometeam": 'Leeds Utd',
                "awayteam": 'Brighton Town',
                "hometeamselected": true,
                "result":"WIN"
            }

        },
        bet1Update:{
            betcaseid: 1,
            stake: 200,
            odds: 4.00,
            sportid:1,
            commission:0.02,
            laybet:false,
            datetime: "2016-12-17 18:30:00",
            betstatusid:1,
            bettypeid:1,
            bet_specific: {
                "betmarket":"fb_absolute",
                "hometeam": 'Leeds Utd',
                "awayteam": 'Brighton Town',
                "hometeamselected": false,
                "result":"LOSE"
            }
        },
        bet1UpdatePart2:{
            bet_specific: {
                "hometeam": 'Liverpool'
            }
        },
        bet2: {
            bookieaccountid: 2,
            betcaseid: undefined,
            stake: 500,
            odds: 1.00,
            sportid: 1,
            commission: 0.01,
            laybet: false,
            datetime: "2016-12-10 18:30:00",
            hometeam: 'Wolves',
            awayteam: 'Norwich',
            hometeamselected: false,
            bettypeid: 3,
            betstatusid: 1,
            bet_specific: {
                "betmarket":"fb_absolute",
                "hometeam": 'Wolves',
                "awayteam": 'Norwich',
                "hometeamselected": true,
                "result":"WIN"
            }
        }
    }
}

module.exports = MOCKBETS;
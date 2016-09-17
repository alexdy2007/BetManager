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
            laybet:false,
            datetime:"2016-12-10 12:30:00",
            hometeam:'Leeds Utd',
            awayteam:'Brighton Town',
            hometeamselected: true,
            resulttypeid:1,
            bettypeid:1
        },
        bet1Update:{
            betcaseid: 1,
            stake: 200,
            odds: 4.00,
            sportid:1,
            commission:0.02,
            laybet:false,
            datetime:"2016-12-20 12:30:00",
            hometeam:'Leeds Utd',
            awayteam:'Brighton Town',
            hometeamselected: false,
            resulttypeid:1,
            betfulfillment:true,
            bettypeid:1
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
            resulttypeid: 3,
            bettypeid: 3
        }
    }
}

module.exports = MOCKBETS;
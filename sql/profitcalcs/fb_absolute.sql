-- Function: public.fb_absolute_profit_calc()

-- DROP FUNCTION public.fb_absolute_profit_calc();

CREATE OR REPLACE FUNCTION public.fb_absolute_profit_calc()
  RETURNS trigger AS
$BODY$

DECLARE
	free_bet boolean;
	free_stake_returned numeric;
BEGIN

	--IF SNR free_stake_to_return = stake
	IF NEW.bettypeid = 3 THEN
	    free_bet := false;
	    free_stake_returned := 0;
        ELSIF NEW.bettypeid = 4 THEN
	    free_bet := true;
	    free_stake_returned := NEW.stake;
	ELSE
	    free_bet := false;
	    free_stake_returned := 0;
	END IF;

        --IF SUSPENDED
        IF NEW.resulttypeid = 4 THEN
            NEW.profit:=666;
            RETURN NEW;
        END IF;

	--IF STILL NOT FULFILLED (NOT FILLED IN)
        IF NEW.betfulfillment is NULL THEN
            NEW.profit:=9999;
	--IF BET IS FULFILLED (WON)
        ELSIF NEW.betfulfillment THEN
	    NEW.profit:= ((NEW.stake::numeric * NEW.odds::numeric) * (1-NEW.commission)) + free_stake_returned;
	--IF BET IS NOT FULFILLED(LOST)
        ELSE
	    -- IF LOST |FREE BET PROFIT 0 ELSE -STAKE
	    IF free_bet THEN
                NEW.profit:= 0;
	    ELSE
	        NEW.profit:= -NEW.stake::numeric;
	    END IF;
	END IF;
	RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.fb_absolute_profit_calc()
  OWNER TO ayoung;
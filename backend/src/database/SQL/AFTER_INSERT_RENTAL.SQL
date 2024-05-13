DROP TRIGGER IF EXISTS  update_total_price;
DROP TRIGGER IF EXISTS  update_total_price_WITHOUT_DISCOUNT;
DROP TRIGGER IF EXISTS  update_total_price_WITH_DISCOUNT;
DROP TRIGGER IF EXISTS  update_total_price_RECEIVE;

CREATE TRIGGER update_total_price_WITHOUT_DISCOUNT
    AFTER INSERT ON rentals
    WHEN NEW.discount_value IS NULL
BEGIN
    UPDATE rentals
    SET total_price = (NEW.total_daily_price * (julianday(NEW.end_date) - julianday(NEW.start_date) + 1))
    WHERE ID = NEW.ID;
END;

CREATE TRIGGER update_total_price_WITH_DISCOUNT
    AFTER INSERT ON rentals
    WHEN NEW.discount_value IS NOT NULL
BEGIN
    UPDATE rentals
    SET total_price = (NEW.total_daily_price * (julianday(NEW.end_date) - julianday(NEW.start_date) + 1)) - NEW.discount_value
    WHERE ID = NEW.ID;
END;

CREATE TRIGGER update_total_price_RECEIVE
    AFTER UPDATE ON rentals
    WHEN NEW.discount_value IS NOT NULL
BEGIN
    UPDATE rentals
    SET total_price = (NEW.total_daily_price * (julianday(NEW.end_date) - julianday(NEW.start_date) + 1)) - NEW.discount_value
    WHERE ID = NEW.ID;
END;

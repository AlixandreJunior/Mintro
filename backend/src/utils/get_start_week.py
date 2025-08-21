from datetime import date, timedelta


def get_week_range_sun_to_sat():
    today = date.today()
    weekday_index = (today.weekday() + 1) % 7
    start_of_week = today - timedelta(days=weekday_index)
    end_of_week = start_of_week + timedelta(days=6)
    return start_of_week, end_of_week

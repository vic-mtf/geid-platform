import capStr from "./capStr";

function formatDate({ date: bulkDate, lang = "fr" }) {
  const date = new Date(bulkDate);
  let result = null;
  const now = new Date();
  const options = { hour: "2-digit", minute: "2-digit" };
  const timeString = date.toLocaleTimeString(lang, options);

  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow =
    date.toDateString() ===
    new Date(now.setDate(now.getDate() + 1)).toDateString();
  const isSameWeek =
    (date - now) / (1000 * 60 * 60 * 24) < 7 && date.getDay() > now.getDay();
  const isSameYear = date.getFullYear() === now.getFullYear();

  const todayString = new Intl.RelativeTimeFormat(lang, {
    numeric: "auto",
  })?.format(0, "day");
  const tomorrowString = new Intl.RelativeTimeFormat(lang, {
    numeric: "auto",
  })?.format(1, "day");

  const separator = "à";
  /* 
    new Intl.DateTimeFormat(lang, { hour: "2-digit" })
    .formatToParts()
    .find((part) => part.type === "literal")
    .value.trim();
    
  */

  if (isToday) result ??= `${todayString} ${separator} ${timeString}`;
  else if (isTomorrow)
    result ??= `${tomorrowString} ${separator} ${timeString}`;
  else if (isSameWeek) {
    const weekdayString = date.toLocaleDateString(lang, { weekday: "long" });
    result ??= `${weekdayString} ${separator} ${timeString}`;
  } else if (isSameYear) {
    const dateString = date.toLocaleDateString(lang, {
      day: "numeric",
      month: "long",
    });
    result ??= `${dateString} ${separator} ${timeString}`;
  } else {
    const fullDateString = date.toLocaleDateString(lang);
    result ??= `${fullDateString} ${separator} ${timeString}`;
  }
  return capStr(result);
}
export const formatTime = ({
  date: bulkDate,
  lang = "fr",
  showTime = false,
  sameDayOption = "time",
}) => {
  let result = null;
  const date = new Date(bulkDate || Date.now());
  const now = new Date();

  const diffTime = (() => {
    const _now = new Date(now),
      _date = new Date(date);
    _date.setHours(0, 0, 0, 0);
    _now.setHours(0, 0, 0, 0);
    return _now - _date;
  })();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const intl = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

  if (diffDays === 0) {
    if (sameDayOption === "time") {
      result = new Intl.DateTimeFormat(lang, {
        hour: "numeric",
        minute: "numeric",
      }).format(date);
    } else if (sameDayOption === "day") {
      result = intl.format(0, "day");
    } else {
      result = intl.format(0, "day");
      result += ` à ${new Intl.DateTimeFormat(lang, {
        hour: "numeric",
        minute: "numeric",
      }).format(date)}`;
    }
  } else if (diffDays === 1) {
    result = intl.format(-1, "day");
  } else if (diffDays === 2) {
    result = intl.format(-2, "day");
  } else if (diffDays < 7) {
    result = new Intl.DateTimeFormat(lang, { weekday: "long" }).format(date);
  } else if (date.getFullYear() === now.getFullYear()) {
    result = new Intl.DateTimeFormat(lang, {
      month: "long",
      day: "numeric",
    }).format(date);
  } else {
    result = new Intl.DateTimeFormat(lang, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  if (showTime && diffDays !== 0) {
    result += ` à ${new Intl.DateTimeFormat(lang, {
      hour: "numeric",
      minute: "numeric",
    }).format(date)}`;
  }

  return capStr(result);
};

export const timeElapses = ({ date: dateString, lang = "fr" }) => {
  let result = null;
  const date = new Date(dateString);
  const now = new Date();
  const gap = now - date;
  const secondes = Math.floor(gap / 1000);
  const minutes = Math.floor(secondes / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (dateString) {
    if (years > 0)
      result ??= new Intl.RelativeTimeFormat(lang, { numeric: "auto" })?.format(
        -years,
        "year"
      );
    if (months > 0)
      result ??= new Intl.RelativeTimeFormat(lang, { numeric: "auto" })?.format(
        -months,
        "month"
      );
    else if (days > 0)
      result ??= new Intl.RelativeTimeFormat(lang, { numeric: "auto" })?.format(
        -days,
        "day"
      );
    else if (hours > 0)
      result ??= new Intl.RelativeTimeFormat(lang, { numeric: "auto" })?.format(
        -hours,
        "hour"
      );
    else if (minutes > 0) {
      result ??= new Intl.RelativeTimeFormat(lang, { numeric: "auto" })?.format(
        -minutes,
        "minute"
      );
    } else
      result ??= new Intl.RelativeTimeFormat(lang, { numeric: "auto" })?.format(
        -secondes,
        "second"
      );
  }

  return capStr(result);
};

export const calculateDuration = (fistDate, secondDate) => {
  const firstMsDate = new Date(fistDate).getTime();
  const secondDateMsDate = new Date(secondDate).getTime();
  const differenceMs = Math.abs(secondDateMsDate - firstMsDate);
  const hours = Math.floor(differenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  let result = "";
  if (hours) result += `${hours} heure${hours > 1 ? "s" : ""}`;
  if (minutes) result += `et ${minutes} minute${minutes > 1 ? "s" : ""}`;
  return result;
};

export default formatDate;

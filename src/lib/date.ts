export const getFormattedRelativeDateTime = (dateData) => {
  const selectedDate = new Date(dateData);

  const daysGap = selectedDate.getDate() - new Date().getDate();
  if (Math.abs(daysGap) <= 1) {
    const date = new Intl.RelativeTimeFormat("en", {
      style: "long",
      numeric: "auto",
    }).format(daysGap, "days");
    const time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(
      selectedDate
    );
    return `${date.charAt(0).toUpperCase() + date.slice(1)}, ${time}`;
  }

  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    selectedDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
    selectedDate
  );
  //   const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
  //     selectedDate
  //   );
  const weekday = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    selectedDate
  );

  return `${weekday}, ${day} ${month}`;
};

export const getFormattedDateTime = (dateData) => {
  const selectedDate = new Date(dateData);
  const year = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(selectedDate);
  const month = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(selectedDate);
  const day = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(selectedDate);

  const time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(
    selectedDate
  );
  return `${day} ${month} ${year}, ${time}`;
};
